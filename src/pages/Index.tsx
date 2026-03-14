import { useState, useEffect, useCallback } from "react";
import Icon from "@/components/ui/icon";

const IMG_KIDS = "https://cdn.poehali.dev/projects/ce22b72c-c626-41ae-a643-1c44eeeed17e/files/6455abbc-9baf-4622-97a5-9e30e196fbc7.jpg";
const IMG_GRADES = "https://cdn.poehali.dev/projects/ce22b72c-c626-41ae-a643-1c44eeeed17e/files/23f4ccab-830d-4b3c-9763-ff847ed985e2.jpg";
const IMG_SLEEP = "https://cdn.poehali.dev/projects/ce22b72c-c626-41ae-a643-1c44eeeed17e/files/4e3b13bb-46ba-43bc-a8b8-84da26227b3b.jpg";

const SLIDES = [
  { id: "intro", label: "Введение" },
  { id: "grades", label: "Оценки" },
  { id: "schedule", label: "Расписание" },
  { id: "examples", label: "Примеры" },
  { id: "results", label: "Результаты" },
  { id: "conclusion", label: "Выводы" },
];

// ─── Слайд 1: Введение ────────────────────────────────────────────────────────
function SlideIntro() {
  return (
    <div className="relative w-full h-full flex flex-col justify-center overflow-hidden bg-[#FFFBF4]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full bg-[#FFE0CC] opacity-40 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#C8F0E0] opacity-30 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#FFF0B3] opacity-20 blur-3xl" />
      </div>
      <div className="relative max-w-6xl mx-auto px-6 w-full grid md:grid-cols-2 gap-10 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-[#ff6b35]/10 text-[#ff6b35] px-4 py-1.5 rounded-full text-sm font-semibold mb-5">
            <Icon name="BookOpen" size={14} />
            Проект · 5–9 классы
          </div>
          <h1 className="text-4xl md:text-5xl font-black leading-tight mb-5 text-[#1a1a2e]">
            Предложения<br />
            <span className="text-[#ff6b35]">по изменению</span><br />
            системы образования
          </h1>
          <p className="text-base text-[#555] mb-6 leading-relaxed max-w-md">
            Как сделать школу местом, куда хочется идти — без страха, усталости и скуки. Конкретные идеи от учеников.
          </p>
          <div className="flex flex-wrap gap-3 mb-6">
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { val: "73%", label: "боятся оценок", color: "#FF4757" },
              { val: "6:30", label: "подъём утром", color: "#FF6B35" },
              { val: "8+", label: "уроков в день", color: "#FFB800" },
              { val: "85%", label: "хотят свой темп", color: "#00C896" },
            ].map(s => (
              <div key={s.val} className="bg-white rounded-2xl p-3 shadow-md border border-[#f0e8d8]">
                <div className="text-2xl font-black mb-0.5" style={{ color: s.color }}>{s.val}</div>
                <div className="text-[10px] text-[#777] leading-tight">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative hidden md:block">
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
    </div>
  );
}

// ─── Слайд 2: Оценки ─────────────────────────────────────────────────────────
function SlideGrades() {
  return (
    <div className="relative w-full h-full flex flex-col justify-center overflow-hidden bg-[#FFFBF4]">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#FFE0B3]/40 blur-3xl pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6 w-full overflow-y-auto max-h-full py-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-xl bg-[#FFB800] flex items-center justify-center flex-shrink-0">
            <Icon name="Star" size={18} className="text-white" />
          </div>
          <span className="text-sm font-bold text-[#FFB800] uppercase tracking-widest">Раздел 2</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-black mb-1">Оценки и мотивация</h2>
        <p className="text-lg text-[#ff6b35] font-caveat mb-6">«Учиться без страха»</p>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-[#FFF3E0] rounded-3xl p-6">
            <div className="text-3xl mb-3">😰</div>
            <h3 className="text-lg font-bold mb-2 text-[#cc4400]">Проблема сейчас</h3>
            <p className="text-[#555] text-sm mb-4">Дети боятся получить «двойку», а не стремятся узнать новое.</p>
            <div className="space-y-2.5">
              {[
                { label: "Страх ошибиться", val: 89 },
                { label: "Учёба из-под палки", val: 72 },
                { label: "Тревожность из-за оценок", val: 68 },
              ].map(item => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs mb-1"><span>{item.label}</span><span className="font-bold text-[#cc4400]">{item.val}%</span></div>
                  <div className="h-2 bg-white rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-[#FF6B35] to-[#FF4757]" style={{ width: `${item.val}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#E8FBF3] rounded-3xl p-6">
            <div className="text-3xl mb-3">🌱</div>
            <h3 className="text-lg font-bold mb-2 text-[#008060]">Что предлагаем</h3>
            <div className="space-y-3">
              {[
                { icon: "✅", title: "Качественные оценки в 5–6 кл.", desc: "«Освоил» / «Старается» / «Надо поработать»" },
                { icon: "🏆", title: "Накопление баллов по блокам", desc: "Зачёт/незачёт — без страха провала" },
                { icon: "🤝", title: "Оценка soft skills", desc: "Командная работа, креативность, мышление" },
                { icon: "📈", title: "Прогресс относительно себя", desc: "«Я вчера» vs «Я сегодня», а не vs класс" },
              ].map(p => (
                <div key={p.title} className="flex gap-2">
                  <span className="text-lg mt-0.5">{p.icon}</span>
                  <div>
                    <div className="font-semibold text-sm">{p.title}</div>
                    <div className="text-xs text-[#555]">{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-3">
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
            <div key={s.label} className="rounded-xl p-3 flex items-center gap-2 border-2" style={{ background: s.bg, borderColor: s.color + "40" }}>
              <span className="text-xl">{s.icon}</span>
              <span className="text-xs font-semibold leading-tight" style={{ color: s.color }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Слайд 3: Расписание ─────────────────────────────────────────────────────
function SlideSchedule() {
  return (
    <div className="relative w-full h-full flex flex-col justify-center overflow-hidden bg-[#F0F4FF]">
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#C8E8FF]/60 blur-3xl pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6 w-full overflow-y-auto max-h-full py-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-xl bg-[#0090D4] flex items-center justify-center flex-shrink-0">
            <Icon name="Clock" size={18} className="text-white" />
          </div>
          <span className="text-sm font-bold text-[#0090D4] uppercase tracking-widest">Раздел 3</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-black mb-1">Расписание и нагрузка</h2>
        <p className="text-lg text-[#0090D4] font-caveat mb-6">«Больше сна и свободы»</p>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {[
            {
              title: "⚠️ Сейчас", bg: "bg-white border border-[#fdd]",
              items: [
                { time: "06:30", label: "Подъём — темно, не выспался", color: "#FF4757" },
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
                { time: "09:00", label: "Первый урок — мозг включён!", color: "#00C896" },
                { time: "15:00", label: "Конец уроков, есть силы", color: "#0090D4" },
                { time: "до 18:00", label: "Домашнее задание онлайн", color: "#6B5CE7" },
                { time: "22:00", label: "Крепкий сон — 9+ часов", color: "#00C896" },
              ]
            }
          ].map(col => (
            <div key={col.title} className={`rounded-2xl p-5 ${col.bg}`}>
              <h4 className="font-bold text-base mb-4">{col.title}</h4>
              <div className="space-y-2.5">
                {col.items.map(item => (
                  <div key={item.time} className="flex gap-3 items-start">
                    <span className="text-xs font-mono font-bold w-16 flex-shrink-0 mt-0.5 text-[#888]">{item.time}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: item.color }} />
                      <span className="text-sm">{item.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {[
            { num: "01", icon: "🌅", color: "#FFB800", bg: "#FFFBE8", title: "Начало в 9:00–9:30", points: ["Подростки засыпают позже биологически", "+1 час сна = +17% успеваемость", "Мозг активен с 9:00, не с 8:00"] },
            { num: "02", icon: "⏱️", color: "#6B5CE7", bg: "#F0EDFF", title: "Бинарные уроки (парами)", points: ["90 мин глубокого погружения", "Нет постоянного переключения", "Формат как в университете"] },
            { num: "03", icon: "📵", color: "#00A884", bg: "#E8FBF3", title: "Цифровой детокс после 18:00", points: ["Запрет на задания в мессенджеры", "Вечер — время для семьи", "Снижение тревожности"] },
          ].map(p => (
            <div key={p.num} className={`rounded-2xl p-5 border-2`} style={{ background: p.bg, borderColor: p.color + "30" }}>
              <div className="text-2xl mb-2">{p.icon}</div>
              <h4 className="font-bold text-sm mb-2" style={{ color: p.color }}>{p.title}</h4>
              <ul className="space-y-1">
                {p.points.map(pt => (
                  <li key={pt} className="text-xs text-[#444] flex gap-1.5">
                    <span style={{ color: p.color }}>→</span>{pt}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Слайд 4: Примеры ────────────────────────────────────────────────────────
function SlideExamples() {
  return (
    <div className="relative w-full h-full flex flex-col justify-center overflow-hidden bg-[#FFFBF4]">
      <div className="max-w-6xl mx-auto px-6 w-full overflow-y-auto max-h-full py-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-xl bg-[#6B5CE7] flex items-center justify-center flex-shrink-0">
            <Icon name="Globe" size={18} className="text-white" />
          </div>
          <span className="text-sm font-bold text-[#6B5CE7] uppercase tracking-widest">Раздел 4</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-black mb-1">Примеры реализации</h2>
        <p className="text-lg text-[#6B5CE7] font-caveat mb-6">«Это уже работает в мире»</p>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {[
            { flag: "🇫🇮", country: "Финляндия", headline: "Лучшая система образования в мире", points: ["Никаких стандартизированных тестов до 16 лет", "Акцент на сотрудничество, не конкуренцию", "15 мин отдыха после каждых 45 мин"], result: "1-е место в мировых рейтингах образования", color: "#00A884" },
            { flag: "🇳🇱", country: "Нидерланды", headline: "Школы без звонков", points: ["Ученики сами планируют учебный день", "Проектное обучение вместо предметного", "Оценки заменены на «портфолио»"], result: "Высокий уровень мотивации и самостоятельности", color: "#FF6B35" },
            { flag: "🇯🇵", country: "Япония", headline: "Развитие характера", points: ["«Токкацу» — время для развития soft skills", "Ученики убирают школу сами", "Нет деления на «умных» и «глупых»"], result: "Один из самых низких уровней буллинга", color: "#6B5CE7" },
            { flag: "🇸🇪", country: "Швеция", headline: "Права ребёнка в школе", points: ["Законодательный запрет на ДЗ в выходные", "Школьный омбудсмен — защитник ученика", "Свободный выбор предметов с 7 класса"], result: "Уровень стресса — один из самых низких в ЕС", color: "#FFB800" },
          ].map(ex => (
            <div key={ex.country} className="bg-white rounded-2xl p-5 shadow-md border border-[#f0e8d8]">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{ex.flag}</span>
                <div>
                  <div className="font-black">{ex.country}</div>
                  <div className="text-xs text-[#888]">{ex.headline}</div>
                </div>
              </div>
              <ul className="space-y-1.5 mb-3">
                {ex.points.map(pt => (
                  <li key={pt} className="text-xs text-[#444] flex gap-1.5">
                    <span style={{ color: ex.color }}>✓</span>{pt}
                  </li>
                ))}
              </ul>
              <div className="bg-[#FFFBF4] rounded-lg px-3 py-2 flex items-start gap-2 border-l-4" style={{ borderColor: ex.color }}>
                <Icon name="TrendingUp" size={12} className="mt-0.5 flex-shrink-0" style={{ color: ex.color }} />
                <span className="text-xs font-semibold" style={{ color: ex.color }}>{ex.result}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          {[
            { phase: "Этап 1", time: "1 год", title: "Пилот в 3–5 школах", desc: "Качественные оценки в 5–6 кл. + сдвиг начала уроков. Собрать данные.", color: "#FFB800" },
            { phase: "Этап 2", time: "2 год", title: "Анализ и доработка", desc: "Изучить результаты. Сравнить успеваемость и мотивацию. Доработать модель.", color: "#FF6B35" },
            { phase: "Этап 3", time: "3–5 лет", title: "Масштабирование", desc: "Распространить на все школы региона. Принять нормативную базу.", color: "#00C896" },
          ].map(ph => (
            <div key={ph.phase} className="flex gap-4 items-center bg-white rounded-xl p-4 shadow-sm border border-[#f0e8d8]">
              <div className="flex-shrink-0 w-14 h-14 rounded-xl flex flex-col items-center justify-center text-white text-xs font-bold" style={{ background: ph.color }}>
                <span>{ph.phase}</span>
                <span className="font-normal">{ph.time}</span>
              </div>
              <div>
                <div className="font-bold text-sm">{ph.title}</div>
                <div className="text-xs text-[#666]">{ph.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Слайд 5: Результаты ─────────────────────────────────────────────────────
function SlideResults() {
  return (
    <div className="relative w-full h-full flex flex-col justify-center overflow-hidden bg-[#1a1a2e] text-white">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#6B5CE7]/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[#00C896]/10 blur-3xl pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6 w-full overflow-y-auto max-h-full py-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-xl bg-[#00C896] flex items-center justify-center flex-shrink-0">
            <Icon name="TrendingUp" size={18} className="text-white" />
          </div>
          <span className="text-sm font-bold text-[#00C896] uppercase tracking-widest">Раздел 5</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-black mb-1">Ожидаемые результаты</h2>
        <p className="text-lg text-[#00C896] font-caveat mb-6">«Что изменится для каждого из нас»</p>

        <div className="grid md:grid-cols-3 gap-5 mb-6">
          {[
            { icon: "🎓", title: "Для учеников", items: [{ label: "Уровень тревожности", before: 78, after: 30 }, { label: "Желание учиться", before: 42, after: 80 }, { label: "Качество сна", before: 55, after: 82 }], color: "#FFB800" },
            { icon: "👩‍🏫", title: "Для учителей", items: [{ label: "Вовлечённость учеников", before: 45, after: 75 }, { label: "Удовлетворённость работой", before: 52, after: 78 }, { label: "Дисциплина в классе", before: 60, after: 80 }], color: "#6B5CE7" },
            { icon: "👪", title: "Для семей", items: [{ label: "Конфликты из-за оценок", before: 65, after: 20 }, { label: "Вечернее время вместе", before: 30, after: 70 }, { label: "Стресс в семье", before: 70, after: 25 }], color: "#FF6B35" },
          ].map(grp => (
            <div key={grp.title} className="bg-white/5 backdrop-blur rounded-2xl p-5 border border-white/10">
              <div className="text-2xl mb-1">{grp.icon}</div>
              <h3 className="font-bold text-base mb-4">{grp.title}</h3>
              <div className="space-y-4">
                {grp.items.map(item => (
                  <div key={item.label}>
                    <div className="text-xs text-[#aaa] mb-1.5">{item.label}</div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full rounded-full bg-white/30" style={{ width: `${item.before}%` }} />
                      </div>
                      <span className="text-xs text-[#888] w-8">{item.before}%</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 h-2.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${item.after}%`, background: grp.color }} />
                      </div>
                      <span className="text-xs font-bold w-8" style={{ color: grp.color }}>{item.after}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { val: "−40%", label: "Уровень школьной тревожности", color: "#FF6B35" },
            { val: "+35%", label: "Желание учиться и посещаемость", color: "#00C896" },
            { val: "×2", label: "Больше времени на сон у подростков", color: "#FFB800" },
            { val: "+50%", label: "Участие в кружках и проектах", color: "#6B5CE7" },
          ].map(m => (
            <div key={m.val} className="bg-white/5 rounded-2xl p-4 border border-white/10 text-center">
              <div className="text-2xl font-black mb-1" style={{ color: m.color }}>{m.val}</div>
              <div className="text-[10px] text-[#aaa] leading-tight">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Слайд 6: Выводы ─────────────────────────────────────────────────────────
function SlideConclusion() {
  return (
    <div className="relative w-full h-full flex flex-col justify-center overflow-hidden bg-[#FFFBF4]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-[#FFE0CC]/50 blur-3xl" />
        <div className="absolute bottom-10 left-10 w-72 h-72 rounded-full bg-[#C8F0E0]/50 blur-3xl" />
      </div>
      <div className="max-w-5xl mx-auto px-6 w-full overflow-y-auto max-h-full py-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-xl bg-[#FF6B35] flex items-center justify-center flex-shrink-0">
            <Icon name="Award" size={18} className="text-white" />
          </div>
          <span className="text-sm font-bold text-[#FF6B35] uppercase tracking-widest">Раздел 6</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-black mb-1">Выводы</h2>
        <p className="text-lg text-[#ff6b35] font-caveat mb-6">«Школа будущего — начинается сегодня»</p>

        <div className="grid md:grid-cols-3 gap-4 mb-6 text-left">
          {[
            { icon: "🌟", title: "Это реально", desc: "Финляндия, Нидерланды, Швеция уже доказали — другая школа работает.", color: "#FFB800" },
            { icon: "💪", title: "Мы готовы", desc: "Небольшой шаг — пилотный проект — может дать результаты уже через год.", color: "#00C896" },
            { icon: "🚀", title: "Начнём прямо сейчас", desc: "Первый шаг — обсуждение на совете школы с родителями и учениками.", color: "#6B5CE7" },
          ].map(c => (
            <div key={c.title} className="bg-white rounded-2xl p-5 shadow-md border border-[#f0e8d8]">
              <span className="text-3xl mb-2 block">{c.icon}</span>
              <h3 className="font-bold mb-1" style={{ color: c.color }}>{c.title}</h3>
              <p className="text-sm text-[#555] leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-[#ff6b35] to-[#FFB800] rounded-3xl p-8 text-white mb-6">
          <p className="font-caveat text-2xl mb-3">Наш призыв к действию</p>
          <p className="text-sm mb-5 text-white/90 max-w-xl mx-auto">Давайте вместе обсудим эти предложения. Каждое мнение важно — ученика, учителя, родителя. Школа — это наше общее дело.</p>
          <div className="flex flex-wrap justify-center gap-3">
            {["💬 Обсудить на классном часе", "📋 Вынести на совет школы", "🗳️ Провести голосование"].map(a => (
              <span key={a} className="bg-white/20 backdrop-blur rounded-full px-4 py-2 text-sm font-semibold">{a}</span>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-[#f0e8d8] shadow-md text-left">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-[#ff6b35] text-white">
                <th className="text-left px-4 py-3 font-semibold">Предложение</th>
                <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Блок</th>
                <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Кому выгодно</th>
                <th className="text-center px-4 py-3 font-semibold">Сложность</th>
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
                  <td className="px-4 py-2.5 font-medium">{prop}</td>
                  <td className="px-4 py-2.5 text-[#888] hidden md:table-cell">{block}</td>
                  <td className="px-4 py-2.5 text-[#555] hidden md:table-cell">{who}</td>
                  <td className="px-4 py-2.5 text-center">{diff}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Главный компонент ────────────────────────────────────────────────────────
const SLIDE_COMPONENTS = [SlideIntro, SlideGrades, SlideSchedule, SlideExamples, SlideResults, SlideConclusion];

export default function Index() {
  const [current, setCurrent] = useState(0);
  const total = SLIDES.length;

  const goTo = useCallback((idx: number) => {
    if (idx >= 0 && idx < total) setCurrent(idx);
  }, [total]);

  const goNext = useCallback(() => goTo(current + 1), [current, goTo]);
  const goPrev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") { e.preventDefault(); goNext(); }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); goPrev(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  const SlideComponent = SLIDE_COMPONENTS[current];

  return (
    <div className="font-golos text-[#1a1a2e] w-screen h-screen overflow-hidden relative select-none">

      {/* Верхняя навигация */}
      <nav className="absolute top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#f0e8d8] h-12 flex items-center px-4 justify-between">
        <span className="font-caveat text-lg text-[#ff6b35] font-bold">Школа 2.0</span>
        <div className="hidden md:flex gap-1">
          {SLIDES.map((s, i) => (
            <button key={s.id} onClick={() => goTo(i)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${current === i ? "bg-[#ff6b35] text-white" : "text-[#555] hover:bg-[#f5ede0]"}`}>
              {s.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#999] font-mono">{current + 1} / {total}</span>
        </div>
      </nav>

      {/* Слайд */}
      <div className="w-full h-full pt-12">
        <SlideComponent />
      </div>

      {/* Боковые точки-навигация */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2">
        {SLIDES.map((s, i) => (
          <button key={s.id} onClick={() => goTo(i)} title={s.label}
            className={`w-2.5 h-2.5 rounded-full transition-all border ${current === i ? "bg-[#ff6b35] border-[#ff6b35] scale-125" : "bg-white border-[#ccc] hover:border-[#ff6b35]"}`}
          />
        ))}
      </div>

      {/* Стрелки */}
      <button onClick={goPrev} disabled={current === 0}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-10 h-10 rounded-full bg-white shadow-lg border border-[#e0e0e0] flex items-center justify-center transition-all hover:bg-[#ff6b35] hover:border-[#ff6b35] hover:text-white disabled:opacity-20 disabled:cursor-not-allowed">
        <Icon name="ChevronLeft" size={20} />
      </button>
      <button onClick={goNext} disabled={current === total - 1}
        className="absolute right-12 top-1/2 -translate-y-1/2 z-50 w-10 h-10 rounded-full bg-white shadow-lg border border-[#e0e0e0] flex items-center justify-center transition-all hover:bg-[#ff6b35] hover:border-[#ff6b35] hover:text-white disabled:opacity-20 disabled:cursor-not-allowed">
        <Icon name="ChevronRight" size={20} />
      </button>

      {/* Нижняя полоса прогресса */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#f0e8d8] z-50">
        <div className="h-full bg-[#ff6b35] transition-all duration-500" style={{ width: `${((current + 1) / total) * 100}%` }} />
      </div>

      {/* Подсказка клавиш (только на первом слайде) */}
      {current === 0 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-black/40 backdrop-blur text-white text-xs px-4 py-2 rounded-full pointer-events-none">
          <Icon name="ArrowLeft" size={12} />
          <span>стрелки для навигации</span>
          <Icon name="ArrowRight" size={12} />
        </div>
      )}
    </div>
  );
}
