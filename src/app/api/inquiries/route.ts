import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { isAdmin, store } from "@/lib/db";

export const dynamic = "force-dynamic";
const hits = new Map<string, number[]>(); // 5 submissions / hour / IP (per server instance: a speed bump, not a guarantee)
const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

// Public: contact form submission.
export async function POST(req: NextRequest) {
  const b = await req.json().catch(() => ({}));
  if (b.website) return NextResponse.json({ ok: true }); // honeypot: bots fill the hidden field, people don't

  const ip = req.headers.get("x-nf-client-connection-ip") || req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";
  const recent = (hits.get(ip) ?? []).filter(t => Date.now() - t < 3_600_000);
  if (recent.length >= 5) return NextResponse.json({ error: "too_many" }, { status: 429 });

  const name = clean(b.name, 80), email = clean(b.email, 120), details = clean(b.details, 2000);
  if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || details.length < 10) return NextResponse.json({ error: "invalid" }, { status: 400 });

  hits.set(ip, [...recent, Date.now()]);
  await store.addInquiry({ id: randomBytes(6).toString("hex"), name, email, details, date: new Date().toISOString(), read: false });
  return NextResponse.json({ ok: true });
}

// Everything below is admin only.
export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  return NextResponse.json(await store.listInquiries());
}
export async function PATCH(req: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { id, read } = await req.json().catch(() => ({}));
  if (typeof id === "string") await store.setRead(id, !!read);
  return NextResponse.json({ ok: true });
}
export async function DELETE(req: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const id = req.nextUrl.searchParams.get("id");
  if (id) await store.removeInquiry(id);
  return NextResponse.json({ ok: true });
}
