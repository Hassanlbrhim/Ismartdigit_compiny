import type { Metadata } from "next";
import { Cairo, Inter } from "next/font/google";
import { Providers } from "@/components/Providers";
import { getContent, isAdmin } from "@/lib/db";
import "./globals.css";

export const dynamic = "force-dynamic"; // content comes from the store on every request

const cairo = Cairo({ subsets: ["arabic", "latin"], variable: "--font-cairo", weight: ["400", "600", "700", "800", "900"] });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", weight: ["400", "700"] }); // used only inside the hero illustration (Figma uses Inter there)
export const metadata: Metadata = { title: "آي سمارت ديجيت | I Smart Digit", description: "حلول رقمية ذكية: تطبيقات، مواقع، أنظمة وذكاء اصطناعي." };

// Runs before paint so the page never flashes LTR / light.
const boot = `try{var l=localStorage.getItem('lang')||'ar',t=localStorage.getItem('theme'),d=document.documentElement;d.lang=l;d.dir=l==='ar'?'rtl':'ltr';if(t?t==='dark':matchMedia('(prefers-color-scheme: dark)').matches)d.classList.add('dark')}catch(e){}`;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const initial = await getContent(await isAdmin());
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} ${inter.variable}`} suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: boot }} /></head>
      <body><Providers initial={initial}>{children}</Providers></body>
    </html>
  );
}
