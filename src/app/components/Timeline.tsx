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
    globe: { phi: 0.90, theta: -0.18, highlight: 'mg' },
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
    globe: { phi: 1.00, theta: -0.24, highlight: 'br' },
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
    globe: { phi: 1.12, theta: -0.30, highlight: 'sa' },
  },
];

export function TimelineSection() {
  const [active, setActive] = useState(1);
  const current = TABS[active];

  return (
    <section
      id="timeline"
      className="relative overflow-hidden"
      style={{ background: "#121312", minHeight: "110svh" }}
    >
      <div
        className="max-w-[1440px] mx-auto relative px-8 md:px-20 py-32 flex flex-col gap-16"
        style={{ minHeight: "110svh" }}
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
          className="hidden md:flex absolute top-0 right-0 pointer-events-auto items-center justify-end"
          style={{ width: "55%", height: "100%" }}
        >
          {/* Glowing background blob behind the globe - temporarily removed 
          <div
            className="absolute pointer-events-none"
            style={{
              width: "120%",
              height: "120%",
              right: "-10%",
              top: "-10%",
              background: "radial-gradient(circle at 60% 50%, rgba(255, 199, 9, 0.08) 0%, rgba(255, 199, 9, 0.03) 30%, rgba(18, 19, 18, 0) 70%)",
              zIndex: 0,
            }}
          />
          */}

          <div style={{ width: '100%', height: '100%', position: 'relative', zIndex: 1 }}>
            <VoxelGlobe
              className="w-full h-full"
              targetPhi={TABS[active].globe.phi}
              targetTheta={TABS[active].globe.theta}
              highlightRegion={TABS[active].globe.highlight}
            />
            {/* Fade overlays to blend the 3D element into the section */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `
                  linear-gradient(to right, #121312 0%, transparent 25%),
                  linear-gradient(to top, #121312 0%, transparent 25%),
                  linear-gradient(to bottom, #121312 0%, transparent 15%)
                `,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
