// Storage layer with two interchangeable backends, picked by env:
//   DATABASE_URL set  -> Neon Postgres (use this on Vercel / any serverless host)
//   DATABASE_URL unset -> JSON file in ./data (local dev, or a VPS with a persistent disk)
import { promises as fs } from "fs";
import path from "path";
import { cookies } from "next/headers";
import { revalidateTag, unstable_cache } from "next/cache";
import { neon } from "@neondatabase/serverless";
import { defaultContent } from "./defaults";
import { COOKIE, verifySession } from "./auth";
import type { Content, Inquiry } from "./types";

export interface Store {
  getContent(): Promise<Content>;
  saveContent(c: Content): Promise<void>;
  listInquiries(): Promise<Inquiry[]>;
  addInquiry(i: Inquiry): Promise<void>;
  setRead(id: string, read: boolean): Promise<void>;
  removeInquiry(id: string): Promise<void>;
  saveImage(id: string, mime: string, buf: Buffer): Promise<void>;
  getImage(id: string): Promise<{ mime: string; buf: Buffer } | null>;
}

/** Fill any key missing from stored data with defaults (keeps old databases working after updates). */
const normalize = (c?: Partial<Content> | null): Content =>
  c ? { site: { ...defaultContent.site, ...c.site }, services: c.services ?? defaultContent.services, projects: c.projects ?? defaultContent.projects } : defaultContent;

/* ------------------------------ file backend ------------------------------ */
const DIR = path.join(process.cwd(), "data");
type FileDb = { content?: Content; inquiries?: Inquiry[] };
let chain: Promise<unknown> = Promise.resolve();
const serial = <T>(fn: () => Promise<T>): Promise<T> => { const run = chain.then(fn); chain = run.catch(() => undefined); return run; }; // one writer at a time
const readFileDb = async (): Promise<FileDb> => { try { return JSON.parse(await fs.readFile(path.join(DIR, "db.json"), "utf8")); } catch { return {}; } };
const writeFileDb = async (d: FileDb) => { await fs.mkdir(DIR, { recursive: true }); const f = path.join(DIR, "db.json"); await fs.writeFile(f + ".tmp", JSON.stringify(d, null, 2)); await fs.rename(f + ".tmp", f); };

const fileStore: Store = {
  getContent: async () => normalize((await readFileDb()).content),
  saveContent: c => serial(async () => writeFileDb({ ...(await readFileDb()), content: c })),
  listInquiries: async () => (await readFileDb()).inquiries ?? [],
  addInquiry: i => serial(async () => { const d = await readFileDb(); await writeFileDb({ ...d, inquiries: [i, ...(d.inquiries ?? [])].slice(0, 1000) }); }),
  setRead: (id, read) => serial(async () => { const d = await readFileDb(); await writeFileDb({ ...d, inquiries: (d.inquiries ?? []).map(i => (i.id === id ? { ...i, read } : i)) }); }),
  removeInquiry: id => serial(async () => { const d = await readFileDb(); await writeFileDb({ ...d, inquiries: (d.inquiries ?? []).filter(i => i.id !== id) }); }),
  saveImage: async (id, mime, buf) => { const dir = path.join(DIR, "images"); await fs.mkdir(dir, { recursive: true }); await fs.writeFile(path.join(dir, id), buf); await fs.writeFile(path.join(dir, id + ".mime"), mime); },
  getImage: async id => { try { const dir = path.join(DIR, "images"); const [buf, mime] = await Promise.all([fs.readFile(path.join(dir, id)), fs.readFile(path.join(dir, id + ".mime"), "utf8")]); return { buf, mime }; } catch { return null; } },
};

/* ------------------------------ Neon backend ------------------------------ */
function neonStore(): Store {
  const sql = neon(process.env.DATABASE_URL!);
  let ready: Promise<unknown> | null = null;
  // Tables are created on first use, so there is nothing to run by hand.
  const init = () => (ready ??= (async () => {
    await sql`create table if not exists site_content (id int primary key, data jsonb not null)`;
    await sql`create table if not exists inquiries (id text primary key, name text not null, email text not null, details text not null, created_at timestamptz not null default now(), is_read boolean not null default false)`;
    await sql`create table if not exists images (id text primary key, mime text not null, data bytea not null, created_at timestamptz not null default now())`;
  })());
  const toBuf = (v: unknown): Buffer => (typeof v === "string" ? Buffer.from(v.startsWith("\\x") ? v.slice(2) : v, "hex") : Buffer.from(v as Uint8Array));

  return {
    async getContent() { await init(); const r = await sql`select data from site_content where id = 1`; return normalize(r[0]?.data as Content | undefined); },
    async saveContent(c) { await init(); await sql`insert into site_content (id, data) values (1, ${JSON.stringify(c)}::jsonb) on conflict (id) do update set data = excluded.data`; },
    async listInquiries() {
      await init();
      const r = await sql`select id, name, email, details, created_at, is_read from inquiries order by created_at desc limit 1000`;
      return r.map(x => ({ id: x.id, name: x.name, email: x.email, details: x.details, date: new Date(x.created_at).toISOString(), read: !!x.is_read }));
    },
    async addInquiry(i) { await init(); await sql`insert into inquiries (id, name, email, details, created_at) values (${i.id}, ${i.name}, ${i.email}, ${i.details}, ${i.date})`; },
    async setRead(id, read) { await init(); await sql`update inquiries set is_read = ${read} where id = ${id}`; },
    async removeInquiry(id) { await init(); await sql`delete from inquiries where id = ${id}`; },
    async saveImage(id, mime, buf) { await init(); await sql`insert into images (id, mime, data) values (${id}, ${mime}, decode(${buf.toString("hex")}, 'hex'))`; },
    async getImage(id) { await init(); const r = await sql`select mime, data from images where id = ${id}`; return r[0] ? { mime: r[0].mime as string, buf: toBuf(r[0].data) } : null; },
  };
}

export const store: Store = process.env.DATABASE_URL ? neonStore() : fileStore;

/* ------------------------------ shared helpers ------------------------------ */
export async function isAdmin() { return verifySession(cookies().get(COOKIE)?.value); }

// Content is read on every page view, so cache it; saving content purges the cache immediately.
const cached = unstable_cache(() => store.getContent(), ["site-content"], { tags: ["content"], revalidate: 600 });
export async function getContent(admin: boolean): Promise<Content> {
  const c = await cached();
  return admin ? c : { ...c, projects: c.projects.filter(p => p.published) };
}
export async function saveContent(c: Content) { await store.saveContent(c); revalidateTag("content"); }
