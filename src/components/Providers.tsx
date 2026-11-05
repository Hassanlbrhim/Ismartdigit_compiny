"use client";
// Two contexts: App (language, theme, UI strings) and Content (editable site data + save).
import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from "react";
import type { Content, L, Lang } from "@/lib/types";
import { ui as UI, Dict } from "@/lib/i18n";

interface App { lang: Lang; setLang: (l: Lang) => void; dark: boolean; toggleDark: () => void; ui: Dict; tx: (l: L) => string }
interface Cnt { content: Content; saveContent: (next: Content) => Promise<boolean> }
const AppCtx = createContext<App | null>(null);
const CntCtx = createContext<Cnt | null>(null);

export function Providers({ children, initial }: { children: ReactNode; initial: Content }) {
  const [lang, setLang] = useState<Lang>("ar");
  const [dark, setDark] = useState(false);
  const [content, setContent] = useState<Content>(initial);

  useEffect(() => {
    setLang((localStorage.getItem("lang") as Lang) || "ar");
    const t = localStorage.getItem("theme");
    setDark(t ? t === "dark" : matchMedia("(prefers-color-scheme: dark)").matches);
  }, []);
  useEffect(() => {
    const h = document.documentElement;
    h.lang = lang; h.dir = lang === "ar" ? "rtl" : "ltr"; h.classList.toggle("dark", dark);
    localStorage.setItem("lang", lang); localStorage.setItem("theme", dark ? "dark" : "light");
  }, [lang, dark]);

  // Optimistic update, then persist. Only works when the visitor holds an admin session (server enforces it).
  const saveContent = useCallback(async (next: Content) => {
    setContent(next);
    try { return (await fetch("/api/content", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(next) })).ok; }
    catch { return false; }
  }, []);

  return (
    <AppCtx.Provider value={{ lang, setLang, dark, toggleDark: () => setDark(v => !v), ui: UI[lang], tx: l => l[lang] || l.ar }}>
      <CntCtx.Provider value={{ content, saveContent }}>{children}</CntCtx.Provider>
    </AppCtx.Provider>
  );
}
export const useApp = () => { const c = useContext(AppCtx); if (!c) throw new Error("Providers missing"); return c; };
export const useContent = () => { const c = useContext(CntCtx); if (!c) throw new Error("Providers missing"); return c; };
