"use client";

import { motion } from "framer-motion";
import { motion as motionPresets } from "@/lib/tokens";

/**
 * Timeline — Figma nodes 186:3160, 186:3210, 186:3245
 *
 * Reusable component for the 3 historical milestone sections.
 * Each has:
 * - Tabs: Antes | Agora | Futuro (with active highlight)
 * - Title + Description (left)
 * - Globe image (right) — will become interactive 3D
 * - Year + Location badges (bottom-left)
 *
 * Height: 926px each
 */

interface TimelineProps {
  id: string;
  tabs: string[];
  activeTab: number;
  title: string;
  description: string;
  year: string;
  location: string;
  image: string;
}

export function Timeline({
  tabs,
  activeTab,
  title,
  description,
  year,
  location,
}: TimelineProps) {
  return (
    <section className="relative w-full min-h-[926px] bg-neutral-0 overflow-hidden">
      <div className="page-container relative z-10 flex flex-col justify-between min-h-screen py-16">
        {/* Content layout */}
        <div className="flex flex-col gap-12">
          {/* Text content */}
          <motion.div
            {...motionPresets.fadeInUp}
            className="flex flex-col gap-7 max-w-[540px]"
          >
            {/* Tabs — Antes | Agora | Futuro */}
            <div className="flex gap-4">
              {tabs.map((tab, i) => (
                <div
                  key={tab}
                  className={`px-2 py-2 text-lg font-regular ${
                    i === activeTab
                      ? "bg-neutral-400 text-neutral-950"
                      : "text-neutral-950"
                  }`}
                >
                  {tab}
                </div>
              ))}
            </div>

            {/* Title + Description */}
            <div className="flex flex-col gap-5 mt-8">
              <h3 className="text-[39px] font-regular leading-tight text-neutral-950">
                {title}
              </h3>
              <p className="text-base leading-relaxed text-neutral-600">
                {description}
              </p>
            </div>
          </motion.div>

          {/* Globe placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="w-full aspect-square max-h-[717px] rounded-full bg-neutral-950 flex items-center justify-center"
          >
            <div className="text-neutral-600 text-sm">
              Globe 3D
            </div>
          </motion.div>
        </div>

        {/* Year + Location badges */}
        <motion.div
          {...motionPresets.fadeInUp}
          transition={{ delay: 0.3 }}
          className="flex gap-10"
        >
          {/* Year badge */}
          <div className="relative w-[203px] h-[137px] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 grid grid-cols-8 grid-rows-5">
              {Array.from({ length: 40 }).map((_, i) => (
                <div
                  key={i}
                  className="backdrop-blur-[27px] border border-white/5"
                  style={{
                    background:
                      "linear-gradient(109deg, rgba(246,248,237,0.4) 5%, rgba(218,218,214,0.4) 98%)",
                  }}
                />
              ))}
            </div>
            <span className="relative z-10 text-[49px] font-regular text-neutral-950">
              {year}
            </span>
          </div>

          {/* Location badge */}
          <div className="relative w-[203px] h-[137px] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 grid grid-cols-8 grid-rows-5">
              {Array.from({ length: 40 }).map((_, i) => (
                <div
                  key={i}
                  className="backdrop-blur-[27px] border border-white/5"
                  style={{
                    background:
                      "linear-gradient(109deg, rgba(246,248,237,0.4) 5%, rgba(218,218,214,0.4) 98%)",
                  }}
                />
              ))}
            </div>
            <span className="relative z-10 text-[49px] font-regular text-neutral-950">
              {location}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
