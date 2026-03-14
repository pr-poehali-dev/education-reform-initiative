import { useState, useEffect, useCallback } from "react";
import Icon from "@/components/ui/icon";
import PptxGenJS from "pptxgenjs";

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

// ─── Экспорт в PowerPoint ────────────────────────────────────────────────────
async function exportToPptx() {
  const pptx = new PptxGenJS();
  pptx.layout = "LAYOUT_WIDE";
  pptx.title = "Предложения по изменению системы образования";

  const ACCENT = "E85D26";
  const DARK = "1C2340";
  const LIGHT_BG = "FFF9F4";
  const GREEN = "1A9E78";
  const BLUE = "1976C8";
  const YELLOW = "D49B00";
  const PURPLE = "5B4BD4";

  // ── Слайд 1: Титульный ──
  {
    const sl = pptx.addSlide();
    sl.background = { color: LIGHT_BG };
    sl.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 0.18, h: 5.63, fill: { color: ACCENT } });
    sl.addText("ШКОЛА 2.0  ·  ПРОЕКТ УЧЕНИКОВ 5–9 КЛАССОВ", { x: 0.4, y: 0.35, w: 9, h: 0.4, fontFace: "Arial", fontSize: 10, bold: true, color: ACCENT, charSpacing: 3 });
    sl.addText("Предложения по изменению\nсистемы образования\nв основной школе (5–9 кл.)", { x: 0.4, y: 0.85, w: 5.5, h: 2.2, fontFace: "Arial", fontSize: 32, bold: true, color: DARK, lineSpacingMultiple: 1.2 });
    sl.addText("Как сделать школу местом, куда хочется идти —\nбез страха, усталости и скуки.", { x: 0.4, y: 3.15, w: 5.4, h: 0.75, fontFace: "Arial", fontSize: 12, color: "555555", lineSpacingMultiple: 1.4 });

    const stats = [{ v: "73%", l: "боятся оценок" }, { v: "6:30", l: "подъём утром" }, { v: "8+", l: "уроков в день" }, { v: "85%", l: "хотят свой темп" }];
    stats.forEach((s, i) => {
      const x = 0.4 + i * 1.5;
      sl.addShape(pptx.ShapeType.rect, { x, y: 4.05, w: 1.35, h: 0.75, fill: { color: "FFFFFF" }, line: { color: "E0D8D0", width: 1 }, rectRadius: 0.08 });
      sl.addText(s.v, { x, y: 4.1, w: 1.35, h: 0.35, fontFace: "Arial", fontSize: 16, bold: true, color: ACCENT, align: "center" });
      sl.addText(s.l, { x, y: 4.45, w: 1.35, h: 0.3, fontFace: "Arial", fontSize: 9, color: "888888", align: "center" });
    });

    try { sl.addImage({ path: IMG_KIDS, x: 6.3, y: 0.5, w: 3.3, h: 3.3, rounding: true }); } catch { /* skip */ }
  }

  // ── Слайд 2: Оценки — проблема и предложения ──
  {
    const sl = pptx.addSlide();
    sl.background = { color: LIGHT_BG };
    sl.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 0.18, h: 5.63, fill: { color: YELLOW } });
    sl.addShape(pptx.ShapeType.rect, { x: 0.18, y: 0, w: 9.82, h: 0.65, fill: { color: DARK } });
    sl.addText("РАЗДЕЛ 2  ·  ОЦЕНКИ И МОТИВАЦИЯ  ·  «Учиться без страха»", { x: 0.4, y: 0.1, w: 9, h: 0.45, fontFace: "Arial", fontSize: 11, bold: true, color: "FFFFFF", charSpacing: 2 });

    sl.addText("😰  Проблема сейчас", { x: 0.4, y: 0.8, w: 4.5, h: 0.4, fontFace: "Arial", fontSize: 15, bold: true, color: "B83000" });
    sl.addText("Дети боятся получить «двойку», а не стремятся узнать новое.", { x: 0.4, y: 1.25, w: 4.3, h: 0.5, fontFace: "Arial", fontSize: 11, color: "555555" });

    [{ l: "Страх ошибиться", v: 89, c: "CC2222" }, { l: "Учёба из-под палки", v: 72, c: "E05533" }, { l: "Тревожность из-за оценок", v: 68, c: "EDA844" }].forEach((b, i) => {
      const y = 1.85 + i * 0.72;
      sl.addText(b.l, { x: 0.4, y, w: 2.5, h: 0.28, fontFace: "Arial", fontSize: 10.5, color: "333333" });
      sl.addText(`${b.v}%`, { x: 2.95, y, w: 0.55, h: 0.28, fontFace: "Arial", fontSize: 10.5, bold: true, color: b.c });
      sl.addShape(pptx.ShapeType.rect, { x: 0.4, y: y + 0.3, w: 3.4, h: 0.16, fill: { color: "F0E8E0" }, rectRadius: 0.04 });
      sl.addShape(pptx.ShapeType.rect, { x: 0.4, y: y + 0.3, w: (3.4 * b.v) / 100, h: 0.16, fill: { color: b.c }, rectRadius: 0.04 });
    });

    sl.addText("🌱  Что предлагаем", { x: 5.1, y: 0.8, w: 4.6, h: 0.4, fontFace: "Arial", fontSize: 15, bold: true, color: GREEN });
    [{ icon: "✅", t: "Качественные оценки в 5–6 кл.", d: "«Освоил» / «Старается» / «Надо поработать»" }, { icon: "🏆", t: "Накопление баллов по блокам", d: "Зачёт/незачёт — без страха провала" }, { icon: "🤝", t: "Оценка soft skills", d: "Командная работа, креативность, мышление" }, { icon: "📈", t: "Прогресс относительно себя", d: "«Я вчера» vs «Я сегодня», не vs класс" }].forEach((p, i) => {
      const y = 1.35 + i * 0.88;
      sl.addShape(pptx.ShapeType.rect, { x: 5.0, y, w: 4.7, h: 0.75, fill: { color: "EBF9F3" }, line: { color: "A8E8CC", width: 0.8 }, rectRadius: 0.08 });
      sl.addText(`${p.icon}  ${p.t}\n${p.d}`, { x: 5.15, y: y + 0.06, w: 4.4, h: 0.63, fontFace: "Arial", fontSize: 10.5, color: "1C3A2E", lineSpacingMultiple: 1.3 });
    });
  }

  // ── Слайд 3: Таблица сравнения оценивания ──
  {
    const sl = pptx.addSlide();
    sl.background = { color: LIGHT_BG };
    sl.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 0.18, h: 5.63, fill: { color: YELLOW } });
    sl.addShape(pptx.ShapeType.rect, { x: 0.18, y: 0, w: 9.82, h: 0.65, fill: { color: DARK } });
    sl.addText("СРАВНЕНИЕ СИСТЕМ ОЦЕНИВАНИЯ", { x: 0.4, y: 0.1, w: 9, h: 0.45, fontFace: "Arial", fontSize: 11, bold: true, color: "FFFFFF", charSpacing: 2 });

    sl.addText("Что оцениваем дополнительно — soft skills:", { x: 0.4, y: 0.75, w: 9, h: 0.3, fontFace: "Arial", fontSize: 11, color: "666666", italic: true });

    const skills = [["🤝", "Работа в команде", PURPLE, "F0EDFF"], ["💡", "Креативность", YELLOW, "FFF8E0"], ["🔍", "Кр. мышление", GREEN, "E0FBF3"], ["🎤", "Презентация", ACCENT, "FFF0E8"], ["⏱️", "Тайм-менеджмент", BLUE, "E0F4FF"], ["🧩", "Реш. проблем", "C04488", "FFE8F4"], ["📚", "Самообучение", "3A8A3E", "E8F8E8"], ["🌍", "Эмпатия", "CC6600", "FFF4E0"]];
    skills.forEach((s, i) => {
      const col = i % 4; const row = Math.floor(i / 4);
      const x = 0.35 + col * 2.38; const y = 1.15 + row * 1.35;
      sl.addShape(pptx.ShapeType.rect, { x, y, w: 2.2, h: 1.15, fill: { color: s[3] }, line: { color: s[2] + "55", width: 1.2 }, rectRadius: 0.1 });
      sl.addText(s[0], { x, y: y + 0.07, w: 2.2, h: 0.52, fontFace: "Arial", fontSize: 26, align: "center" });
      sl.addText(s[1], { x, y: y + 0.62, w: 2.2, h: 0.42, fontFace: "Arial", fontSize: 10, bold: true, color: s[2], align: "center" });
    });

    const rows = [["Критерий", "⚠️ Сейчас", "✅ Предложение"], ["Что оценивается", "Только знания", "Знания + навыки + прогресс"], ["Мотивация", "Внешняя (оценка)", "Внутренняя (знания)"], ["Фокус сравнения", "С другими", "С собой вчерашним"], ["Форма для 5–6 кл.", "Цифры 1–5", "Качественная оценка"]];
    rows.forEach((row, ri) => {
      const y = 3.9 + ri * 0.33;
      const isH = ri === 0;
      [0, 1, 2].forEach((ci) => {
        sl.addShape(pptx.ShapeType.rect, { x: 0.35 + ci * 3.1, y, w: 3.0, h: 0.3, fill: { color: isH ? DARK : ri % 2 ? "FFFFFF" : "F5EDE5" }, line: { color: "E0D8D0", width: 0.5 } });
        sl.addText(row[ci], { x: 0.45 + ci * 3.1, y: y + 0.02, w: 2.8, h: 0.26, fontFace: "Arial", fontSize: isH ? 10 : 9.5, bold: isH, color: isH ? "FFFFFF" : ci === 1 ? "B83000" : ci === 2 ? "1A7A58" : DARK, valign: "middle" });
      });
    });
  }

  // ── Слайд 4: Расписание ──
  {
    const sl = pptx.addSlide();
    sl.background = { color: "F4F7FF" };
    sl.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 0.18, h: 5.63, fill: { color: BLUE } });
    sl.addShape(pptx.ShapeType.rect, { x: 0.18, y: 0, w: 9.82, h: 0.65, fill: { color: BLUE } });
    sl.addText("РАЗДЕЛ 3  ·  РАСПИСАНИЕ И НАГРУЗКА  ·  «Больше сна и свободы»", { x: 0.4, y: 0.1, w: 9, h: 0.45, fontFace: "Arial", fontSize: 11, bold: true, color: "FFFFFF", charSpacing: 2 });

    const cols = [
      { t: "⚠️ Сейчас", tc: "AA2200", bg: "FFFFFF", bd: "FFCCCC", items: [["06:30", "Подъём — темно, не выспался", "CC2222"], ["08:00", "Первый урок — мозг ещё спит", "DD6622"], ["14:00", "Конец уроков, нет сил", "888888"], ["21:00", "ДЗ в мессенджер вечером", "CC2222"], ["23:00", "Засыпает. Цикл повторяется", "555555"]] },
      { t: "✅ Предложение", tc: "1A7A58", bg: "EBF9F3", bd: "A8E8CC", items: [["07:30", "Спокойный подъём и завтрак", "1A7A58"], ["09:00", "Первый урок — мозг включён!", "00C896"], ["15:00", "Конец уроков, есть силы", "1976C8"], ["до 18:00", "ДЗ онлайн или в школе", PURPLE], ["22:00", "Крепкий сон — 9+ часов", "00C896"]] },
    ];
    cols.forEach((col, ci) => {
      const x = 0.35 + ci * 4.75;
      sl.addShape(pptx.ShapeType.rect, { x, y: 0.72, w: 4.5, h: 0.38, fill: { color: ci === 0 ? "FFE8E8" : "C8F0E0" }, rectRadius: 0.06 });
      sl.addText(col.t, { x, y: 0.76, w: 4.5, h: 0.3, fontFace: "Arial", fontSize: 12, bold: true, color: col.tc, align: "center" });
      col.items.forEach((item, ii) => {
        const y = 1.22 + ii * 0.83;
        sl.addShape(pptx.ShapeType.rect, { x, y, w: 4.5, h: 0.7, fill: { color: col.bg }, line: { color: col.bd, width: 0.8 }, rectRadius: 0.08 });
        sl.addText(item[0], { x: x + 0.1, y, w: 0.88, h: 0.7, fontFace: "Courier New", fontSize: 10, bold: true, color: "888888", valign: "middle" });
        sl.addShape(pptx.ShapeType.ellipse, { x: x + 1.05, y: y + 0.26, w: 0.18, h: 0.18, fill: { color: item[2] } });
        sl.addText(item[1], { x: x + 1.3, y, w: 3.05, h: 0.7, fontFace: "Arial", fontSize: 10.5, color: "333333", valign: "middle" });
      });
    });
  }

  // ── Слайд 5: Три предложения ──
  {
    const sl = pptx.addSlide();
    sl.background = { color: "F4F7FF" };
    sl.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 0.18, h: 5.63, fill: { color: BLUE } });
    sl.addShape(pptx.ShapeType.rect, { x: 0.18, y: 0, w: 9.82, h: 0.65, fill: { color: DARK } });
    sl.addText("ТРИ КОНКРЕТНЫХ ПРЕДЛОЖЕНИЯ ПО РАСПИСАНИЮ", { x: 0.4, y: 0.1, w: 9, h: 0.45, fontFace: "Arial", fontSize: 11, bold: true, color: "FFFFFF", charSpacing: 2 });

    [{ num: "01", icon: "🌅", color: YELLOW, bg: "FFFBE8", bd: "F0D888", t: "Начало уроков с 9:00–9:30", pts: ["Биологический ритм подростков требует больше сна", "+1 час сна = +17% к успеваемости (научные исследования)", "Мозг подростка активен с 9:00, а не с 8:00"] },
      { num: "02", icon: "⏱️", color: PURPLE, bg: "F0EDFF", bd: "C8C0F0", t: "Бинарные уроки (парами, 90 мин)", pts: ["Глубокое погружение в тему без спешки", "Нет постоянного переключения каждые 40 минут", "Формат как в университете — готовит к взрослой жизни"] },
      { num: "03", icon: "📵", color: GREEN, bg: "E8FBF3", bd: "A8E8CC", t: "Цифровой детокс после 18:00", pts: ["Законодательный запрет присылать ДЗ в мессенджеры", "Вечер — время для семьи и восстановления сил", "Снижает тревожность у учеников и родителей"] },
    ].forEach((p, i) => {
      const x = 0.35 + i * 3.15;
      sl.addShape(pptx.ShapeType.rect, { x, y: 0.78, w: 3.0, h: 4.72, fill: { color: p.bg }, line: { color: p.bd, width: 1.2 }, rectRadius: 0.12 });
      sl.addText(p.icon, { x, y: 0.9, w: 3.0, h: 0.65, fontFace: "Arial", fontSize: 32, align: "center" });
      sl.addText(p.num, { x, y: 1.55, w: 3.0, h: 0.55, fontFace: "Arial", fontSize: 34, bold: true, color: p.color + "44", align: "center" });
      sl.addText(p.t, { x: x + 0.15, y: 2.15, w: 2.7, h: 0.7, fontFace: "Arial", fontSize: 12, bold: true, color: p.color, align: "center", lineSpacingMultiple: 1.2 });
      p.pts.forEach((pt, pi) => {
        sl.addText("→  " + pt, { x: x + 0.2, y: 2.95 + pi * 0.65, w: 2.65, h: 0.55, fontFace: "Arial", fontSize: 10, color: "333333", lineSpacingMultiple: 1.2 });
      });
    });
  }

  // ── Слайд 6: Мировой опыт ──
  {
    const sl = pptx.addSlide();
    sl.background = { color: LIGHT_BG };
    sl.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 0.18, h: 5.63, fill: { color: PURPLE } });
    sl.addShape(pptx.ShapeType.rect, { x: 0.18, y: 0, w: 9.82, h: 0.65, fill: { color: PURPLE } });
    sl.addText("РАЗДЕЛ 4  ·  ПРИМЕРЫ РЕАЛИЗАЦИИ В МИРЕ", { x: 0.4, y: 0.1, w: 9, h: 0.45, fontFace: "Arial", fontSize: 11, bold: true, color: "FFFFFF", charSpacing: 2 });

    [{ f: "🇫🇮", n: "Финляндия", s: "Лучшая система в мире", c: GREEN, bg: "EBF9F3", bd: "A8E8CC", pts: ["Нет стандартизированных тестов до 16 лет", "Акцент на сотрудничество, не конкуренцию", "15 мин отдыха после каждых 45 мин"], r: "1-е место в мировых рейтингах образования" },
      { f: "🇳🇱", n: "Нидерланды", s: "Школы без звонков", c: ACCENT, bg: "FFF3EE", bd: "F8C8A8", pts: ["Ученики сами планируют учебный день", "Проектное обучение вместо предметного", "Оценки = «портфолио достижений»"], r: "Высокая мотивация и самостоятельность учеников" },
      { f: "🇯🇵", n: "Япония", s: "Развитие характера", c: "C04488", bg: "FFE8F4", bd: "E8A8CC", pts: ["«Токкацу» — урок для soft skills", "Нет деления на «умных» и «глупых»", "Ответственность через самоуправление"], r: "Один из самых низких уровней буллинга" },
      { f: "🇸🇪", n: "Швеция", s: "Права ребёнка", c: BLUE, bg: "E8F4FF", bd: "A8CCF0", pts: ["Законодательный запрет ДЗ в выходные", "Школьный омбудсмен — защитник ученика", "Свободный выбор предметов с 7 класса"], r: "Уровень стресса — один из самых низких в ЕС" },
    ].forEach((c, i) => {
      const col = i % 2; const row = Math.floor(i / 2);
      const x = 0.3 + col * 4.85; const y = 0.75 + row * 2.35;
      sl.addShape(pptx.ShapeType.rect, { x, y, w: 4.55, h: 2.18, fill: { color: c.bg }, line: { color: c.bd, width: 1 }, rectRadius: 0.1 });
      sl.addText(`${c.f}  ${c.n}`, { x: x + 0.15, y: y + 0.1, w: 4.2, h: 0.4, fontFace: "Arial", fontSize: 14, bold: true, color: DARK });
      sl.addText(c.s, { x: x + 0.15, y: y + 0.48, w: 4.2, h: 0.26, fontFace: "Arial", fontSize: 10, color: "888888", italic: true });
      c.pts.forEach((pt, pi) => { sl.addText("✓  " + pt, { x: x + 0.15, y: y + 0.8 + pi * 0.32, w: 4.1, h: 0.29, fontFace: "Arial", fontSize: 9.5, color: "333333" }); });
      sl.addShape(pptx.ShapeType.rect, { x: x + 0.15, y: y + 1.8, w: 4.1, h: 0.26, fill: { color: c.c }, rectRadius: 0.06 });
      sl.addText("▲  " + c.r, { x: x + 0.2, y: y + 1.81, w: 3.9, h: 0.24, fontFace: "Arial", fontSize: 9, bold: true, color: "FFFFFF", valign: "middle" });
    });
  }

  // ── Слайд 7: Поэтапный план ──
  {
    const sl = pptx.addSlide();
    sl.background = { color: LIGHT_BG };
    sl.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 0.18, h: 5.63, fill: { color: PURPLE } });
    sl.addShape(pptx.ShapeType.rect, { x: 0.18, y: 0, w: 9.82, h: 0.65, fill: { color: DARK } });
    sl.addText("КАК ВНЕДРИТЬ: ПОЭТАПНЫЙ ПЛАН", { x: 0.4, y: 0.1, w: 9, h: 0.45, fontFace: "Arial", fontSize: 11, bold: true, color: "FFFFFF", charSpacing: 2 });

    [{ phase: "Этап 1", time: "1 год", t: "Пилот в 3–5 школах", d: "Запустить эксперимент: качественные оценки в 5–6 кл. + сдвиг начала уроков. Сформировать контрольную группу. Фиксировать данные по успеваемости, мотивации и уровню стресса.", c: YELLOW, bg: "FFFBE8", bd: "F0D888" },
      { phase: "Этап 2", time: "2 год", t: "Анализ и доработка", d: "Изучить результаты пилота. Сравнить успеваемость, мотивацию, уровень стресса. Провести опросы учеников, учителей, родителей. Доработать модель.", c: ACCENT, bg: "FFF3EE", bd: "F8C8A8" },
      { phase: "Этап 3", time: "3–5 лет", t: "Масштабирование", d: "Распространить успешные практики на все школы региона. Принять нормативную базу. Провести подготовку педагогов. Интегрировать в стандарт ФГОС.", c: GREEN, bg: "EBF9F3", bd: "A8E8CC" },
    ].forEach((p, i) => {
      const y = 0.82 + i * 1.55;
      sl.addShape(pptx.ShapeType.rect, { x: 0.3, y, w: 9.4, h: 1.38, fill: { color: p.bg }, line: { color: p.bd, width: 1 }, rectRadius: 0.1 });
      sl.addShape(pptx.ShapeType.rect, { x: 0.3, y, w: 1.25, h: 1.38, fill: { color: p.c }, rectRadius: 0.1 });
      sl.addText(p.phase, { x: 0.3, y: y + 0.2, w: 1.25, h: 0.38, fontFace: "Arial", fontSize: 12, bold: true, color: "FFFFFF", align: "center" });
      sl.addText(p.time, { x: 0.3, y: y + 0.62, w: 1.25, h: 0.35, fontFace: "Arial", fontSize: 10, color: "FFFFFF", align: "center" });
      sl.addText(p.t, { x: 1.7, y: y + 0.1, w: 7.75, h: 0.4, fontFace: "Arial", fontSize: 14, bold: true, color: DARK });
      sl.addText(p.d, { x: 1.7, y: y + 0.52, w: 7.75, h: 0.75, fontFace: "Arial", fontSize: 10.5, color: "555555", lineSpacingMultiple: 1.35 });
    });
  }

  // ── Слайд 8: Результаты ──
  {
    const sl = pptx.addSlide();
    sl.background = { color: "1C2340" };
    sl.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 0.18, h: 5.63, fill: { color: GREEN } });
    sl.addText("РАЗДЕЛ 5  ·  ОЖИДАЕМЫЕ РЕЗУЛЬТАТЫ  ·  «Что изменится для каждого»", { x: 0.4, y: 0.12, w: 9, h: 0.4, fontFace: "Arial", fontSize: 10, bold: true, color: "888888", charSpacing: 2 });
    sl.addText("Ожидаемые результаты", { x: 0, y: 0.58, w: 10, h: 0.48, fontFace: "Arial", fontSize: 20, bold: true, color: "FFFFFF", align: "center" });

    [{ icon: "🎓", t: "Для учеников", c: YELLOW, items: [{ l: "Уровень тревожности", b: 78, a: 30 }, { l: "Желание учиться", b: 42, a: 80 }, { l: "Качество сна", b: 55, a: 82 }] },
      { icon: "👩‍🏫", t: "Для учителей", c: "9988EE", items: [{ l: "Вовлечённость учеников", b: 45, a: 75 }, { l: "Удовлетворённость работой", b: 52, a: 78 }, { l: "Дисциплина в классе", b: 60, a: 80 }] },
      { icon: "👪", t: "Для семей", c: ACCENT, items: [{ l: "Конфликты из-за оценок", b: 65, a: 20 }, { l: "Вечернее время вместе", b: 30, a: 70 }, { l: "Стресс в семье", b: 70, a: 25 }] },
    ].forEach((g, gi) => {
      const x = 0.32 + gi * 3.22;
      sl.addShape(pptx.ShapeType.rect, { x, y: 1.15, w: 3.0, h: 3.75, fill: { color: "FFFFFF10" }, line: { color: "FFFFFF18", width: 1 }, rectRadius: 0.12 });
      sl.addText(`${g.icon}  ${g.t}`, { x: x + 0.12, y: 1.25, w: 2.76, h: 0.4, fontFace: "Arial", fontSize: 12, bold: true, color: "FFFFFF" });
      g.items.forEach((item, ii) => {
        const y = 1.75 + ii * 1.08;
        sl.addText(item.l, { x: x + 0.15, y, w: 2.7, h: 0.26, fontFace: "Arial", fontSize: 9.5, color: "AAAAAA" });
        sl.addShape(pptx.ShapeType.rect, { x: x + 0.15, y: y + 0.28, w: 2.5, h: 0.2, fill: { color: "FFFFFF20" }, rectRadius: 0.04 });
        sl.addShape(pptx.ShapeType.rect, { x: x + 0.15, y: y + 0.28, w: (2.5 * item.b) / 100, h: 0.2, fill: { color: "FFFFFF35" }, rectRadius: 0.04 });
        sl.addText(`${item.b}%`, { x: x + 2.7, y: y + 0.26, w: 0.38, h: 0.24, fontFace: "Arial", fontSize: 9, color: "888888" });
        sl.addShape(pptx.ShapeType.rect, { x: x + 0.15, y: y + 0.54, w: 2.5, h: 0.2, fill: { color: "FFFFFF20" }, rectRadius: 0.04 });
        sl.addShape(pptx.ShapeType.rect, { x: x + 0.15, y: y + 0.54, w: (2.5 * item.a) / 100, h: 0.2, fill: { color: g.c }, rectRadius: 0.04 });
        sl.addText(`${item.a}%`, { x: x + 2.7, y: y + 0.52, w: 0.38, h: 0.24, fontFace: "Arial", fontSize: 9, bold: true, color: g.c });
      });
    });

    [{ v: "−40%", l: "Тревожность", c: ACCENT }, { v: "+35%", l: "Мотивация", c: GREEN }, { v: "×2", l: "Часы сна", c: YELLOW }, { v: "+50%", l: "Кружки", c: "9988EE" }].forEach((m, i) => {
      const x = 0.5 + i * 2.3;
      sl.addShape(pptx.ShapeType.rect, { x, y: 5.02, w: 2.0, h: 0.5, fill: { color: "FFFFFF0D" }, line: { color: m.c + "88", width: 1 }, rectRadius: 0.07 });
      sl.addText(`${m.v}  ${m.l}`, { x, y: 5.06, w: 2.0, h: 0.38, fontFace: "Arial", fontSize: 13, bold: true, color: m.c, align: "center" });
    });
  }

  // ── Слайд 9: Выводы ──
  {
    const sl = pptx.addSlide();
    sl.background = { color: LIGHT_BG };
    sl.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 0.18, h: 5.63, fill: { color: ACCENT } });
    sl.addShape(pptx.ShapeType.rect, { x: 0.18, y: 0, w: 9.82, h: 0.65, fill: { color: ACCENT } });
    sl.addText("РАЗДЕЛ 6  ·  ВЫВОДЫ", { x: 0.4, y: 0.1, w: 9, h: 0.45, fontFace: "Arial", fontSize: 11, bold: true, color: "FFFFFF", charSpacing: 2 });
    sl.addText("«Школа будущего начинается сегодня»", { x: 0.3, y: 0.78, w: 9.4, h: 0.5, fontFace: "Arial", fontSize: 20, bold: true, color: DARK, align: "center" });

    [{ icon: "🌟", t: "Это реально", d: "Финляндия, Нидерланды, Швеция уже доказали: другая школа работает. Можем взять лучшее оттуда и адаптировать.", c: YELLOW, bg: "FFFBE8", bd: "F0D888" },
      { icon: "💪", t: "Мы готовы", d: "Ученики и учителя хотят перемен. Пилотный проект может дать результаты уже через год.", c: GREEN, bg: "EBF9F3", bd: "A8E8CC" },
      { icon: "🚀", t: "Начнём прямо сейчас", d: "Первый шаг — обсуждение на совете школы с родителями и учениками.", c: PURPLE, bg: "F0EDFF", bd: "C8C0F0" },
    ].forEach((c, i) => {
      const x = 0.35 + i * 3.15;
      sl.addShape(pptx.ShapeType.rect, { x, y: 1.42, w: 3.0, h: 1.95, fill: { color: c.bg }, line: { color: c.bd, width: 1.2 }, rectRadius: 0.12 });
      sl.addText(c.icon, { x, y: 1.52, w: 3.0, h: 0.52, fontFace: "Arial", fontSize: 28, align: "center" });
      sl.addText(c.t, { x: x + 0.15, y: 2.1, w: 2.7, h: 0.38, fontFace: "Arial", fontSize: 13, bold: true, color: c.c, align: "center" });
      sl.addText(c.d, { x: x + 0.15, y: 2.52, w: 2.7, h: 0.72, fontFace: "Arial", fontSize: 9.5, color: "444444", lineSpacingMultiple: 1.3, align: "center" });
    });

    sl.addShape(pptx.ShapeType.rect, { x: 0.3, y: 3.48, w: 9.4, h: 0.82, fill: { color: ACCENT }, rectRadius: 0.1 });
    sl.addText("Наш призыв к действию", { x: 0.4, y: 3.54, w: 9.2, h: 0.34, fontFace: "Arial", fontSize: 14, bold: true, color: "FFFFFF", align: "center" });
    sl.addText("💬 Обсудить на классном часе   ·   📋 Вынести на совет школы   ·   🗳️ Провести голосование", { x: 0.4, y: 3.88, w: 9.2, h: 0.32, fontFace: "Arial", fontSize: 11, color: "FFE8DC", align: "center" });
  }

  // ── Слайд 10: Итоговая таблица ──
  {
    const sl = pptx.addSlide();
    sl.background = { color: LIGHT_BG };
    sl.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 0.18, h: 5.63, fill: { color: ACCENT } });
    sl.addShape(pptx.ShapeType.rect, { x: 0.18, y: 0, w: 9.82, h: 0.65, fill: { color: DARK } });
    sl.addText("ИТОГОВАЯ ТАБЛИЦА ПРЕДЛОЖЕНИЙ", { x: 0.4, y: 0.1, w: 9, h: 0.45, fontFace: "Arial", fontSize: 11, bold: true, color: "FFFFFF", charSpacing: 2 });

    const rows = [["Предложение", "Блок", "Кому выгодно", "Сложность"], ["Качественные оценки в 5–6 кл.", "Оценки", "Ученики, учителя", "⭐⭐"], ["Накопление баллов по блокам", "Оценки", "Ученики", "⭐⭐⭐"], ["Оценка soft skills", "Оценки", "Ученики, работодатели", "⭐⭐⭐"], ["Начало уроков с 9:00", "Расписание", "Все участники", "⭐⭐"], ["Бинарные (парные) уроки", "Расписание", "Ученики, учителя", "⭐⭐⭐"], ["Запрет ДЗ в мессенджеры после 18:00", "Расписание", "Ученики, семьи", "⭐"]];
    const cW = [3.8, 1.6, 2.4, 1.3]; const cX = [0.35, 4.2, 5.85, 8.3];
    rows.forEach((row, ri) => {
      const y = 0.82 + ri * 0.62; const isH = ri === 0;
      row.forEach((cell, ci) => {
        sl.addShape(pptx.ShapeType.rect, { x: cX[ci], y, w: cW[ci], h: 0.55, fill: { color: isH ? ACCENT : ri % 2 ? "FFFFFF" : "FBF5EF" }, line: { color: "E0D8D0", width: 0.5 } });
        sl.addText(cell, { x: cX[ci] + 0.1, y: y + 0.04, w: cW[ci] - 0.2, h: 0.47, fontFace: "Arial", fontSize: isH ? 11 : 10.5, bold: isH, color: isH ? "FFFFFF" : DARK, valign: "middle" });
      });
    });
  }

  await pptx.writeFile({ fileName: "Школа_2_Предложения_по_образованию.pptx" });
}

