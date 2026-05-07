"use client";

import { motion } from "motion/react";
import { liftHover, motionTransition, pressTap } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { GridPattern } from "@/registry/magicui/grid-pattern";
import { scrollToSection } from "./navigation";

const heroImage = "http://localhost:3845/assets/254bfc894f757392f07c3c4bdef75c56564816f4.png";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative h-[100svh] min-h-[760px] overflow-hidden bg-white"
      data-node-id="370:2123"
    >
      <GridPattern
        width={40}
        height={40}
        x={-1}
        y={-1}
        className={cn(
          "absolute inset-0 z-0 h-full w-full opacity-100 pointer-events-none stroke-gray-900/[0.09]",
          "[mask-image:radial-gradient(1000px_circle_at_top_left,white,transparent)]"
        )}
      />

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...motionTransition.section, delay: 0.18 }}
        className="absolute inset-0 z-10 overflow-hidden"
        data-node-id="370:2042"
      >
        <img
          src={heroImage}
          alt="Profissional da Energisa em campo solar, usando capacete e uniforme."
          className="size-full translate-y-[10%] object-contain object-bottom"
          loading="eager"
          fetchPriority="high"
        />
      </motion.div>

      <div
        className={cn(
          "relative z-20 mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-8 px-5 pb-10 pt-32",
          "sm:px-8 sm:pt-36 md:grid-cols-12 md:items-start md:gap-x-6 md:px-20",
          "md:pb-0 md:pt-[clamp(128px,8.8vw,168px)]"
        )}
        data-node-id="361:2793"
      >
        <div className="md:col-span-6">
          <motion.h1
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={motionTransition.section}
            className="font-['Sora',sans-serif] text-[clamp(44px,3.64vw,72px)] font-normal leading-[1.35] tracking-normal text-[#20201f]"
            data-node-id="361:2795"
          >
            A Energisa
            <br />
            move o Brasil
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...motionTransition.section, delay: 0.14 }}
          className="flex w-full max-w-[491px] flex-col items-start gap-[25.2px] md:col-span-5 md:col-start-8"
          data-node-id="361:2797"
        >
          <p className="font-['Sora',sans-serif] text-[clamp(16px,1.265vw,25px)] font-normal leading-[1.4] text-[#20201f] md:whitespace-nowrap">
            De Norte a Sul. Quando uma luz
            <br />
            acende, é a Energisa que faz acontecer.
          </p>

          <motion.div className="flex w-full flex-wrap items-center gap-[16.8px]" data-node-id="361:2801">
            <motion.button
              type="button"
              onClick={() => scrollToSection("solucoes")}
              className="flex shrink-0 items-center justify-center rounded-[4px] bg-[#d4ec28] px-[33.6px] py-[16.8px] text-center font-['Sora',sans-serif] text-[16.8px] font-normal leading-[25.2px] text-[#20201f] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.2)]"
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
              className="flex shrink-0 items-center justify-center rounded-[4px] border border-[#121312] px-[33.6px] py-[16.8px] text-center font-['Sora',sans-serif] text-[16.8px] font-normal leading-[25.2px] text-[#121312] shadow-[0_10px_30px_0_rgba(0,0,0,0.08)]"
              whileHover={{ ...liftHover, backgroundColor: "rgba(18,19,18,0.04)" }}
              whileTap={pressTap}
              transition={motionTransition.fast}
              data-node-id="361:2805"
            >
              Sobre
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

    </section>
  );
}
