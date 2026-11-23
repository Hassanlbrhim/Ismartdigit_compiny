"use client";
// Figma specs at 1440: h1 48/80 Black, lead 24/38, CTAs 280x72 r14. Fluid tokens (text-fluid-*) scale it down to 360px.
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useApp, useContent } from "./Providers";
import HeroIllustration from "./HeroIllustration";

const btn = "group flex min-h-14 items-center justify-center gap-2 rounded-[14px] px-6 text-fluid-cta font-bold transition duration-200 active:scale-[0.97] sm:min-w-[220px] xl:h-[72px] xl:w-[280px]";

export default function Hero() {
  const { tx, lang } = useApp();
  const { content: { site: { hero } } } = useContent();
  const rtl = lang === "ar";
  const Chev = rtl ? ChevronLeft : ChevronRight;
  const Arr = rtl ? ArrowLeft : ArrowRight;
  const rise = (i: number) => ({ initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.08 * i, duration: 0.6, ease: "easeOut" as const } });
  const parts = tx(hero.title).split(/\[\[(.+?)\]\]/g); // "[[...]]" marks the green accent words

  return (
    <section id="home" className="bg-[linear-gradient(135deg,var(--mint)_0%,var(--bg)_65%)] pt-[calc(4rem+env(safe-area-inset-top))]">
      <div className="wrap grid items-center gap-10 py-10 sm:py-14 lg:min-h-[585px] lg:grid-cols-2 lg:gap-12">
        <div className="flex flex-col gap-4">
          <motion.p {...rise(0)} className="flex items-center gap-1 text-base font-semibold text-primary sm:text-xl"><Chev size={20} className="shrink-0" /><span>{tx(hero.eyebrow)}</span></motion.p>
          <motion.h1 {...rise(1)} className="text-fluid-h1 font-black text-heading">{parts.map((p, i) => i % 2 ? <span key={i} className="text-primary">{p}</span> : p)}</motion.h1>
          <motion.p {...rise(2)} className="text-fluid-lead text-sub">{tx(hero.lead)}</motion.p>
          <motion.div {...rise(3)} className="mt-2 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4 xl:gap-6">
            <a href="#contact" className={`${btn} bg-primary text-white shadow-cta hover:-translate-y-0.5`}>
              <ArrowUpRight size={24} className={`transition-transform group-hover:-translate-y-0.5 ${rtl ? "-rotate-90" : "group-hover:translate-x-0.5"}`} />{tx(hero.cta1)}
            </a>
            <a href="#services" className={`${btn} border-2 border-black/10 text-heading hover:border-primary hover:text-primary dark:border-white/20`}>
              <Arr size={24} className="transition-transform group-hover:-translate-x-1 ltr:group-hover:translate-x-1" />{tx(hero.cta2)}
            </a>
          </motion.div>
        </div>

        {/* Visual (left in RTL). An image uploaded from the admin wins over the built-in illustration. */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.25, duration: 0.8 }} className="mx-auto w-full max-w-[480px]">
          {hero.image ? <img src={hero.image} alt="" className="h-auto w-full object-contain" /> : <HeroIllustration />}
        </motion.div>
      </div>
    </section>
  );
}
