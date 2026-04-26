"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface Props {
  hero: React.ReactNode;
  services: React.ReactNode;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isMobile;
}

export function ParallaxHeroServices({ hero, services }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  if (isMobile) {
    return (
      <>
        {hero}
        {services}
      </>
    );
  }

  return (
    <>
      {/* Hero — sticky, recebe parallax de y e scale conforme services sobe */}
      <div className="sticky top-0 h-svh w-full z-0 overflow-hidden">
        <motion.div style={{ y, scale }} className="h-full w-full">
          {hero}
        </motion.div>
      </div>

      {/* Services — card que desliza por cima do hero */}
      <div
        ref={containerRef}
        className="relative z-10 bg-white shadow-[0_-40px_80px_rgba(0,0,0,0.3)]"
      >
        {services}
      </div>
    </>
  );
}
