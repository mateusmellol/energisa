"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

export function NumberTicker({
  value,
  duration = 2000,
  delay = 0,
  className,
}: {
  value: number;
  duration?: number;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let timeoutId: NodeJS.Timeout;
    let frameId: number;

    const startAnimation = () => {
      const startTime = Date.now();

      const tick = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (outQuart)
        const eased = 1 - Math.pow(1 - progress, 4);
        
        setDisplayValue(Math.floor(eased * value));

        if (progress < 1) {
          frameId = requestAnimationFrame(tick);
        }
      };

      frameId = requestAnimationFrame(tick);
    };

    if (delay > 0) {
      timeoutId = setTimeout(startAnimation, delay);
    } else {
      startAnimation();
    }

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(frameId);
    };
  }, [isInView, value, duration, delay]);

  return (
    <span ref={ref} className={className}>
      {displayValue.toLocaleString("pt-BR")}
    </span>
  );
}
