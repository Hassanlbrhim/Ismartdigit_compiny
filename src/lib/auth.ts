// Edge-safe (Web Crypto only): used by middleware AND route handlers.
export const COOKIE = "admin_session";
const enc = new TextEncoder();
const b64 = (buf: ArrayBuffer) => btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
const secret = () => process.env.AUTH_SECRET || (process.env.NODE_ENV === "production" ? "" : "dev-only-secret");

async function hmac(msg: string) {
  const key = await crypto.subtle.importKey("raw", enc.encode(secret()), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return b64(await crypto.subtle.sign("HMAC", key, enc.encode(msg)));
}
export function safeEq(a: string, b: string) {
  if (a.length !== b.length) return false;
  let r = 0; for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}
export async function createSession() {
  const exp = String(Date.now() + 12 * 3600 * 1000);
  return `${exp}.${await hmac(exp)}`;
}
export async function verifySession(token?: string) {
  if (!token || !secret()) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig || Number(exp) < Date.now()) return false;
  return safeEq(sig, await hmac(exp));
}
export function credentialsOk(email: string, password: string) {
  const dev = process.env.NODE_ENV !== "production";
  const e = process.env.ADMIN_EMAIL || (dev ? "admin@ismartdigit.com" : "");
  const p = process.env.ADMIN_PASSWORD || (dev ? "change-me" : "");
  if (!e || !p) return false;
  return safeEq(email.trim().toLowerCase(), e.toLowerCase()) && safeEq(password, p);
}
