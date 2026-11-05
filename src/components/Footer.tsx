"use client";
import { Mail, Phone } from "lucide-react";
import { SOCIAL_ICONS } from "@/lib/icons";
import { useApp, useContent } from "./Providers";
import Logo from "./Logo";

export default function Footer() {
  const { tx, ui } = useApp();
  const { content: { site: { footer, contact } } } = useContent();
  const links = [["home", ui.nav.home], ["about", ui.nav.about], ["services", ui.nav.services], ["works", ui.nav.works]];
  return (
    <footer className="bg-secondary text-white/70">
      <div className="wrap grid gap-10 py-14 md:grid-cols-3">
        <div className="flex flex-col gap-4">
          <Logo light />
          <p className="max-w-[290px] text-sm leading-7">{tx(footer.tagline)}</p>
          <div className="flex gap-2">
            {footer.socials.filter(s => s.url).map(s => { const I = SOCIAL_ICONS[s.icon]; return (
              <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.icon} className="grid h-9 w-9 place-items-center rounded-full bg-white/10 transition hover:bg-primary hover:text-white"><I size={16} /></a>
            ); })}
          </div>
        </div>
        <div>
          <p className="mb-4 font-bold text-white">{ui.quick}</p>
          <ul className="space-y-3 text-sm">{links.map(([id, l]) => <li key={id}><a href={`#${id}`} className="transition hover:text-primary">{l}</a></li>)}</ul>
        </div>
        <div>
          <p className="mb-4 font-bold text-white">{ui.contactUs}</p>
          <ul className="space-y-3 text-sm">
            {contact.email && <li className="flex items-center gap-2"><Mail size={16} className="text-primary" /><a href={`mailto:${contact.email}`} dir="ltr">{contact.email}</a></li>}
            {contact.phone && <li className="flex items-center gap-2"><Phone size={16} className="text-primary" /><a href={`tel:${contact.phone.replace(/\s/g, "")}`} dir="ltr">{contact.phone}</a></li>}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="wrap flex flex-wrap items-center justify-between gap-3 py-5 text-xs">
          <span>{ui.rights}</span>
          <span className="flex gap-5"><a href="#" className="hover:text-primary">{ui.privacy}</a><a href="#" className="hover:text-primary">{ui.terms}</a></span>
        </div>
      </div>
    </footer>
  );
}
