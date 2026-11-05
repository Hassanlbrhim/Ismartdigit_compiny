"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink, X } from "lucide-react";
import type { Project } from "@/lib/types";
import { useApp, useContent } from "./Providers";
import Reveal from "./Reveal";

function Cover({ p, className }: { p: Project; className: string }) {
  const [broken, setBroken] = useState(false);
  useEffect(() => setBroken(false), [p.image]);
  return (
    <div className={`relative overflow-hidden bg-[#a3a3a3] ${className}`}>
      {p.image && !broken && <img src={p.image} alt="" onError={() => setBroken(true)} className="absolute inset-0 h-full w-full object-cover" />}
      <div dir="ltr" className="absolute start-5 top-5 flex flex-wrap gap-1.5">
        {p.tags.map(t => <span key={t} className="rounded-full border border-white/20 bg-white px-[10px] py-1 text-sm font-bold leading-4 text-secondary">{t}</span>)}
      </div>
    </div>
  );
}

export default function Portfolio() {
  const { tx, ui, lang } = useApp();
  const { content: { site, projects } } = useContent();
  const [sel, setSel] = useState<Project | null>(null);
  const Arr = lang === "ar" ? ArrowLeft : ArrowRight;

  useEffect(() => {
    if (!sel) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && setSel(null);
    addEventListener("keydown", k); document.body.style.overflow = "hidden";
    return () => { removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [sel]);

  return (
    <section id="works" className="bg-band py-[60px]">
      <div className="wrap flex flex-col gap-10">
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="badge">{tx(site.works.badge)}</span>
          <h2 className="h2">{tx(site.works.title)}</h2>
          <p className="max-w-[640px] text-lg text-sub md:text-xl">{tx(site.works.sub)}</p>
        </div>
        <div className="grid gap-x-5 gap-y-10 lg:grid-cols-2">
          {projects.filter(p => p.published).map((p, i) => (
            <Reveal key={p.id} i={i % 2}>
              <article className="flex flex-col overflow-hidden rounded-[20px] bg-card shadow-svc md:h-[451px]">
                <Cover p={p} className="h-[200px] shrink-0 md:h-[225px]" />
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <h3 className="text-xl font-bold leading-8 text-title md:text-2xl md:leading-10">{tx(p.title)}</h3>
                  <p className="line-clamp-3 text-base leading-7 text-sub md:text-xl md:leading-[32.3px]">{tx(p.desc)}</p>
                  <button onClick={() => setSel(p)} className="mt-auto flex h-12 items-center justify-center gap-2 rounded-[14px] bg-primary text-lg font-bold text-white shadow-proj transition hover:brightness-95">
                    <Arr size={20} />{ui.viewProject}
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {sel && (
          <motion.div className="fixed inset-0 z-[60] grid place-items-center bg-black/60 p-3 sm:p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSel(null)}>
            <motion.div role="dialog" aria-modal="true" aria-label={tx(sel.title)} onClick={e => e.stopPropagation()}
              initial={{ y: 24, scale: 0.97 }} animate={{ y: 0, scale: 1 }} exit={{ y: 24, scale: 0.97 }}
              className="relative max-h-[92vh] max-h-[92dvh] w-full max-w-3xl overflow-y-auto rounded-[20px] bg-card shadow-2xl">
              <button autoFocus onClick={() => setSel(null)} aria-label={ui.close} className="absolute end-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white text-secondary shadow"><X size={18} /></button>
              <Cover p={sel} className="h-[240px] md:h-[340px]" />
              <div className="flex flex-col gap-4 p-6 md:p-8">
                <h3 className="text-2xl font-black text-title md:text-3xl">{tx(sel.title)}</h3>
                <p className="text-lg leading-8 text-sub">{tx(sel.desc)}</p>
                <div className="flex flex-wrap gap-3 pt-2">
                  {sel.link && <a href={sel.link} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center gap-2 rounded-[14px] bg-primary px-6 font-bold text-white shadow-proj"><ExternalLink size={18} />{ui.visit}</a>}
                  <a href="#contact" onClick={() => setSel(null)} className="inline-flex h-12 items-center rounded-[14px] border-2 border-black/10 px-6 font-bold text-heading dark:border-white/20">{ui.contactUs}</a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
