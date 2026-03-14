import { useState, useEffect, useRef } from "react";

export const IMG_KIDS = "https://cdn.poehali.dev/projects/ce22b72c-c626-41ae-a643-1c44eeeed17e/files/6455abbc-9baf-4622-97a5-9e30e196fbc7.jpg";
export const IMG_GRADES = "https://cdn.poehali.dev/projects/ce22b72c-c626-41ae-a643-1c44eeeed17e/files/23f4ccab-830d-4b3c-9763-ff847ed985e2.jpg";
export const IMG_SLEEP = "https://cdn.poehali.dev/projects/ce22b72c-c626-41ae-a643-1c44eeeed17e/files/4e3b13bb-46ba-43bc-a8b8-84da26227b3b.jpg";

export const NAV_ITEMS = [
  { id: "intro", label: "Введение" },
  { id: "grades", label: "Оценки" },
  { id: "schedule", label: "Расписание" },
  { id: "examples", label: "Примеры" },
  { id: "results", label: "Результаты" },
  { id: "conclusion", label: "Выводы" },
];

export function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

export function AnimBlock({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={className} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(36px)", transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms` }}>
      {children}
    </div>
  );
}
