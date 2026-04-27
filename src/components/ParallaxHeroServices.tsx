"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface Props {
  hero: React.ReactNode;
  services: React.ReactNode;
}

export function ParallaxHeroServices({ hero, services }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(true); // Default to true for mobile-first
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  const showParallax = mounted && !isMobile;

  return (
    <>
      {/* Hero Wrapper — Uses sticky only on desktop parallax */}
      <div className={showParallax ? "sticky top-0 h-svh w-full z-0 overflow-hidden" : "relative w-full"}>
        <motion.div 
          style={showParallax ? { y, scale } : {}} 
          className="h-full w-full will-change-transform"
        >
          {hero}
        </motion.div>
      </div>

      {/* Services Wrapper — Slides over the hero on desktop parallax */}
      <div
        ref={containerRef}
        className={showParallax 
          ? "relative z-10 bg-white shadow-[0_-20px_60px_rgba(0,0,0,0.15)]" 
          : "relative z-10 bg-white"}
      >
        {services}
      </div>
    </>
  );
}
