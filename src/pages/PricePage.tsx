import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const priceCategories = [
  {
    title: "Установка сплит-систем",
    icon: "Wind",
    items: [
      { name: "Установка настенного кондиционера до 2,5 кВт (7-9)", price: "от 16 000 ₽" },
      { name: "Установка настенного кондиционера до 3,5 кВт (12)", price: "от 17 000 ₽" },
      { name: "Установка настенного кондиционера до 5 кВт (18)", price: "от 19 000 ₽" },
      { name: "Установка настенного кондиционера до 7 кВт (24)", price: "от 22 000 ₽" },

    ],
  },
  {
    title: "Мультизональные системы",
    icon: "Building2",
    items: [
      { name: "Мульти-сплит на 2 внутренних блока", price: "от 30 000 ₽" },
      { name: "Мульти-сплит на 3 внутренних блока", price: "от 44 000 ₽" },
      { name: "Мульти-сплит на 4 внутренних блока", price: "от 58 000 ₽" },
      { name: "VRF/VRV система (цена по запросу)", price: "по запросу" },
    ],
  },
  {
    title: "Техническое обслуживание",
    icon: "Wrench",
    items: [
      { name: "Чистка внутреннего блока (лёгкая)", price: "от 1 500 ₽" },
      { name: "Чистка внутреннего блока (глубокая)", price: "от 2 500 ₽" },
      { name: "Чистка наружного блока", price: "от 2 000 ₽" },
      { name: "Заправка фреоном R32/R410", price: "от 2 000 ₽" },
      { name: "Диагностика системы", price: "от 1 000 ₽" },
      { name: "Комплексное ТО (внутр. + наружн.)", price: "от 3 500 ₽" },
    ],
  },
  {
    title: "Ремонт кондиционеров",
    icon: "AlertTriangle",
    items: [
      { name: "Выезд мастера + диагностика", price: "от 1 000 ₽" },
      { name: "Замена платы управления", price: "от 3 000 ₽" },
      { name: "Замена компрессора", price: "от 8 000 ₽" },
      { name: "Замена вентилятора", price: "от 2 500 ₽" },
      { name: "Устранение утечки фреона", price: "от 2 000 ₽" },
      { name: "Прочие работы", price: "по запросу" },
    ],
  },
  {
    title: "Вентиляция",
    icon: "Home",
    items: [
      { name: "Установка бризера / приточного клапана", price: "от 3 000 ₽" },
      { name: "Монтаж вытяжного вентилятора", price: "от 1 500 ₽" },
      { name: "Монтаж рекуператора", price: "от 8 000 ₽" },
      { name: "Проектирование вентиляции", price: "от 5 000 ₽" },
    ],
  },
];

export default function PricePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen font-ibm" style={{ background: "#020b18", color: "#e0f7ff" }}>

      {/* NAV */}
      <nav
        className="sticky top-0 z-50"
        style={{ background: "rgba(2,11,24,0.97)", borderBottom: "1px solid rgba(0,212,255,0.15)", backdropFilter: "blur(12px)" }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="font-oswald text-xl font-bold tracking-widest" style={{ color: "#00d4ff" }}>
            ПОГОДА<span style={{ color: "#fff" }}> В ДОМЕ</span>
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm transition-colors duration-200 hover:text-cyan-300"
            style={{ color: "rgba(224,247,255,0.6)" }}
          >
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
            <Icon name="Tag" size={14} />
            Стоимость работ
          </div>
          <h1 className="font-oswald text-4xl md:text-5xl font-bold mb-4" style={{ color: "#fff" }}>
            ПРАЙС-ЛИСТ
          </h1>
          <p className="text-sm max-w-lg mx-auto" style={{ color: "rgba(224,247,255,0.5)" }}>
            Точная стоимость рассчитывается после выезда мастера. Цены указаны без учёта стоимости оборудования.
          </p>
        </div>
      </div>

      {/* PRICE TABLES */}
      <div className="max-w-6xl mx-auto px-6 pb-20 flex flex-col gap-8">
        {priceCategories.map((cat) => (
          <div key={cat.title} className="rounded-lg border overflow-hidden"
            style={{ borderColor: "rgba(0,212,255,0.15)", background: "rgba(6,15,32,0.9)" }}>

            {/* Category header */}
            <div className="flex items-center gap-3 px-6 py-4 border-b"
              style={{ borderColor: "rgba(0,212,255,0.12)", background: "rgba(0,212,255,0.06)" }}>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: "rgba(0,212,255,0.12)", border: "1px solid rgba(0,212,255,0.25)" }}>
                <Icon name={cat.icon} size={18} style={{ color: "#00d4ff" }} />
              </div>
              <h2 className="font-oswald text-lg font-semibold tracking-wide" style={{ color: "#fff" }}>{cat.title}</h2>
            </div>

            {/* Rows */}
            <div>
              {cat.items.map((item, i) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between px-6 py-4 border-b last:border-0 transition-colors duration-150 hover:bg-[rgba(0,212,255,0.03)]"
                  style={{ borderColor: "rgba(0,212,255,0.07)", background: i % 2 === 0 ? "transparent" : "rgba(0,212,255,0.02)" }}
                >
                  <span className="text-sm pr-4" style={{ color: "rgba(224,247,255,0.75)" }}>{item.name}</span>
                  <span className="font-oswald font-semibold text-base shrink-0"
                    style={{ color: item.price === "по запросу" ? "rgba(224,247,255,0.4)" : "#00d4ff" }}>
                    {item.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* CTA */}
        <div className="rounded-lg p-8 text-center relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.08), rgba(0,102,255,0.08))", border: "1px solid rgba(0,212,255,0.2)" }}>
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #00d4ff, transparent)" }} />
          <h3 className="font-oswald text-2xl font-bold mb-2" style={{ color: "#fff" }}>Нужен точный расчёт?</h3>
          <p className="text-sm mb-6" style={{ color: "rgba(224,247,255,0.55)" }}>
            Оставьте заявку — мастер выедет, оценит объём работ и назовёт окончательную стоимость бесплатно
          </p>
          <button
            onClick={() => { navigate("/"); setTimeout(() => document.getElementById("contacts")?.scrollIntoView({ behavior: "smooth" }), 100); }}
            className="px-8 py-4 font-oswald font-semibold tracking-widest text-sm uppercase transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #00d4ff, #0066ff)",
              color: "#020b18",
              borderRadius: "4px",
              boxShadow: "0 0 30px rgba(0,212,255,0.3)",
            }}
          >
            Оставить заявку
          </button>
        </div>
      </div>

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