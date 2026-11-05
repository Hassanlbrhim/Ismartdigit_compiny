"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ExternalLink, FolderKanban, LayoutDashboard, LogOut, MessageSquare, PenSquare, Wrench } from "lucide-react";
import { ReactNode } from "react";
import { Mark } from "@/components/Logo";
import { ToastCtx, useToastHost } from "./ui";

const NAV = [
  ["/admin", "نظرة عامة", LayoutDashboard], ["/admin/projects", "المشاريع", FolderKanban], ["/admin/messages", "الرسائل", MessageSquare],
  ["/admin/services", "الخدمات", Wrench], ["/admin/content", "المحتوى", PenSquare],
] as const;

export default function AdminShell({ children }: { children: ReactNode }) {
  const path = usePathname(); const router = useRouter(); const toast = useToastHost();
  if (path === "/admin/login") return <div dir="rtl">{children}</div>;
  const logout = async () => { await fetch("/api/auth/logout", { method: "POST" }); router.replace("/admin/login"); };

  return (
    <ToastCtx.Provider value={toast.push}>
      <div dir="rtl" className="min-h-screen bg-band lg:flex">
        <aside className="bg-secondary text-white lg:sticky lg:top-0 lg:h-screen lg:w-64 lg:shrink-0">
          <div className="flex items-center justify-between gap-3 p-4 lg:flex-col lg:items-stretch lg:gap-8 lg:p-6">
            <div className="flex items-center gap-2"><Mark /><span className="font-black">لوحة التحكم</span></div>
            <nav className="flex gap-1 overflow-x-auto lg:flex-col" aria-label="Admin">
              {NAV.map(([href, label, I]) => {
                const on = href === "/admin" ? path === href : path.startsWith(href);
                return <Link key={href} href={href} className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold transition ${on ? "bg-primary text-white" : "text-white/70 hover:bg-white/10"}`}><I size={16} />{label}</Link>;
              })}
            </nav>
            <div className="flex gap-1 lg:mt-auto lg:flex-col">
              <a href="/" target="_blank" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/70 hover:bg-white/10"><ExternalLink size={16} />عرض الموقع</a>
              <button onClick={logout} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/70 hover:bg-white/10"><LogOut size={16} />خروج</button>
            </div>
          </div>
        </aside>
        <main className="min-w-0 flex-1 p-4 text-title sm:p-8">{children}</main>
      </div>
      {toast.node}
    </ToastCtx.Provider>
  );
}
