"use client";

import { motion } from "framer-motion";

/**
 * Header — Figma node 183:2431
 *
 * Structure: Logo (vectorized) | Nav (Soluções, Ecossistema, Impacto) | CTA Button
 * Fixed top, glass background, 80px height
 */

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 border-b border-neutral-200"
    >
      <div className="container flex items-center justify-between h-20">
        {/* Logo — Figma node 183:2405 */}
        <div className="flex items-center">
          <span className="text-xl font-semibold tracking-tight text-dark-blue-500">
            Energisa
          </span>
        </div>

        {/* Nav — Figma node 183:2132 */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#servicos"
            className="text-sm font-medium text-neutral-600 hover:text-dark-blue-500 transition-colors"
          >
            Soluções
          </a>
          <a
            href="#ecossistema"
            className="text-sm font-medium text-neutral-600 hover:text-dark-blue-500 transition-colors"
          >
            Ecossistema
          </a>
          <a
            href="#impacto"
            className="text-sm font-medium text-neutral-600 hover:text-dark-blue-500 transition-colors"
          >
            Impacto
          </a>
        </nav>

        {/* CTA Button — Figma node 183:2423 */}
        <button className="hidden md:flex items-center justify-center px-6 py-3 bg-dark-blue-500 text-white text-sm font-medium rounded-lg hover:bg-dark-blue-600 transition-colors">
          Suporte
        </button>
      </div>
    </motion.header>
  );
}
