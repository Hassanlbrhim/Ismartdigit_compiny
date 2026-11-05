import { NextRequest, NextResponse } from "next/server";
import { getContent, isAdmin, saveContent } from "@/lib/db";
import type { Content } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getContent(await isAdmin()));
}

// Admin only: replace site copy, services and projects in one write.
export async function PUT(req: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const body = (await req.json().catch(() => null)) as Content | null;
  if (!body?.site || !Array.isArray(body.services) || !Array.isArray(body.projects)) return NextResponse.json({ error: "bad_request" }, { status: 400 });
  if (JSON.stringify(body).length > 2_000_000) return NextResponse.json({ error: "too_large" }, { status: 413 });
  await saveContent(body);
  return NextResponse.json({ ok: true });
}
