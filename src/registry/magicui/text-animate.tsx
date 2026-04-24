import { motion, Variants } from "motion/react";
import React from "react";

type AnimationType = "slideUp" | "fadeIn" | "blurIn";
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
}

const variants: Record<AnimationType, Variants> = {
  slideUp: {
    hidden: { opacity: 0, y: "100%" },
    visible: { opacity: 1, y: 0 },
    exit:   { opacity: 0, y: "100%" },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit:   { opacity: 0 },
  },
  blurIn: {
    hidden: { opacity: 0, filter: "blur(8px)" },
    visible: { opacity: 1, filter: "blur(0px)" },
    exit:   { opacity: 0, filter: "blur(8px)" },
  },
};

export function TextAnimate({
  children,
  animation = "slideUp",
  by = "word",
  delay = 0,
  duration = 0.35,
  stagger = 0.12,
  className,
  style,
}: TextAnimateProps) {
  const isLine = by === "line";
  const segments = isLine
    ? children.split("\n")
    : by === "character"
      ? children.split("")
      : children.split(" ");

  if (isLine) {
    // Block mode: each line slides up from within an overflow:hidden clip container
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

  // Inline mode: words / characters stay inline
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
