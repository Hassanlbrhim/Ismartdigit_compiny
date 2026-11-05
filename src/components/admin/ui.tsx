"use client";
// Small admin UI kit: buttons, fields, bilingual field, modal, toggle, image input, toasts.
import { ButtonHTMLAttributes, ReactNode, createContext, useContext, useEffect, useState } from "react";
import { ImagePlus, Trash2, X } from "lucide-react";
import type { L } from "@/lib/types";
import { fileToDataUrl } from "@/lib/utils";

export const panel = "rounded-2xl bg-card p-5 shadow-svc ring-1 ring-line";
export const ToastCtx = createContext<(m: string, ok?: boolean) => void>(() => {});
export const useToast = () => useContext(ToastCtx);

export function Btn({ variant = "primary", className = "", ...p }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" | "danger" }) {
  const v = { primary: "bg-primary text-white hover:brightness-95", ghost: "border border-fieldline text-title hover:border-primary hover:text-primary", danger: "bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-500/10" }[variant];
  return <button {...p} className={`inline-flex h-10 items-center justify-center gap-2 rounded-[10px] px-4 text-sm font-bold transition disabled:opacity-50 ${v} ${className}`} />;
}
export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return <label className="flex flex-col gap-1.5"><span className="text-sm font-semibold text-title">{label}</span>{children}{hint && <span className="text-xs text-sub">{hint}</span>}</label>;
}
export const Input = (p: React.InputHTMLAttributes<HTMLInputElement>) => <input {...p} className={`input h-11 ${p.className ?? ""}`} />;
export const Area = (p: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => <textarea {...p} className={`input min-h-[96px] ${p.className ?? ""}`} />;

/** Arabic + English inputs side by side. */
export function Bi({ label, value, onChange, area, hint }: { label: string; value: L; onChange: (v: L) => void; area?: boolean; hint?: string }) {
  const C = area ? Area : Input;
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-sm font-semibold text-title">{label}</span>
      <div className="grid gap-2 md:grid-cols-2">
        <C dir="rtl" placeholder="العربية" value={value.ar} onChange={(e: any) => onChange({ ...value, ar: e.target.value })} />
        <C dir="ltr" placeholder="English" value={value.en} onChange={(e: any) => onChange({ ...value, en: e.target.value })} />
      </div>
      {hint && <span className="text-xs text-sub">{hint}</span>}
    </div>
  );
}
export function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button type="button" role="switch" aria-checked={checked} aria-label={label} onClick={() => onChange(!checked)} className={`relative h-6 w-11 shrink-0 rounded-full transition ${checked ? "bg-primary" : "bg-slate-300 dark:bg-slate-600"}`}>
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${checked ? "end-0.5" : "start-0.5"}`} />
    </button>
  );
}
export function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  useEffect(() => { const k = (e: KeyboardEvent) => e.key === "Escape" && onClose(); addEventListener("keydown", k); return () => removeEventListener("keydown", k); }, [onClose]);
  return (
    <div className="fixed inset-0 z-[70] grid place-items-center bg-black/50 p-4" onMouseDown={onClose}>
      <div role="dialog" aria-modal="true" onMouseDown={e => e.stopPropagation()} className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-card p-6 shadow-2xl">
        <div className="mb-5 flex items-center justify-between"><h2 className="text-xl font-black text-title">{title}</h2><button onClick={onClose} aria-label="إغلاق" className="grid h-9 w-9 place-items-center rounded-lg hover:bg-line"><X size={18} /></button></div>
        {children}
      </div>
    </div>
  );
}
export function ImageInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const toast = useToast();
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <div className="h-20 w-32 shrink-0 overflow-hidden rounded-lg bg-[#a3a3a3]">{value && <img src={value} alt="" className="h-full w-full object-cover" />}</div>
        <div className="flex flex-col gap-2">
          <label className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-[10px] border border-fieldline px-4 text-sm font-bold text-title hover:border-primary">
            <ImagePlus size={16} />رفع صورة
            <input type="file" accept="image/*" hidden onChange={async e => { const f = e.target.files?.[0]; if (!f) return; try {
              const r = await fetch("/api/upload", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ dataUrl: await fileToDataUrl(f, 1000) }) });
              if (!r.ok) throw new Error();
              onChange((await r.json()).url);
            } catch { toast("تعذر رفع الصورة. تأكد من تسجيل الدخول وأن الحجم مناسب.", false); }
            e.target.value = ""; }} />
          </label>
          {value && <Btn type="button" variant="danger" onClick={() => onChange("")}><Trash2 size={14} />إزالة</Btn>}
        </div>
      </div>
      <Input dir="ltr" placeholder="أو الصق رابط الصورة (https://… أو /projects/x.png)" value={value} onChange={e => onChange(e.target.value)} />
    </div>
  );
}
export function useConfirm() { return (m: string) => confirm(m); }
export function Empty({ children }: { children: ReactNode }) { return <p className="py-10 text-center text-sub">{children}</p>; }
export function useToastHost() {
  const [t, setT] = useState<{ m: string; ok: boolean } | null>(null);
  useEffect(() => { if (!t) return; const id = setTimeout(() => setT(null), 3200); return () => clearTimeout(id); }, [t]);
  return { push: (m: string, ok = true) => setT({ m, ok }), node: t && <div role="status" className={`fixed bottom-6 start-1/2 z-[80] -translate-x-1/2 rounded-xl px-5 py-3 text-sm font-bold text-white shadow-lg ${t.ok ? "bg-secondary" : "bg-red-600"}`}>{t.m}</div> };
}
