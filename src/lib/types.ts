export type Lang = "ar" | "en";
export type L = Record<Lang, string>;

export interface Stat { id: string; value: number; decimals: number; prefix: string; suffix: string; label: L }
export interface Service { id: string; icon: string; color: string; tag: L; title: L; body: L; active: boolean }
export interface Project { id: string; title: L; desc: L; tags: string[]; image: string; link: string; published: boolean }
export interface Social { id: string; icon: "Facebook" | "Instagram" | "Linkedin" | "Twitter"; url: string }

export interface Site {
  hero: { eyebrow: L; title: L; lead: L; cta1: L; cta2: L; image: string };
  stats: Stat[];
  about: { badge: L; title: L; intro: L; brand1: L; brand2: L; body: L };
  services: { badge: L; title: L; sub: L };
  works: { badge: L; title: L; sub: L };
  contact: { badge: L; title: L; email: string; phone: string };
  footer: { tagline: L; socials: Social[] };
}
export interface Content { site: Site; services: Service[]; projects: Project[] }
export interface Inquiry { id: string; name: string; email: string; details: string; date: string; read: boolean }
