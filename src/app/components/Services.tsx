import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import svgPaths from "../../imports/Site/svg-swy5fdu2p6";
import { cn } from "@/lib/utils";
import { GridPattern } from "@/registry/magicui/grid-pattern";
import { motionTransition, pressTap } from "@/lib/motion";

function ServiceCard({ card }: { card: { icon: React.ReactNode; label: string; description: string } }) {
  return (
    <motion.div
      className="relative"
      style={{ height: "176px", pointerEvents: "none" }}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
    >
      <div className="absolute inset-[1px] z-20 pointer-events-auto cursor-pointer" />

      <motion.div
        className="relative z-10 flex h-full w-full flex-col justify-between rounded-[4px] border border-[#8b8d85] bg-[#FFFFFF] p-4"
        variants={{
          rest: { y: 0, boxShadow: "0 0 0 0 rgba(0,0,0,0)" },
          hover: { y: -5, boxShadow: "0 12px 28px 0 rgba(0,0,0,0.12)" },
          tap: { scale: 0.985 },
        }}
        transition={motionTransition.fast}
      >
        <div className="relative z-10">{card.icon}</div>

        <div className="relative z-10 flex flex-col gap-1">
          <p
            style={{
              fontFamily: "Sora, sans-serif",
              fontSize: "clamp(16px, 1.5vw, 20px)",
              color: "#000",
              lineHeight: 1.4,
            }}
          >
            {card.label}
          </p>

          <motion.div
            className="grid"
            variants={{
              rest: { gridTemplateRows: "0fr" },
              hover: { gridTemplateRows: "1fr" },
            }}
            transition={motionTransition.layout}
          >
            <div className="overflow-hidden flex flex-col justify-end">
              <motion.p
                variants={{
                  rest: { opacity: 0 },
                  hover: { opacity: 1, transition: { ...motionTransition.fast, delay: 0.05 } },
                }}
                style={{
                  fontFamily: "Sora, sans-serif",
                  fontSize: "13px",
                  color: "#71726B",
                  lineHeight: 1.5,
                  paddingTop: 4,
                  whiteSpace: "pre-line",
                }}
              >
                {card.description}
              </motion.p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function IconNoEnergy() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="black"
      strokeWidth="1.5"
      strokeLinecap="square"
      strokeLinejoin="round"
    >
      <path d={svgPaths.p1f803b20} />
      <path d="M4 3L18 17" />
      <path d={svgPaths.p34a4cd00} />
      <path d="M9 18H15" />
      <path d="M10 22H14" />
    </svg>
  );
}

function IconPayment() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1.5" strokeLinecap="square">
      <path d="M12 1V23" />
      <path d={svgPaths.p2ba0dca0} />
    </svg>
  );
}

function IconRefresh() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1.5" strokeLinecap="square">
      <path d={svgPaths.p1a26da80} />
    </svg>
  );
}

function IconDocument() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1.5" strokeLinecap="square">
      <path d={svgPaths.p30b05a80} />
      <path d="M13 3V9H19" />
    </svg>
  );
}

function IconReceipt() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round">
      <path d="M6 2H18V21L15 19L12 21L9 19L6 21V2Z" />
      <path d="M9 8H15" />
      <path d="M9 11.5H13" />
    </svg>
  );
}

function IconMeter() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round">
      <path d="M4.5 17A7.5 7.5 0 0 1 19.5 17" />
      <path d="M12 17L15.5 10.5" />
      <path d="M8.5 17H15.5" />
      <path d="M6 14L4.5 12.5" />
      <path d="M18 14L19.5 12.5" />
    </svg>
  );
}

const CARDS_CASA = [
  { icon: <IconNoEnergy />, label: "Falta de energia", description: "Reporte quedas e acompanhe\no restabelecimento em tempo real." },
  { icon: <IconPayment />, label: "Pagamento", description: "Pague sua conta com Pix,\nboleto ou débito automático." },
  { icon: <IconRefresh />, label: "Renegociar", description: "Parcele dívidas e regularize\nseu fornecimento sem sair de casa." },
  { icon: <IconDocument />, label: "Segunda via", description: "Gere a segunda via da sua\nfatura de forma rápida e gratuita." },
];

const CARDS_EMPRESA = [
  { icon: <IconDocument />, label: "Segunda via", description: "Gere a segunda via da sua\nfatura de forma rápida e gratuita." },
  { icon: <IconReceipt />, label: "Comprovante de pagamento", description: "Acesse e baixe comprovantes\nde pagamentos realizados." },
  { icon: <IconMeter />, label: "Informar leitura", description: "Informe a leitura do medidor\nde forma rápida e segura." },
  { icon: <IconNoEnergy />, label: "Falta de energia", description: "Reporte quedas e acompanhe\no restabelecimento em tempo real." },
];

export function Services() {
  const [tab, setTab] = useState<"Casa" | "Empresa">("Casa");
  const cards = tab === "Casa" ? CARDS_CASA : CARDS_EMPRESA;

  return (
    <section id="solucoes" className="relative overflow-hidden bg-white" style={{ paddingTop: "8.75vh", paddingBottom: "6.25vh", scrollMarginTop: "80px" }}>
      {/* Background Grid Pattern */}
      <GridPattern
        width={40}
        height={40}
        x={-1}
        y={-1}
        className={cn(
          "absolute inset-0 h-full w-full opacity-100 pointer-events-none stroke-gray-900/[0.09]",
          "[mask-image:radial-gradient(1000px_circle_at_bottom_left,white,transparent)]"
        )}
      />
      <div className="max-w-[1440px] w-full mx-auto px-5 md:px-20 flex flex-col gap-10 relative z-10">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <h2
            style={{
              fontFamily: "Sora, sans-serif",
              fontWeight: 400,
              fontSize: "clamp(28px, 3vw, 39px)",
              color: "#000",
            }}
          >
            Serviços
          </h2>
          <div className="flex items-end gap-6 flex-wrap">
            <div className="flex-1">
              <div className="flex items-center gap-6">
                {(["Casa", "Empresa"] as const).map((t) => (
                  <motion.button
                    key={t}
                    onClick={() => setTab(t)}
                    className="relative pb-1 cursor-pointer"
                    style={{
                      fontFamily: "Sora, sans-serif",
                      fontSize: "25px",
                      color: tab === t ? "#121312" : "#8b8d85",
                      fontWeight: tab === t ? 600 : 400,
                    }}
                    animate={{
                      color: tab === t ? "#121312" : "#8b8d85",
                      fontWeight: tab === t ? 600 : 400,
                    }}
                    transition={motionTransition.fast}
                    whileTap={pressTap}
                  >
                    {t}
                    {tab === t && (
                      <motion.div
                        layoutId="services-tab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#121312]"
                        transition={{ duration: 0.3, ease: [0.65, 0, 0.35, 1] }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full"
          >
            {cards.map((card) => (
              <ServiceCard key={card.label} card={card} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
