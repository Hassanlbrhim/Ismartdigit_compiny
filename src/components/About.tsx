"use client";
import { useApp, useContent } from "./Providers";
import Reveal from "./Reveal";

// Figma: card r24, border primary/18, gradient #f0fdfa -> indigo/60, giant Georgia quote mark, 24px SemiBold body, brand 32px Bold.
export default function About() {
  const { tx } = useApp();
  const { content: { site: { about } } } = useContent();
  return (
    <section id="about" className="bg-page py-[60px]">
      <div className="mx-auto w-full max-w-[1065px] px-5 sm:px-10">
        <Reveal className="flex flex-col items-center gap-10">
          <div className="flex flex-col items-center gap-4 text-center">
            <span className="badge">{tx(about.badge)}</span>
            <h2 className="h2">{tx(about.title)}</h2>
          </div>
          <div className="relative w-full overflow-hidden rounded-3xl border border-primary/20 bg-[linear-gradient(164deg,#f0fdfa_6%,rgba(238,242,255,.6)_94%)] px-6 py-14 text-center dark:bg-[linear-gradient(164deg,#0c2a2a_6%,#101e3a_94%)] md:px-16 md:py-[78px]">
            <span aria-hidden dir="ltr" className="pointer-events-none absolute end-6 top-0 font-['Georgia'] text-[96px] font-black leading-[96px] text-primary/30">”</span>
            <p className="mx-auto max-w-[804px] text-lg font-semibold leading-8 text-ink dark:text-slate-300 md:text-2xl md:leading-[52.8px]">
              {tx(about.intro)}
              <b className="text-2xl text-heading md:text-[32px]">{tx(about.brand1)}</b>{" "}
              <b className="text-2xl text-primary md:text-[32px]">{tx(about.brand2)}</b>
              {tx(about.body)}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