// ─── Слайды ───────────────────────────────────────────────────────────────────
function SlideIntro() {
  return (
    <div className="relative w-full h-full flex flex-col justify-center overflow-hidden bg-[#FFF9F4]">
      <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#E85D26]" />
      <div className="absolute top-20 right-0 w-[460px] h-[460px] rounded-full bg-[#FFE8D8] opacity-30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-20 w-[340px] h-[340px] rounded-full bg-[#D4EDE4] opacity-20 blur-3xl pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-8 w-full grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-[10px] font-bold text-[#E85D26] tracking-[0.22em] uppercase mb-4">Школа 2.0  ·  Проект учеников 5–9 классов</p>
          <h1 className="text-4xl md:text-5xl font-bold leading-[1.2] mb-5 text-[#1C2340]">
            Предложения<br /><span className="text-[#E85D26]">по изменению</span><br />системы образования
          </h1>
          <p className="text-sm text-[#555] mb-6 leading-relaxed max-w-md border-l-2 border-[#E85D26]/40 pl-4">
            Как сделать школу местом, куда хочется идти — без страха, усталости и скуки.
          </p>
          <div className="grid grid-cols-4 gap-2 mb-5">
            {[{ val: "73%", label: "боятся оценок", color: "#CC2222" }, { val: "6:30", label: "подъём утром", color: "#E85D26" }, { val: "8+", label: "уроков в день", color: "#D49B00" }, { val: "85%", label: "хотят свой темп", color: "#1A9E78" }].map(s => (
              <div key={s.val} className="bg-white rounded-lg p-3 border border-[#EAE0D8]">
                <div className="text-xl font-bold" style={{ color: s.color }}>{s.val}</div>
                <div className="text-[9px] text-[#888] mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {[{ text: "Оценки без страха", color: "#D49B00", bg: "#FFF8E0" }, { text: "Умное расписание", color: "#1976C8", bg: "#E0F4FF" }, { text: "Мировые примеры", color: "#5B4BD4", bg: "#F0EDFF" }].map(b => (
              <span key={b.text} className="px-3 py-1.5 rounded text-[10px] font-semibold border" style={{ color: b.color, background: b.bg, borderColor: b.color + "40" }}>{b.text}</span>
            ))}
          </div>
        </div>
        <div className="relative hidden md:block">
          <img src={IMG_KIDS} alt="Ученики" className="rounded-2xl w-full object-cover shadow-xl aspect-square border-4 border-white" />
          <div className="absolute -bottom-3 -left-3 bg-white rounded-xl shadow-lg px-4 py-2.5 border border-[#EAE0D8]">
            <div className="font-bold text-sm text-[#E85D26]">3 блока</div>
            <div className="text-[9px] text-[#888]">ключевых изменений</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SlideGrades() {
  return (
    <div className="relative w-full h-full flex flex-col justify-center overflow-hidden bg-[#FFF9F4]">
      <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#D49B00]" />
      <div className="max-w-6xl mx-auto px-8 w-full overflow-y-auto max-h-full py-6">
        <p className="text-[10px] font-bold text-[#D49B00] tracking-[0.2em] uppercase mb-1">Раздел 2  ·  Оценки и мотивация</p>
        <h2 className="text-3xl font-bold text-[#1C2340] mb-1">Оценки и мотивация</h2>
        <p className="text-sm text-[#D49B00] italic mb-5">«Учиться без страха»</p>
        <div className="grid md:grid-cols-2 gap-5 mb-5">
          <div className="bg-white rounded-xl p-5 border border-[#F0E0D0]">
            <p className="text-[10px] font-bold text-[#B83000] uppercase tracking-widest mb-3">😰 Проблема сейчас</p>
            <p className="text-xs text-[#555] mb-4 leading-relaxed">Дети боятся получить «двойку», а не стремятся узнать новое.</p>
            <div className="space-y-3">
              {[{ label: "Страх ошибиться", val: 89 }, { label: "Учёба из-под палки", val: 72 }, { label: "Тревожность", val: 68 }].map(item => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs mb-1"><span>{item.label}</span><span className="font-bold text-[#B83000]">{item.val}%</span></div>
                  <div className="h-1.5 bg-[#F0E8E0] rounded-full overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-[#E85D26] to-[#CC2222]" style={{ width: `${item.val}%` }} /></div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 border border-[#C8EAD8]">
            <p className="text-[10px] font-bold text-[#1A7A58] uppercase tracking-widest mb-3">🌱 Что предлагаем</p>
            <div className="space-y-3">
              {[{ icon: "✅", title: "Качественные оценки в 5–6 кл.", desc: "«Освоил» / «Старается» / «Надо поработать»" }, { icon: "🏆", title: "Накопление баллов по блокам", desc: "Зачёт/незачёт — без страха провала" }, { icon: "🤝", title: "Оценка soft skills", desc: "Команда, креативность, критическое мышление" }, { icon: "📈", title: "Прогресс относительно себя", desc: "«Я вчера» vs «Я сегодня», не vs класс" }].map(p => (
                <div key={p.title} className="flex gap-2 items-start">
                  <span className="text-sm mt-0.5">{p.icon}</span>
                  <div><div className="text-xs font-semibold text-[#1C2340]">{p.title}</div><div className="text-[10px] text-[#666]">{p.desc}</div></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
          {[{ icon: "🤝", label: "Командная работа", color: "#5B4BD4", bg: "#F0EDFF" }, { icon: "💡", label: "Креативность", color: "#D49B00", bg: "#FFF8E0" }, { icon: "🔍", label: "Кр. мышление", color: "#1A9E78", bg: "#E0FBF3" }, { icon: "🎤", label: "Презентация", color: "#E85D26", bg: "#FFF0E8" }, { icon: "⏱️", label: "Тайм-менеджмент", color: "#1976C8", bg: "#E0F4FF" }, { icon: "🧩", label: "Реш. проблем", color: "#C04488", bg: "#FFE8F4" }, { icon: "📚", label: "Самообучение", color: "#3A8A3E", bg: "#E8F8E8" }, { icon: "🌍", label: "Эмпатия", color: "#CC6600", bg: "#FFF4E0" }].map(s => (
            <div key={s.label} className="rounded-lg p-2 flex flex-col items-center text-center gap-1 border" style={{ background: s.bg, borderColor: s.color + "30" }}>
              <span className="text-base">{s.icon}</span><span className="text-[8px] font-semibold leading-tight" style={{ color: s.color }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SlideSchedule() {
  return (
    <div className="relative w-full h-full flex flex-col justify-center overflow-hidden bg-[#F4F7FF]">
      <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#1976C8]" />
      <div className="max-w-6xl mx-auto px-8 w-full overflow-y-auto max-h-full py-6">
        <p className="text-[10px] font-bold text-[#1976C8] tracking-[0.2em] uppercase mb-1">Раздел 3  ·  Расписание и нагрузка</p>
        <h2 className="text-3xl font-bold text-[#1C2340] mb-1">Расписание и нагрузка</h2>
        <p className="text-sm text-[#1976C8] italic mb-5">«Больше сна и свободы»</p>
        <div className="grid md:grid-cols-2 gap-5 mb-5">
          {[{ title: "⚠️ Сейчас", bg: "bg-white border-[#FFCCCC]", tc: "text-[#AA2200]", items: [["06:30", "Подъём — темно, не выспался", "#CC2222"], ["08:00", "Первый урок — мозг ещё спит", "#DD6622"], ["14:00", "Конец уроков, нет сил", "#888"], ["21:00", "ДЗ в мессенджер вечером", "#CC2222"], ["23:00", "Засыпает. Цикл повторяется", "#555"]] }, { title: "✅ Предложение", bg: "bg-[#EBF9F3] border-[#A8E8CC]", tc: "text-[#1A7A58]", items: [["07:30", "Спокойный подъём и завтрак", "#1A7A58"], ["09:00", "Первый урок — мозг включён!", "#00C896"], ["15:00", "Конец уроков, есть силы", "#1976C8"], ["до 18:00", "ДЗ онлайн или в школе", "#5B4BD4"], ["22:00", "Крепкий сон — 9+ часов", "#00C896"]] }].map(col => (
            <div key={col.title} className={`rounded-xl p-4 border ${col.bg}`}>
              <p className={`text-[10px] font-bold uppercase tracking-widest mb-3 ${col.tc}`}>{col.title}</p>
              <div className="space-y-2">
                {col.items.map(item => (
                  <div key={item[0]} className="flex gap-3 items-center">
                    <span className="text-[10px] font-mono font-bold w-14 text-[#888] flex-shrink-0">{item[0]}</span>
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: item[2] as string }} />
                    <span className="text-xs text-[#333]">{item[1]}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-3">
          {[{ num: "01", icon: "🌅", color: "#D49B00", bg: "#FFFBE8", border: "#F0D888", title: "Начало в 9:00–9:30", points: ["Биологический ритм подростков", "+1 час сна = +17% успеваемость", "Мозг активен с 9:00, не с 8:00"] }, { num: "02", icon: "⏱️", color: "#5B4BD4", bg: "#F0EDFF", border: "#C8C0F0", title: "Бинарные уроки (90 мин)", points: ["Глубокое погружение в тему", "Нет переключения каждые 40 мин", "Формат как в университете"] }, { num: "03", icon: "📵", color: "#1A9E78", bg: "#E8FBF3", border: "#A8E8CC", title: "Детокс после 18:00", points: ["Запрет ДЗ в мессенджеры", "Вечер — для семьи и отдыха", "Снижение тревожности"] }].map(p => (
            <div key={p.num} className="rounded-xl p-4 border" style={{ background: p.bg, borderColor: p.border }}>
              <div className="flex items-center gap-2 mb-2"><span className="text-xl">{p.icon}</span><span className="text-base font-bold" style={{ color: p.color + "55" }}>{p.num}</span></div>
              <p className="text-xs font-bold mb-2" style={{ color: p.color }}>{p.title}</p>
              <ul className="space-y-1">{p.points.map(pt => <li key={pt} className="text-[10px] text-[#444] flex gap-1"><span style={{ color: p.color }}>→</span>{pt}</li>)}</ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SlideExamples() {
  return (
    <div className="relative w-full h-full flex flex-col justify-center overflow-hidden bg-[#FFF9F4]">
      <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#5B4BD4]" />
      <div className="max-w-6xl mx-auto px-8 w-full overflow-y-auto max-h-full py-6">
        <p className="text-[10px] font-bold text-[#5B4BD4] tracking-[0.2em] uppercase mb-1">Раздел 4  ·  Примеры реализации</p>
        <h2 className="text-3xl font-bold text-[#1C2340] mb-1">Примеры реализации</h2>
        <p className="text-sm text-[#5B4BD4] italic mb-5">«Это уже работает в мире»</p>
        <div className="grid md:grid-cols-2 gap-4 mb-5">
          {[{ flag: "🇫🇮", country: "Финляндия", headline: "Лучшая система образования в мире", color: "#1A9E78", bg: "#EBF9F3", border: "#A8E8CC", points: ["Нет стандартизированных тестов до 16 лет", "Акцент на сотрудничество, не конкуренцию", "15 мин отдыха после каждых 45 мин"], result: "1-е место в мировых рейтингах образования" }, { flag: "🇳🇱", country: "Нидерланды", headline: "Школы без звонков", color: "#E85D26", bg: "#FFF3EE", border: "#F8C8A8", points: ["Ученики сами планируют учебный день", "Проектное обучение вместо предметного", "Оценки заменены на «портфолио достижений»"], result: "Высокий уровень мотивации и самостоятельности" }, { flag: "🇯🇵", country: "Япония", headline: "Развитие характера", color: "#C04488", bg: "#FFE8F4", border: "#E8A8CC", points: ["«Токкацу» — урок для развития soft skills", "Нет деления на «умных» и «глупых»", "Ответственность через самоуправление"], result: "Один из самых низких уровней буллинга" }, { flag: "🇸🇪", country: "Швеция", headline: "Права ребёнка в школе", color: "#1976C8", bg: "#E8F4FF", border: "#A8CCF0", points: ["Законодательный запрет ДЗ в выходные", "Школьный омбудсмен — защитник ученика", "Свободный выбор предметов с 7 класса"], result: "Уровень стресса — один из самых низких в ЕС" }].map(ex => (
            <div key={ex.country} className="rounded-xl p-4 border" style={{ background: ex.bg, borderColor: ex.border }}>
              <div className="flex items-center gap-2 mb-2"><span className="text-2xl">{ex.flag}</span><div><div className="font-bold text-[#1C2340] text-sm">{ex.country}</div><div className="text-[9px] text-[#888]">{ex.headline}</div></div></div>
              <ul className="space-y-1 mb-2">{ex.points.map(pt => <li key={pt} className="text-[10px] text-[#333] flex gap-1.5"><span style={{ color: ex.color }}>✓</span>{pt}</li>)}</ul>
              <div className="text-[10px] font-semibold px-2 py-1 rounded" style={{ color: ex.color, background: ex.color + "18" }}>▲ {ex.result}</div>
            </div>
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-3">
          {[{ phase: "Этап 1", time: "1 год", title: "Пилот в школах", desc: "Запустить эксперимент с качественными оценками и сдвигом уроков.", color: "#D49B00" }, { phase: "Этап 2", time: "2 год", title: "Анализ и доработка", desc: "Изучить результаты пилота. Доработать модель по обратной связи.", color: "#E85D26" }, { phase: "Этап 3", time: "3–5 лет", title: "Масштабирование", desc: "Распространить на все школы региона. Принять нормативную базу.", color: "#1A9E78" }].map(ph => (
            <div key={ph.phase} className="flex gap-3 items-start bg-white rounded-xl p-3 border border-[#EAE0D8]">
              <div className="flex-shrink-0 w-11 h-11 rounded-lg flex flex-col items-center justify-center text-white text-[9px] font-bold" style={{ background: ph.color }}><span>{ph.phase}</span><span className="font-normal">{ph.time}</span></div>
              <div><div className="font-bold text-xs text-[#1C2340] mb-0.5">{ph.title}</div><div className="text-[10px] text-[#666]">{ph.desc}</div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SlideResults() {
  return (
    <div className="relative w-full h-full flex flex-col justify-center overflow-hidden bg-[#1C2340]">
      <div className="absolute right-0 top-0 w-72 h-72 rounded-full bg-[#5B4BD4]/15 blur-3xl pointer-events-none" />
      <div className="absolute left-0 bottom-0 w-60 h-60 rounded-full bg-[#1A9E78]/08 blur-3xl pointer-events-none" />
      <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#1A9E78]" />
      <div className="max-w-6xl mx-auto px-8 w-full overflow-y-auto max-h-full py-6 text-white">
        <p className="text-[10px] font-bold text-[#1A9E78] tracking-[0.2em] uppercase mb-1">Раздел 5  ·  Ожидаемые результаты</p>
        <h2 className="text-3xl font-bold mb-1">Ожидаемые результаты</h2>
        <p className="text-sm text-[#1A9E78] italic mb-5">«Что изменится для каждого из нас»</p>
        <div className="grid md:grid-cols-3 gap-4 mb-5">
          {[{ icon: "🎓", title: "Для учеников", color: "#D49B00", items: [{ l: "Уровень тревожности", b: 78, a: 30 }, { l: "Желание учиться", b: 42, a: 80 }, { l: "Качество сна", b: 55, a: 82 }] }, { icon: "👩‍🏫", title: "Для учителей", color: "#9988EE", items: [{ l: "Вовлечённость учеников", b: 45, a: 75 }, { l: "Удовлетворённость работой", b: 52, a: 78 }, { l: "Дисциплина в классе", b: 60, a: 80 }] }, { icon: "👪", title: "Для семей", color: "#E85D26", items: [{ l: "Конфликты из-за оценок", b: 65, a: 20 }, { l: "Вечернее время вместе", b: 30, a: 70 }, { l: "Стресс в семье", b: 70, a: 25 }] }].map(grp => (
            <div key={grp.title} className="bg-white/5 rounded-xl p-4 border border-white/10">
              <p className="text-sm font-bold mb-3">{grp.icon} {grp.title}</p>
              <div className="space-y-3">
                {grp.items.map(item => (
                  <div key={item.l}>
                    <div className="text-[10px] text-[#888] mb-1">{item.l}</div>
                    <div className="flex items-center gap-2"><div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden"><div className="h-full rounded-full bg-white/25" style={{ width: `${item.b}%` }} /></div><span className="text-[9px] text-[#666] w-5">{item.b}%</span></div>
                    <div className="flex items-center gap-2 mt-0.5"><div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden"><div className="h-full rounded-full" style={{ width: `${item.a}%`, background: grp.color }} /></div><span className="text-[9px] font-bold w-5" style={{ color: grp.color }}>{item.a}%</span></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[{ val: "−40%", label: "Тревожность в школе", color: "#E85D26" }, { val: "+35%", label: "Мотивация к учёбе", color: "#1A9E78" }, { val: "×2", label: "Время на сон", color: "#D49B00" }, { val: "+50%", label: "Участие в кружках", color: "#9988EE" }].map(m => (
            <div key={m.val} className="bg-white/5 rounded-xl p-3 border border-white/10 text-center">
              <div className="text-xl font-bold mb-0.5" style={{ color: m.color }}>{m.val}</div>
              <div className="text-[9px] text-[#888]">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SlideConclusion() {
  return (
    <div className="relative w-full h-full flex flex-col justify-center overflow-hidden bg-[#FFF9F4]">
      <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#E85D26]" />
      <div className="max-w-5xl mx-auto px-8 w-full overflow-y-auto max-h-full py-6 text-center">
        <p className="text-[10px] font-bold text-[#E85D26] tracking-[0.2em] uppercase mb-1">Раздел 6  ·  Выводы</p>
        <h2 className="text-3xl font-bold text-[#1C2340] mb-1">Выводы</h2>
        <p className="text-sm text-[#E85D26] italic mb-6">«Школа будущего начинается сегодня»</p>
        <div className="grid md:grid-cols-3 gap-4 mb-5 text-left">
          {[{ icon: "🌟", title: "Это реально", desc: "Финляндия, Нидерланды, Швеция уже доказали — другая школа работает.", color: "#D49B00", bg: "#FFFBE8", border: "#F0D888" }, { icon: "💪", title: "Мы готовы", desc: "Пилотный проект может дать результаты уже через год.", color: "#1A9E78", bg: "#EBF9F3", border: "#A8E8CC" }, { icon: "🚀", title: "Начнём прямо сейчас", desc: "Первый шаг — обсуждение на совете школы с родителями и учениками.", color: "#5B4BD4", bg: "#F0EDFF", border: "#C8C0F0" }].map(c => (
            <div key={c.title} className="rounded-xl p-4 border" style={{ background: c.bg, borderColor: c.border }}>
              <span className="text-2xl mb-2 block">{c.icon}</span>
              <h3 className="font-bold text-sm mb-1" style={{ color: c.color }}>{c.title}</h3>
              <p className="text-[10px] text-[#555] leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
        <div className="bg-[#E85D26] rounded-xl p-5 text-white mb-5">
          <p className="font-bold text-sm mb-1.5">Наш призыв к действию</p>
          <p className="text-xs text-white/85 mb-3 max-w-xl mx-auto">Давайте вместе обсудим эти предложения. Каждое мнение важно.</p>
          <div className="flex flex-wrap justify-center gap-2">
            {["💬 Обсудить на классном часе", "📋 Вынести на совет школы", "🗳️ Провести голосование"].map(a => (
              <span key={a} className="bg-white/20 rounded-full px-4 py-1.5 text-xs font-semibold">{a}</span>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto rounded-xl border border-[#EAE0D8] text-left">
          <table className="w-full text-[10px]">
            <thead><tr className="bg-[#E85D26] text-white">{["Предложение", "Блок", "Кому выгодно", "Сложность"].map(h => <th key={h} className="text-left px-3 py-2 font-semibold">{h}</th>)}</tr></thead>
            <tbody>
              {[["Качественные оценки в 5–6 кл.", "Оценки", "Ученики, учителя", "⭐⭐"], ["Накопление баллов по блокам", "Оценки", "Ученики", "⭐⭐⭐"], ["Оценка soft skills", "Оценки", "Ученики, работодатели", "⭐⭐⭐"], ["Начало уроков с 9:00", "Расписание", "Все участники", "⭐⭐"], ["Бинарные (парные) уроки", "Расписание", "Ученики, учителя", "⭐⭐⭐"], ["Запрет ДЗ в мессенджеры после 18:00", "Расписание", "Ученики, семьи", "⭐"]].map(([p, b, w, d], i) => (
                <tr key={p} className={i % 2 === 0 ? "bg-white" : "bg-[#FBF5EF]"}>
                  <td className="px-3 py-2 font-medium text-[#1C2340]">{p}</td><td className="px-3 py-2 text-[#888]">{b}</td><td className="px-3 py-2 text-[#555]">{w}</td><td className="px-3 py-2 text-center">{d}</td>
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
  const [exporting, setExporting] = useState(false);
  const total = SLIDES.length;

  const goTo = useCallback((idx: number) => { if (idx >= 0 && idx < total) setCurrent(idx); }, [total]);
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

  const handleExport = async () => {
    setExporting(true);
    try { await exportToPptx(); } finally { setExporting(false); }
  };

  const SlideComponent = SLIDE_COMPONENTS[current];

  return (
    <div className="font-golos text-[#1C2340] w-screen h-screen overflow-hidden relative">
      <nav className="absolute top-0 left-0 right-0 z-50 h-11 bg-white/95 backdrop-blur border-b border-[#EAE0D8] flex items-center px-4 justify-between">
        <span className="font-bold text-sm text-[#E85D26] tracking-wide">Школа 2.0</span>
        <div className="hidden md:flex gap-0.5">
          {SLIDES.map((s, i) => (
            <button key={s.id} onClick={() => goTo(i)} className={`px-3 py-1 rounded text-xs font-medium transition-all ${current === i ? "bg-[#E85D26] text-white" : "text-[#666] hover:bg-[#F5EDE0]"}`}>{s.label}</button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-[#bbb] font-mono">{current + 1}/{total}</span>
          <button onClick={handleExport} disabled={exporting}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#1C2340] text-white text-xs font-semibold hover:bg-[#2d3a5e] transition-all disabled:opacity-60">
            <Icon name={exporting ? "Loader" : "Download"} size={12} className={exporting ? "animate-spin" : ""} />
            {exporting ? "Создаю..." : "Скачать .pptx"}
          </button>
        </div>
      </nav>

      <div className="w-full h-full pt-11"><SlideComponent /></div>

      <div className="absolute right-3 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-1.5">
        {SLIDES.map((s, i) => (
          <button key={s.id} onClick={() => goTo(i)} title={s.label}
            className={`w-2 h-2 rounded-full transition-all ${current === i ? "bg-[#E85D26] scale-125" : "bg-[#CCC] hover:bg-[#E85D26]/50"}`} />
        ))}
      </div>

      <button onClick={goPrev} disabled={current === 0}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-50 w-9 h-9 rounded-full bg-white shadow border border-[#DDD] flex items-center justify-center hover:border-[#E85D26] hover:text-[#E85D26] transition-all disabled:opacity-20 disabled:cursor-not-allowed">
        <Icon name="ChevronLeft" size={18} />
      </button>
      <button onClick={goNext} disabled={current === total - 1}
        className="absolute right-10 top-1/2 -translate-y-1/2 z-50 w-9 h-9 rounded-full bg-white shadow border border-[#DDD] flex items-center justify-center hover:border-[#E85D26] hover:text-[#E85D26] transition-all disabled:opacity-20 disabled:cursor-not-allowed">
        <Icon name="ChevronRight" size={18} />
      </button>

      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#EAE0D8] z-50">
        <div className="h-full bg-[#E85D26] transition-all duration-500" style={{ width: `${((current + 1) / total) * 100}%` }} />
      </div>

      {current === 0 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1.5 bg-[#1C2340]/60 backdrop-blur text-white text-[9px] px-3 py-1.5 rounded-full pointer-events-none">
          <Icon name="ArrowLeft" size={9} />стрелки для навигации<Icon name="ArrowRight" size={9} />
        </div>
      )}
    </div>
  );
}
