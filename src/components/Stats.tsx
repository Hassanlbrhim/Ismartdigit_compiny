"use client";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useApp, useContent } from "./Providers";
import type { Stat } from "@/lib/types";

function Counter({ s }: { s: Stat }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const calm = useReducedMotion();
  const [v, setV] = useState(calm ? s.value : 0);
  useEffect(() => {
    if (calm) { setV(s.value); return; }
    if (!inView) return;
    const c = animate(0, s.value, { duration: 1.6, ease: "easeOut", onUpdate: setV });
    return () => c.stop();
  }, [inView, s.value, calm]);
  return <span ref={ref} dir="ltr">{s.prefix}{v.toFixed(s.decimals)}{s.suffix}</span>;
}

// Figma: white cards 112px tall, r16; value 30px ExtraBold #10b981; label 16px Bold #475569.
export default function Stats() {
  const { tx } = useApp();
  const { content: { site } } = useContent();
  return (
    <section aria-label="Stats" className="bg-page py-8">
      <div className="wrap grid gap-5 sm:grid-cols-3">
        {site.stats.map(s => (
          <div key={s.id} className="flex h-[112px] flex-col items-center justify-center gap-[6px] rounded-2xl bg-card shadow-svc ring-1 ring-line">
            <p className="text-[30px] font-extrabold leading-9 text-[#10b981]"><Counter s={s} /></p>
            <p className="text-base font-bold leading-5 text-[#475569] dark:text-slate-300">{tx(s.label)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
