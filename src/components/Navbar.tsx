"use client";
import { useEffect, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useApp } from "./Providers";
import Logo from "./Logo";

const IDS = ["home", "about", "services", "works"] as const;

export default function Navbar() {
  const { ui, lang, setLang, dark, toggleDark } = useApp();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("home");

  useEffect(() => {
    const onScroll = () => setScrolled(scrollY > 8);
    onScroll(); addEventListener("scroll", onScroll, { passive: true });
    // Scroll-spy: highlight the section currently crossing the middle of the viewport.
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-45% 0px -50% 0px" });
    IDS.forEach(id => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => { removeEventListener("scroll", onScroll); io.disconnect(); };
  }, []);

  const links = IDS.map(id => [id, ui.nav[id]] as const);
  const icon = "grid h-10 w-10 place-items-center rounded-lg text-heading transition hover:bg-primary/10";

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled || open ? "border-b border-line bg-page/75 shadow-svc backdrop-blur-xl" : "bg-transparent"}`}>
      <div className="wrap flex h-16 items-center justify-between gap-2 sm:gap-4">
        <Logo />
        <nav aria-label="Main" className="hidden items-center gap-2 md:flex">
          {links.map(([id, label]) => (
            <a key={id} href={`#${id}`} aria-current={active === id ? "true" : undefined}
              className={`rounded-lg px-4 py-2 text-base font-semibold transition ${active === id ? "bg-primary/10 text-primary" : "text-ink hover:text-primary dark:text-slate-300"}`}>{label}</a>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
          <a href="#contact" className="hidden h-10 items-center rounded-[10px] bg-primary px-5 text-sm font-bold text-white transition hover:brightness-95 sm:inline-flex">{ui.contactUs}</a>
          <button onClick={() => setLang(lang === "ar" ? "en" : "ar")} className={`${icon} w-auto px-2 text-sm font-bold sm:px-3`} aria-label="Language">{ui.langToggle}</button>
          <button onClick={toggleDark} className={icon} aria-label={ui.themeToggle}>{dark ? <Sun size={18} /> : <Moon size={18} />}</button>
          <button onClick={() => setOpen(!open)} className={`${icon} md:hidden`} aria-expanded={open} aria-label="Menu">{open ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
      </div>
      {open && (
        <div className="wrap border-t border-line pb-4 md:hidden">
          {[...links, ["contact", ui.contactUs] as const].map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className="block py-3 text-lg font-semibold text-heading">{label}</a>
          ))}
        </div>
      )}
    </header>
  );
}
