import { NextRequest, NextResponse } from "next/server";
import { COOKIE, verifySession } from "@/lib/auth";

// Gate every /admin page (except the login screen) behind the signed session cookie.
export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === "/admin/login") return NextResponse.next();
  if (await verifySession(req.cookies.get(COOKIE)?.value)) return NextResponse.next();
  return NextResponse.redirect(new URL("/admin/login", req.url));
}
export const config = { matcher: ["/admin/:path*"] };
