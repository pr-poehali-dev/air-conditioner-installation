import { useEffect, useState } from "react";
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

export default function WorksPage() {
  const navigate = useNavigate();
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Work | null>(null);

  useEffect(() => {
    fetch(API_URL)
      .then(r => r.json())
      .then(data => {
        const parsed = typeof data === "string" ? JSON.parse(data) : data;
        setWorks(parsed.works || []);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen font-ibm" style={{ background: "#020b18", color: "#e0f7ff" }}>

      {/* NAV */}
      <nav className="sticky top-0 z-50" style={{ background: "rgba(2,11,24,0.97)", borderBottom: "1px solid rgba(0,212,255,0.15)", backdropFilter: "blur(12px)" }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="font-oswald text-xl font-bold tracking-widest" style={{ color: "#00d4ff" }}>
            ПОГОДА<span style={{ color: "#fff" }}> В ДОМЕ</span>
          </button>
          <button onClick={() => navigate("/")} className="flex items-center gap-2 text-sm transition-colors duration-200 hover:text-cyan-300" style={{ color: "rgba(224,247,255,0.6)" }}>
            <Icon name="ArrowLeft" size={16} />
            На главную
          </button>
        </div>
      </nav>

      {/* HEADER */}
      <div className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "linear-gradient(rgba(0,212,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }} />
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #00d4ff, transparent)" }} />
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full text-xs font-medium tracking-widest uppercase border"
            style={{ borderColor: "rgba(0,212,255,0.3)", color: "#00d4ff", background: "rgba(0,212,255,0.08)" }}>
            <Icon name="Images" size={14} />
            Портфолио
          </div>
          <h1 className="font-oswald text-4xl md:text-5xl font-bold" style={{ color: "#fff" }}>НАШИ РАБОТЫ</h1>
          <p className="mt-4 text-sm" style={{ color: "rgba(224,247,255,0.5)" }}>Фотографии выполненных объектов по установке кондиционеров</p>
        </div>
      </div>

      {/* GALLERY */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        {loading ? (
          <div className="flex justify-center items-center py-24">
            <div className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: "#00d4ff", borderTopColor: "transparent" }} />
          </div>
        ) : works.length === 0 ? (
          <div className="text-center py-24">
            <Icon name="ImageOff" size={48} style={{ color: "rgba(0,212,255,0.3)", margin: "0 auto 16px" }} />
            <p className="font-oswald text-xl" style={{ color: "rgba(224,247,255,0.4)" }}>Фотографии пока не добавлены</p>
            <p className="text-sm mt-2" style={{ color: "rgba(224,247,255,0.25)" }}>Добавьте работы через административную панель</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {works.map(work => (
              <div
                key={work.id}
                className="group rounded-lg overflow-hidden border cursor-pointer transition-all duration-300"
                style={{ borderColor: "rgba(0,212,255,0.1)", background: "rgba(6,15,32,0.9)" }}
                onClick={() => setSelected(work)}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,212,255,0.5)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(0,212,255,0.1)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,212,255,0.1)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={work.image_url}
                    alt={work.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                {(work.title || work.description) && (
                  <div className="p-4">
                    {work.title && <h3 className="font-oswald font-semibold" style={{ color: "#fff" }}>{work.title}</h3>}
                    {work.description && <p className="text-sm mt-1" style={{ color: "rgba(224,247,255,0.55)" }}>{work.description}</p>}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* LIGHTBOX */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(2,11,24,0.95)" }}
          onClick={() => setSelected(null)}
        >
          <div className="relative max-w-4xl w-full" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setSelected(null)}
              className="absolute -top-10 right-0 p-2 transition-colors hover:text-white"
              style={{ color: "rgba(224,247,255,0.6)" }}
            >
              <Icon name="X" size={24} />
            </button>
            <img src={selected.image_url} alt={selected.title} className="w-full rounded-lg" />
            {(selected.title || selected.description) && (
              <div className="mt-4 text-center">
                {selected.title && <h3 className="font-oswald text-xl font-semibold" style={{ color: "#fff" }}>{selected.title}</h3>}
                {selected.description && <p className="text-sm mt-1" style={{ color: "rgba(224,247,255,0.55)" }}>{selected.description}</p>}
              </div>
            )}
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="py-8 border-t text-center" style={{ borderColor: "rgba(0,212,255,0.1)", background: "#020b18" }}>
        <div className="font-oswald text-lg font-bold tracking-widest mb-2" style={{ color: "#00d4ff" }}>
          ПОГОДА<span style={{ color: "#fff" }}> В ДОМЕ</span>
        </div>
        <p className="text-xs" style={{ color: "rgba(224,247,255,0.3)" }}>© 2024 Погода в доме. Все права защищены.</p>
      </footer>
    </div>
  );
}
