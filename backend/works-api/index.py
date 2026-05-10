import json
import os
import base64
import uuid
import psycopg2
import boto3


def handler(event: dict, context) -> dict:
    """API для управления фотографиями выполненных работ. Поддерживает GET (список), POST (загрузка), DELETE (удаление)."""

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Max-Age': '86400'}, 'body': ''}

    method = event.get('httpMethod', 'GET')
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()

    try:
        if method == 'GET':
            cur.execute("SELECT id, title, description, image_url, created_at FROM works ORDER BY created_at DESC")
            rows = cur.fetchall()
            works = [{'id': r[0], 'title': r[1], 'description': r[2], 'image_url': r[3], 'created_at': str(r[4])} for r in rows]
            return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*'}, 'body': json.dumps({'works': works})}

        elif method == 'POST':
            body = json.loads(event.get('body') or '{}')
            title = body.get('title', '')
            description = body.get('description', '')
            image_b64 = body.get('image')
            ext = body.get('ext', 'jpg')

            image_data = base64.b64decode(image_b64)
            key = f"works/{uuid.uuid4()}.{ext}"

            s3 = boto3.client(
                's3',
                endpoint_url='https://bucket.poehali.dev',
                aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
                aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY']
            )
            s3.put_object(Bucket='files', Key=key, Body=image_data, ContentType=f'image/{ext}')
            image_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/files/{key}"

            cur.execute(
                "INSERT INTO works (title, description, image_url) VALUES (%s, %s, %s) RETURNING id",
                (title, description, image_url)
            )
            new_id = cur.fetchone()[0]
            conn.commit()

            return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*'}, 'body': json.dumps({'id': new_id, 'image_url': image_url})}

        elif method == 'DELETE':
            params = event.get('queryStringParameters') or {}
            work_id = params.get('id')
            cur.execute("DELETE FROM works WHERE id = %s", (work_id,))
            conn.commit()
            return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*'}, 'body': json.dumps({'ok': True})}

    finally:
        cur.close()
        conn.close()

    return {'statusCode': 405, 'headers': {'Access-Control-Allow-Origin': '*'}, 'body': json.dumps({'error': 'Method not allowed'})}
