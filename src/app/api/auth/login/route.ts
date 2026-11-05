import { NextRequest, NextResponse } from "next/server";
import { COOKIE, createSession, credentialsOk } from "@/lib/auth";

const fails = new Map<string, number[]>(); // naive in-memory brute-force limiter (per IP, 5 fails / 10 min)

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-nf-client-connection-ip") || req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";
  const recent = (fails.get(ip) ?? []).filter(t => Date.now() - t < 600_000);
  if (recent.length >= 5) return NextResponse.json({ error: "too_many" }, { status: 429 });

  const { email, password } = await req.json().catch(() => ({}));
  if (typeof email !== "string" || typeof password !== "string" || !credentialsOk(email, password)) {
    fails.set(ip, [...recent, Date.now()]);
    return NextResponse.json({ error: "invalid" }, { status: 401 });
  }
  fails.delete(ip);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE, await createSession(), { httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 12 * 3600 });
  return res;
}
