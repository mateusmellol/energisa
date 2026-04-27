"use client";

import { motion } from "framer-motion";
import { gradients, motion as motionPresets } from "@/lib/tokens";

/**
 * Hero — Figma node 183:1949
 *
 * Structure:
 * - Background image with green radial gradient
 * - Stock ticker (top-left) + Profile cards (top-right)
 * - Headline (bottom-left) + Body text + 2 CTA buttons (bottom-right)
 * - Height: 800px (100vh on desktop)
 */

export function Hero() {
  return (
    <section
      className="relative w-full min-h-screen bg-white overflow-hidden"
      id="home"
    >
      {/* Background gradient glow — Figma node 183:2461 */}
      <div
        className="absolute inset-0 top-[101px]"
        style={{ background: gradients.heroGlow }}
      />

      {/* Content container — Figma node 183:1954 */}
      <div className="page-container relative z-10 flex flex-col justify-end md:justify-between gap-12 md:gap-0 min-h-screen pt-[106px] pb-16">
        {/* Top row: Stock + Profile — Figma node 183:1955 */}
        <div className="hidden md:grid md:grid-cols-12 gap-4 items-start">
          {/* Stock ticker — Figma node 183:1956 */}
          <motion.div
            variants={motionPresets.fadeIn}
            initial="initial"
            animate="animate"
            transition={{ ...motionPresets.fadeIn.transition, delay: 0.3 }}
            className="md:col-span-2 w-[120px] h-[120px] rounded backdrop-blur-[40px] bg-white/20 p-2 flex flex-col justify-between border border-white/30"
          >
            <div className="opacity-50">
              <p className="text-[7px] font-medium text-neutral-950">ENGI 11</p>
              <p className="text-[5px] text-neutral-600">BRT 21:30 - 21/12/26</p>
            </div>
            <p className="text-[32px] font-light text-neutral-950 leading-none">
              51,27
            </p>
            <div className="flex items-center gap-1">
              <span className="text-[6px] px-1 py-0.5 bg-green-100 text-green-600 rounded">
                1.32 (0.83%)
              </span>
            </div>
            <p className="text-[5px] text-neutral-500 text-center">
              Investimentos
            </p>
          </motion.div>

          {/* Profile cards — Figma node 183:2078 */}
          <motion.div
            variants={motionPresets.fadeIn}
            initial="initial"
            animate="animate"
            transition={{ ...motionPresets.fadeIn.transition, delay: 0.5 }}
            className="hidden md:flex md:col-start-9 md:col-span-4 flex-col gap-[18px]"
          >
            {[1, 2].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-neutral-200" />
                <div>
                  <p className="text-sm font-medium text-neutral-950">
                    Nome exemplo
                  </p>
                  <p className="text-xs text-neutral-500">Descrição de algo</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom row: Headline + Body + CTAs — Figma node 183:2091 */}
        <motion.div 
          variants={motionPresets.stagger}
          initial="initial"
          animate="animate"
          className="flex flex-col md:grid md:grid-cols-12 gap-8 md:gap-4 items-start md:items-end"
        >
          {/* Headline — Figma node 183:2092 */}
          <motion.div
            variants={motionPresets.fadeInUp}
            className="md:col-span-5"
          >
            <h1 className="text-[36px] md:text-[52px] font-regular leading-[1.2] tracking-tight text-neutral-950">
              A Energisa acompanha você
            </h1>
          </motion.div>

          {/* Body + Buttons — Figma node 183:2095 */}
          <motion.div
            variants={motionPresets.fadeInUp}
            className="md:col-start-8 md:col-span-5 flex flex-col gap-8 md:gap-12"
          >
            <p className="text-base leading-relaxed text-neutral-600">
              De Norte a Sul. Quando uma luz acende, a Energisa está por trás.
              Presente em mais de 800 municípios, conectando famílias e
              empresas ao futuro da energia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="w-full sm:w-auto px-8 py-5 border border-neutral-300 rounded-full text-sm font-medium text-neutral-950 hover:bg-neutral-50 active:scale-[0.97] transition-all duration-200">
                Explorar
              </button>
              <button
                className="w-full sm:w-auto px-8 py-5 rounded-full text-sm font-medium text-neutral-950 active:scale-[0.97] transition-all duration-200"
                style={{ backgroundColor: "#D4EC28" }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#c2d920")}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#D4EC28")}
              >
                Começar agora
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
