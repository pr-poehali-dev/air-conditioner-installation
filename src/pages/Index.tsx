import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/07a5d9ed-123e-4e5d-ac16-a8eb7a7551b8/files/5b7ef35c-835f-4c36-b933-ae6145709493.jpg";

const services = [
  {
    icon: "Wind",
    title: "Установка сплит-систем",
    desc: "Монтаж настенных кондиционеров любых марок: Daikin, Mitsubishi, LG, Samsung и других. Квартира, дом, офис.",
    time: "1 день",
    color: "#00d4ff",
  },
  {
    icon: "Building2",
    title: "Мультизональные системы",
    desc: "Установка мульти-сплит и VRF/VRV систем для нескольких помещений с единым наружным блоком.",
    time: "2–4 дня",
    color: "#0099ff",
  },
  {
    icon: "Thermometer",
    title: "Тепловые насосы",
    desc: "Монтаж систем отопления и кондиционирования на базе тепловых насосов — эффективно и экономично.",
    time: "3–5 дней",
    color: "#00ccff",
  },
  {
    icon: "Wrench",
    title: "Техническое обслуживание",
    desc: "Чистка фильтров, дренажной системы, заправка фреоном, диагностика и профилактика оборудования.",
    time: "1–2 часа",
    color: "#00d4ff",
  },
  {
    icon: "AlertTriangle",
    title: "Ремонт кондиционеров",
    desc: "Устранение неисправностей, замена компрессора, платы управления, вентилятора. Выезд в день обращения.",
    time: "1–3 дня",
    color: "#0099ff",
  },
  {
    icon: "Home",
    title: "Вентиляция и воздухообмен",
    desc: "Проектирование и монтаж приточно-вытяжной вентиляции, рекуператоров и бризеров для свежего воздуха.",
    time: "2–5 дней",
    color: "#00ccff",
  },
];

