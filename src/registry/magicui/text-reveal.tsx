import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import type { MotionValue } from "motion/react";

interface TextRevealProps {
  children: string;
  className?: string;
  animation?: "opacity" | "slideUp";
  style?: React.CSSProperties;
  /** Optional: pass an external MotionValue<number> [0,1] to drive the animation.
   *  When provided, the internal useScroll is skipped entirely.
   *  Use scrollRange to remap which portion of [0,1] drives the full reveal. */
  externalProgress?: MotionValue<number>;
  /** Sub-range of externalProgress [start, end] that drives [hidden → visible].
   *  Defaults to [0, 1]. */
  scrollRange?: [number, number];
}

export function TextReveal({
  children,
  className = "",
  animation = "slideUp",
  style: customStyle,
  externalProgress,
  scrollRange = [0, 1],
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Only use internal scroll when no external driver is provided
  const { scrollYProgress: internalProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "start 0.35"],
  });

  const progress = externalProgress ?? internalProgress;
  const words = children.split(/\s+/);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <p
        style={{
          fontFamily: "Sora, sans-serif",
          fontWeight: 400,
          fontSize: "clamp(32px, 4vw, 60px)",
          lineHeight: 1.2,
          letterSpacing: "-0.02em",
          color: "#121312",
          ...customStyle,
        }}
        className="flex flex-wrap"
      >
        {words.map((word, i) => {
          // Map word position within its own range, then remap to scrollRange
          const wordStart = scrollRange[0] + (i / words.length) * (scrollRange[1] - scrollRange[0]);
          const wordOverlap = (1.2 / words.length) * (scrollRange[1] - scrollRange[0]);
          const wordEnd = Math.min(wordStart + wordOverlap, scrollRange[1]);
          return (
            <Word
              key={i}
              progress={progress}
              range={[wordStart, wordEnd]}
              word={word}
              animation={animation}
            />
          );
        })}
      </p>
    </div>
  );
}

interface WordProps {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
  animation: "opacity" | "slideUp";
}

function Word({ word, progress, range, animation }: WordProps) {
  const opacity = useTransform(progress, range, [0, 1]);
  const y = useTransform(progress, range, animation === "slideUp" ? ["100%", "0%"] : ["0%", "0%"]);

  return (
    <span style={{ marginRight: "0.3em", display: "inline-block", overflow: "hidden", verticalAlign: "top" }}>
      <motion.span style={{ opacity, y, display: "inline-block" }}>
        {word}
      </motion.span>
    </span>
  );
}
