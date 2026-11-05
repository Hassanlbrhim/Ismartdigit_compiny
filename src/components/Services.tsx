"use client";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ICONS, IconName } from "@/lib/icons";
import { useApp, useContent } from "./Providers";
import Reveal from "./Reveal";

// Figma card: white, r16, p24, 0.9px border black/5, shadow 0 4px 10px black/5; tag pill 12 Bold; icon box 44 r14.
export default function Services() {
  const { tx, ui, lang } = useApp();
  const { content: { site, services } } = useContent();
  const Arr = lang === "ar" ? ArrowLeft : ArrowRight;
  return (
    <section id="services" className="bg-mint py-[60px]">
      <div className="wrap flex flex-col gap-10">
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="badge">{tx(site.services.badge)}</span>
          <h2 className="h2">{tx(site.services.title)}</h2>
          <p className="max-w-[640px] text-lg text-sub md:text-xl">{tx(site.services.sub)}</p>
        </div>
        <div className="grid gap-x-5 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.filter(s => s.active).map((s, i) => {
            const Icon = ICONS[s.icon as IconName] ?? ICONS.Code;
            return (
              <Reveal key={s.id} i={i}>
                <article className="group flex h-full flex-col gap-4 rounded-2xl border border-line bg-card p-6 shadow-svc transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_32px_-8px_rgba(0,0,0,.14)]">
                  <div className="flex items-start justify-between">
                    <span className="rounded-full px-[10px] py-1 text-xs font-bold leading-4" style={{ color: s.color, background: s.color + "12" }}>{tx(s.tag)}</span>
                    <span className="grid h-11 w-11 place-items-center rounded-[14px] transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" style={{ color: s.color, background: s.color + "1a" }}><Icon size={20} /></span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-base font-bold leading-6 text-title">{tx(s.title)}</h3>
                    <p className="text-base leading-[22.75px] text-sub">{tx(s.body)}</p>
                  </div>
                  <a href="#contact" className="mt-auto flex items-center gap-1 text-sm font-semibold leading-5" style={{ color: s.color }}>
                    <Arr size={15} className="transition-transform group-hover:-translate-x-1 rtl:group-hover:-translate-x-1 ltr:group-hover:translate-x-1" />{ui.more}
                  </a>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
