"use client";
// Rebuilt 1:1 from the Figma "HeroIllustration" node (314:462): 480x520 canvas, every position/size/colour/font
// converted from the node's inset values. Drawn at design size, then scaled to fit the column.
import { motion, useReducedMotion } from "framer-motion";
import { CSSProperties, ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";

const useIso = typeof window === "undefined" ? useEffect : useLayoutEffect;
const W = 480, H = 520;
const box = (l: number, t: number, w?: number, h?: number): CSSProperties => ({ position: "absolute", left: l, top: t, width: w, height: h });
const CARD: CSSProperties = { background: "#fff", borderRadius: 12, boxShadow: "0 0 0 1px rgba(18,45,70,.04), 0 6px 18px rgba(18,45,70,.08)", overflow: "hidden" };
const PILL: CSSProperties = { background: "#fff", borderRadius: 10, boxShadow: "0 0 0 1px rgba(46,185,140,.12), 0 4px 10px rgba(18,45,70,.07)", display: "grid", placeItems: "center" };
const MINT = "#a7f3d0", GREEN = "#2eb98c", TEAL = "#0d9488", INK = "#374151", MUTE = "#9ca3af";

function Tx({ l, t, s, c, b, w, center, children }: { l: number; t: number; s: number; c: string; b?: boolean; w?: number; center?: boolean; children: ReactNode }) {
  return <span style={{ position: "absolute", left: l, top: t, width: w, fontSize: s, color: c, fontWeight: b ? 700 : 400, lineHeight: "normal", whiteSpace: "nowrap", textAlign: center ? "center" : undefined }}>{children}</span>;
}
const R = ({ l, t, w, h, bg, r = 0, style }: { l: number; t: number; w: number; h: number; bg: string; r?: number | string; style?: CSSProperties }) => <div style={{ ...box(l, t, w, h), background: bg, borderRadius: r, ...style }} />;

/** Entrance (fade/scale in) + endless gentle float. */
function Float({ l, t, w, h, i = 0, amp = 6, dur = 6, calm, style, children }: { l: number; t: number; w: number; h: number; i?: number; amp?: number; dur?: number; calm: boolean; style?: CSSProperties; children: ReactNode }) {
  return (
    <motion.div style={box(l, t, w, h)} initial={calm ? false : { opacity: 0, y: 18, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.25 + i * 0.08, duration: 0.6, ease: "easeOut" }}>
      <motion.div style={{ position: "relative", width: "100%", height: "100%", ...style }} animate={calm ? undefined : { y: [0, -amp, 0] }} transition={{ repeat: Infinity, duration: dur, ease: "easeInOut", delay: i * 0.4 }}>{children}</motion.div>
    </motion.div>
  );
}

export default function HeroIllustration() {
  const calm = !!useReducedMotion();
  const wrap = useRef<HTMLDivElement>(null);
  const [s, setS] = useState(1);
  useIso(() => {
    const el = wrap.current; if (!el) return;
    const f = () => setS(Math.min(1, el.clientWidth / W));
    f(); const ro = new ResizeObserver(f); ro.observe(el); return () => ro.disconnect();
  }, []);

  const Bar = ({ l, t, h, bg, d }: { l: number; t: number; h: number; bg: string; d: number }) => (
    <motion.div style={{ ...box(l, t, 10, h), background: bg, borderRadius: "3px 3px 0 0", transformOrigin: "bottom" }} initial={calm ? false : { scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 0.9 + d * 0.12, duration: 0.7, ease: "easeOut" }} />
  );
  const Fill = ({ l, t, w, h, bg, d }: { l: number; t: number; w: number; h: number; bg: string; d: number }) => (
    <motion.div style={{ ...box(l, t, undefined, h), background: bg, borderRadius: 3 }} initial={calm ? false : { width: 0 }} animate={{ width: w }} transition={{ delay: 1 + d * 0.15, duration: 0.9, ease: "easeOut" }} />
  );

  const gridCols = [0, 16, 32, 48];
  return (
    <div ref={wrap} dir="ltr" aria-hidden className="mx-auto w-full max-w-[480px]" style={{ height: H * s }}>
      <div style={{ position: "relative", width: W, height: H, transform: `scale(${s})`, transformOrigin: "top left", fontFamily: "var(--font-inter), Inter, system-ui, sans-serif" }}>
        {/* soft backdrop blob */}
        <div style={{ ...box(30, 75, 420, 380), borderRadius: "50%", background: "rgba(46,185,140,.07)" }} />
        {/* dot grids: top-right and bottom-left, 3.6px dots on a 16px pitch */}
        {gridCols.flatMap(x => gridCols.map(y => <div key={`a${x}${y}`} style={{ ...box(366 + x, 22.2 + y, 3.6, 3.6), borderRadius: "50%", background: "#c9ddd5" }} />))}
        {gridCols.flatMap(x => gridCols.map(y => <div key={`b${x}${y}`} style={{ ...box(22.2 + x, 414.2 + y, 3.6, 3.6), borderRadius: "50%", background: "#c9ddd5" }} />))}
        {/* faint dashed connectors between cards and phone */}
        <svg width={W} height={H} style={{ position: "absolute", left: 0, top: 0 }} fill="none" stroke="#b7e4d4" strokeWidth={1} strokeDasharray="2 3">
          <path d="M154 130 L170 125" /><path d="M310 128 L326 135" /><path d="M152 330 L170 314" /><path d="M308 300 L328 318" />
        </svg>
        <div style={{ ...box(431, 476, 10, 10), background: MINT, transform: "rotate(45deg) scale(.7)" }} />

        {/* Analytics */}
        <Float l={16} t={72} w={138} h={108} i={0} amp={5} dur={6} calm={calm} style={CARD}>
          <Tx l={12} t={9} s={10} b c={INK}>Analytics</Tx>
          <div style={{ ...box(94, 8, 36, 14), background: "#d9f5ea", borderRadius: 7, color: GREEN, fontSize: 8, fontWeight: 700, lineHeight: "14px", textAlign: "center" }}>+14%</div>
          <div style={{ ...box(30.5, 67.5, 7, 7), background: MINT, transform: "rotate(45deg)" }} />
          <Bar l={56} t={59} h={29} bg={`linear-gradient(${MINT},#6ee7b7)`} d={0} />
          <Bar l={88} t={55.5} h={32.5} bg={`linear-gradient(${GREEN},${TEAL})`} d={1} />
          <Bar l={104} t={64} h={24} bg={`linear-gradient(${GREEN},${TEAL})`} d={2} />
        </Float>

        {/* Live Preview */}
        <Float l={326} t={80} w={138} h={106} i={1} amp={6} dur={7} calm={calm} style={CARD}>
          <div style={{ ...box(0, 0, 138, 30), background: `linear-gradient(90deg,${GREEN},${TEAL})` }} />
          <Tx l={12} t={9} s={10} b c="#fff">Live Preview</Tx>
          <div style={{ ...box(121, 10, 10, 10), borderRadius: "50%", border: "1.5px solid rgba(255,255,255,.8)", boxSizing: "border-box" }} />
          <motion.div style={{ ...box(123.5, 12.5, 5, 5), borderRadius: "50%", background: "#fff" }} animate={calm ? undefined : { opacity: [1, 0.35, 1] }} transition={{ repeat: Infinity, duration: 2 }} />
          <div style={{ ...box(12, 36, 40, 58), background: "#ecfdf5", border: `1.5px solid ${MINT}`, borderRadius: 8, boxSizing: "border-box" }}>
            <R l={3.5} t={3.5} w={30} h={8} bg={MINT} r={3} /><R l={3.5} t={15.5} w={24} h={5} bg="#d1fae5" r={2} /><R l={3.5} t={24.5} w={28} h={5} bg="#d1fae5" r={2} />
            <div style={{ ...box(3.5, 34.5, 22, 14), background: GREEN, borderRadius: 5, color: "#fff", fontSize: 8, fontWeight: 700, display: "grid", placeItems: "center" }}>Go</div>
          </div>
          <Tx l={62} t={37} s={9} b c={INK}>App Ready</Tx>
          <Tx l={62} t={50} s={8} c={MUTE}>v2.4.1</Tx>
          <R l={62} t={64} w={64} h={5} bg="#e5e7eb" r={3} />
          <Fill l={62} t={64} w={48} h={5} bg={GREEN} d={3} />
          <Tx l={62} t={72} s={8} c={MUTE}>74%</Tx>
          <div style={{ ...box(98, 82, 8, 8), border: "1.5px solid #6ee7b7", transform: "rotate(45deg)", boxSizing: "border-box" }} />
        </Float>

        {/* Code window */}
        <Float l={20} t={300} w={132} h={100} i={2} amp={5} dur={6.5} calm={calm} style={CARD}>
          <R l={10} t={9} w={8} h={8} bg="#fb7185" r="50%" /><R l={21} t={9} w={8} h={8} bg="#fbbf24" r="50%" /><R l={32} t={9} w={8} h={8} bg="#34d399" r="50%" />
          <Tx l={10} t={29.5} s={8.5} c="#c084fc">const</Tx><Tx l={42} t={29.5} s={8.5} c={GREEN}>App</Tx><Tx l={62} t={29.5} s={8.5} c="#94a3b8">= () =&gt;</Tx>
          <Tx l={10} t={42.5} s={8.5} c="#6ee7b7">&lt;Screen</Tx>
          <Tx l={10} t={55.5} s={8.5} c="#fda4af">data</Tx><Tx l={44} t={55.5} s={8.5} c="#94a3b8">={"{api}"}</Tx>
          <Tx l={10} t={68.5} s={8.5} c="#94a3b8">/&gt;</Tx>
          <motion.span style={{ position: "absolute", left: 36, top: 68.5, fontSize: 8.5, color: GREEN, lineHeight: "normal" }} animate={calm ? undefined : { opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 1.1 }}>▌</motion.span>
        </Float>

        {/* User Rating */}
        <Float l={328} t={292} w={136} h={120} i={3} amp={6} dur={7.5} calm={calm} style={CARD}>
          <Tx l={12} t={10} s={10} b c={INK}>User Rating</Tx>
          <Tx l={12} t={20} s={26} b c="#1f2937">4.9</Tx>
          <Tx l={12} t={52} s={8} c={MUTE}>out of 5.0</Tx>
          {[12, 27, 42, 57, 72].map(x => <Tx key={x} l={x} t={64} s={12} c="#fbbf24">★</Tx>)}
          <R l={6} t={83} w={124} h={1} bg="#f3f4f6" />
          {([["5★", 85.5, 87, 82], ["4★", 96.5, 98, 46], ["3★", 107.5, 109, 18]] as const).map(([lbl, ty, by, fw], i) => (
            <span key={lbl}>
              <Tx l={8} t={ty} s={7.5} c={MUTE}>{lbl}</Tx>
              <R l={24} t={by} w={90} h={5} bg="#f3f4f6" r={3} />
              <Fill l={24} t={by} w={fw} h={5} bg={`linear-gradient(90deg,${GREEN},${TEAL})`} d={4 + i} />
            </span>
          ))}
        </Float>

        {/* Phone */}
        <Float l={165} t={52} w={150} h={300} i={4} amp={3} dur={8} calm={calm} style={{ background: "#16283b", borderRadius: 26, boxShadow: "0 18px 36px rgba(18,45,70,.28)" }}>
          <R l={-4} t={58} w={5} h={22} bg="#16283b" r={2} /><R l={-4} t={86} w={5} h={22} bg="#16283b" r={2} /><R l={149} t={66} w={5} h={32} bg="#16283b" r={2} />
          <div style={{ ...box(6, 12, 138, 272), background: "#fff", borderRadius: 18, overflow: "hidden" }}>
            {/* status bar */}
            <Tx l={9} t={5} s={7} b c={INK}>9:41</Tx>
            <div style={{ ...box(105, 4, 16, 8), border: `1px solid ${MUTE}`, borderRadius: 2.5, boxSizing: "border-box" }} /><R l={106.5} t={5.5} w={10} h={5} bg={GREEN} r={1} />
            {/* header */}
            <div style={{ ...box(0, 16, 138, 42), background: `linear-gradient(90deg,${GREEN},${TEAL})` }} />
            <Tx l={11} t={23} s={11} b c="#fff">iSmartDigit</Tx>
            <Tx l={11} t={40} s={8} c="rgba(255,255,255,.7)">Dashboard</Tx>
            <div style={{ ...box(113, 26, 22, 22), borderRadius: "50%", background: "rgba(255,255,255,.28)", overflow: "hidden" }}>
              <R l={6} t={3} w={10} h={10} bg="rgba(255,255,255,.85)" r="50%" /><R l={3.5} t={15} w={15} h={8} bg="rgba(255,255,255,.85)" r="8px 8px 0 0" />
            </div>
            {/* stats */}
            {([[5, "24", "Apps", GREEN], [47, "98%", "Up", "#6366f1"], [89, "4.9", "Rtg", "#f59e0b"]] as const).map(([x, v, lbl, c]) => (
              <div key={lbl}>
                <R l={x} t={66} w={36} h={30} bg="#f8fafc" r={8} />
                <Tx l={x} t={68} s={10} b c={c} w={36} center>{v}</Tx><Tx l={x} t={83} s={6} c={MUTE} w={36} center>{lbl}</Tx>
              </div>
            ))}
            <Tx l={9} t={105.5} s={8.5} b c={INK}>Projects</Tx>
            {([["Design System", 122, GREEN, 109], ["API Layer", 142, "#6366f1", 79], ["User Testing", 162, "#f59e0b", 56]] as const).map(([name, y, c, fw], i) => (
              <div key={name}>
                <R l={4} t={y} w={128} h={17} bg="#fafafa" r={3} /><R l={4} t={y} w={3} h={17} bg={c} r="2px 0 0 2px" />
                <Tx l={13} t={y + 3.5} s={7.5} b c={INK}>{name}</Tx>
                <Fill l={4} t={y + 14} w={fw} h={2} bg={c} d={6 + i} />
              </div>
            ))}
            {/* revenue chart */}
            <Tx l={9} t={196} s={7} c={MUTE}>Revenue</Tx>
            <svg width={118} height={20} style={{ position: "absolute", left: 9, top: 218, overflow: "visible" }} fill="none">
              <motion.path d="M0 18 L12 12 L27 16 L42 9 L57 12 L72 7 L92 10 L107 3 L118 2" stroke={GREEN} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" initial={calm ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.2, duration: 1.4, ease: "easeInOut" }} />
              <motion.circle cx={118} cy={2} r={5.5} fill={GREEN} fillOpacity={0.2} animate={calm ? undefined : { scale: [1, 1.5, 1] }} style={{ transformOrigin: "118px 2px" }} transition={{ repeat: Infinity, duration: 2 }} />
              <circle cx={118} cy={2} r={3} fill={GREEN} />
            </svg>
            {/* tab bar */}
            <div style={{ ...box(0, 256, 138, 16), background: "#fff", borderTop: "1px solid #f3f4f6", boxSizing: "border-box" }} />
            {[11.5, 34.5, 80.5, 103.5].map(x => <R key={x} l={x} t={259} w={11} h={11} bg="#e5e7eb" r={3} />)}
            <div style={{ ...box(53, 254, 20, 20), borderRadius: "50%", background: GREEN, boxShadow: "0 0 0 3px rgba(46,185,140,.18)" }}><R l={6} t={6} w={8} h={8} bg="#fff" r={2} /></div>
          </div>
          <R l={43} t={12} w={64} h={18} bg="#0b1623" r={9} />
        </Float>

        {/* Pills */}
        <Float l={24} t={220} w={56} h={28} i={5} amp={5} dur={5.5} calm={calm} style={PILL}><span style={{ fontSize: 15, fontWeight: 700, color: GREEN }}>{"{ }"}</span></Float>
        <Float l={400} t={214} w={60} h={28} i={6} amp={5} dur={6} calm={calm} style={PILL}><span style={{ fontSize: 13, fontWeight: 700, color: "#6ee7b7" }}>&lt;/&gt;</span></Float>
        <Float l={16} t={426} w={104} h={28} i={7} amp={4} dur={6.5} calm={calm} style={{ ...PILL, borderRadius: 14, boxShadow: `0 0 0 1.5px ${MINT}, 0 4px 10px rgba(18,45,70,.07)`, display: "block" }}>
          <div style={{ ...box(10, 6, 16, 16), borderRadius: 4, background: "#8b5cf6" }}>
            <svg viewBox="0 0 16 16" width={16} height={16} fill="none" stroke="#fff" strokeWidth={0.9}><ellipse cx={8} cy={8} rx={6} ry={2.4} /><ellipse cx={8} cy={8} rx={6} ry={2.4} transform="rotate(60 8 8)" /><ellipse cx={8} cy={8} rx={6} ry={2.4} transform="rotate(120 8 8)" /><circle cx={8} cy={8} r={1} fill="#fff" /></svg>
          </div>
          <Tx l={32} t={8} s={10} b c="#1f2937">React Native</Tx>
        </Float>
        <Float l={360} t={432} w={110} h={28} i={8} amp={4} dur={7} calm={calm} style={{ ...PILL, borderRadius: 14, display: "block" }}>
          <div style={{ ...box(10.5, 6.5, 15, 15), borderRadius: "50%", background: "#e0f4fe", color: "#54c5f8", fontSize: 8.5, fontWeight: 700, display: "grid", placeItems: "center" }}>F</div>
          <Tx l={32} t={8} s={10} b c="#1f2937">Flutter 3.22</Tx>
        </Float>

      </div>
    </div>
  );
}
