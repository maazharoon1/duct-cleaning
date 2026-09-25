"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export function Reveal({ children, className = "", delay = 0, id }: { children: ReactNode; className?: string; delay?: number; id?: string }) {
  const reduced = useReducedMotion();
  return <motion.div
    className={className}
    id={id}
    initial={reduced ? false : { opacity: 0, y: 18 }}
    whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.12 }}
    transition={{ duration: 0.52, ease: [0.2, 0.7, 0.2, 1], delay }}
  >{children}</motion.div>;
}
