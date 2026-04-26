import { motion, MotionValue, useTransform, Variants } from "motion/react";
import React from "react";

type AnimationType = "slideUp" | "fadeIn" | "blurIn" | "blurInUp";
type ByType = "word" | "character" | "line";

interface TextAnimateProps {
  children: string;
  animation?: AnimationType;
  by?: ByType;
  delay?: number;
  duration?: number;
  stagger?: number;
  className?: string;
  style?: React.CSSProperties;
  /**
   * External scroll MotionValue [0,1] to drive the animation.
   * When provided, the component uses scroll-driven mode instead of time-based.
   * Only supported with `by="line"`.
   */
  progress?: MotionValue<number>;
  /**
   * Sub-range of `progress` [start, end] that maps hidden → visible.
   * Defaults to [0, 1].
   */
  scrollRange?: [number, number];
}

const variants: Record<AnimationType, Variants> = {
  slideUp: {
    hidden: { opacity: 0, y: "100%" },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: "100%" },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  },
  blurIn: {
    hidden: { opacity: 0, filter: "blur(8px)" },
    visible: { opacity: 1, filter: "blur(0px)" },
    exit: { opacity: 0, filter: "blur(8px)" },
  },
  blurInUp: {
    hidden: { opacity: 0, filter: "blur(8px)", y: 10 },
    visible: { opacity: 1, filter: "blur(0px)", y: 0 },
    exit: { opacity: 0, filter: "blur(8px)", y: 10 },
  },
};

// ─── Scroll-driven line ───────────────────────────────────────────────────────

interface ScrollLineProps {
  line: string;
  progress: MotionValue<number>;
  range: [number, number];
  animation: AnimationType;
}

function ScrollLine({ line, progress, range, animation }: ScrollLineProps) {
  // Always call hooks unconditionally
  const opacity = useTransform(progress, range, [0, 1]);
  const rawY = useTransform(progress, range, ["100%", "0%"]);
  const rawFilter = useTransform(progress, range, ["blur(8px)", "blur(0px)"]);

  const needsY = animation === "slideUp" || animation === "blurInUp";
  const needsBlur = animation === "blurIn" || animation === "blurInUp";

  const motionStyle = {
    opacity,
    ...(needsY ? { y: rawY } : {}),
    ...(needsBlur ? { filter: rawFilter } : {}),
  };

  if (needsY) {
    return (
      <div style={{ overflow: "hidden" }}>
        <motion.div style={motionStyle}>{line || "\u00A0"}</motion.div>
      </div>
    );
  }

  return <motion.div style={motionStyle}>{line || "\u00A0"}</motion.div>;
}

// ─── TextAnimate ─────────────────────────────────────────────────────────────

export function TextAnimate({
  children,
  animation = "slideUp",
  by = "word",
  delay = 0,
  duration = 0.35,
  stagger = 0.12,
  className,
  style,
  progress,
  scrollRange = [0, 1],
}: TextAnimateProps) {
  const isLine = by === "line";
  const segments = isLine
    ? children.split("\n")
    : by === "character"
      ? children.split("")
      : children.split(" ");

  // ── Scroll-driven mode (only supported for by="line") ──
  if (progress && isLine) {
    const n = segments.length;
    const [start, end] = scrollRange;
    const span = end - start;

    // Each segment animates for `segWidth` of the total span.
    // Segments start offset by `segStep`, creating a natural stagger.
    const segWidth = n === 1 ? span : (span * 2) / (n + 1);
    const segStep = n <= 1 ? 0 : (span - segWidth) / (n - 1);

    return (
      <div className={className} style={style}>
        {segments.map((line, i) => {
          const segStart = start + i * segStep;
          const segEnd = segStart + segWidth;
          return (
            <ScrollLine
              key={i}
              line={line}
              progress={progress}
              range={[segStart, segEnd]}
              animation={animation}
            />
          );
        })}
      </div>
    );
  }

  // ── Time-based mode ──
  if (isLine) {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        className={className}
        style={style}
      >
        {segments.map((line, i) => (
          <div key={i} style={{ overflow: "hidden" }}>
            <motion.div
              variants={variants[animation]}
              transition={{
                duration,
                delay: delay + i * stagger,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {line}
            </motion.div>
          </div>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.span
      initial="hidden"
      animate="visible"
      exit="exit"
      className={className}
      style={{ display: "inline", ...style }}
    >
      {segments.map((segment, i) => (
        <motion.span
          key={i}
          variants={variants[animation]}
          transition={{
            duration,
            delay: delay + i * stagger,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {segment}
          {by === "word" && i < segments.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </motion.span>
  );
}
