"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { motion as motionPresets } from "@/lib/tokens";

/**
 * Services — Figma node 183:2433
 *
 * Structure:
 * - Title "Serviços"
 * - Toggle: Casa | Empresa
 * - "Mais" link (right-aligned)
 * - 4 service cards in a row
 * - Height: 538px
 */

const servicesCasa = [
  { icon: "⚡", title: "2ª via de conta" },
  { icon: "🔌", title: "Religação" },
  { icon: "📊", title: "Meu consumo" },
  { icon: "🔧", title: "Falta de energia" },
];

const servicesEmpresa = [
  { icon: "🏢", title: "Demanda contratada" },
  { icon: "📈", title: "Gestão de consumo" },
  { icon: "⚙️", title: "Suporte técnico" },
  { icon: "💡", title: "Eficiência energética" },
];

export function Services() {
  const [activeTab, setActiveTab] = useState<"casa" | "empresa">("casa");
  const services = activeTab === "casa" ? servicesCasa : servicesEmpresa;

  return (
    <section className="relative w-full py-24 bg-white" id="servicos">
      <div className="page-container">
        {/* Header row — Figma node 183:2565 */}
        <motion.div
          {...motionPresets.fadeInUp}
          className="flex flex-col gap-5 mb-10"
        >
          <h2 className="text-[28px] md:text-[39px] font-regular leading-tight text-neutral-950">
            Serviços
          </h2>

          {/* Toggle + More link — Figma node 183:2572 */}
          <div className="flex items-center justify-between">
            <div className="flex gap-6">
              {(["casa", "empresa"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-base font-medium py-3 border-b-2 transition-all capitalize min-h-[44px] active:scale-95 active:opacity-80 ${
                    activeTab === tab
                      ? "text-neutral-950 border-neutral-950"
                      : "text-neutral-400 border-transparent md:hover:text-neutral-600"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <a
              href="#"
              className="text-base font-medium text-neutral-500 md:hover:text-neutral-950 transition-all active:scale-95 active:opacity-70"
            >
              Mais →
            </a>
          </div>
        </motion.div>

        {/* Cards — Figma node 183:2525 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileTap={{ scale: 0.98, backgroundColor: "#F8F8F7" }}
                className="group relative h-[140px] md:h-[180px] rounded-xl border border-neutral-150 bg-neutral-0 p-4 flex flex-col justify-between cursor-pointer md:hover:border-neutral-300 md:hover:shadow-sm transition-all active:bg-neutral-50"
              >
                <div className="w-6 h-6 flex items-center justify-center text-lg">
                  {service.icon}
                </div>
                <p className="text-lg font-medium text-neutral-950">
                  {service.title}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
