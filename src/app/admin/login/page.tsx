"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import { Mark } from "@/components/Logo";
import { Btn, Field, Input } from "@/components/admin/ui";

export default function Login() {
  const router = useRouter();
  const [err, setErr] = useState(""); const [busy, setBusy] = useState(false);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true); setErr("");
    const f = new FormData(e.currentTarget);
    const r = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: f.get("email"), password: f.get("password") }) });
    if (r.ok) { router.replace("/admin"); router.refresh(); return; }
    setErr(r.status === 429 ? "محاولات كثيرة. حاول بعد 10 دقائق." : "البريد الإلكتروني أو كلمة المرور غير صحيحة."); setBusy(false);
  }
  return (
    <main className="grid min-h-screen place-items-center bg-secondary px-5">
      <form onSubmit={submit} className="w-full max-w-sm space-y-5 rounded-[20px] bg-card p-8 shadow-2xl">
        <div className="flex flex-col items-center gap-3 text-center"><Mark size={44} /><h1 className="text-2xl font-black text-title">تسجيل دخول المشرف</h1></div>
        <Field label="البريد الإلكتروني"><Input name="email" type="email" required autoComplete="username" dir="ltr" /></Field>
        <Field label="كلمة المرور"><Input name="password" type="password" required autoComplete="current-password" dir="ltr" /></Field>
        {err && <p role="alert" className="text-sm text-red-500">{err}</p>}
        <Btn disabled={busy} className="w-full"><Lock size={16} />{busy ? "جارٍ التحقق..." : "دخول"}</Btn>
      </form>
    </main>
  );
}
