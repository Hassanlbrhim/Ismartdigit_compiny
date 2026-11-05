"use client";
import { ReactNode, useState } from "react";
import { Save } from "lucide-react";
import { useContent } from "@/components/Providers";
import { Bi, Btn, Field, ImageInput, Input, panel, useToast } from "@/components/admin/ui";
import { setIn } from "@/lib/utils";
import type { L, Site } from "@/lib/types";

const Sec = ({ title, children }: { title: string; children: ReactNode }) => <section className={`${panel} space-y-4`}><h2 className="text-xl font-black">{title}</h2>{children}</section>;

export default function ContentEditor() {
  const { content, saveContent } = useContent(); const toast = useToast();
  const [d, setD] = useState<Site>(content.site);
  const [busy, setBusy] = useState(false);
  const set = (path: (string | number)[], v: unknown) => setD(s => setIn(s, path, v));
  const bi = (label: string, path: (string | number)[], get: L, area?: boolean, hint?: string) => <Bi label={label} area={area} hint={hint} value={get} onChange={v => set(path, v)} />;

  async function save() {
    setBusy(true); const ok = await saveContent({ ...content, site: d }); setBusy(false);
    toast(ok ? "تم حفظ المحتوى ونشره على الموقع" : "تعذر الحفظ. تأكد من تسجيل الدخول.", ok);
  }

  return (
    <div className="space-y-6 pb-24">
      <h1 className="text-3xl font-black">محتوى الموقع</h1>

      <Sec title="القسم الرئيسي (Hero)">
        {bi("السطر الصغير", ["hero", "eyebrow"], d.hero.eyebrow)}
        {bi("العنوان الرئيسي", ["hero", "title"], d.hero.title, true, "ضع الكلمات الخضراء بين [[ ]] مثل: نبتكر حلولاً [[رقمية ذكية]] تدفع أعمالك")}
        {bi("الوصف", ["hero", "lead"], d.hero.lead, true)}
        <div className="grid gap-4 md:grid-cols-2">{bi("نص الزر الأول", ["hero", "cta1"], d.hero.cta1)}{bi("نص الزر الثاني", ["hero", "cta2"], d.hero.cta2)}</div>
        <Field label="صورة الـ Hero (اختياري)" hint="إن لم تُرفع صورة تظهر الرسمة الافتراضية المطابقة لتصميم Figma. ارفع صورة فقط لو أردت استبدالها."><ImageInput value={d.hero.image} onChange={v => set(["hero", "image"], v)} /></Field>
      </Sec>

      <Sec title="الأرقام والإحصائيات">
        {d.stats.map((s, i) => (
          <div key={s.id} className="grid gap-3 rounded-xl border border-line p-4 md:grid-cols-[110px_80px_80px_1fr]">
            <Field label="الرقم"><Input type="number" step="any" dir="ltr" value={s.value} onChange={e => set(["stats", i, "value"], Number(e.target.value))} /></Field>
            <Field label="كسور"><Input type="number" min={0} max={2} dir="ltr" value={s.decimals} onChange={e => set(["stats", i, "decimals"], Math.min(2, Math.max(0, Number(e.target.value))))} /></Field>
            <Field label="قبل / بعد"><div className="flex gap-1"><Input dir="ltr" placeholder="+" value={s.prefix} onChange={e => set(["stats", i, "prefix"], e.target.value)} /><Input dir="ltr" placeholder="%" value={s.suffix} onChange={e => set(["stats", i, "suffix"], e.target.value)} /></div></Field>
            {bi("العنوان", ["stats", i, "label"], s.label)}
          </div>
        ))}
      </Sec>

      <Sec title="من نحن">
        {bi("الوسم", ["about", "badge"], d.about.badge)}
        {bi("العنوان", ["about", "title"], d.about.title)}
        <div className="grid gap-4 md:grid-cols-3">{bi("كلمة البداية", ["about", "intro"], d.about.intro)}{bi("اسم الشركة (كحلي)", ["about", "brand1"], d.about.brand1)}{bi("اسم الشركة (أخضر)", ["about", "brand2"], d.about.brand2)}</div>
        {bi("النص", ["about", "body"], d.about.body, true)}
      </Sec>

      <Sec title="عناوين الأقسام">
        {(["services", "works"] as const).map(k => (
          <div key={k} className="space-y-3 rounded-xl border border-line p-4"><p className="font-bold">{k === "services" ? "الخدمات" : "الأعمال"}</p>
            {bi("الوسم", [k, "badge"], d[k].badge)}{bi("العنوان", [k, "title"], d[k].title)}{bi("الوصف", [k, "sub"], d[k].sub)}</div>
        ))}
        <div className="space-y-3 rounded-xl border border-line p-4"><p className="font-bold">التواصل</p>{bi("الوسم", ["contact", "badge"], d.contact.badge)}{bi("العنوان", ["contact", "title"], d.contact.title)}</div>
      </Sec>

      <Sec title="بيانات التواصل والفوتر">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="البريد الإلكتروني"><Input dir="ltr" value={d.contact.email} onChange={e => set(["contact", "email"], e.target.value)} /></Field>
          <Field label="الهاتف (اتركه فارغاً لإخفائه)"><Input dir="ltr" value={d.contact.phone} onChange={e => set(["contact", "phone"], e.target.value)} placeholder="+20 ..." /></Field>
        </div>
        {bi("جملة الفوتر", ["footer", "tagline"], d.footer.tagline)}
        <div className="grid gap-4 md:grid-cols-2">{d.footer.socials.map((s, i) => <Field key={s.id} label={s.icon} hint="اتركه فارغاً لإخفاء الأيقونة"><Input dir="ltr" value={s.url === "#" ? "" : s.url} placeholder="https://" onChange={e => set(["footer", "socials", i, "url"], e.target.value)} /></Field>)}</div>
      </Sec>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-card/90 p-3 backdrop-blur lg:ps-64"><div className="mx-auto flex max-w-5xl justify-end"><Btn onClick={save} disabled={busy}><Save size={16} />{busy ? "جارٍ الحفظ…" : "حفظ ونشر"}</Btn></div></div>
    </div>
  );
}
