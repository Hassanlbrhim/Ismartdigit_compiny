"use client";
import { useApp, useContent } from "./Providers";
import Reveal from "./Reveal";

export default function About() {
  const { tx } = useApp();
  const { content: { site: { about } } } = useContent();
  return (
    <section id="about" className="bg-page py-12 sm:py-[60px]">
      <div className="mx-auto flex w-full max-w-[1065px] flex-col items-center gap-8 px-5 sm:gap-10 sm:px-10">
        <Reveal className="flex flex-col items-center gap-4 text-center">
          <span className="badge">{tx(about.badge)}</span>
          <h2 className="h2">{tx(about.title)}</h2>
        </Reveal>
        <Reveal i={1} className="w-full">
          <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-[linear-gradient(164deg,#f0fdfa_6%,rgba(238,242,255,.6)_94%)] px-5 py-12 text-center dark:bg-[linear-gradient(164deg,#0c2a2a_6%,#101e3a_94%)] sm:px-10 md:px-16 md:py-[78px]">
            <span aria-hidden dir="ltr" className="pointer-events-none absolute end-4 top-0 font-['Georgia'] text-[64px] font-black leading-[64px] text-primary/30 md:end-6 md:text-[96px] md:leading-[96px]">”</span>
            <p className="mx-auto max-w-[804px] text-fluid-quote font-semibold text-ink dark:text-slate-300">
              {tx(about.intro)}<b className="text-fluid-brand text-heading">{tx(about.brand1)}</b>{" "}<b className="text-fluid-brand text-primary">{tx(about.brand2)}</b>{tx(about.body)}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
