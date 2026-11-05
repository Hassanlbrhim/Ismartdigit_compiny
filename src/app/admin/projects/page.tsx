"use client";
import { useState } from "react";
import { ArrowDown, ArrowUp, Pencil, Plus, Trash2 } from "lucide-react";
import { useContent } from "@/components/Providers";
import { Area, Bi, Btn, Empty, Field, ImageInput, Input, Modal, Toggle, panel, useToast } from "@/components/admin/ui";
import type { Project } from "@/lib/types";
import { uid } from "@/lib/utils";

const blank = (): Project => ({ id: uid(), title: { ar: "", en: "" }, desc: { ar: "", en: "" }, tags: [], image: "", link: "", published: true });

function Form({ initial, onSave, onClose }: { initial: Project; onSave: (p: Project) => void; onClose: () => void }) {
  const [p, setP] = useState(initial);
  const [tags, setTags] = useState(initial.tags.join(", "));
  const [err, setErr] = useState("");
  const submit = () => {
    if (!p.title.ar.trim()) return setErr("عنوان المشروع بالعربية مطلوب.");
    if (p.link && !/^https?:\/\//i.test(p.link)) return setErr("الرابط يجب أن يبدأ بـ https://");
    onSave({ ...p, tags: tags.split(",").map(t => t.trim()).filter(Boolean) });
  };
  return (
    <div className="space-y-4">
      <Bi label="عنوان المشروع" value={p.title} onChange={title => setP({ ...p, title })} />
      <Bi label="الوصف" area value={p.desc} onChange={desc => setP({ ...p, desc })} />
      <Field label="التقنيات (مفصولة بفاصلة)"><Input dir="ltr" value={tags} onChange={e => setTags(e.target.value)} placeholder="React, Node.js, AWS" /></Field>
      <Field label="رابط المشروع (اختياري)"><Input dir="ltr" value={p.link} onChange={e => setP({ ...p, link: e.target.value })} placeholder="https://" /></Field>
      <Field label="صورة المشروع"><ImageInput value={p.image} onChange={image => setP({ ...p, image })} /></Field>
      <div className="flex items-center gap-3"><Toggle checked={p.published} onChange={published => setP({ ...p, published })} label="منشور" /><span className="text-sm font-semibold">منشور على الموقع</span></div>
      {err && <p role="alert" className="text-sm text-red-500">{err}</p>}
      <div className="flex justify-end gap-2 pt-2"><Btn variant="ghost" onClick={onClose}>إلغاء</Btn><Btn onClick={submit}>حفظ</Btn></div>
    </div>
  );
}

export default function Projects() {
  const { content, saveContent } = useContent(); const toast = useToast();
  const [edit, setEdit] = useState<Project | null>(null);
  const list = content.projects;
  const commit = async (projects: Project[], msg: string) => { const ok = await saveContent({ ...content, projects }); toast(ok ? msg : "تعذر الحفظ. تأكد من تسجيل الدخول.", ok); };
  const move = (i: number, d: number) => { const a = [...list]; const j = i + d; if (j < 0 || j >= a.length) return; [a[i], a[j]] = [a[j], a[i]]; commit(a, "تم تغيير الترتيب"); };
  const save = (p: Project) => { commit(list.some(x => x.id === p.id) ? list.map(x => x.id === p.id ? p : x) : [...list, p], "تم حفظ المشروع"); setEdit(null); };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between"><h1 className="text-3xl font-black">المشاريع</h1><Btn onClick={() => setEdit(blank())}><Plus size={16} />مشروع جديد</Btn></div>
      <div className={`${panel} !p-0 overflow-hidden`}>
        {!list.length ? <Empty>لا توجد مشاريع بعد.</Empty> : (
          <ul className="divide-y divide-line">
            {list.map((p, i) => (
              <li key={p.id} className="flex flex-wrap items-center gap-4 p-4">
                <div className="h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-[#a3a3a3]">{p.image && <img src={p.image} alt="" className="h-full w-full object-cover" />}</div>
                <div className="min-w-[160px] flex-1"><p className="font-bold">{p.title.ar || "(بدون عنوان)"}</p><p className="text-sm text-sub" dir="ltr">{p.tags.join(" · ")}</p></div>
                <div className="flex items-center gap-2 text-sm"><Toggle checked={p.published} onChange={v => commit(list.map(x => x.id === p.id ? { ...x, published: v } : x), v ? "تم النشر" : "تم الإخفاء")} label="نشر" />{p.published ? "منشور" : "مخفي"}</div>
                <div className="flex gap-1">
                  <Btn variant="ghost" className="!px-2.5" aria-label="أعلى" disabled={i === 0} onClick={() => move(i, -1)}><ArrowUp size={16} /></Btn>
                  <Btn variant="ghost" className="!px-2.5" aria-label="أسفل" disabled={i === list.length - 1} onClick={() => move(i, 1)}><ArrowDown size={16} /></Btn>
                  <Btn variant="ghost" onClick={() => setEdit(p)}><Pencil size={16} />تعديل</Btn>
                  <Btn variant="danger" aria-label="حذف" onClick={() => confirm(`حذف «${p.title.ar}»؟`) && commit(list.filter(x => x.id !== p.id), "تم الحذف")}><Trash2 size={16} /></Btn>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {edit && <Modal title={list.some(x => x.id === edit.id) ? "تعديل المشروع" : "مشروع جديد"} onClose={() => setEdit(null)}><Form initial={edit} onSave={save} onClose={() => setEdit(null)} /></Modal>}
    </div>
  );
}
