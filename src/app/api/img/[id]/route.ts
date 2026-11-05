import { store } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  if (!/^[a-f0-9]{16}$/.test(params.id)) return new Response("Not found", { status: 404 });
  const img = await store.getImage(params.id);
  if (!img) return new Response("Not found", { status: 404 });
  return new Response(new Uint8Array(img.buf), { headers: { "Content-Type": img.mime, "Cache-Control": "public, max-age=31536000, immutable" } });
}
