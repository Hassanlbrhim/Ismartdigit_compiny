"use client";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ICONS, IconName } from "@/lib/icons";
import { useApp, useContent } from "./Providers";
import Reveal from "./Reveal";

// Figma card: white, r16, p24, border black/5, shadow 0 4px 10px black/5. Cards reveal per column (i % 4) so mobile never waits.
export default function Services() {
  const { tx, ui, lang } = useApp();
  const { content: { site, services } } = useContent();
  const Arr = lang === "ar" ? ArrowLeft : ArrowRight;
  return (
    <section id="services" className="bg-mint py-12 sm:py-[60px]">
      <div className="wrap flex flex-col gap-8 sm:gap-10">
        <Reveal className="flex flex-col items-center gap-4 text-center">
          <span className="badge">{tx(site.services.badge)}</span>
          <h2 className="h2">{tx(site.services.title)}</h2>
          <p className="max-w-[640px] text-fluid-sub text-sub">{tx(site.services.sub)}</p>
        </Reveal>
        <div className="grid gap-x-5 gap-y-4 sm:grid-cols-2 sm:gap-y-6 lg:grid-cols-4">
          {services.filter(s => s.active).map((s, i) => {
            const Icon = ICONS[s.icon as IconName] ?? ICONS.Code;
            return (
              <Reveal key={s.id} i={i % 4} className="h-full">
                <article className="group flex h-full flex-col gap-4 rounded-2xl border border-line bg-card p-5 shadow-svc transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_32px_-8px_rgba(0,0,0,.14)] sm:p-6">
                  <div className="flex items-start justify-between">
                    <span className="rounded-full px-[10px] py-1 text-xs font-bold leading-4" style={{ color: s.color, background: s.color + "12" }}>{tx(s.tag)}</span>
                    <span className="grid h-11 w-11 place-items-center rounded-[14px] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110" style={{ color: s.color, background: s.color + "1a" }}><Icon size={20} /></span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-base font-bold leading-6 text-title">{tx(s.title)}</h3>
                    <p className="text-base leading-[1.45] text-sub">{tx(s.body)}</p>
                  </div>
                  <a href="#contact" className="mt-auto inline-flex min-h-11 items-center gap-1 self-start text-sm font-semibold" style={{ color: s.color }}>
                    <Arr size={15} className="transition-transform group-hover:-translate-x-1 ltr:group-hover:translate-x-1" />{ui.more}
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
