"use client";

import { useCallback, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import laboratorioImage from "@/assets/noticias/inovacao-laboratorio.webp";
import { liftHover, motionTransition, pressTap } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { GridPattern } from "@/registry/magicui/grid-pattern";
import { scrollToSection } from "./navigation";

const heroImage = `${import.meta.env.BASE_URL}hero-desktop.webp`;
const heroImageMobile = `${import.meta.env.BASE_URL}hero-mobile.webp`;

const TILT_MAX = 3;
const SPRING_CONFIG = { stiffness: 260, damping: 28, mass: 0.6 };


function HeroNewsCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(rawX, SPRING_CONFIG);
  const rotateY = useSpring(rawY, SPRING_CONFIG);

  const glareX = useTransform(rotateY, [-TILT_MAX, TILT_MAX], ["0%", "100%"]);
  const glareY = useTransform(rotateX, [TILT_MAX, -TILT_MAX], ["0%", "100%"]);
  const glareBackground = useTransform(
    [glareX, glareY],
    ([x, y]: string[]) =>
      `radial-gradient(circle at ${x} ${y}, rgba(255,255,255,0.22) 0%, transparent 60%)`
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current || shouldReduceMotion) return;
      const rect = cardRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      rawY.set(dx * TILT_MAX);
      rawX.set(-dy * TILT_MAX);
    },
    [rawX, rawY, shouldReduceMotion]
  );

  const handleMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
    setIsHovered(false);
  }, [rawX, rawY]);

  return (
    <div style={{ perspective: "900px" }}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: shouldReduceMotion ? 0 : rotateX,
          rotateY: shouldReduceMotion ? 0 : rotateY,
          transformStyle: "preserve-3d",
          background: "rgba(0,0,0,0.44)",
          backdropFilter: "blur(12.6px) saturate(1.4)",
          WebkitBackdropFilter: "blur(12.6px) saturate(1.4)",
          border: "1px solid rgba(255,255,255,0.15)",
          boxShadow: "0 8px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.1)",
        }}
        className="relative flex w-full cursor-default gap-[16px] overflow-hidden rounded-[4px] p-[16px]"
      >
        {!shouldReduceMotion && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10 rounded-[4px]"
            style={{ background: glareBackground }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          />
        )}

        <div className="relative h-[160px] flex-1 overflow-hidden rounded-[4px]">
          <img
            alt="FlexLab"
            src={laboratorioImage}
            className="absolute inset-0 h-full w-full max-w-none object-cover"
          />
        </div>

        <div className="flex h-[160px] shrink-0 flex-col items-start justify-between">
          <p className="w-[250px] font-['Sora',sans-serif] text-[20px] font-normal leading-[1.4] text-white">
            FlexLab amplia testes com tecnologias
          </p>

          <motion.button
            type="button"
            onClick={() => scrollToSection("noticias")}
            className="group flex cursor-pointer items-center gap-[6px] border-none bg-transparent p-0"
            whileHover={{ opacity: 0.7 }}
            whileTap={{ opacity: 0.5 }}
            transition={motionTransition.fast}
          >
            <span className="font-['Sora',sans-serif] text-[14px] font-normal leading-[1.4] text-white underline decoration-white/50 underline-offset-[3px]">
              Ver mais
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white/70 transition-transform duration-200 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
            >
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

