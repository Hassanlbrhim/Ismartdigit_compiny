import type { Config } from "tailwindcss";

// Brand tokens from Figma: Primary #2eb98c · Secondary #122d46 · Title #1f2937 · Sub #6b7280 · Gray #4b5563
// Type scale is fluid (clamp): one token per role, so no per-breakpoint font overrides in components.
const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  future: { hoverOnlyWhenSupported: true }, // hover:* only on devices that really hover (no sticky hover on touch)
  theme: {
    extend: {
      colors: {
        primary: "#2eb98c", secondary: "#122d46", ink: "#4b5563",
        heading: "var(--heading)", title: "var(--title)", sub: "var(--sub)",
        page: "var(--bg)", card: "var(--card)", mint: "var(--mint)", band: "var(--band)",
        line: "var(--line)", field: "var(--field)", fieldline: "var(--fieldline)",
      },
      fontFamily: { sans: ["var(--font-cairo)", "system-ui", "sans-serif"] },
      fontSize: {
        "fluid-h1": ["clamp(2.125rem, 1.45rem + 2.6vw, 3rem)", { lineHeight: "1.65", letterSpacing: "-0.01em" }],
        "fluid-h2": ["clamp(1.875rem, 1.4rem + 1.9vw, 2.75rem)", { lineHeight: "1.3" }],
        "fluid-lead": ["clamp(1.125rem, 1rem + 0.7vw, 1.5rem)", { lineHeight: "1.65" }],
        "fluid-sub": ["clamp(1.0625rem, 0.95rem + 0.45vw, 1.25rem)", { lineHeight: "1.7" }],
        "fluid-quote": ["clamp(1.0625rem, 0.85rem + 1vw, 1.5rem)", { lineHeight: "2" }],
        "fluid-brand": ["clamp(1.5rem, 1.1rem + 1.4vw, 2rem)", { lineHeight: "1.4" }],
        "fluid-card": ["clamp(1.25rem, 1rem + 0.9vw, 1.5rem)", { lineHeight: "1.6" }],
        "fluid-desc": ["clamp(1rem, 0.9rem + 0.45vw, 1.25rem)", { lineHeight: "1.65" }],
        "fluid-stat": ["clamp(1.375rem, 1rem + 1.2vw, 1.875rem)", { lineHeight: "1.2" }],
        "fluid-stat-label": ["clamp(0.75rem, 0.6rem + 0.6vw, 1rem)", { lineHeight: "1.3" }],
        "fluid-cta": ["clamp(1.125rem, 1rem + 0.5vw, 1.5rem)", { lineHeight: "1.2" }],
      },
      boxShadow: {
        svc: "0 4px 10px rgba(0,0,0,.05)",
        cta: "0 20px 12.5px rgba(46,185,140,.25), 0 8px 5px rgba(46,185,140,.25)",
        proj: "0 4px 7px rgba(20,184,166,.25)",
        send: "0 8px 14px rgba(20,184,166,.38)",
      },
      keyframes: { "sheet-up": { from: { opacity: "0", transform: "translateY(28px)" }, to: { opacity: "1", transform: "translateY(0)" } } },
      animation: { "sheet-up": "sheet-up .28s cubic-bezier(.22,1,.36,1)" },
    },
  },
  plugins: [],
};
export default config;
