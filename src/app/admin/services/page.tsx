"use client";
import { useState } from "react";
import { ArrowDown, ArrowUp, Pencil, Plus, Trash2 } from "lucide-react";
import { useContent } from "@/components/Providers";
import { Bi, Btn, Empty, Field, Modal, Toggle, panel, useToast } from "@/components/admin/ui";
import { ICONS, IconName } from "@/lib/icons";
import type { Service } from "@/lib/types";
import { uid } from "@/lib/utils";

const blank = (): Service => ({ id: uid(), icon: "Code", color: "#2eb98c", active: true, tag: { ar: "", en: "" }, title: { ar: "", en: "" }, body: { ar: "", en: "" } });

function Form({ initial, onSave, onClose }: { initial: Service; onSave: (s: Service) => void; onClose: () => void }) {
  const [s, setS] = useState(initial); const [err, setErr] = useState("");
  return (
    <div className="space-y-4">
      <Bi label="الوسم (يظهر أعلى البطاقة)" value={s.tag} onChange={tag => setS({ ...s, tag })} />
      <Bi label="عنوان الخدمة" value={s.title} onChange={title => setS({ ...s, title })} />
      <Bi label="الوصف" area value={s.body} onChange={body => setS({ ...s, body })} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="الأيقونة">
          <div className="grid grid-cols-6 gap-1.5">{(Object.keys(ICONS) as IconName[]).map(n => { const I = ICONS[n]; return (
            <button key={n} type="button" title={n} onClick={() => setS({ ...s, icon: n })} className={`grid h-10 place-items-center rounded-lg border transition ${s.icon === n ? "border-primary bg-primary/10 text-primary" : "border-fieldline text-sub hover:border-primary"}`}><I size={18} /></button>); })}</div>
        </Field>
        <Field label="اللون">
          <div className="flex items-center gap-2"><input type="color" value={s.color} onChange={e => setS({ ...s, color: e.target.value })} className="h-11 w-14 cursor-pointer rounded-lg border border-fieldline bg-transparent" /><input dir="ltr" className="input h-11" value={s.color} onChange={e => setS({ ...s, color: e.target.value })} /></div>
        </Field>
      </div>
      <div className="flex items-center gap-3"><Toggle checked={s.active} onChange={active => setS({ ...s, active })} label="مفعّلة" /><span className="text-sm font-semibold">تظهر على الموقع</span></div>
      {err && <p role="alert" className="text-sm text-red-500">{err}</p>}
      <div className="flex justify-end gap-2 pt-2"><Btn variant="ghost" onClick={onClose}>إلغاء</Btn>
        <Btn onClick={() => !s.title.ar.trim() ? setErr("عنوان الخدمة بالعربية مطلوب.") : !/^#[0-9a-f]{6}$/i.test(s.color) ? setErr("اللون يجب أن يكون بصيغة #RRGGBB") : onSave(s)}>حفظ</Btn></div>
    </div>
  );
}

export default function Services() {
  const { content, saveContent } = useContent(); const toast = useToast();
  const [edit, setEdit] = useState<Service | null>(null);
  const list = content.services;
  const commit = async (services: Service[], msg: string) => { const ok = await saveContent({ ...content, services }); toast(ok ? msg : "تعذر الحفظ. تأكد من تسجيل الدخول.", ok); };
  const move = (i: number, d: number) => { const a = [...list]; const j = i + d; if (j < 0 || j >= a.length) return; [a[i], a[j]] = [a[j], a[i]]; commit(a, "تم تغيير الترتيب"); };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between"><h1 className="text-3xl font-black">الخدمات</h1><Btn onClick={() => setEdit(blank())}><Plus size={16} />خدمة جديدة</Btn></div>
      <div className={`${panel} !p-0 overflow-hidden`}>
        {!list.length ? <Empty>لا توجد خدمات.</Empty> : <ul className="divide-y divide-line">{list.map((s, i) => { const I = ICONS[s.icon as IconName] ?? ICONS.Code; return (
          <li key={s.id} className="flex flex-wrap items-center gap-4 p-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[14px]" style={{ color: s.color, background: s.color + "1a" }}><I size={20} /></span>
            <div className="min-w-[160px] flex-1"><p className="font-bold">{s.title.ar}</p><p className="text-sm text-sub" dir="ltr">{s.title.en}</p></div>
            <div className="flex items-center gap-2 text-sm"><Toggle checked={s.active} onChange={v => commit(list.map(x => x.id === s.id ? { ...x, active: v } : x), v ? "تم التفعيل" : "تم الإخفاء")} label="تفعيل" />{s.active ? "مفعّلة" : "مخفية"}</div>
            <div className="flex gap-1">
              <Btn variant="ghost" className="!px-2.5" aria-label="أعلى" disabled={i === 0} onClick={() => move(i, -1)}><ArrowUp size={16} /></Btn>
              <Btn variant="ghost" className="!px-2.5" aria-label="أسفل" disabled={i === list.length - 1} onClick={() => move(i, 1)}><ArrowDown size={16} /></Btn>
              <Btn variant="ghost" onClick={() => setEdit(s)}><Pencil size={16} />تعديل</Btn>
              <Btn variant="danger" aria-label="حذف" onClick={() => confirm(`حذف «${s.title.ar}»؟`) && commit(list.filter(x => x.id !== s.id), "تم الحذف")}><Trash2 size={16} /></Btn>
            </div>
          </li>); })}</ul>}
      </div>
      {edit && <Modal title={list.some(x => x.id === edit.id) ? "تعديل الخدمة" : "خدمة جديدة"} onClose={() => setEdit(null)}>
        <Form initial={edit} onClose={() => setEdit(null)} onSave={s => { commit(list.some(x => x.id === s.id) ? list.map(x => x.id === s.id ? s : x) : [...list, s], "تم حفظ الخدمة"); setEdit(null); }} /></Modal>}
    </div>
  );
}
