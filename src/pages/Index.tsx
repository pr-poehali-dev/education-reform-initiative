import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const IMG_KIDS = "https://cdn.poehali.dev/projects/ce22b72c-c626-41ae-a643-1c44eeeed17e/files/6455abbc-9baf-4622-97a5-9e30e196fbc7.jpg";
const IMG_GRADES = "https://cdn.poehali.dev/projects/ce22b72c-c626-41ae-a643-1c44eeeed17e/files/23f4ccab-830d-4b3c-9763-ff847ed985e2.jpg";
const IMG_SLEEP = "https://cdn.poehali.dev/projects/ce22b72c-c626-41ae-a643-1c44eeeed17e/files/4e3b13bb-46ba-43bc-a8b8-84da26227b3b.jpg";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function AnimBlock({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={className} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(36px)", transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

const NAV_ITEMS = [
  { id: "intro", label: "Введение" },
  { id: "grades", label: "Оценки" },
  { id: "schedule", label: "Расписание" },
  { id: "examples", label: "Примеры" },
  { id: "results", label: "Результаты" },
  { id: "conclusion", label: "Выводы" },
];

export default function Index() {
  const [active, setActive] = useState("intro");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => {
      const sections = NAV_ITEMS.map(n => document.getElementById(n.id));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i];
        if (el && el.getBoundingClientRect().top <= 120) { setActive(NAV_ITEMS[i].id); break; }
      }
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="font-golos bg-[#FFFBF4] text-[#1a1a2e] min-h-screen">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FFFBF4]/90 backdrop-blur-md border-b border-[#f0e8d8]">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <span className="font-caveat text-xl text-[#ff6b35] font-bold">Школа 2.0</span>
          <div className="hidden md:flex gap-1">
            {NAV_ITEMS.map(n => (
              <button key={n.id} onClick={() => scrollTo(n.id)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${active === n.id ? "bg-[#ff6b35] text-white" : "text-[#555] hover:bg-[#f5ede0]"}`}>
                {n.label}
              </button>
            ))}
          </div>
          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name="Menu" size={22} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-[#FFFBF4] border-t border-[#f0e8d8] px-4 pb-3 flex flex-col gap-1">
            {NAV_ITEMS.map(n => (
              <button key={n.id} onClick={() => scrollTo(n.id)} className="text-left px-3 py-2 rounded-lg hover:bg-[#f5ede0] text-sm font-medium">{n.label}</button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="intro" className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-14">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full bg-[#FFE0CC] opacity-40 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#C8F0E0] opacity-30 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#FFF0B3] opacity-20 blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#ff6b35]/10 text-[#ff6b35] px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
              <Icon name="BookOpen" size={14} />
              Проект · 5–9 классы
            </div>
            <h1 className="text-5xl md:text-6xl font-black leading-tight mb-6 text-[#1a1a2e]">
              Предложения<br />
              <span className="text-[#ff6b35]">по изменению</span><br />
              системы образования
            </h1>
            <p className="text-lg text-[#555] mb-8 leading-relaxed max-w-md">
              Как сделать школу местом, куда хочется идти — без страха, усталости и скуки. Конкретные идеи от учеников.
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                { icon: "Star", text: "Оценки без страха", color: "#FFB800" },
                { icon: "Clock", text: "Умное расписание", color: "#00C896" },
                { icon: "Lightbulb", text: "Живые примеры", color: "#6B5CE7" },
              ].map(b => (
                <span key={b.text} className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white" style={{ background: b.color }}>
                  <Icon name={b.icon} fallback="Star" size={14} />
                  {b.text}
                </span>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-[#ff6b35]/20 to-[#FFB800]/20 rounded-3xl blur-xl" />
            <img src={IMG_KIDS} alt="Ученики" className="relative rounded-3xl w-full object-cover shadow-2xl aspect-square" />
            <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl px-5 py-3 flex items-center gap-3">
              <span className="text-3xl">🎒</span>
              <div>
                <div className="font-black text-lg text-[#ff6b35]">3 блока</div>
                <div className="text-xs text-[#888]">ключевых изменений</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <AnimBlock className="relative max-w-6xl mx-auto px-4 pb-16 w-full">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { val: "73%", label: "школьников боятся получить плохую оценку", color: "#FF4757" },
              { val: "6:30", label: "среднее время подъёма школьника 5–9 кл.", color: "#FF6B35" },
              { val: "8+", label: "уроков в день — типичная нагрузка", color: "#FFB800" },
              { val: "85%", label: "хотят учиться в своём темпе", color: "#00C896" },
            ].map(s => (
              <div key={s.val} className="bg-white rounded-2xl p-5 shadow-md border border-[#f0e8d8]">
                <div className="text-3xl font-black mb-1" style={{ color: s.color }}>{s.val}</div>
                <div className="text-xs text-[#777] leading-tight">{s.label}</div>
              </div>
            ))}
          </div>
        </AnimBlock>
      </section>

      {/* GRADES SECTION */}
      <section id="grades" className="py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#FFE0B3]/40 blur-3xl pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4">
          <AnimBlock>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#FFB800] flex items-center justify-center">
                <Icon name="Star" size={20} className="text-white" />
              </div>
              <span className="text-sm font-bold text-[#FFB800] uppercase tracking-widest">Раздел 2</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-3">Оценки и мотивация</h2>
            <p className="text-xl text-[#ff6b35] font-caveat mb-12">«Учиться без страха»</p>
          </AnimBlock>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <AnimBlock delay={100}>
              <div className="bg-[#FFF3E0] rounded-3xl p-8 h-full">
                <div className="text-4xl mb-4">😰</div>
                <h3 className="text-xl font-bold mb-3 text-[#cc4400]">Проблема сейчас</h3>
                <p className="text-[#555] mb-6">Система оценок часто демотивирует. Дети боятся получить «двойку», а не стремятся узнать новое.</p>
                <div className="space-y-3">
                  {[
                    { label: "Страх ошибиться", val: 89 },
                    { label: "Учёба из-под палки", val: 72 },
                    { label: "Тревожность из-за оценок", val: 68 },
                  ].map(item => (
                    <div key={item.label}>
                      <div className="flex justify-between text-sm mb-1"><span>{item.label}</span><span className="font-bold text-[#cc4400]">{item.val}%</span></div>
                      <div className="h-2.5 bg-white rounded-full overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-[#FF6B35] to-[#FF4757]" style={{ width: `${item.val}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimBlock>

            <AnimBlock delay={200}>
              <div className="bg-[#E8FBF3] rounded-3xl p-8 h-full">
                <div className="text-4xl mb-4">🌱</div>
                <h3 className="text-xl font-bold mb-3 text-[#008060]">Что предлагаем</h3>
                <div className="space-y-4">
                  {[
                    { icon: "✅", title: "Качественные оценки в 5–6 классах", desc: "«Освоил» / «Старается» / «Надо поработать» вместо цифр" },
                    { icon: "🏆", title: "Система накопления баллов", desc: "Зачёт/незачёт по каждому блоку тем — без страха провала" },
                    { icon: "🤝", title: "Оценка soft skills", desc: "Командная работа, креативность, критическое мышление" },
                    { icon: "📈", title: "Прогресс относительно себя", desc: "Сравниваем «я вчера» и «я сегодня», а не с классом" },
                  ].map(p => (
                    <div key={p.title} className="flex gap-3">
                      <span className="text-xl mt-0.5">{p.icon}</span>
                      <div>
                        <div className="font-semibold text-sm">{p.title}</div>
                        <div className="text-xs text-[#555] mt-0.5">{p.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimBlock>
          </div>

          {/* Grade comparison table */}
          <AnimBlock delay={150}>
            <h3 className="text-2xl font-bold mb-6">Сравнение систем оценивания</h3>
            <div className="overflow-x-auto rounded-2xl border border-[#f0e8d8] shadow-md">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#1a1a2e] text-white">
                    <th className="text-left px-5 py-4 font-semibold">Критерий</th>
                    <th className="text-center px-5 py-4 font-semibold">⚠️ Сейчас</th>
                    <th className="text-center px-5 py-4 font-semibold text-[#00C896]">✅ Предложение</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Что оценивается", "Только знания из учебника", "Знания + навыки + прогресс"],
                    ["Эмоциональный климат", "Тревога, страх ошибки", "Безопасность, интерес"],
                    ["Мотивация", "Внешняя (оценка ради оценки)", "Внутренняя (учёба ради знаний)"],
                    ["Фокус сравнения", "С другими учениками", "С самим собой вчерашним"],
                    ["Форма для 5–6 кл.", "Цифровые отметки 1–5", "Качественная характеристика"],
                    ["Учёт soft skills", "Не учитывается", "Командная работа, креативность"],
                  ].map(([crit, now, prop], i) => (
                    <tr key={crit} className={i % 2 === 0 ? "bg-white" : "bg-[#FFFBF4]"}>
                      <td className="px-5 py-3 font-medium">{crit}</td>
                      <td className="px-5 py-3 text-center text-[#cc4400]">{now}</td>
                      <td className="px-5 py-3 text-center text-[#008060] font-medium">{prop}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimBlock>

          {/* Soft skills diagram */}
          <AnimBlock delay={200} className="mt-12">
            <h3 className="text-2xl font-bold mb-6">Что оцениваем дополнительно: soft skills</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: "🤝", label: "Работа в команде", color: "#6B5CE7", bg: "#F0EDFF" },
                { icon: "💡", label: "Креативность", color: "#FFB800", bg: "#FFF8E0" },
                { icon: "🔍", label: "Критическое мышление", color: "#00A884", bg: "#E0FBF3" },
                { icon: "🎤", label: "Презентация идей", color: "#FF6B35", bg: "#FFF0E8" },
                { icon: "⏱️", label: "Управление временем", color: "#0090D4", bg: "#E0F4FF" },
                { icon: "🧩", label: "Решение проблем", color: "#E05C9D", bg: "#FFE8F4" },
                { icon: "📚", label: "Самообучение", color: "#44A048", bg: "#E8F8E8" },
                { icon: "🌍", label: "Эмпатия", color: "#FF8C00", bg: "#FFF4E0" },
              ].map(s => (
                <div key={s.label} className="rounded-2xl p-4 flex flex-col items-center text-center gap-2 border-2 transition-all hover:scale-105" style={{ background: s.bg, borderColor: s.color + "40" }}>
                  <span className="text-3xl">{s.icon}</span>
                  <span className="text-xs font-semibold leading-tight" style={{ color: s.color }}>{s.label}</span>
                </div>
              ))}
            </div>
          </AnimBlock>

          <AnimBlock delay={300} className="mt-10">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#1a1a2e] to-[#2d2d5e] text-white p-8 flex flex-col md:flex-row items-center gap-8">
              <img src={IMG_GRADES} alt="Мотивация" className="w-48 h-48 object-cover rounded-2xl flex-shrink-0" />
              <div>
                <p className="font-caveat text-2xl text-[#FFB800] mb-3">"Каждый шаг вперёд — это победа"</p>
                <p className="text-[#ccc] leading-relaxed">Когда ученик видит собственный прогресс — он хочет двигаться дальше. Система накопления баллов превращает учёбу в игру достижений, а не в гонку за оценками.</p>
              </div>
            </div>
          </AnimBlock>
        </div>
      </section>

      {/* SCHEDULE SECTION */}
      <section id="schedule" className="py-24 bg-[#F0F4FF] relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#C8E8FF]/60 blur-3xl pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4">
          <AnimBlock>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#0090D4] flex items-center justify-center">
                <Icon name="Clock" size={20} className="text-white" />
              </div>
              <span className="text-sm font-bold text-[#0090D4] uppercase tracking-widest">Раздел 3</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-3">Расписание и нагрузка</h2>
            <p className="text-xl text-[#0090D4] font-caveat mb-12">«Больше сна и свободы»</p>
          </AnimBlock>

          {/* Sleep timeline */}
          <AnimBlock delay={100} className="mb-12">
            <h3 className="text-2xl font-bold mb-6">Режим дня: сейчас vs предложение</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "⚠️ Сейчас", bg: "bg-white border border-[#fdd]",
                  items: [
                    { time: "06:30", label: "Подъём — темно, не выспался", color: "#FF4757" },
                    { time: "07:30", label: "Дорога в школу (полусон)", color: "#FF6B35" },
                    { time: "08:00", label: "Первый урок — мозг ещё спит", color: "#FFB800" },
                    { time: "14:00", label: "Конец уроков, но нет сил", color: "#888" },
                    { time: "21:00", label: "Домашнее задание в мессенджер", color: "#FF4757" },
                    { time: "23:00", label: "Засыпает — цикл повторяется", color: "#555" },
                  ]
                },
                {
                  title: "✅ Предложение", bg: "bg-[#E8FBF3] border border-[#b3edd9]",
                  items: [
                    { time: "07:30", label: "Спокойный подъём, завтрак", color: "#00A884" },
                    { time: "08:30", label: "Дорога в школу (бодрый)", color: "#44A048" },
                    { time: "09:00", label: "Первый урок — мозг включён!", color: "#00C896" },
                    { time: "15:00", label: "Конец уроков, есть силы", color: "#0090D4" },
                    { time: "до 18:00", label: "Домашнее задание в школе/онлайн", color: "#6B5CE7" },
                    { time: "22:00", label: "Крепкий сон — 9+ часов", color: "#00C896" },
                  ]
                }
              ].map(col => (
                <div key={col.title} className={`rounded-2xl p-6 ${col.bg}`}>
                  <h4 className="font-bold text-lg mb-5">{col.title}</h4>
                  <div className="space-y-3">
                    {col.items.map(item => (
                      <div key={item.time} className="flex gap-3 items-start">
                        <span className="text-xs font-mono font-bold w-16 flex-shrink-0 mt-0.5 text-[#888]">{item.time}</span>
                        <div className="flex-1 flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full flex-shrink-0 mt-0.5" style={{ background: item.color }} />
                          <span className="text-sm">{item.label}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </AnimBlock>

          {/* 3 proposals */}
          <AnimBlock delay={150} className="mb-12">
            <h3 className="text-2xl font-bold mb-6">Три конкретных предложения</h3>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                {
                  num: "01", icon: "🌅", color: "#FFB800", bg: "#FFFBE8",
                  title: "Начало в 9:00–9:30",
                  points: ["Подростки биологически засыпают позже", "Исследования: +1 час сна = +17% успеваемость", "Мозг активен с 9:00, не с 8:00"],
                  tag: "Наука подтверждает"
                },
                {
                  num: "02", icon: "⏱️", color: "#6B5CE7", bg: "#F0EDFF",
                  title: "Бинарные уроки (парами)",
                  points: ["90 мин глубокого погружения в тему", "Нет постоянного переключения каждые 40 мин", "Формат как в университете — готовит к взрослой жизни"],
                  tag: "Международный опыт"
                },
                {
                  num: "03", icon: "📵", color: "#00A884", bg: "#E8FBF3",
                  title: "Цифровой детокс после 18:00",
                  points: ["Запрет на задания в мессенджеры после 18:00", "Вечер — время для семьи и отдыха", "Снижение тревожности у детей и родителей"],
                  tag: "Права ребёнка"
                },
              ].map(p => (
                <div key={p.num} className={`rounded-3xl p-6 ${p.bg} border-2`} style={{ borderColor: p.color + "30" }}>
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-4xl">{p.icon}</span>
                    <span className="text-xs font-bold px-2 py-1 rounded-full text-white" style={{ background: p.color }}>{p.tag}</span>
                  </div>
                  <div className="font-black text-5xl mb-2" style={{ color: p.color + "30" }}>{p.num}</div>
                  <h4 className="font-bold text-lg mb-3" style={{ color: p.color }}>{p.title}</h4>
                  <ul className="space-y-2">
                    {p.points.map(pt => (
                      <li key={pt} className="text-sm text-[#444] flex gap-2">
                        <span style={{ color: p.color }}>→</span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </AnimBlock>

          <AnimBlock delay={200}>
            <div className="rounded-3xl overflow-hidden grid md:grid-cols-2 shadow-xl">
              <img src={IMG_SLEEP} alt="Расписание" className="w-full h-64 md:h-auto object-cover" />
              <div className="bg-[#1a1a2e] text-white p-8 flex flex-col justify-center">
                <p className="font-caveat text-2xl text-[#FFB800] mb-4">Факт о подростковом сне</p>
                <p className="text-[#ccc] mb-6 leading-relaxed">Подростки биологически запрограммированы засыпать позже взрослых. Ранние уроки — это как заставить взрослого начинать работу в 5 утра.</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-xl p-4">
                    <div className="text-2xl font-black text-[#FFB800]">9–10 ч</div>
                    <div className="text-xs text-[#aaa]">нужно сна подростку</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <div className="text-2xl font-black text-[#00C896]">6.5 ч</div>
                    <div className="text-xs text-[#aaa]">получает в среднем</div>
                  </div>
                </div>
              </div>
            </div>
          </AnimBlock>
        </div>
      </section>

      {/* EXAMPLES SECTION */}
      <section id="examples" className="py-24 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <AnimBlock>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#6B5CE7] flex items-center justify-center">
                <Icon name="Globe" size={20} className="text-white" />
              </div>
              <span className="text-sm font-bold text-[#6B5CE7] uppercase tracking-widest">Раздел 4</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-3">Примеры реализации</h2>
            <p className="text-xl text-[#6B5CE7] font-caveat mb-12">«Это уже работает в мире»</p>
          </AnimBlock>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {[
              {
                flag: "🇫🇮", country: "Финляндия",
                headline: "Лучшая система образования в мире",
                points: ["Никаких стандартизированных тестов до 16 лет", "Акцент на сотрудничество, не конкуренцию", "Больше перерывов — 15 мин отдыха после каждых 45 мин"],
                result: "1-е место в мировых рейтингах образования",
                color: "#00A884"
              },
              {
                flag: "🇳🇱", country: "Нидерланды",
                headline: "Школы без звонков",
                points: ["Ученики сами планируют свой учебный день", "Проектное обучение вместо предметного", "Оценки заменены на «портфолио достижений»"],
                result: "Высокий уровень мотивации и самостоятельности",
                color: "#FF6B35"
              },
              {
                flag: "🇯🇵", country: "Япония",
                headline: "Развитие характера",
                points: ["«Токкацу» — время для развития soft skills", "Ученики убирают школу сами — ответственность", "Нет деления на «умных» и «глупых»"],
                result: "Один из самых низких уровней школьного буллинга",
                color: "#6B5CE7"
              },
              {
                flag: "🇸🇪", country: "Швеция",
                headline: "Права ребёнка в школе",
                points: ["Законодательный запрет на домашние задания в выходные", "Школьный омбудсмен — защитник прав ученика", "Свободный выбор предметов с 7 класса"],
                result: "Уровень стресса у школьников — один из самых низких в ЕС",
                color: "#FFB800"
              },
            ].map(ex => (
              <AnimBlock key={ex.country} delay={100}>
                <div className="bg-white rounded-3xl p-6 shadow-md border border-[#f0e8d8] hover:shadow-xl transition-shadow h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl">{ex.flag}</span>
                    <div>
                      <div className="font-black text-lg">{ex.country}</div>
                      <div className="text-sm text-[#888]">{ex.headline}</div>
                    </div>
                  </div>
                  <ul className="space-y-2 mb-5">
                    {ex.points.map(pt => (
                      <li key={pt} className="text-sm text-[#444] flex gap-2">
                        <span style={{ color: ex.color }} className="mt-0.5">✓</span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <div className="bg-[#FFFBF4] rounded-xl px-4 py-3 flex items-start gap-2 border-l-4" style={{ borderColor: ex.color }}>
                    <Icon name="TrendingUp" size={14} className="mt-0.5 flex-shrink-0" style={{ color: ex.color }} />
                    <span className="text-sm font-semibold" style={{ color: ex.color }}>{ex.result}</span>
                  </div>
                </div>
              </AnimBlock>
            ))}
          </div>

          {/* Implementation plan */}
          <AnimBlock delay={150}>
            <h3 className="text-2xl font-bold mb-6">Как внедрить: поэтапный план</h3>
            <div className="space-y-4">
              {[
                { phase: "Этап 1", time: "1 год", title: "Пилот в 3–5 школах", desc: "Запустить эксперимент с качественными оценками в 5–6 кл. и сдвигом начала уроков в нескольких школах. Собрать данные.", color: "#FFB800" },
                { phase: "Этап 2", time: "2 год", title: "Анализ и доработка", desc: "Изучить результаты пилота. Сравнить успеваемость, уровень стресса, мотивацию. Доработать модель на основе обратной связи.", color: "#FF6B35" },
                { phase: "Этап 3", time: "3–5 лет", title: "Масштабирование", desc: "Распространить успешные практики на все школы региона. Принять нормативную базу. Обучить педагогов новым методам.", color: "#00C896" },
              ].map(ph => (
                <div key={ph.phase} className="flex gap-4 items-start bg-white rounded-2xl p-5 shadow-sm border border-[#f0e8d8]">
                  <div className="flex-shrink-0 w-16 h-16 rounded-2xl flex flex-col items-center justify-center text-white" style={{ background: ph.color }}>
                    <span className="text-xs font-bold">{ph.phase}</span>
                    <span className="text-xs">{ph.time}</span>
                  </div>
                  <div>
                    <div className="font-bold mb-1">{ph.title}</div>
                    <div className="text-sm text-[#666]">{ph.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </AnimBlock>
        </div>
      </section>

      {/* RESULTS SECTION */}
      <section id="results" className="py-24 bg-[#1a1a2e] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#6B5CE7]/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[#00C896]/10 blur-3xl pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4">
          <AnimBlock>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#00C896] flex items-center justify-center">
                <Icon name="TrendingUp" size={20} className="text-white" />
              </div>
              <span className="text-sm font-bold text-[#00C896] uppercase tracking-widest">Раздел 5</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-3">Ожидаемые результаты</h2>
            <p className="text-xl text-[#00C896] font-caveat mb-12">«Что изменится для каждого из нас»</p>
          </AnimBlock>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              {
                icon: "🎓", title: "Для учеников",
                items: [{ label: "Уровень тревожности", before: 78, after: 30, unit: "%" }, { label: "Желание учиться", before: 42, after: 80, unit: "%" }, { label: "Качество сна", before: 55, after: 82, unit: "%" }],
                color: "#FFB800"
              },
              {
                icon: "👩‍🏫", title: "Для учителей",
                items: [{ label: "Вовлечённость учеников", before: 45, after: 75, unit: "%" }, { label: "Удовлетворённость работой", before: 52, after: 78, unit: "%" }, { label: "Дисциплина в классе", before: 60, after: 80, unit: "%" }],
                color: "#6B5CE7"
              },
              {
                icon: "👪", title: "Для семей",
                items: [{ label: "Конфликты из-за оценок", before: 65, after: 20, unit: "%" }, { label: "Вечернее время вместе", before: 30, after: 70, unit: "%" }, { label: "Стресс в семье", before: 70, after: 25, unit: "%" }],
                color: "#FF6B35"
              },
            ].map(grp => (
              <AnimBlock key={grp.title} delay={100}>
                <div className="bg-white/5 backdrop-blur rounded-3xl p-6 border border-white/10">
                  <div className="text-3xl mb-2">{grp.icon}</div>
                  <h3 className="font-bold text-xl mb-6">{grp.title}</h3>
                  <div className="space-y-5">
                    {grp.items.map(item => (
                      <div key={item.label}>
                        <div className="flex justify-between text-xs mb-2 text-[#aaa]">
                          <span>{item.label}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full rounded-full bg-white/30" style={{ width: `${item.before}%` }} />
                          </div>
                          <span className="text-xs text-[#888] w-8">{item.before}%</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${item.after}%`, background: grp.color }} />
                          </div>
                          <span className="text-xs font-bold w-8" style={{ color: grp.color }}>{item.after}%</span>
                        </div>
                        <div className="flex gap-4 mt-1 text-[10px] text-[#666]">
                          <span>⬛ до изменений</span>
                          <span style={{ color: grp.color }}>▬ после изменений</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimBlock>
            ))}
          </div>

          <AnimBlock delay={200}>
            <h3 className="text-2xl font-bold mb-6">Ключевые метрики через 3 года</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { val: "−40%", label: "Уровень школьной тревожности", color: "#FF6B35" },
                { val: "+35%", label: "Желание учиться и посещаемость", color: "#00C896" },
                { val: "×2", label: "Больше времени на сон у подростков", color: "#FFB800" },
                { val: "+50%", label: "Участие в кружках и проектах", color: "#6B5CE7" },
              ].map(m => (
                <div key={m.val} className="bg-white/5 rounded-2xl p-5 border border-white/10 text-center">
                  <div className="text-3xl font-black mb-2" style={{ color: m.color }}>{m.val}</div>
                  <div className="text-xs text-[#aaa] leading-tight">{m.label}</div>
                </div>
              ))}
            </div>
          </AnimBlock>
        </div>
      </section>

      {/* CONCLUSION */}
      <section id="conclusion" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-[#FFE0CC]/50 blur-3xl" />
          <div className="absolute bottom-10 left-10 w-72 h-72 rounded-full bg-[#C8F0E0]/50 blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <AnimBlock>
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#FF6B35] flex items-center justify-center">
                <Icon name="Award" size={20} className="text-white" />
              </div>
              <span className="text-sm font-bold text-[#FF6B35] uppercase tracking-widest">Раздел 6</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6">Выводы</h2>
            <p className="text-xl text-[#ff6b35] font-caveat mb-12">«Школа будущего — начинается сегодня»</p>
          </AnimBlock>

          <div className="grid md:grid-cols-3 gap-5 mb-12 text-left">
            {[
              { icon: "🌟", title: "Это реально", desc: "Финляндия, Нидерланды, Швеция уже доказали — другая школа работает. Мы можем взять лучшее оттуда.", color: "#FFB800" },
              { icon: "💪", title: "Мы готовы", desc: "Ученики и учителя хотят перемен. Небольшой шаг — пилотный проект — может дать результаты уже через год.", color: "#00C896" },
              { icon: "🚀", title: "Начнём прямо сейчас", desc: "Предлагаем школе присоединиться к эксперименту. Первый шаг — обсуждение на совете школы с родителями и учениками.", color: "#6B5CE7" },
            ].map(c => (
              <AnimBlock key={c.title} delay={100}>
                <div className="bg-white rounded-2xl p-6 shadow-md border border-[#f0e8d8] h-full">
                  <span className="text-3xl mb-3 block">{c.icon}</span>
                  <h3 className="font-bold text-lg mb-2" style={{ color: c.color }}>{c.title}</h3>
                  <p className="text-sm text-[#555] leading-relaxed">{c.desc}</p>
                </div>
              </AnimBlock>
            ))}
          </div>

          <AnimBlock delay={200}>
            <div className="bg-gradient-to-br from-[#ff6b35] to-[#FFB800] rounded-3xl p-10 text-white">
              <p className="font-caveat text-3xl mb-4">Наш призыв к действию</p>
              <p className="text-lg mb-8 text-white/90 leading-relaxed max-w-2xl mx-auto">
                Давайте вместе обсудим эти предложения. Каждое мнение важно — ученика, учителя, родителя. Школа — это наше общее дело.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {["💬 Обсудить на классном часе", "📋 Вынести на совет школы", "🗳️ Провести голосование"].map(a => (
                  <span key={a} className="bg-white/20 backdrop-blur rounded-full px-5 py-2.5 text-sm font-semibold">{a}</span>
                ))}
              </div>
            </div>
          </AnimBlock>

          {/* Summary table */}
          <AnimBlock delay={250} className="mt-12 text-left">
            <h3 className="text-2xl font-bold mb-5 text-center">Итоговая таблица предложений</h3>
            <div className="rounded-2xl overflow-hidden shadow-lg border border-[#f0e8d8]">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#ff6b35] text-white">
                    <th className="text-left px-5 py-3.5 font-semibold">Предложение</th>
                    <th className="text-left px-5 py-3.5 font-semibold hidden md:table-cell">Блок</th>
                    <th className="text-left px-5 py-3.5 font-semibold hidden md:table-cell">Кому выгодно</th>
                    <th className="text-center px-5 py-3.5 font-semibold">Сложность</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Качественные оценки в 5–6 кл.", "Оценки", "Ученики, учителя", "⭐⭐"],
                    ["Накопление баллов по блокам", "Оценки", "Ученики", "⭐⭐⭐"],
                    ["Оценка soft skills", "Оценки", "Ученики, работодатели", "⭐⭐⭐"],
                    ["Начало уроков с 9:00", "Расписание", "Все участники", "⭐⭐"],
                    ["Бинарные (парные) уроки", "Расписание", "Ученики, учителя", "⭐⭐⭐"],
                    ["Запрет ДЗ в мессенджеры после 18:00", "Расписание", "Ученики, семьи", "⭐"],
                  ].map(([prop, block, who, diff], i) => (
                    <tr key={prop} className={i % 2 === 0 ? "bg-white" : "bg-[#FFFBF4]"}>
                      <td className="px-5 py-3 font-medium">{prop}</td>
                      <td className="px-5 py-3 text-[#888] hidden md:table-cell">{block}</td>
                      <td className="px-5 py-3 text-[#555] hidden md:table-cell">{who}</td>
                      <td className="px-5 py-3 text-center">{diff}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimBlock>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1a1a2e] text-[#888] text-center py-8">
        <p className="font-caveat text-xl text-[#ff6b35] mb-2">Школа 2.0 — Проект учеников 5–9 классов</p>
        <p className="text-sm">Предложения об изменении системы образования в основной школе · 2026</p>
      </footer>
    </div>
  );
}