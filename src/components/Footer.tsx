"use client";
import { Mail, Phone } from "lucide-react";
import { SOCIAL_ICONS } from "@/lib/icons";
import { useApp, useContent } from "./Providers";
import Logo from "./Logo";

const link = "inline-flex min-h-11 items-center text-sm transition-colors hover:text-primary";

export default function Footer() {
  const { tx, ui } = useApp();
  const { content: { site: { footer, contact } } } = useContent();
  const links = [["home", ui.nav.home], ["about", ui.nav.about], ["services", ui.nav.services], ["works", ui.nav.works]];
  return (
    <footer className="bg-secondary text-white/70">
      <div className="wrap grid grid-cols-2 gap-x-6 gap-y-8 py-12 md:grid-cols-3 md:py-14">
        <div className="col-span-2 flex flex-col gap-4 md:col-span-1">
          <Logo light />
          <p className="max-w-[290px] text-sm leading-7">{tx(footer.tagline)}</p>
          <div className="flex gap-2">
            {footer.socials.filter(s => s.url).map(s => { const I = SOCIAL_ICONS[s.icon]; return (
              <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.icon} className="grid h-11 w-11 place-items-center rounded-full bg-white/10 transition duration-200 hover:-translate-y-0.5 hover:bg-primary hover:text-white active:scale-95"><I size={18} /></a>
            ); })}
          </div>
        </div>
        <div>
          <p className="mb-2 font-bold text-white">{ui.quick}</p>
          <ul>{links.map(([id, l]) => <li key={id}><a href={`#${id}`} className={link}>{l}</a></li>)}</ul>
        </div>
        <div className="min-w-0">
          <p className="mb-2 font-bold text-white">{ui.contactUs}</p>
          <ul className="text-sm">
            {contact.email && <li className="flex min-h-11 items-center gap-2"><Mail size={16} className="shrink-0 text-primary" /><a href={`mailto:${contact.email}`} dir="ltr" className="[overflow-wrap:anywhere] hover:text-primary">{contact.email}</a></li>}
            {contact.phone && <li className="flex min-h-11 items-center gap-2"><Phone size={16} className="shrink-0 text-primary" /><a href={`tel:${contact.phone.replace(/\s/g, "")}`} dir="ltr" className="hover:text-primary">{contact.phone}</a></li>}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 pb-[env(safe-area-inset-bottom)]">
        <div className="wrap flex flex-col gap-1 py-4 text-xs sm:flex-row sm:items-center sm:justify-between">
          <span>{ui.rights}</span>
          <span className="flex gap-4"><a href="#" className={link}>{ui.privacy}</a><a href="#" className={link}>{ui.terms}</a></span>
        </div>
      </div>
    </footer>
  );
}
