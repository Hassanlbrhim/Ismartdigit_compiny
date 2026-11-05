"use client";
import { useState } from "react";
import { CheckCircle2, FileText, Mail, Send, User } from "lucide-react";
import { useApp, useContent } from "./Providers";

type Errs = Partial<Record<"name" | "email" | "details", string>>;

// Figma: card with 4px teal gradient bar, p48, bottom radius 28; inputs 48px r10 #f8fafc / #e2e8f0; CTA r16 gradient + teal shadow.
export default function Contact() {
  const { tx, ui } = useApp();
  const { content: { site: { contact } } } = useContent();
  const f = ui.form;
  const [v, setV] = useState({ name: "", email: "", details: "", website: "" });
  const [errs, setErrs] = useState<Errs>({});
  const [state, setState] = useState<"idle" | "sending" | "ok" | "fail">("idle");

  const validate = (x = v): Errs => ({
    ...(x.name.trim().length < 2 && { name: f.errName }),
    ...(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(x.email.trim()) && { email: f.errEmail }),
    ...(x.details.trim().length < 10 && { details: f.errDetails }),
  });
  const set = (k: keyof typeof v, val: string) => { const n = { ...v, [k]: val }; setV(n); if (errs[k as keyof Errs]) setErrs(validate(n)); };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const er = validate(); setErrs(er);
    if (Object.keys(er).length) return;
    setState("sending");
    try {
      const r = await fetch("/api/inquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(v) });
      if (!r.ok) throw new Error();
      setState("ok"); setV({ name: "", email: "", details: "", website: "" });
    } catch { setState("fail"); }
  }

  const Label = ({ icon: I, text, htmlFor }: { icon: typeof User; text: string; htmlFor: string }) => (
    <label htmlFor={htmlFor} className="flex items-center gap-2 text-sm font-semibold leading-5 text-title"><I size={14} className="text-primary" />{text}</label>
  );
  const Err = ({ id, m }: { id: string; m?: string }) => m ? <p id={id} role="alert" className="text-sm text-red-500">{m}</p> : null;

  return (
    <section id="contact" className="bg-mint py-[60px]">
      <div className="mx-auto w-full max-w-[671px] px-5">
        <div className="h-1 rounded-2xl bg-gradient-to-r from-[#14b8a6] via-[#6ee7b7] to-[#14b8a6]" />
        <div className="rounded-b-[28px] bg-card p-6 shadow-svc sm:p-12">
          <div className="mb-10 flex flex-col items-center gap-4 text-center">
            <span className="badge">{tx(contact.badge)}</span>
            <h2 className="h2">{tx(contact.title)}</h2>
          </div>

          {state === "ok" ? (
            <div className="flex flex-col items-center gap-3 py-8 text-center" role="status">
              <CheckCircle2 size={48} className="text-primary" />
              <h3 className="text-2xl font-black text-title">{f.okTitle}</h3>
              <p className="text-sub">{f.okBody}</p>
              <button onClick={() => setState("idle")} className="mt-2 font-bold text-primary">{f.again}</button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="flex flex-col gap-7">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <Label icon={User} text={f.name} htmlFor="c-name" />
                  <input id="c-name" className="input h-[48px]" placeholder={f.namePh} value={v.name} onChange={e => set("name", e.target.value)} autoComplete="name" aria-invalid={!!errs.name} aria-describedby="e-name" />
                  <Err id="e-name" m={errs.name} />
                </div>
                <div className="flex flex-col gap-2">
                  <Label icon={Mail} text={f.email} htmlFor="c-email" />
                  <input id="c-email" type="email" dir="ltr" className="input h-[48px] rtl:text-right" placeholder={f.emailPh} value={v.email} onChange={e => set("email", e.target.value)} autoComplete="email" aria-invalid={!!errs.email} aria-describedby="e-email" />
                  <Err id="e-email" m={errs.email} />
                </div>
                <div className="flex flex-col gap-2">
                  <Label icon={FileText} text={f.details} htmlFor="c-details" />
                  <textarea id="c-details" className="input min-h-[138px] resize-y leading-[22.5px]" placeholder={f.detailsPh} value={v.details} onChange={e => set("details", e.target.value)} aria-invalid={!!errs.details} aria-describedby="e-details" />
                  <Err id="e-details" m={errs.details} />
                </div>
                {/* Honeypot: invisible to people, bots fill it */}
                <input tabIndex={-1} autoComplete="off" aria-hidden className="hidden" name="website" value={v.website} onChange={e => set("website", e.target.value)} />
              </div>
              {state === "fail" && <p role="alert" className="text-center text-sm text-red-500">{f.errServer}</p>}
              <button disabled={state === "sending"} className="flex items-center justify-center gap-[10px] rounded-2xl bg-[linear-gradient(175deg,#2eb98c_0%,#0d9488_100%)] py-4 text-base font-black leading-6 text-white shadow-send transition hover:brightness-95 disabled:opacity-60">
                <Send size={17} className="rtl:-scale-x-100" />{state === "sending" ? f.sending : f.send}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
