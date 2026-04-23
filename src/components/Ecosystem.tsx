"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { motion as motionPresets } from "@/lib/tokens";

/**
 * Ecosystem — Figma node 183:2755
 *
 * Two parts:
 * 1. FlexLab showcase (183:2812) — Logo, title, description, profiles, button, progress, image
 * 2. Statistics section (183:3115) — "A Energisa acompanha você" + 3 expanding stat rows
 */

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1500;
    const start = Date.now();

    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

const stats = [
  {
    label: "municípios atendidos em todo o território nacional",
    value: 939,
    suffix: "",
    detail: "Presente em mais de 800 municípios com cobertura ativa de distribuição",
  },
  {
    label: "milhões de unidades consumidoras conectadas",
    value: 18,
    suffix: "",
    prefix: "+",
    detail: "Atendendo residências, comércios e indústrias em todo o Brasil",
  },
  {
    label: "estados com presença operacional direta",
    value: 25,
    suffix: "",
    detail: "Operação em todas as regiões do Brasil, de Norte a Sul",
  },
];

export function Ecosystem() {
  return (
    <section className="relative w-full" id="ecossistema">
      {/* FlexLab Showcase — Figma node 183:2812 */}
      <div className="py-14 bg-white">
        <div className="container">
          <div className="flex items-start justify-between gap-16">
            {/* Left: FlexLab info — Figma node 183:2810 */}
            <motion.div
              {...motionPresets.fadeInUp}
              className="flex flex-col gap-[250px] max-w-[491px]"
            >
              <div className="w-[117px] h-[38px] bg-neutral-200 rounded flex items-center justify-center text-xs text-neutral-600">
                FlexLab
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-[39px] font-regular leading-tight text-neutral-950">
                  FlexLab
                </h2>
                <p className="text-base text-neutral-500">
                  Lorem ipsum dolor sit amet, consectetur adipiscing.
                </p>
              </div>
            </motion.div>

            {/* Right: Description + Profiles + Button — Figma node 183:2761 */}
            <motion.div
              {...motionPresets.fadeInUp}
              transition={{ delay: 0.2 }}
              className="flex flex-col gap-24 max-w-[494px]"
            >
              <div className="flex flex-col gap-10">
                <p className="text-base leading-relaxed text-neutral-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>

                {/* Profiles — Figma node 183:2773 */}
                <div className="flex gap-5">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-neutral-200" />
                      <div>
                        <p className="text-sm font-medium text-neutral-950">
                          Nome exemplo
                        </p>
                        <p className="text-xs text-neutral-500">Descrição</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Button + Progress — Figma node 183:2794 */}
              <div className="flex items-center justify-between">
                <button className="px-8 py-4 bg-dark-blue-500 rounded-full text-sm font-medium text-white hover:bg-dark-blue-600 transition-colors">
                  Descobrir
                </button>
                <div className="w-[205px] h-3 bg-neutral-150 rounded-full overflow-hidden">
                  <div className="h-full w-1/3 bg-green-400 rounded-full" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Large image — Figma node 183:2760 */}
          <div className="mt-10 w-full h-[512px] bg-neutral-200 rounded-2xl" />
        </div>
      </div>

      {/* Statistics — Figma node 183:3115 */}
      <div className="py-14 bg-white">
        <div className="container">
          {/* Stats header — Figma node 186:3148 */}
          <motion.div
            {...motionPresets.fadeInUp}
            className="flex items-start justify-between mb-20"
          >
            <div className="max-w-[530px]">
              <h2 className="text-[52px] font-regular leading-[1.15] text-neutral-950 mb-2">
                A Energisa acompanha você
              </h2>
              <p className="text-base text-neutral-500">
                Lorem ipsum dolor sit amet, consectetur adipiscing.
              </p>
            </div>
            <p className="text-xs text-neutral-400 max-w-[530px]">
              Dados de 2025
            </p>
          </motion.div>

          {/* Stat rows — Figma node 186:3146 */}
          <div className="flex flex-col">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex items-center border-t border-neutral-150 py-4"
                style={{ maxWidth: `${60 + i * 20}%` }}
              >
                <div className="flex-1 p-4">
                  <p className="text-[28px] font-regular text-neutral-950 mb-1">
                    {stat.detail}
                  </p>
                  <p className="text-base text-neutral-500">{stat.label}</p>
                </div>
                <p className="text-[80px] font-light text-neutral-950 leading-none tabular-nums">
                  {stat.prefix || ""}
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
