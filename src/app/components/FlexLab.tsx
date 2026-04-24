import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ProfileCard } from "./ProfileCard";
import { Zap, Leaf, ShieldCheck, Cpu, Globe, Activity } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const ITEMS = [
  {
    index: "001",
    title: "FlexLab",
    subtitle: "O laboratório de inovação do Grupo Energisa",
    description:
      "O FlexLab desenvolve soluções em energia renovável, eficiência energética e smart grid, conectando startups e parceiros para criar o futuro da energia no Brasil.",
    benefits: [
      { icon: Zap, label: "Smart Grid" },
      { icon: Cpu, label: "Inovação" },
      { icon: Activity, label: "Monitoramento" },
    ],
  },
  {
    index: "002",
    title: "Energisa+",
    subtitle: "Serviços digitais integrados para gestão de energia",
    description:
      "Com o Energisa+, clientes têm acesso a um portfólio completo de serviços além do fornecimento — desde solar fotovoltaico até gestão inteligente de consumo.",
    benefits: [
      { icon: Leaf, label: "Energia Limpa" },
      { icon: Globe, label: "Sustentabilidade" },
      { icon: ShieldCheck, label: "Eficiência" },
    ],
  },
  {
    index: "003",
    title: "Portal do Cliente",
    subtitle: "Autoatendimento digital em tempo real",
    description:
      "Canal digital completo para acompanhamento de faturas, solicitação de serviços e histórico de consumo, disponível 24 horas por dia.",
    benefits: [
      { icon: ShieldCheck, label: "Segurança" },
      { icon: Activity, label: "Tempo Real" },
      { icon: Cpu, label: "Digital" },
    ],
  },
];

export function FlexLab() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="ecossistema"
      className="w-full bg-[#F6F8ED] py-20 px-8 md:px-20"
    >
      <div className="max-w-[1440px] mx-auto w-full flex flex-col gap-14">

        {/* Header */}
        <div className="flex flex-col gap-2">
          <p
            style={{ fontFamily: "Sora, sans-serif", fontSize: 11, letterSpacing: "0.15em" }}
            className="text-[#8B8D85] uppercase font-medium"
          >
            Ecossistema
          </p>
          <h2
            style={{
              fontFamily: "Sora, sans-serif",
              fontWeight: 400,
              fontSize: "clamp(28px, 3vw, 42px)",
              color: "#121312",
              lineHeight: 1.2,
            }}
          >
            Soluções que vão além da energia
          </h2>
        </div>

        {/* Accordion */}
        <div className="flex flex-col">
          {ITEMS.map((item, i) => {
            const isOpen = active === i;
            return (
              <div key={item.index}>
                <button
                  onClick={() => setActive(i)}
                  className="w-full text-left group"
                >
                  <div
                    className="flex items-center gap-6 py-6 px-6 transition-all duration-300"
                    style={{
                      border: isOpen
                        ? "1px solid rgba(18,19,18,0.18)"
                        : "none",
                      borderTop: isOpen
                        ? "1px solid rgba(18,19,18,0.18)"
                        : i === 0
                        ? "none"
                        : "1px solid rgba(18,19,18,0.12)",
                      borderRadius: isOpen ? 16 : 0,
                    }}
                  >
                    {/* Index */}
                    <span
                      style={{
                        fontFamily: "Sora, sans-serif",
                        fontSize: 10,
                        letterSpacing: "0.18em",
                        color: isOpen ? "#555653" : "#A6A7A0",
                        whiteSpace: "nowrap",
                        transition: "color 0.3s",
                      }}
                      className="uppercase font-medium"
                    >
                      ECOSSISTEMA / {item.index}
                    </span>

                    {/* Title */}
                    <span
                      style={{
                        fontFamily: "Sora, sans-serif",
                        fontWeight: 300,
                        fontSize: "clamp(28px, 4.5vw, 64px)",
                        color: isOpen ? "#121312" : "#71726B",
                        lineHeight: 1.05,
                        letterSpacing: "-0.02em",
                        transition: "color 0.3s",
                        flex: 1,
                        textAlign: "center",
                      }}
                    >
                      {item.title}
                    </span>

                    {/* Saiba mais */}
                    <span
                      style={{
                        fontFamily: "Sora, sans-serif",
                        fontSize: 10,
                        letterSpacing: "0.18em",
                        color: isOpen ? "#121312" : "#A6A7A0",
                        whiteSpace: "nowrap",
                        transition: "color 0.3s",
                      }}
                      className="uppercase font-medium"
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
                      transition={{ duration: 0.45, ease: EASE }}
                      style={{ overflow: "hidden" }}
                    >
                      <div
                        className="px-6 pb-10 pt-4 flex flex-col md:flex-row gap-10"
                        style={{ borderTop: "1px solid rgba(18,19,18,0.08)" }}
                      >
                        {/* Image placeholder */}
                        <div
                          className="w-full md:w-[55%] rounded-xl flex-shrink-0"
                          style={{
                            height: "min(280px, 28vw)",
                            background: "rgba(18,19,18,0.06)",
                          }}
                        />

                        {/* Info */}
                        <div className="flex flex-col justify-between gap-8 flex-1">
                          <div className="flex flex-col gap-5">
                            <p
                              style={{
                                fontFamily: "Sora, sans-serif",
                                fontSize: "clamp(14px, 1.2vw, 17px)",
                                color: "#555653",
                                lineHeight: 1.65,
                              }}
                            >
                              {item.description}
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                              {item.benefits.map((b, j) => (
                                <ProfileCard key={j} icon={b.icon} label={b.label} />
                              ))}
                            </div>
                          </div>

                          <button
                            style={{
                              fontFamily: "Sora, sans-serif",
                              fontSize: 15,
                              color: "#F6F8ED",
                              background: "#121312",
                              border: "none",
                              padding: "13px 30px",
                              borderRadius: 999,
                              cursor: "pointer",
                              alignSelf: "flex-start",
                            }}
                          >
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

          {/* Bottom border */}
          <div style={{ borderTop: "1px solid rgba(18,19,18,0.12)" }} />
        </div>
      </div>
    </section>
  );
}
