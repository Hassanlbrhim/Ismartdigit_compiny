"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useApp } from "./Providers";
import Logo from "./Logo";

const IDS = ["home", "about", "services", "works"] as const;
const iconBtn = "grid h-11 w-11 place-items-center rounded-xl text-heading transition duration-200 hover:bg-primary/10 active:scale-95";

export default function Navbar() {
  const { ui, lang, setLang, dark, toggleDark } = useApp();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("home");
  const closeBtn = useRef<HTMLButtonElement>(null);
  const progress = useSpring(useScroll().scrollYProgress, { stiffness: 140, damping: 28, mass: 0.3 }); // reading-progress bar (transform only)

  useEffect(() => {
    const onScroll = () => setScrolled(scrollY > 8);
    onScroll(); addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-45% 0px -50% 0px" });
    IDS.forEach(id => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => { removeEventListener("scroll", onScroll); io.disconnect(); };
  }, []);

  // Drawer: lock page scroll, focus the close button, close on Esc or when the screen grows to desktop width.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden"; closeBtn.current?.focus();
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", k);
    return () => { document.body.style.overflow = ""; removeEventListener("keydown", k); };
  }, [open]);
  useEffect(() => {
    const mq = matchMedia("(min-width:1024px)"); const f = () => mq.matches && setOpen(false);
    mq.addEventListener("change", f); return () => mq.removeEventListener("change", f);
  }, []);

  const links = IDS.map(id => [id, ui.nav[id]] as const);
  const goto = (id: string) => (e: React.MouseEvent) => { e.preventDefault(); setOpen(false); setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 60); };
  const off = lang === "ar" ? "-100%" : "100%"; // drawer sits on the "end" side: left in RTL, right in LTR

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 border-b pt-[env(safe-area-inset-top)] transition-[background-color,box-shadow,border-color] duration-300 ${scrolled ? "border-line bg-page/80 shadow-svc backdrop-blur-xl" : "border-transparent"}`}>
        <div className="wrap flex h-16 items-center justify-between gap-3">
          <Logo />
          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {links.map(([id, label]) => (
              <a key={id} href={`#${id}`} aria-current={active === id ? "true" : undefined}
                className={`relative rounded-lg px-4 py-2.5 text-base font-semibold transition-colors ${active === id ? "text-primary" : "text-ink hover:text-primary dark:text-slate-300"}`}>
                {active === id && <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-lg bg-primary/10" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
                {label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-1">
            <a href="#contact" className="hidden h-11 items-center rounded-xl bg-primary px-5 text-sm font-bold text-white transition duration-200 hover:brightness-95 active:scale-95 sm:inline-flex">{ui.contactUs}</a>
            <button onClick={() => setLang(lang === "ar" ? "en" : "ar")} className={`${iconBtn} w-auto min-w-11 px-3 text-sm font-bold`} aria-label="Language">{ui.langToggle}</button>
            <button onClick={toggleDark} className={iconBtn} aria-label={ui.themeToggle}>{dark ? <Sun size={18} /> : <Moon size={18} />}</button>
            <button onClick={() => setOpen(true)} className={`${iconBtn} lg:hidden`} aria-haspopup="dialog" aria-expanded={open} aria-label="Menu"><Menu size={22} /></button>
          </div>
        </div>
        <motion.span aria-hidden style={{ scaleX: progress }} className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-primary rtl:origin-right" />
      </header>

      {/* Drawer lives outside <header>: backdrop-filter there would trap `fixed` children inside the header box. */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div key="bd" className="fixed inset-0 z-[55] bg-secondary/50 backdrop-blur-sm lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} />
            <motion.aside key="dr" role="dialog" aria-modal="true" aria-label="Menu"
              className="fixed inset-y-0 end-0 z-[60] flex w-[min(86vw,360px)] flex-col bg-page pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)] shadow-2xl lg:hidden"
              initial={{ x: off }} animate={{ x: 0 }} exit={{ x: off }} transition={{ type: "spring", damping: 32, stiffness: 320 }}>
              <div className="flex h-16 shrink-0 items-center justify-between px-5">
                <Logo />
                <button ref={closeBtn} onClick={() => setOpen(false)} className={iconBtn} aria-label="Close"><X size={22} /></button>
              </div>
              <nav aria-label="Menu" className="flex flex-1 flex-col overflow-y-auto overscroll-contain px-5 py-2">
                {links.map(([id, label], i) => (
                  <motion.a key={id} href={`#${id}`} onClick={goto(id)} initial={{ opacity: 0, x: lang === "ar" ? -16 : 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 + i * 0.05 }}
                    className={`flex min-h-[56px] items-center justify-between border-b border-line text-xl font-bold ${active === id ? "text-primary" : "text-heading"}`}>
                    {label}{active === id && <span className="h-2 w-2 rounded-full bg-primary" />}
                  </motion.a>
                ))}
              </nav>
              <div className="shrink-0 space-y-3 border-t border-line p-5">
                <a href="#contact" onClick={goto("contact")} className="flex h-12 items-center justify-center rounded-xl bg-primary text-base font-bold text-white shadow-proj transition active:scale-[0.98]">{ui.contactUs}</a>
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={() => setLang(lang === "ar" ? "en" : "ar")} className="flex h-12 items-center justify-center rounded-xl border border-fieldline font-bold text-heading transition active:scale-[0.98]">{ui.langToggle}</button>
                  <button onClick={toggleDark} aria-label={ui.themeToggle} className="flex h-12 items-center justify-center rounded-xl border border-fieldline text-heading transition active:scale-[0.98]">{dark ? <Sun size={20} /> : <Moon size={20} />}</button>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
