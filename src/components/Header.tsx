"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";

/**
 * Header — Figma node 183:2431
 *
 * Structure: Logo (vectorized) | Nav (Soluções, Ecossistema, Impacto) | CTA Button
 * Fixed top, glass background, 80px height
 */

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Soluções", href: "#servicos" },
    { name: "Ecossistema", href: "#ecossistema" },
    { name: "Impacto", href: "#impacto" },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, transform: "translateY(-10px)" }}
      animate={{ opacity: 1, transform: "translateY(0px)" }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 border-b border-neutral-200"
    >
      <div className="page-container flex items-center justify-between h-20">
        {/* Logo */}
        <div className="flex items-center">
          <span className="text-xl font-semibold tracking-tight text-[#001F3E]">
            Energisa
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-neutral-600 hover:text-[#001F3E] transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <button
          className="hidden md:flex items-center justify-center px-6 py-3 text-neutral-950 text-sm font-medium rounded-lg transition-colors"
          style={{ backgroundColor: "#D4EC28" }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#c2d920")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#D4EC28")}
        >
          Começar agora
        </button>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex items-center justify-center w-11 h-11 text-neutral-950 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-neutral-200 overflow-hidden"
          >
            <div className="page-container py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center min-h-[44px] text-lg font-medium text-neutral-900"
                >
                  {link.name}
                </a>
              ))}
              <button
                className="w-full mt-4 py-4 rounded-lg text-neutral-950 font-medium text-center transition-colors"
                style={{ backgroundColor: "#D4EC28" }}
              >
                Começar agora
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
