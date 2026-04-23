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
      <div className="container relative z-10 flex flex-col justify-between min-h-screen pt-[106px] pb-16">
        {/* Top row: Stock + Profile — Figma node 183:1955 */}
        <div className="flex items-start justify-between">
          {/* Stock ticker — Figma node 183:1956 */}
          <motion.div
            {...motionPresets.fadeIn}
            transition={{ delay: 0.3 }}
            className="w-[120px] h-[120px] rounded backdrop-blur-[59px] bg-white/20 p-2 flex flex-col justify-between"
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
            {...motionPresets.fadeIn}
            transition={{ delay: 0.5 }}
            className="flex flex-col gap-[18px]"
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
        <div className="flex items-end justify-between gap-16">
          {/* Headline — Figma node 183:2092 */}
          <motion.div
            {...motionPresets.fadeInUp}
            className="max-w-[430px]"
          >
            <h1 className="text-[52px] font-regular leading-[1.2] tracking-tight text-neutral-950">
              A Energisa acompanha você
            </h1>
          </motion.div>

          {/* Body + Buttons — Figma node 183:2095 */}
          <motion.div
            {...motionPresets.fadeInUp}
            transition={{ delay: 0.2 }}
            className="max-w-[366px] flex flex-col gap-12"
          >
            <p className="text-base leading-relaxed text-neutral-600">
              De Norte a Sul. Quando uma luz acende, a Energisa está por trás.
              Presente em mais de 800 municípios, conectando famílias e
              empresas ao futuro da energia.
            </p>
            <div className="flex gap-4">
              <button className="px-8 py-5 border border-neutral-300 rounded-full text-sm font-medium text-neutral-950 hover:bg-neutral-50 transition-colors">
                Explorar
              </button>
              <button className="px-8 py-5 bg-dark-blue-500 rounded-full text-sm font-medium text-white hover:bg-dark-blue-600 transition-colors">
                Começar
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
