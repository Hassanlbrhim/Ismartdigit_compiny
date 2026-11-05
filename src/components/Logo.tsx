"use client";
import { useApp } from "./Providers";

// Real brand mark from Figma ("icon insta 1", 32px, rounded). File: /public/logo.png
export function Mark({ size = 32 }: { size?: number }) {
  return <img src="/logo.png" alt="" width={size} height={size} style={{ width: size, height: size }} className="shrink-0 rounded-lg" />;
}
export default function Logo({ light = false }: { light?: boolean }) {
  const { ui } = useApp();
  return (
    <a href="#home" className="flex items-center gap-2">
      <Mark />
      <span className={`text-[22px] font-black leading-none ${light ? "text-white" : "text-heading"}`}>{ui.brand1} <span className="text-primary">{ui.brand2}</span></span>
    </a>
  );
}
