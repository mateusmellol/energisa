"use client";

import imgHero from "figma:asset/bb442800d2b3f93e66c7c76b9873036398a0172a.png";
import imgButton from "figma:asset/ef92594731423388a0c490d6f715c05317eb5700.png";
import svgPaths from "../../imports/Site/svg-swy5fdu2p6";
import { BadgeDelta } from "./ui/badge-delta";
import { motion } from "motion/react";

const EASE = [0.4, 0, 0.2, 1] as const;

/* ─── Stock Widget (Pill Format) ────────────────────────────────────── */
function StockWidget() {
  return (
    <div className="group cursor-pointer backdrop-blur-md bg-black/20 hover:bg-black/40 border border-white/10 rounded-full flex items-center px-5 py-2.5 w-fit mb-6 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">
      {/* Base Content */}
      <div className="flex items-center gap-4 shrink-0">
        <span style={{ fontFamily: "Sora, sans-serif", fontSize: "14px", color: "#f6f8ed", fontWeight: 400 }}>
          ENGI 11
        </span>
        <div className="w-px h-4 bg-white/30" />
        <span style={{ fontFamily: "Sora, sans-serif", fontSize: "14px", color: "#f6f8ed", fontWeight: 400 }}>
          51,27
        </span>
        <div className="flex items-center gap-1.5 ml-1">
          <BadgeDelta
            variant="solid"
            deltaType="increase"
            iconStyle="filled"
            value="0,32 (0,83%)"
          />
        </div>
      </div>

      {/* Expandable CTA */}
      <div className="grid grid-cols-[0fr] opacity-0 group-hover:opacity-100 group-hover:grid-cols-[1fr] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">
        <div className="flex items-center overflow-hidden">
          <div className="flex items-center gap-3 pl-4 shrink-0">
            <div className="w-px h-4 bg-white/30" />
            <div className="flex items-center gap-1.5">
              <span className="text-[#f6f8ed] text-sm font-medium underline underline-offset-4 decoration-white/30 whitespace-nowrap hover:text-white hover:decoration-white transition-colors">
                Ver ações
              </span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#f6f8ed]">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Hero Section ──────────────────────────────────────────────────── */
export function Hero() {
  return (
    <section className="relative overflow-hidden flex flex-col" style={{ minHeight: "100svh" }}>
      {/* Background photo — fade in, no scale */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8, ease: "easeInOut" }}
      >
        <img
          alt=""
          src={imgHero}
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        {/* Subtle dark overlay to ensure text legibility */}
        <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.25)" }} />
        {/* Bottom gradient for better text visibility */}
        <div
          className="absolute inset-x-0 bottom-0 pointer-events-none"
          style={{
            height: "60%",
            background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)",
          }}
        />
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col flex-1 px-8 md:px-20 pt-32 pb-32">
        {/* Content stack — Grid for desktop, stacked for mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-end mt-auto w-full max-w-[1440px] mx-auto pt-16">

          {/* Left Column: Stock + Title */}
          <div className="flex flex-col items-start">
            {/* StockWidget entrance */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.7, ease: EASE }}
            >
              <StockWidget />
            </motion.div>

            {/* Title entrance */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.0, delay: 0.85, ease: EASE }}
              style={{
                fontFamily: "Sora, sans-serif",
                fontWeight: 500,
                fontSize: "clamp(48px, 6vw, 84px)",
                letterSpacing: "-0.03em",
                color: "#f6f8ed",
                lineHeight: 1.05,
              }}
            >
              A Energisa <br />
              move o Brasil
            </motion.h1>
          </div>

          {/* Right Column: Subtitle + Buttons */}
          <div className="flex flex-col items-start gap-8 max-w-[540px] pb-4">
            {/* Subtitle entrance */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.0, delay: 1.1, ease: EASE }}
              style={{
                fontFamily: "Sora, sans-serif",
                fontSize: "clamp(15px, 1.2vw, 18px)",
                color: "rgba(246, 248, 237, 0.85)",
                lineHeight: 1.6,
                fontWeight: 300,
              }}
            >
              De Norte a Sul. Quando uma luz acende, a Energisa está por trás.
            </motion.p>

            {/* Buttons entrance */}
            <motion.div
              className="flex flex-wrap items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 1.3, ease: EASE }}
            >
              <button
                onClick={() => document.getElementById('solucoes')?.scrollIntoView({ behavior: 'smooth' })}
                className="relative px-8 py-4 overflow-hidden rounded-[4px] transition-all active:scale-[0.97] hover:opacity-90 cursor-pointer"
                style={{
                  backgroundColor: "#D4EC28",
                  boxShadow: "0 10px 30px -10px rgba(0,0,0,0.2)"
                }}
              >
                <span className="relative font-medium text-[16px] text-[#20201f]" style={{ fontFamily: "Sora, sans-serif" }}>
                  Começar agora
                </span>
              </button>

              <button
                onClick={() => document.getElementById('ecossistema')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 rounded-[4px] border border-white/20 text-[#f6f8ed] font-medium text-[16px] transition-all hover:bg-white/5 active:scale-[0.97] cursor-pointer"
                style={{ fontFamily: "Sora, sans-serif" }}
              >
                Ecossistema
              </button>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
