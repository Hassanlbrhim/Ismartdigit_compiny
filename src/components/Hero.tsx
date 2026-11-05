"use client";
// Specs from Figma: h1 48/80 Black -0.45 tracking, lead 24/38, eyebrow 20 SemiBold, CTAs 280x72 r14.
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import HeroIllustration from "./HeroIllustration";
import { useApp, useContent } from "./Providers";

export default function Hero() {
  const { tx, lang } = useApp();
  const { content: { site: { hero } } } = useContent();
  const calm = useReducedMotion();
  const rtl = lang === "ar";
  const Chev = rtl ? ChevronLeft : ChevronRight;
  const Arr = rtl ? ArrowLeft : ArrowRight;
  const rise = (i: number) => calm ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.08 * i, duration: 0.6, ease: "easeOut" as const } };
  const parts = tx(hero.title).split(/\[\[(.+?)\]\]/g); // "[[...]]" marks the green accent words

  return (
    <section id="home" className="bg-[linear-gradient(135deg,var(--mint)_0%,var(--bg)_65%)] pt-16">
      <div className="wrap grid min-h-[585px] items-center gap-12 py-12 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <motion.p {...rise(0)} className="flex items-center gap-1 text-base font-semibold text-primary md:text-xl">
            <Chev size={20} className="shrink-0" /><span>{tx(hero.eyebrow)}</span>
          </motion.p>
          <motion.h1 {...rise(1)} className="text-[34px] font-black leading-[54px] tracking-[-0.45px] text-heading md:text-[48px] md:leading-[80px]">
            {parts.map((p, i) => i % 2 ? <span key={i} className="text-primary">{p}</span> : p)}
          </motion.h1>
          <motion.p {...rise(2)} className="text-lg leading-[30px] text-sub md:text-2xl md:leading-[38px]">{tx(hero.lead)}</motion.p>
          <motion.div {...rise(3)} className="mt-2 flex flex-col gap-4 sm:flex-row sm:gap-6">
            <a href="#contact" className="flex h-14 items-center justify-center gap-2 rounded-[14px] bg-primary px-4 text-xl font-bold text-white shadow-cta transition hover:-translate-y-0.5 sm:w-[280px] md:h-[72px] md:text-2xl">
              <ArrowUpRight size={24} className={rtl ? "-rotate-90" : ""} />{tx(hero.cta1)}
            </a>
            <a href="#services" className="flex h-14 items-center justify-center gap-2 rounded-[14px] border-2 border-black/10 px-4 text-xl font-bold text-heading transition hover:border-primary hover:text-primary dark:border-white/20 sm:w-[280px] md:h-[72px] md:text-2xl">
              <Arr size={24} />{tx(hero.cta2)}
            </a>
          </motion.div>
        </div>

        {/* Visual (left in RTL). An illustration uploaded from the admin wins; otherwise the Figma-exact HeroIllustration. */}
        <motion.div initial={calm ? false : { opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.25, duration: 0.8 }} className="mx-auto w-full max-w-[480px]">
          {hero.image ? <img src={hero.image} alt="" className="h-auto w-full object-contain" /> : <HeroIllustration />}
        </motion.div>
      </div>
    </section>
  );
}
