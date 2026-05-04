"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { BadgeDelta } from "@/components/ui/badge-delta";
import heroImage from "../../assets/ChatGPT Image 4 de mai. de 2026, 01_09_32.png";

export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden flex flex-col" style={{ minHeight: "100svh" }}>
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none bg-white">
        <img
          src={heroImage.src || heroImage}
          alt="Energisa Hero"
          className="absolute inset-0 w-full h-full object-contain scale-75 -translate-y-[10%] z-0"
        />
        {/* Top Left Grid */}
        <div
          className="absolute top-0 left-0 w-[40%] h-[40%] opacity-[0.10] z-10"
          style={{
            backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(ellipse at top left, black 0%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse at top left, black 0%, transparent 100%)'
          }}
        />
        {/* Bottom Right Grid */}
        <div
          className="absolute bottom-0 right-0 w-[40%] h-[40%] opacity-[0.10] z-10"
          style={{
            backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(ellipse at bottom right, black 0%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse at bottom right, black 0%, transparent 100%)'
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col flex-1 pt-32 pb-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 md:gap-8 mt-auto w-full max-w-[1440px] mx-auto px-5 md:px-20">
          <div className="flex flex-col items-start gap-6">
            <motion.div
              initial={{ opacity: 0, x: -24, filter: "blur(8px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="group inline-flex max-w-full flex-wrap items-center gap-x-3 gap-y-2 rounded-full border border-black/10 bg-white/25 px-5 py-2.5 text-[13px] font-medium leading-none text-black shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-md transition-colors duration-200 hover:bg-white/35"
              style={{ fontFamily: "Sora, sans-serif" }}
              aria-label="ENGI11, R$ 53,71, alta de 0,6%, ver ações"
            >
              <span>ENGI11</span>
              <span className="text-black/35" aria-hidden="true">|</span>
              <span>R$ 53,71</span>
              <span className="text-black/35" aria-hidden="true">|</span>
              <BadgeDelta
                variant="outline"
                deltaType="increase"
                iconStyle="filled"
                value="+0,6%"
                className="px-0 py-0 text-[13px] font-medium !text-emerald-900 ring-0 [&_svg]:!text-emerald-900"
              />
              <span className="hidden -ml-3 max-w-0 items-center gap-3 overflow-hidden whitespace-nowrap text-black/90 opacity-0 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:ml-0 group-hover:max-w-[100px] group-hover:opacity-100 sm:inline-flex">
                <span className="text-black/35" aria-hidden="true">|</span>
                <span className="inline-flex cursor-pointer items-center gap-0.5 hover:underline hover:underline-offset-2">
                  Ver ações
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-3.5 w-3.5 translate-y-px transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0"
                    strokeWidth={2}
                  />
                </span>
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, x: -40, filter: "blur(8px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              style={{
                fontFamily: "Sora, sans-serif",
                fontWeight: 500,
                fontSize: "clamp(36px, 6.5vw, 84px)",
                letterSpacing: "-0.03em",
                color: "#000000",
                lineHeight: 1.05,
              }}
            >
              A Energisa
              <br />
              move o Brasil
            </motion.h1>
          </div>

          <div className="flex flex-col items-start w-full md:max-w-[380px] shrink-0 self-stretch">
            <div className="mt-auto flex flex-col items-start gap-6 w-full">
              <motion.p
                initial={{ opacity: 0, x: -40, filter: "blur(8px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
                style={{
                  fontFamily: "Sora, sans-serif",
                  fontSize: "clamp(15px, 1.2vw, 18px)",
                  color: "rgba(0, 0, 0, 0.85)",
                  lineHeight: 1.6,
                  fontWeight: 300,
                }}
              >
                De Norte a Sul. Quando uma luz
                <br />
                acende, é a Energisa que faz acontecer.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, x: -40, filter: "blur(8px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full">
                <button
                  onClick={() => document.getElementById("solucoes")?.scrollIntoView({ behavior: "smooth" })}
                  className="relative px-8 py-4 overflow-hidden rounded-[4px] transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.97] hover:opacity-90 cursor-pointer"
                  style={{
                    backgroundColor: "#D4EC28",
                    boxShadow: "0 10px 30px -10px rgba(0,0,0,0.2)",
                  }}
                >
                  <span className="relative inline-block font-medium text-[16px] text-[#20201f]" style={{ fontFamily: "Sora, sans-serif" }}>
                    Serviços
                  </span>
                </button>

                <button
                  onClick={() => document.getElementById("ecossistema")?.scrollIntoView({ behavior: "smooth" })}
                  className="px-8 py-4 rounded-[4px] border border-black/20 text-[#000000] font-medium text-[16px] transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-black/5 active:scale-[0.97] cursor-pointer"
                  style={{ fontFamily: "Sora, sans-serif" }}
                >
                  <span className="inline-block">Ecossistema</span>
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
