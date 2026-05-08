"use client";

import { useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { liftHover, motionTransition, pressTap } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { GridPattern } from "@/registry/magicui/grid-pattern";
import { scrollToSection } from "./navigation";

const heroImage = "/Vector.png";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  // Capture viewport height once on the client.
  // Hero is sticky for exactly ~100svh before Services slides over it,
  // so this is our parallax range in pixels.
  const [vh] = useState(() =>
    typeof window !== "undefined" ? window.innerHeight : 900
  );

  // Global scroll Y — works correctly even inside a sticky container
  const { scrollY } = useScroll();

  const imageY = useTransform(scrollY, [0, vh], ["0%", "-15%"]);
  const textY = useTransform(scrollY, [0, vh], ["0%", "-15%"]);

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

      {/* Hero image — PNG has built-in transparency at top so the worker's helmet
          "overflows" above the blue photo band, matching the reference design.
          The wrapper sits at the bottom 75% of the section; the img is taller
          than its container (-translate-y pulls it up) so the transparent region
          shows through the white header area. */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ y: shouldReduceMotion ? 0 : imageY }}
        transition={{ ...motionTransition.section, delay: 0.18 }}
        className="absolute inset-x-0 bottom-0 z-10 h-[70%]"
        data-node-id="370:2042"
      >
        <img
          src={heroImage}
          alt="Profissional da Energisa em campo solar, usando capacete e uniforme."
          className="h-full w-full object-cover object-top"
          loading="eager"
          fetchPriority="high"
        />

        {/* FlexLab card — grid-aligned wrapper mirrors the site's content container */}
        <div className="absolute inset-x-0 bottom-[8%] z-20 mx-auto w-full max-w-[1440px] px-5 sm:px-8 md:px-20">

        <div className="flex w-[540px] gap-[16px] rounded-[4px] bg-white p-[16px] shadow-[0_8px_40px_rgba(0,0,0,0.18)]">
          {/* thumbnail — flex-1 to fill remaining width like Figma */}
          <div className="relative h-[238px] flex-1 overflow-hidden rounded-[4px]">
            <img
              alt="FlexLab"
              src="https://www.figma.com/api/mcp/asset/689315ee-9e24-497b-813c-dd4cf54e49a4"
              className="absolute inset-0 h-full w-full max-w-none object-cover"
            />
          </div>

          {/* right column */}
          <div className="flex h-[238px] shrink-0 flex-col items-start justify-between">
            {/* texts */}
            <div className="flex flex-col items-start gap-[8px]">
              {/* badge — w-fit para hug */}
              <div className="flex w-fit items-center gap-[3px] rounded-full bg-[#d4ec28] px-[8.64px] py-[4px]">
                <img
                  alt=""
                  src="https://www.figma.com/api/mcp/asset/d29f54d9-f856-4a09-b161-97b00898bc1b"
                  className="h-[10px] w-[10px]"
                />
                <span className="font-['Sora',sans-serif] text-[11px] font-normal leading-[14px] text-[#121312]">
                  Novidade
                </span>
              </div>
              <p className="w-[250px] font-['Sora',sans-serif] text-[20px] font-normal leading-[1.4] text-[#121312]">
                FlexLab amplia testes com tecnologias
              </p>
              <p className="w-[238px] font-['Sora',sans-serif] text-[13px] font-normal leading-[1.4] text-[#555653]">
                Novas frentes de pesquisa conectam automação, dados e eficiência operacional para acelerar soluções que chegam ao cliente.
              </p>
            </div>

            {/* cta */}
            <div className="flex w-[112px] items-center justify-center rounded-[4px] bg-black px-[37px] py-[12px]">
              <span className="font-['Sora',sans-serif] text-[16px] font-normal leading-[1.4] text-[#fdfdfc]">Ver</span>
            </div>
          </div>
        </div>
        </div>
      </motion.div>

      <motion.div
        style={{ y: shouldReduceMotion ? 0 : textY }}
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
              className="flex shrink-0 cursor-pointer items-center justify-center rounded-[4px] bg-[#d4ec28] px-[33.6px] py-[16.8px] text-center font-['Sora',sans-serif] text-[16.8px] font-normal leading-[25.2px] text-[#20201f]"
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
              className="flex shrink-0 cursor-pointer items-center justify-center rounded-[4px] border border-[#121312] px-[33.6px] py-[16.8px] text-center font-['Sora',sans-serif] text-[16.8px] font-normal leading-[25.2px] text-[#121312]"
              whileHover={{ ...liftHover, backgroundColor: "rgba(18,19,18,0.04)" }}
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
