import type { Config } from "tailwindcss";

// Brand tokens come straight from the Figma variables:
// Primary #2eb98c · Secondary #122d46 · Title #1f2937 · Sub Title #6b7280 · Gray #4b5563
const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2eb98c", secondary: "#122d46", ink: "#4b5563",
        heading: "var(--heading)", title: "var(--title)", sub: "var(--sub)",
        page: "var(--bg)", card: "var(--card)", mint: "var(--mint)", band: "var(--band)",
        line: "var(--line)", field: "var(--field)", fieldline: "var(--fieldline)",
      },
      fontFamily: { sans: ["var(--font-cairo)", "system-ui", "sans-serif"] },
      boxShadow: {
        svc: "0 4px 10px rgba(0,0,0,.05)",
        cta: "0 20px 12.5px rgba(46,185,140,.25), 0 8px 5px rgba(46,185,140,.25)",
        proj: "0 4px 7px rgba(20,184,166,.25)",
        send: "0 8px 14px rgba(20,184,166,.38)",
      },
    },
  },
  plugins: [],
};
export default config;
