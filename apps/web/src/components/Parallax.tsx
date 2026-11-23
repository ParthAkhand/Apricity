"use client";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

/** Moves children slightly against the scroll. `speed` 0.1 is about +/-10% of 100px. Off for reduced motion. */
export function Parallax({ children, speed = 0.1, className = "" }: { children: ReactNode; speed?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [speed * 200, -speed * 200]);
  return <motion.div ref={ref} style={reduce ? undefined : { y }} className={className}>{children}</motion.div>;
}