const guarantees = [
  {
    icon: "BadgeCheck",
    title: "Гарантия 2 года",
    desc: "На все выполненные работы и установленное оборудование. Устраняем неисправности бесплатно.",
  },
  {
    icon: "Award",
    title: "Сертифицированные специалисты",
    desc: "Монтажники с допусками СРО, аттестациями производителей оборудования и опытом от 5 лет.",
  },
  {
    icon: "ClipboardCheck",
    title: "Лицензии и допуски",
    desc: "Работаем в рамках закона: лицензии ФСБ, СРО, страховка ответственности перед заказчиком.",
  },
  {
    icon: "Clock",
    title: "Сроки по договору",
    desc: "Фиксируем сроки в договоре. При просрочке — штраф в пользу клиента. Никаких «подождите».",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, inView };
}

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} ${className}`}
    >
      {children}
    </div>
  );
}

export default function Index() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen font-ibm" style={{ background: "#020b18", color: "#e0f7ff" }}>

      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(2,11,24,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(0,212,255,0.15)" : "none",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="font-oswald text-xl font-bold tracking-widest" style={{ color: "#00d4ff" }}>
            ПОГОДА<span style={{ color: "#fff" }}> В ДОМЕ</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm tracking-wider font-medium" style={{ color: "rgba(224,247,255,0.7)" }}>
            {[["hero", "ГЛАВНАЯ"], ["services", "УСЛУГИ"], ["guarantees", "ГАРАНТИИ"], ["contacts", "КОНТАКТЫ"]].map(([id, label]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="hover:text-cyan-300 transition-colors duration-200"
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => navigate("/price")}
              className="hover:text-cyan-300 transition-colors duration-200"
            >
              ПРАЙС
            </button>
          </div>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} style={{ color: "#00d4ff" }}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden px-6 pb-4 flex flex-col gap-4 text-sm tracking-wider" style={{ background: "rgba(2,11,24,0.98)" }}>
            {[["hero", "ГЛАВНАЯ"], ["services", "УСЛУГИ"], ["guarantees", "ГАРАНТИИ"], ["contacts", "КОНТАКТЫ"]].map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)} className="text-left py-2" style={{ color: "rgba(224,247,255,0.8)" }}>
                {label}
              </button>
            ))}
            <button onClick={() => navigate("/price")} className="text-left py-2" style={{ color: "rgba(224,247,255,0.8)" }}>
              ПРАЙС
            </button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMAGE} alt="hero" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(2,11,24,0.95) 0%, rgba(6,15,32,0.7) 50%, rgba(2,11,24,0.9) 100%)" }} />
        </div>

        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "linear-gradient(rgba(0,212,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }} />

        <div className="absolute left-0 right-0 h-px opacity-20 animate-scan-line pointer-events-none" style={{ background: "linear-gradient(90deg, transparent, #00d4ff, transparent)" }} />

        <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: "#00d4ff" }} />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-8 blur-3xl pointer-events-none" style={{ background: "#0066ff" }} />

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full text-xs font-medium tracking-widest uppercase border"
              style={{ borderColor: "rgba(0,212,255,0.3)", color: "#00d4ff", background: "rgba(0,212,255,0.08)" }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#00d4ff" }} />
              Профессиональный монтаж кондиционеров
            </div>

            <h1 className="font-oswald font-bold leading-none mb-6"
              style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", color: "#fff" }}>
              УСТАНОВКА<br />
              <span style={{ color: "#00d4ff", textShadow: "0 0 40px rgba(0,212,255,0.5)" }}>
                КОНДИЦИОНЕРОВ
              </span><br />
              ПОД КЛЮЧ
            </h1>

            <p className="text-lg mb-10 max-w-xl leading-relaxed" style={{ color: "rgba(224,247,255,0.65)" }}>
              Работаем быстро, по договору, с гарантией.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo("contacts")}
                className="px-8 py-4 font-oswald font-semibold tracking-widest text-sm uppercase transition-all duration-300 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #00d4ff, #0066ff)",
                  color: "#020b18",
                  borderRadius: "4px",
                  boxShadow: "0 0 30px rgba(0,212,255,0.4)",
                }}
              >
                Получить расчёт
              </button>
              <button
                onClick={() => scrollTo("services")}
                className="px-8 py-4 font-oswald font-semibold tracking-widest text-sm uppercase transition-all duration-300 hover:scale-105 border"
                style={{
                  borderColor: "rgba(0,212,255,0.4)",
                  color: "#00d4ff",
                  borderRadius: "4px",
                  background: "rgba(0,212,255,0.05)",
                }}
              >
                Наши услуги
              </button>
            </div>

            <div className="flex flex-wrap gap-10 mt-16 pt-10 border-t" style={{ borderColor: "rgba(0,212,255,0.15)" }}>
              {[["200+", "Объектов сдано"], ["8 лет", "На рынке"], ["24/7", "Поддержка"], ["2 года", "Гарантия"]].map(([num, label]) => (
                <div key={label}>
                  <div className="font-oswald text-3xl font-bold" style={{ color: "#00d4ff" }}>{num}</div>
                  <div className="text-xs mt-1 tracking-wider" style={{ color: "rgba(224,247,255,0.5)" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24" style={{ background: "#060f20" }}>
        <div className="max-w-6xl mx-auto px-6">
          <Section>
            <div className="text-center mb-16">
              <div className="inline-block px-3 py-1 mb-4 text-xs tracking-widest uppercase border-l-2 pl-4" style={{ borderColor: "#00d4ff", color: "#00d4ff" }}>
                Что мы устанавливаем
              </div>
              <h2 className="font-oswald text-4xl md:text-5xl font-bold" style={{ color: "#fff" }}>НАШИ УСЛУГИ</h2>
            </div>
          </Section>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <Section key={s.title}>
                <div
                  className="group p-6 rounded-lg border transition-all duration-300 h-full"
                  style={{
                    background: "rgba(10,22,40,0.8)",
                    borderColor: "rgba(0,212,255,0.1)",
                    transitionDelay: `${i * 80}ms`,
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,212,255,0.5)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(0,212,255,0.1)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,212,255,0.1)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                    style={{ background: `rgba(0,212,255,0.1)`, border: `1px solid ${s.color}33` }}>
                    <Icon name={s.icon} size={22} style={{ color: s.color }} />
                  </div>
                  <h3 className="font-oswald text-lg font-semibold mb-2" style={{ color: "#fff" }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(224,247,255,0.55)" }}>{s.desc}</p>
                  <div className="flex items-center gap-2 text-xs font-medium" style={{ color: "#00d4ff" }}>
                    <Icon name="Clock" size={14} />
                    Срок: {s.time}
                  </div>
                </div>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* GUARANTEES */}
      <section id="guarantees" className="py-24" style={{ background: "#020b18" }}>
        <div className="max-w-6xl mx-auto px-6">
          <Section>
            <div className="text-center mb-16">
              <div className="inline-block px-3 py-1 mb-4 text-xs tracking-widest uppercase border-l-2 pl-4" style={{ borderColor: "#00d4ff", color: "#00d4ff" }}>
                Надёжность и доверие
              </div>
              <h2 className="font-oswald text-4xl md:text-5xl font-bold" style={{ color: "#fff" }}>ГАРАНТИИ</h2>
            </div>
          </Section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guarantees.map((g, i) => (
              <Section key={g.title}>
                <div
                  className="flex gap-5 p-6 rounded-lg border transition-all duration-300"
                  style={{
                    background: "rgba(6,15,32,0.9)",
                    borderColor: "rgba(0,212,255,0.12)",
                    transitionDelay: `${i * 100}ms`,
                  }}
                >
                  <div className="shrink-0 w-14 h-14 rounded-xl flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.15), rgba(0,102,255,0.15))", border: "1px solid rgba(0,212,255,0.2)" }}>
                    <Icon name={g.icon} size={26} style={{ color: "#00d4ff" }} />
                  </div>
                  <div>
                    <h3 className="font-oswald text-lg font-semibold mb-2" style={{ color: "#fff" }}>{g.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(224,247,255,0.6)" }}>{g.desc}</p>
                  </div>
                </div>
              </Section>
            ))}
          </div>

          <Section>
            <div className="mt-10 p-8 rounded-lg text-center relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.08), rgba(0,102,255,0.08))", border: "1px solid rgba(0,212,255,0.2)" }}>
              <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #00d4ff, transparent)" }} />
              <Icon name="FileCheck" size={36} style={{ color: "#00d4ff", margin: "0 auto 12px" }} />
              <p className="font-oswald text-xl font-semibold mb-2" style={{ color: "#fff" }}>
                Договор и документация на каждый объект
              </p>
              <p className="text-sm" style={{ color: "rgba(224,247,255,0.55)" }}>
                Акт выполненных работ, гарантийный талон, исполнительная документация — всё передаётся заказчику после сдачи объекта
              </p>
            </div>
          </Section>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24" style={{ background: "#060f20" }}>
        <div className="max-w-6xl mx-auto px-6">
          <Section>
            <div className="text-center mb-16">
              <div className="inline-block px-3 py-1 mb-4 text-xs tracking-widest uppercase border-l-2 pl-4" style={{ borderColor: "#00d4ff", color: "#00d4ff" }}>
                Свяжитесь с нами
              </div>
              <h2 className="font-oswald text-4xl md:text-5xl font-bold" style={{ color: "#fff" }}>ОСТАВИТЬ ЗАЯВКУ</h2>
              <p className="mt-4 text-sm" style={{ color: "rgba(224,247,255,0.5)" }}>Перезвоним в течение 30 минут в рабочее время</p>
            </div>
          </Section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <Section>
              {sent ? (
                <div className="p-10 rounded-lg text-center border"
                  style={{ background: "rgba(0,212,255,0.05)", borderColor: "rgba(0,212,255,0.3)" }}>
                  <Icon name="CheckCircle" size={48} style={{ color: "#00d4ff", margin: "0 auto 16px" }} />
                  <h3 className="font-oswald text-2xl font-bold mb-2" style={{ color: "#fff" }}>Заявка принята!</h3>
                  <p style={{ color: "rgba(224,247,255,0.6)" }}>Мы свяжемся с вами в ближайшее время.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {[
                    { name: "name", placeholder: "Ваше имя", type: "text" },
                    { name: "phone", placeholder: "Номер телефона", type: "tel" },
                  ].map(({ name, placeholder, type }) => (
                    <input
                      key={name}
                      type={type}
                      placeholder={placeholder}
                      required
                      value={form[name as keyof typeof form]}
                      onChange={e => setForm(f => ({ ...f, [name]: e.target.value }))}
                      className="w-full px-5 py-4 text-sm rounded-lg outline-none transition-all duration-200"
                      style={{
                        background: "rgba(10,22,40,0.9)",
                        border: "1px solid rgba(0,212,255,0.2)",
                        color: "#e0f7ff",
                      }}
                      onFocus={e => (e.target.style.borderColor = "#00d4ff")}
                      onBlur={e => (e.target.style.borderColor = "rgba(0,212,255,0.2)")}
                    />
                  ))}
                  <textarea
                    placeholder="Опишите задачу (необязательно)"
                    rows={4}
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    className="w-full px-5 py-4 text-sm rounded-lg outline-none transition-all duration-200 resize-none"
                    style={{
                      background: "rgba(10,22,40,0.9)",
                      border: "1px solid rgba(0,212,255,0.2)",
                      color: "#e0f7ff",
                    }}
                    onFocus={e => (e.target.style.borderColor = "#00d4ff")}
                    onBlur={e => (e.target.style.borderColor = "rgba(0,212,255,0.2)")}
                  />
                  <button
                    type="submit"
                    className="w-full py-4 font-oswald font-semibold tracking-widest text-sm uppercase transition-all duration-300 hover:scale-[1.02]"
                    style={{
                      background: "linear-gradient(135deg, #00d4ff, #0066ff)",
                      color: "#020b18",
                      borderRadius: "6px",
                      boxShadow: "0 0 30px rgba(0,212,255,0.3)",
                    }}
                  >
                    Отправить заявку
                  </button>
                  <p className="text-xs text-center" style={{ color: "rgba(224,247,255,0.35)" }}>
                    Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                  </p>
                </form>
              )}
            </Section>

            <Section>
              <div className="flex flex-col gap-6">
                {[
                  { icon: "Phone", label: "Телефон", value: "+7 (999) 000-00-00", sub: "Пн–Пт: 9:00–19:00" },
                  { icon: "Mail", label: "Email", value: "info@techmont.ru", sub: "Ответим в течение часа" },
                  { icon: "MapPin", label: "Город", value: "Работаем по всему региону", sub: "Выезд на объект — бесплатно" },
                ].map(({ icon, label, value, sub }) => (
                  <div key={label} className="flex gap-4 items-start p-5 rounded-lg border"
                    style={{ background: "rgba(10,22,40,0.6)", borderColor: "rgba(0,212,255,0.12)" }}>
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.2)" }}>
                      <Icon name={icon} size={18} style={{ color: "#00d4ff" }} />
                    </div>
                    <div>
                      <div className="text-xs tracking-wider mb-1" style={{ color: "rgba(224,247,255,0.4)" }}>{label}</div>
                      <div className="font-semibold" style={{ color: "#fff" }}>{value}</div>
                      <div className="text-xs mt-1" style={{ color: "rgba(224,247,255,0.45)" }}>{sub}</div>
                    </div>
                  </div>
                ))}

                <div className="p-5 rounded-lg border" style={{ background: "rgba(0,212,255,0.04)", borderColor: "rgba(0,212,255,0.2)" }}>
                  <div className="flex items-center gap-2 mb-3">
                    <Icon name="Clock" size={16} style={{ color: "#00d4ff" }} />
                    <span className="font-oswald font-semibold tracking-wider text-sm" style={{ color: "#00d4ff" }}>РЕЖИМ РАБОТЫ</span>
                  </div>
                  {[["Понедельник – Пятница", "09:00 – 19:00"], ["Суббота", "10:00 – 16:00"], ["Воскресенье", "Выходной"]].map(([day, time]) => (
                    <div key={day} className="flex justify-between text-sm py-1.5 border-b last:border-0" style={{ borderColor: "rgba(0,212,255,0.08)" }}>
                      <span style={{ color: "rgba(224,247,255,0.55)" }}>{day}</span>
                      <span style={{ color: day === "Воскресенье" ? "rgba(224,247,255,0.3)" : "#fff" }}>{time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Section>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 border-t text-center" style={{ borderColor: "rgba(0,212,255,0.1)", background: "#020b18" }}>
        <div className="font-oswald text-lg font-bold tracking-widest mb-2" style={{ color: "#00d4ff" }}>
          ПОГОДА<span style={{ color: "#fff" }}> В ДОМЕ</span>
        </div>
        <p className="text-xs" style={{ color: "rgba(224,247,255,0.3)" }}>
          © 2024 ТехМонтаж. Все права защищены.
        </p>
      </footer>
    </div>
  );
}