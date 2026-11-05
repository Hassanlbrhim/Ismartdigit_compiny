"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useContent } from "@/components/Providers";
import { panel } from "@/components/admin/ui";
import type { Inquiry } from "@/lib/types";

export default function Overview() {
  const { content } = useContent();
  const [inq, setInq] = useState<Inquiry[] | null>(null);
  useEffect(() => { fetch("/api/inquiries").then(r => r.ok ? r.json() : []).then(setInq).catch(() => setInq([])); }, []);
  const unread = inq?.filter(i => !i.read).length ?? 0;
  const cards: [string, number | string, string][] = [
    ["المشاريع المنشورة", content.projects.filter(p => p.published).length, "/admin/projects"],
    ["رسائل جديدة", inq ? unread : "…", "/admin/messages"],
    ["إجمالي الرسائل", inq ? inq.length : "…", "/admin/messages"],
    ["الخدمات المفعّلة", content.services.filter(s => s.active).length, "/admin/services"],
  ];
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-black">نظرة عامة</h1>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(([l, v, href]) => <Link key={l} href={href} className={`${panel} transition hover:-translate-y-0.5`}><p className="text-sm text-sub">{l}</p><p className="text-4xl font-black text-primary">{v}</p></Link>)}
      </div>
      <section className={panel}>
        <div className="mb-4 flex items-center justify-between"><h2 className="text-xl font-black">آخر الرسائل</h2><Link href="/admin/messages" className="text-sm font-bold text-primary">عرض الكل</Link></div>
        {!inq?.length ? <p className="py-6 text-sub">لا توجد رسائل بعد. ستظهر هنا عند إرسال نموذج التواصل من الموقع.</p> : (
          <ul className="divide-y divide-line">{inq.slice(0, 5).map(i => (
            <li key={i.id} className="flex items-start justify-between gap-4 py-3">
              <div className="min-w-0"><p className="font-bold">{i.name} {!i.read && <span className="ms-2 rounded-full bg-primary/15 px-2 py-0.5 text-xs text-primary">جديد</span>}</p><p className="truncate text-sm text-sub">{i.details}</p></div>
              <time className="shrink-0 text-xs text-sub">{new Date(i.date).toLocaleDateString("ar-EG")}</time>
            </li>))}</ul>
        )}
      </section>
    </div>
  );
}
