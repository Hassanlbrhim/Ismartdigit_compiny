"use client";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

// Light, once-only entrance. Hero and counters carry the heavier motion.
export default function Reveal({ children, i = 0, className }: { children: ReactNode; i?: number; className?: string }) {
  const calm = useReducedMotion();
  return (
    <motion.div className={className} initial={calm ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, delay: Math.min(i, 6) * 0.06, ease: "easeOut" }}>
      {children}
    </motion.div>
  );
}
