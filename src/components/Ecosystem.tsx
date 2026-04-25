"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { motion as motionPresets } from "@/lib/tokens";

/**
 * Ecosystem — Figma node 183:2755
 *
 * Two parts:
 * 1. FlexLab accordion (ecosystem items) — expandable rows
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

const ecosystemItems = [
  {
    index: "001",
    title: "FlexLab",
    description:
      "Plataforma de inovação aberta da Energisa, conectando startups, pesquisadores e parceiros para desenvolver soluções energéticas do futuro.",
    detail:
      "O FlexLab é o hub de inovação da Energisa, onde tecnologia e energia se encontram para criar soluções sustentáveis e eficientes para o setor elétrico brasileiro.",
    profiles: [
      { name: "Ana Oliveira", role: "Head de Inovação" },
      { name: "Carlos Mendes", role: "Tech Lead" },
      { name: "Sofia Lima", role: "Design Estratégico" },
    ],
  },
  {
    index: "002",
    title: "Energisa+",
    description:
      "Serviços digitais integrados para gestão de energia, eficiência e sustentabilidade para residências e empresas.",
    detail:
      "Com o Energisa+, clientes têm acesso a um portfólio completo de serviços além do fornecimento de energia — desde solar fotovoltaico até gestão inteligente de consumo.",
    profiles: [
      { name: "Roberto Silva", role: "Produto" },
      { name: "Mariana Costa", role: "UX Research" },
      { name: "Felipe Souza", role: "Engenharia" },
    ],
  },
  {
    index: "003",
    title: "Portal do Cliente",
    description:
      "Canal digital completo para autoatendimento, acompanhamento de faturas e solicitação de serviços em tempo real.",
    detail:
      "O Portal do Cliente centraliza toda a relação entre o consumidor e a Energisa, com acesso 24/7 a segunda via, histórico de consumo, agendamentos e muito mais.",
    profiles: [
      { name: "Paula Ramos", role: "CX Manager" },
      { name: "Lucas Neves", role: "Backend" },
      { name: "Aline Torres", role: "UX/UI" },
    ],
  },
];

function EcosystemAccordion() {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col">
      {ecosystemItems.map((item, i) => {
        const isOpen = active === i;
        return (
          <div key={item.index}>
            {/* Row trigger */}
            <button
              onClick={() => setActive(i)}
              className={`w-full text-left transition-colors duration-300 ${
                isOpen ? "" : "hover:bg-neutral-50"
              }`}
            >
              <div
                className={`relative flex items-center gap-6 py-6 px-6 transition-all duration-300 ${
                  isOpen
                    ? "border border-neutral-200 rounded-2xl"
                    : "border-t border-neutral-150"
                }`}
              >
                {/* Index */}
                <span className="text-xs font-medium tracking-widest text-neutral-400 uppercase whitespace-nowrap">
                  ECOSSISTEMA / {item.index}
                </span>

                {/* Title */}
                <span
                  className={`flex-1 text-center text-[clamp(2rem,5vw,4rem)] font-light leading-tight tracking-tight transition-colors duration-300 ${
                    isOpen ? "text-neutral-950" : "text-neutral-700"
                  }`}
                >
                  {item.title}
                </span>

                {/* Saiba mais */}
                <span
                  className={`text-xs font-medium tracking-widest uppercase whitespace-nowrap transition-colors duration-300 ${
                    isOpen ? "text-neutral-950" : "text-neutral-400"
                  }`}
                >
                  Saiba mais
                </span>
              </div>
            </button>

            {/* Expanded content */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pt-6 pb-10 flex flex-row gap-6">
                    {/* Image placeholder */}
                    <div className="flex-[7] h-64 bg-neutral-150 rounded-xl" />

                    {/* Info */}
                    <div className="flex-[5] flex flex-col justify-between gap-8">
                      <div className="flex flex-col gap-4">
                        <p className="text-base leading-relaxed text-neutral-600">
                          {item.detail}
                        </p>
                        <div className="flex flex-col gap-3">
                          {item.profiles.map((p) => (
                            <div key={p.name} className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-neutral-200 flex-shrink-0" />
                              <div>
                                <p className="text-sm font-medium text-neutral-950">
                                  {p.name}
                                </p>
                                <p className="text-xs text-neutral-500">{p.role}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <button className="self-start px-7 py-3.5 bg-neutral-950 rounded-full text-sm font-medium text-white hover:bg-neutral-800 transition-colors">
                        Descobrir
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}

      {/* Bottom border for last row when closed */}
      <div className="border-t border-neutral-150" />
    </div>
  );
}

export function Ecosystem() {
  return (
    <section className="relative w-full bg-white" id="ecossistema" style={{ minHeight: "100svh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <div className="max-w-[1440px] w-full mx-auto px-8 md:px-20 flex flex-col gap-10">
        <motion.div {...motionPresets.fadeInUp}>
          <p className="text-xs font-medium tracking-widest text-neutral-400 uppercase mb-3">Ecossistema</p>
          <h2 className="text-[clamp(2rem,3.5vw,3rem)] font-light leading-tight text-neutral-950">Soluções que vão além da energia</h2>
        </motion.div>
        <EcosystemAccordion />
      </div>

      <div className="max-w-[1440px] w-full mx-auto px-8 md:px-20 flex flex-col gap-10">
        <motion.div {...motionPresets.fadeInUp} className="flex items-start justify-between gap-8">
          <div className="flex-1">
            <h2 className="text-[52px] font-regular leading-[1.15] text-neutral-950 mb-2">A Energisa acompanha você</h2>
            <p className="text-base text-neutral-500">Lorem ipsum dolor sit amet, consectetur adipiscing.</p>
          </div>
          <p className="text-xs text-neutral-400">Dados de 2025</p>
        </motion.div>

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
            <div className="flex-1">
              <p className="text-[28px] font-regular text-neutral-950 mb-1">{stat.detail}</p>
              <p className="text-base text-neutral-500">{stat.label}</p>
            </div>
            <p className="text-[80px] font-light text-neutral-950 leading-none tabular-nums">
              {stat.prefix || ""}<AnimatedNumber value={stat.value} suffix={stat.suffix} />
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
