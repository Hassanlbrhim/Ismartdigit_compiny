import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { isAdmin, store } from "@/lib/db";

export const dynamic = "force-dynamic";

// Admin only: stores an image (already resized in the browser) and returns a short URL for it.
// Images live outside the content JSON so pages stay small and images are cacheable.
export async function POST(req: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { dataUrl } = await req.json().catch(() => ({}));
  const head = typeof dataUrl === "string" ? /^data:(image\/(?:jpeg|png|webp));base64,/.exec(dataUrl.slice(0, 40)) : null;
  if (!head) return NextResponse.json({ error: "bad_image" }, { status: 400 });
  const buf = Buffer.from(dataUrl.slice(head[0].length), "base64");
  if (!buf.length || buf.length > 3_000_000) return NextResponse.json({ error: "too_large" }, { status: 413 });
  const id = randomBytes(8).toString("hex");
  await store.saveImage(id, head[1], buf);
  return NextResponse.json({ url: `/api/img/${id}` });
}
