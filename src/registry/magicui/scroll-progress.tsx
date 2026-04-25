"use client";

import { useScroll, useSpring, motion } from "motion/react";
import type { MotionValue } from "motion/react";
import { cn } from "@/lib/utils";

interface ScrollProgressProps {
  className?: string;
  color?: string;
  motionValue?: MotionValue<number>;
  opacityValue?: MotionValue<number>;
}

export function ScrollProgress({
  className,
  color = "#D4EC28",
  motionValue: externalProgress,
  opacityValue,
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();
  const raw = externalProgress ?? scrollYProgress;

  const scaleX = useSpring(raw, {
    stiffness: 200,
    damping: 50,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className={cn("fixed left-0 right-0 h-[3px] z-50 origin-left", className)}
      style={{ scaleX, backgroundColor: color, opacity: opacityValue }}
    />
  );
}
