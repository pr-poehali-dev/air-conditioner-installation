import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const API_URL = "https://functions.poehali.dev/188a040c-47b0-43f4-a6ae-17aa04be1d45";

interface Work {
  id: number;
  title: string;
  description: string;
  image_url: string;
  created_at: string;
}

export default function AdminPage() {
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [fileData, setFileData] = useState<{ b64: string; ext: string } | null>(null);
  const [success, setSuccess] = useState(false);

  const loadWorks = () => {
    setLoading(true);
    fetch(API_URL)
      .then(r => r.json())
      .then(data => {
        const parsed = typeof data === "string" ? JSON.parse(data) : data;
        setWorks(parsed.works || []);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadWorks(); }, []);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const reader = new FileReader();
    reader.onload = ev => {
      const result = ev.target?.result as string;
      const b64 = result.split(',')[1];
      setFileData({ b64, ext });
      setPreview(result);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileData) return;
    setUploading(true);
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, image: fileData.b64, ext: fileData.ext }),
      });
      setTitle(""); setDescription(""); setPreview(null); setFileData(null);
      if (fileRef.current) fileRef.current.value = "";
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      loadWorks();
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Удалить эту работу?")) return;
    await fetch(`${API_URL}?id=${id}`, { method: 'DELETE' });
    loadWorks();
  };

  return (
    <div className="min-h-screen font-ibm" style={{ background: "#020b18", color: "#e0f7ff" }}>

      {/* NAV */}
      <nav className="sticky top-0 z-50" style={{ background: "rgba(2,11,24,0.97)", borderBottom: "1px solid rgba(0,212,255,0.15)", backdropFilter: "blur(12px)" }}>
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded flex items-center justify-center" style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.3)" }}>
              <Icon name="Settings" size={16} style={{ color: "#00d4ff" }} />
            </div>
            <span className="font-oswald font-bold tracking-widest text-sm" style={{ color: "#00d4ff" }}>АДМИН-ПАНЕЛЬ</span>
          </div>
          <div className="flex gap-3">
            <button onClick={() => navigate("/works")} className="flex items-center gap-2 text-sm px-4 py-2 rounded border transition-colors" style={{ borderColor: "rgba(0,212,255,0.2)", color: "rgba(224,247,255,0.6)" }}>
              <Icon name="Images" size={14} />
              Наши работы
            </button>
            <button onClick={() => navigate("/")} className="flex items-center gap-2 text-sm px-4 py-2 rounded border transition-colors" style={{ borderColor: "rgba(0,212,255,0.2)", color: "rgba(224,247,255,0.6)" }}>
              <Icon name="Home" size={14} />
              Сайт
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* UPLOAD FORM */}
        <div className="rounded-lg border mb-10" style={{ background: "rgba(6,15,32,0.9)", borderColor: "rgba(0,212,255,0.15)" }}>
          <div className="flex items-center gap-3 px-6 py-4 border-b" style={{ borderColor: "rgba(0,212,255,0.1)" }}>
            <Icon name="Upload" size={18} style={{ color: "#00d4ff" }} />
            <h2 className="font-oswald font-semibold tracking-wide" style={{ color: "#fff" }}>Добавить фотографию</h2>
          </div>
          <form onSubmit={handleUpload} className="p-6 flex flex-col gap-4">

            {/* Drop zone */}
            <div
              className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200"
              style={{ borderColor: preview ? "#00d4ff" : "rgba(0,212,255,0.2)", background: preview ? "rgba(0,212,255,0.03)" : "transparent" }}
              onClick={() => fileRef.current?.click()}
            >
              {preview ? (
                <img src={preview} alt="preview" className="max-h-48 mx-auto rounded object-contain" />
              ) : (
                <div>
                  <Icon name="ImagePlus" size={36} style={{ color: "rgba(0,212,255,0.4)", margin: "0 auto 8px" }} />
                  <p className="text-sm" style={{ color: "rgba(224,247,255,0.5)" }}>Нажмите чтобы выбрать фото</p>
                  <p className="text-xs mt-1" style={{ color: "rgba(224,247,255,0.3)" }}>JPG, PNG, WEBP</p>
                </div>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />

            <input
              type="text"
              placeholder="Название работы (необязательно)"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-4 py-3 text-sm rounded-lg outline-none"
              style={{ background: "rgba(10,22,40,0.9)", border: "1px solid rgba(0,212,255,0.2)", color: "#e0f7ff" }}
              onFocus={e => (e.target.style.borderColor = "#00d4ff")}
              onBlur={e => (e.target.style.borderColor = "rgba(0,212,255,0.2)")}
            />
            <textarea
              placeholder="Описание (необязательно)"
              rows={2}
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full px-4 py-3 text-sm rounded-lg outline-none resize-none"
              style={{ background: "rgba(10,22,40,0.9)", border: "1px solid rgba(0,212,255,0.2)", color: "#e0f7ff" }}
              onFocus={e => (e.target.style.borderColor = "#00d4ff")}
              onBlur={e => (e.target.style.borderColor = "rgba(0,212,255,0.2)")}
            />

            {success && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm" style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.3)", color: "#00d4ff" }}>
                <Icon name="CheckCircle" size={16} />
                Фотография успешно добавлена!
              </div>
            )}

            <button
              type="submit"
              disabled={!fileData || uploading}
              className="py-3 font-oswald font-semibold tracking-widest text-sm uppercase transition-all duration-300 disabled:opacity-40"
              style={{
                background: "linear-gradient(135deg, #00d4ff, #0066ff)",
                color: "#020b18",
                borderRadius: "6px",
                boxShadow: fileData ? "0 0 20px rgba(0,212,255,0.3)" : "none",
              }}
            >
              {uploading ? "Загрузка..." : "Добавить фото"}
            </button>
          </form>
        </div>

        {/* WORKS LIST */}
        <div className="rounded-lg border" style={{ background: "rgba(6,15,32,0.9)", borderColor: "rgba(0,212,255,0.15)" }}>
          <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "rgba(0,212,255,0.1)" }}>
            <div className="flex items-center gap-3">
              <Icon name="LayoutGrid" size={18} style={{ color: "#00d4ff" }} />
              <h2 className="font-oswald font-semibold tracking-wide" style={{ color: "#fff" }}>Загруженные работы</h2>
            </div>
            <span className="text-xs px-3 py-1 rounded-full" style={{ background: "rgba(0,212,255,0.1)", color: "#00d4ff" }}>{works.length} фото</span>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 rounded-full border-2 animate-spin" style={{ borderColor: "#00d4ff", borderTopColor: "transparent" }} />
            </div>
          ) : works.length === 0 ? (
            <div className="text-center py-12" style={{ color: "rgba(224,247,255,0.3)" }}>
              <Icon name="ImageOff" size={36} style={{ margin: "0 auto 8px" }} />
              <p className="text-sm">Фотографий пока нет</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-6">
              {works.map(work => (
                <div key={work.id} className="group relative rounded-lg overflow-hidden" style={{ border: "1px solid rgba(0,212,255,0.1)" }}>
                  <div className="aspect-video">
                    <img src={work.image_url} alt={work.title} className="w-full h-full object-cover" />
                  </div>
                  {work.title && (
                    <div className="px-2 py-1.5 text-xs truncate" style={{ color: "rgba(224,247,255,0.6)" }}>{work.title}</div>
                  )}
                  <button
                    onClick={() => handleDelete(work.id)}
                    className="absolute top-2 right-2 w-7 h-7 rounded flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: "rgba(220,38,38,0.85)" }}
                  >
                    <Icon name="Trash2" size={13} style={{ color: "#fff" }} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