function HeroNewsCardSlot() {
  return (
    <div className="w-[540px] max-w-full">
      <HeroNewsCard />
    </div>
  );
}

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const [vh] = useState(() =>
    typeof window !== "undefined" ? window.innerHeight : 900
  );

  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, vh], ["0%", "-20%"]);
  const textY = useTransform(scrollY, [0, vh], ["0%", "-50%"]);
  const cardY = useTransform(scrollY, [0, vh], [0, -vh * 0.25]);

  return (
    <section
      id="hero"
      className="relative h-[100svh] md:min-h-[760px] overflow-hidden bg-white"
      data-node-id="370:2123"
    >
      <GridPattern
        width={40}
        height={40}
        x={-1}
        y={-1}
        className={cn(
          "pointer-events-none absolute inset-0 z-0 h-full w-full stroke-gray-900/[0.09] opacity-100",
          "[mask-image:radial-gradient(1000px_circle_at_top_left,white,transparent)]"
        )}
      />

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ y: shouldReduceMotion ? 0 : imageY }}
        transition={{ ...motionTransition.section, delay: 0.18 }}
        className="absolute inset-0 z-10 overflow-hidden md:top-[calc(24px+10vh)] md:bottom-6 md:left-6 md:right-6 md:rounded-[8px]"
        data-node-id="370:2042"
      >
        {/* Desktop Image */}
        <img
          src={heroImage}
          alt="Profissional da Energisa em campo solar, usando capacete e uniforme."
          className="hidden md:block h-full w-full object-cover"
          style={{ objectPosition: "center 40%" }}
          loading="eager"
          fetchPriority="high"
        />
        {/* Mobile Image */}
        <img
          src={heroImageMobile}
          alt="Profissional da Energisa em campo solar, usando capacete e uniforme."
          className="block md:hidden h-full w-full object-cover"
          style={{ objectPosition: "center 20%" }}
          loading="eager"
          fetchPriority="high"
        />
        {/* Desktop Gradient Overlay */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-black/45 via-black/10 to-transparent pointer-events-none" />
        {/* Mobile Gradient Overlay */}
        <div className="block md:hidden absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent pointer-events-none" />
      </motion.div>

      <motion.div
        style={{ y: shouldReduceMotion ? 0 : textY }}
        className={cn(
          "absolute z-20 left-0 right-0 bottom-[24px] md:bottom-24 mx-auto w-full max-w-[1440px] px-5",
          "sm:px-8 md:px-12",
          "flex flex-col items-start gap-[16px] md:gap-[25.2px] text-left"
        )}
        data-node-id="361:2793"
      >
        <motion.h1
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={motionTransition.section}
          className="font-['Sora',sans-serif] text-[36px] md:text-[clamp(44px,3.64vw,72px)] font-normal leading-[1.15] tracking-normal text-white"
          data-node-id="361:2795"
        >
          A Energisa
          <br />
          move o Brasil
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...motionTransition.section, delay: 0.14 }}
          className="flex w-full max-w-[491px] flex-col items-start gap-[14px] md:gap-[25.2px]"
          data-node-id="361:2797"
        >
          <p className="font-['Sora',sans-serif] text-[14px] md:text-[clamp(16px,1.265vw,25px)] font-normal leading-[1.4] text-white md:whitespace-nowrap">
            De Norte a Sul. Quando uma luz
            <br />
            acende, é a Energisa que faz acontecer.
          </p>

          <motion.div className="flex w-full flex-wrap items-center gap-[12px] md:gap-[16.8px]" data-node-id="361:2801">
            <motion.button
              type="button"
              onClick={() => scrollToSection("solucoes")}
              className="flex shrink-0 cursor-pointer items-center justify-center rounded-[4px] bg-[#d4ec28] px-[24px] py-[12px] md:px-[33.6px] md:py-[16.8px] text-center font-['Sora',sans-serif] text-[15px] md:text-[16.8px] font-normal leading-[1.5] md:leading-[25.2px] text-[#20201f]"
              whileHover={liftHover}
              whileTap={pressTap}
              transition={motionTransition.fast}
              data-node-id="361:2802"
            >
              Serviços
            </motion.button>
            <motion.button
              type="button"
              onClick={() => scrollToSection("timeline")}
              className="flex shrink-0 cursor-pointer items-center justify-center rounded-[4px] border border-white px-[24px] py-[12px] md:px-[33.6px] md:py-[16.8px] text-center font-['Sora',sans-serif] text-[15px] md:text-[16.8px] font-normal leading-[1.5] md:leading-[25.2px] text-white"
              whileHover={{ ...liftHover, backgroundColor: "rgba(255,255,255,0.08)" }}
              whileTap={pressTap}
              transition={motionTransition.fast}
              data-node-id="361:2805"
            >
              Sobre
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
