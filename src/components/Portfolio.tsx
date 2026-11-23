"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useDragControls } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink, X } from "lucide-react";
import type { Project } from "@/lib/types";
import { useApp, useContent } from "./Providers";
import Reveal from "./Reveal";

function Cover({ p, className }: { p: Project; className: string }) {
  const [broken, setBroken] = useState(false);
  useEffect(() => setBroken(false), [p.image]);
  return (
    <div className={`relative overflow-hidden bg-[#a3a3a3] ${className}`}>
      {p.image && !broken && <img src={p.image} alt="" loading="lazy" onError={() => setBroken(true)} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" />}
      <div dir="ltr" className="absolute start-4 top-4 flex flex-wrap gap-1.5 sm:start-5 sm:top-5">
        {p.tags.map(t => <span key={t} className="rounded-full border border-white/20 bg-white px-[10px] py-1 text-sm font-bold leading-4 text-secondary">{t}</span>)}
      </div>
    </div>
  );
}

export default function Portfolio() {
  const { tx, ui, lang } = useApp();
  const { content: { site, projects } } = useContent();
  const [sel, setSel] = useState<Project | null>(null);
  const drag = useDragControls();
  const Arr = lang === "ar" ? ArrowLeft : ArrowRight;

  useEffect(() => {
    if (!sel) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && setSel(null);
    addEventListener("keydown", k); document.body.style.overflow = "hidden";
    return () => { removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [sel]);

  return (
    <section id="works" className="bg-band py-12 sm:py-[60px]">
      <div className="wrap flex flex-col gap-8 sm:gap-10">
        <Reveal className="flex flex-col items-center gap-4 text-center">
          <span className="badge">{tx(site.works.badge)}</span>
          <h2 className="h2">{tx(site.works.title)}</h2>
          <p className="max-w-[640px] text-fluid-sub text-sub">{tx(site.works.sub)}</p>
        </Reveal>
        <div className="grid gap-x-5 gap-y-6 sm:gap-y-10 lg:grid-cols-2">
          {projects.filter(p => p.published).map((p, i) => (
            <Reveal key={p.id} i={i % 2} className="h-full">
              <article className="group flex h-full flex-col overflow-hidden rounded-[20px] bg-card shadow-svc transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_32px_-8px_rgba(0,0,0,.14)] xl:min-h-[451px]">
                <Cover p={p} className="h-[200px] shrink-0 sm:h-[225px]" />
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <h3 className="break-words text-fluid-card font-bold text-title">{tx(p.title)}</h3>
                  <p className="line-clamp-3 text-fluid-desc text-sub">{tx(p.desc)}</p>
                  <button onClick={() => setSel(p)} className="group/btn mt-auto flex min-h-12 items-center justify-center gap-2 rounded-[14px] bg-primary text-lg font-bold text-white shadow-proj transition duration-200 hover:brightness-95 active:scale-[0.98]">
                    <Arr size={20} className="transition-transform group-hover/btn:-translate-x-1 ltr:group-hover/btn:translate-x-1" />{ui.viewProject}
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Bottom sheet on phones (drag the handle down to close), centred dialog from sm up */}
      <AnimatePresence>
        {sel && (
          <motion.div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center sm:p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSel(null)}>
            <motion.div role="dialog" aria-modal="true" aria-label={tx(sel.title)} onClick={e => e.stopPropagation()}
              drag="y" dragControls={drag} dragListener={false} dragConstraints={{ top: 0, bottom: 0 }} dragElastic={{ top: 0, bottom: 0.5 }}
              onDragEnd={(_, info) => { if (info.offset.y > 110 || info.velocity.y > 600) setSel(null); }}
              initial={{ y: 48, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 48, opacity: 0 }} transition={{ type: "spring", damping: 30, stiffness: 320 }}
              className="relative max-h-[92dvh] w-full max-w-3xl overflow-y-auto overscroll-contain rounded-t-3xl bg-card pb-[env(safe-area-inset-bottom)] shadow-2xl sm:rounded-[20px]">
              <div onPointerDown={e => drag.start(e)} className="absolute inset-x-0 top-0 z-10 flex h-8 cursor-grab touch-none justify-center pt-2.5 sm:hidden"><span className="h-1.5 w-12 rounded-full bg-white/90 shadow" /></div>
              <button autoFocus onClick={() => setSel(null)} aria-label={ui.close} className="absolute end-3 top-3 z-10 grid h-11 w-11 place-items-center rounded-full bg-white text-secondary shadow transition active:scale-95"><X size={18} /></button>
              <Cover p={sel} className="h-[220px] sm:h-[300px] md:h-[340px]" />
              <div className="flex flex-col gap-4 p-5 sm:p-8">
                <h3 className="break-words text-fluid-card font-black text-title">{tx(sel.title)}</h3>
                <p className="text-fluid-desc text-sub">{tx(sel.desc)}</p>
                <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                  {sel.link && <a href={sel.link} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[14px] bg-primary px-6 font-bold text-white shadow-proj transition active:scale-[0.98]"><ExternalLink size={18} />{ui.visit}</a>}
                  <a href="#contact" onClick={() => setSel(null)} className="inline-flex min-h-12 items-center justify-center rounded-[14px] border-2 border-black/10 px-6 font-bold text-heading transition active:scale-[0.98] dark:border-white/20">{ui.contactUs}</a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
