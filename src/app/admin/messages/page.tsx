"use client";
import { useEffect, useMemo, useState } from "react";
import { Mail, MailOpen, Trash2 } from "lucide-react";
import { Btn, Empty, Input, panel, useToast } from "@/components/admin/ui";
import type { Inquiry } from "@/lib/types";

export default function Messages() {
  const toast = useToast();
  const [list, setList] = useState<Inquiry[] | null>(null);
  const [sel, setSel] = useState<string | null>(null);
  const [q, setQ] = useState(""); const [onlyNew, setOnlyNew] = useState(false);

  useEffect(() => { fetch("/api/inquiries").then(r => r.json()).then(setList).catch(() => { setList([]); toast("تعذر تحميل الرسائل", false); }); }, []); // eslint-disable-line

  const shown = useMemo(() => (list ?? []).filter(i => (!onlyNew || !i.read) && (i.name + i.email + i.details).toLowerCase().includes(q.toLowerCase())), [list, q, onlyNew]);
  const cur = list?.find(i => i.id === sel) ?? null;

  const setRead = async (id: string, read: boolean) => { setList(l => l!.map(i => i.id === id ? { ...i, read } : i)); await fetch("/api/inquiries", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, read }) }); };
  const open = (i: Inquiry) => { setSel(i.id); if (!i.read) setRead(i.id, true); };
  const del = async (id: string) => { if (!confirm("حذف هذه الرسالة نهائياً؟")) return; const r = await fetch(`/api/inquiries?id=${id}`, { method: "DELETE" }); if (r.ok) { setList(l => l!.filter(i => i.id !== id)); setSel(null); toast("تم حذف الرسالة"); } else toast("تعذر الحذف", false); };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black">رسائل العملاء</h1>
      <div className="flex flex-wrap gap-3">
        <Input className="max-w-xs" placeholder="بحث بالاسم أو البريد أو النص…" value={q} onChange={e => setQ(e.target.value)} />
        <Btn variant={onlyNew ? "primary" : "ghost"} onClick={() => setOnlyNew(!onlyNew)}>غير المقروءة فقط</Btn>
      </div>
      <div className="grid gap-4 lg:grid-cols-[380px_1fr]">
        <div className={`${panel} !p-0 max-h-[70vh] overflow-y-auto`}>
          {list === null ? <Empty>جارٍ التحميل…</Empty> : !shown.length ? <Empty>لا توجد رسائل.</Empty> : (
            <ul className="divide-y divide-line">{shown.map(i => (
              <li key={i.id}><button onClick={() => open(i)} className={`w-full p-4 text-start transition hover:bg-line ${sel === i.id ? "bg-primary/10" : ""}`}>
                <div className="flex items-center justify-between gap-2"><span className={`truncate ${i.read ? "font-semibold" : "font-black"}`}>{i.name}</span><time className="shrink-0 text-xs text-sub">{new Date(i.date).toLocaleDateString("ar-EG")}</time></div>
                <p className="truncate text-sm text-sub">{i.details}</p>
                {!i.read && <span className="mt-1 inline-block rounded-full bg-primary/15 px-2 py-0.5 text-xs font-bold text-primary">جديد</span>}
              </button></li>))}</ul>
          )}
        </div>
        <div className={panel}>
          {!cur ? <Empty>اختر رسالة لعرضها.</Empty> : (
            <div className="space-y-4">
              <div><h2 className="text-2xl font-black">{cur.name}</h2><a href={`mailto:${cur.email}`} dir="ltr" className="text-primary">{cur.email}</a><p className="text-xs text-sub">{new Date(cur.date).toLocaleString("ar-EG")}</p></div>
              <p className="whitespace-pre-wrap rounded-xl bg-field p-4 leading-8">{cur.details}</p>
              <div className="flex flex-wrap gap-2">
                <a href={`mailto:${cur.email}?subject=${encodeURIComponent("رد على استفسارك - I Smart Digit")}`} className="inline-flex h-10 items-center gap-2 rounded-[10px] bg-primary px-4 text-sm font-bold text-white"><Mail size={16} />رد بالبريد</a>
                <Btn variant="ghost" onClick={() => setRead(cur.id, !cur.read)}><MailOpen size={16} />{cur.read ? "تحديد كغير مقروء" : "تحديد كمقروء"}</Btn>
                <Btn variant="danger" onClick={() => del(cur.id)}><Trash2 size={16} />حذف</Btn>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
