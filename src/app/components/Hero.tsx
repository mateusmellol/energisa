"use client";

import { motion } from "motion/react";
import heroVideo from "../../assets/Timeline 1.mp4";
import { GridBackground } from "../../components/ui/grid-background";

export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden flex flex-col" style={{ minHeight: "100svh" }}>
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none bg-[#0a0a0a]">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>

        <GridBackground className="opacity-30" />

        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.8) 100%)" }} />
      </div>

      <div className="relative z-10 flex flex-col flex-1 pt-32 pb-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 md:gap-8 mt-auto w-full max-w-[1440px] mx-auto px-5 md:px-20">
          <div className="flex flex-col items-start gap-6">
            <motion.h1
              initial={{ opacity: 0, x: -40, filter: "blur(8px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              style={{
                fontFamily: "Sora, sans-serif",
                fontWeight: 500,
                fontSize: "clamp(36px, 6.5vw, 84px)",
                letterSpacing: "-0.03em",
                color: "#f6f8ed",
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
                  color: "rgba(246, 248, 237, 0.85)",
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
                  className="px-8 py-4 rounded-[4px] border border-white/20 text-[#f6f8ed] font-medium text-[16px] transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-white/5 active:scale-[0.97] cursor-pointer"
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
