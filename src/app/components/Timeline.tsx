import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { VoxelGlobe } from "./VoxelGlobe";
import { Zap, Leaf, Globe, Cpu, Flame, Sparkles } from "lucide-react";

const TABS = [
  {
    id: "antes",
    label: "Antes",
    title: "Começamos assim",
    body: "Em 1905, nascia em Cataguases, Minas Gerais, uma pequena empresa de energia que viria a transformar o cenário energético brasileiro.",
    icons: [
      { icon: Flame, label: "Pioneirismo" },
      { icon: Globe, label: "Expansão" },
      { icon: Zap, label: "Distribuição" },
    ],
    globe: { phi: 0.85, theta: 0.31, scale: 0.82, highlight: 'mg' },
  },
  {
    id: "agora",
    label: "Agora",
    title: "Estamos prontos para inovar",
    body: "Com investimentos massivos em tecnologia e inovação, a Energisa se posiciona na vanguarda da transição energética brasileira.",
    icons: [
      { icon: Cpu, label: "Smart Grid" },
      { icon: Leaf, label: "Energia Limpa" },
      { icon: Zap, label: "Eficiência" },
    ],
    globe: { phi: 0.95, theta: 0.26, scale: 0.78, highlight: 'br' },
  },
  {
    id: "futuro",
    label: "Futuro",
    title: "Acolhemos o novo",
    body: "A meta é clara: 100% de energia renovável até 2030. Com o ecossistema Energisa, estamos redefinindo como o Brasil se conecta com o futuro.",
    icons: [
      { icon: Sparkles, label: "Inovação" },
      { icon: Leaf, label: "Sustentabilidade" },
      { icon: Globe, label: "Alcance Global" },
    ],
    globe: { phi: 1.15, theta: 0.09, scale: 0.74, highlight: 'sa' },
  },
];

export function TimelineSection() {
  const [active, setActive] = useState(0);
  const current = TABS[active];

  return (
    <section
      id="timeline"
      className="relative overflow-hidden"
      style={{ background: "#121312", minHeight: "100svh" }}
    >
      <div
        className="max-w-[1440px] mx-auto relative px-8 md:px-20 py-24 flex flex-col gap-16"
        style={{ minHeight: "100svh" }}
      >
        {/* Tabs */}
        <div className="flex items-center gap-10 relative z-10">
          {TABS.map((tab, i) => (
            <button
              key={tab.id}
              onClick={() => setActive(i)}
              className="relative pb-2 cursor-pointer active:scale-[0.97]"
              style={{
                fontFamily: "Sora, sans-serif",
                fontSize: "16px",
                color: i === active ? "#F6F8ED" : "rgba(246, 248, 237, 0.35)",
                transition: "color 0.2s ease",
                background: "transparent",
                border: "none",
                padding: "0 0 8px 0",
              }}
            >
              {tab.label}
              {i === active && (
                <motion.div
                  layoutId="timeline-tab"
                  className="absolute bottom-0 left-0 right-0 h-px bg-[#F6F8ED]"
                  transition={{ duration: 0.3, ease: [0.65, 0, 0.35, 1] }}
                />
              )}
            </button>
          ))}
        </div>

          {/* Main content */}
        <div className="relative z-10 flex flex-col gap-10" style={{ maxWidth: 460 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="flex flex-col gap-6"
            >
              {/* Icons row */}
              <div className="flex items-center gap-6">
                {current.icons.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2">
                    <Icon
                      size={16}
                      style={{ color: "rgba(246, 248, 237, 0.5)" }}
                      strokeWidth={1.5}
                    />
                    <span
                      style={{
                        fontFamily: "Sora, sans-serif",
                        fontSize: "12px",
                        color: "rgba(246, 248, 237, 0.45)",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Title */}
              <h2
                style={{
                  fontFamily: "Sora, sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(24px, 2.6vw, 32px)",
                  color: "#F6F8ED",
                  lineHeight: 1.2,
                }}
              >
                {current.title}
              </h2>

              {/* Body */}
              <p
                style={{
                  fontFamily: "Sora, sans-serif",
                  fontSize: "clamp(14px, 1.1vw, 16px)",
                  color: "rgba(246, 248, 237, 0.6)",
                  lineHeight: 1.7,
                  maxWidth: 400,
                }}
              >
                {current.body}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Globe — absolute right, anchored to the grid container (not the section) */}
        <div
          className="hidden md:flex absolute top-0 right-0 pointer-events-auto items-center"
          style={{ width: "56%", height: "100%" }}
        >
          <div style={{ width: "100%", padding: "60px 16px 60px 0" }}>
            <VoxelGlobe
              className="w-full"
              targetPhi={TABS[active].globe.phi}
              targetTheta={TABS[active].globe.theta}
              targetScale={TABS[active].globe.scale}
              highlightRegion={(TABS[active].globe as any).highlight}
            />
          </div>
          {/* Fade left edge into bg */}
          <div
            className="absolute inset-y-0 left-0 pointer-events-none"
            style={{
              width: "35%",
              background: "linear-gradient(to right, #121312, transparent)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
