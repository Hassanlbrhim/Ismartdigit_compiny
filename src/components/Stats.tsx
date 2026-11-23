"use client";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useApp, useContent } from "./Providers";
import Reveal from "./Reveal";
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
  return <span ref={ref} dir="ltr" className="tabular-nums">{s.prefix}{v.toFixed(s.decimals)}{s.suffix}</span>;
}

// Three compact columns on phones (instead of three tall stacked cards); Figma 112px cards from sm up.
export default function Stats() {
  const { tx } = useApp();
  const { content: { site } } = useContent();
  return (
    <section aria-label="Stats" className="bg-page py-6 sm:py-8">
      <div className="wrap grid grid-cols-3 gap-2 sm:gap-5">
        {site.stats.map((s, i) => (
          <Reveal key={s.id} i={i}>
            <div className="flex h-[92px] flex-col items-center justify-center gap-1 rounded-2xl bg-card px-1 text-center shadow-svc ring-1 ring-line sm:h-[112px] sm:gap-1.5">
              <p className="text-fluid-stat font-extrabold text-[#10b981]"><Counter s={s} /></p>
              <p className="text-fluid-stat-label font-bold text-[#475569] dark:text-slate-300">{tx(s.label)}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
