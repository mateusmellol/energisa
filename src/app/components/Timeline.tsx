import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform, useSpring } from "motion/react";
import { VoxelGlobe } from "./VoxelGlobe";
import { Zap, Leaf, Globe, Cpu, Flame, Sparkles } from "lucide-react";
import { ScrollProgress } from "@/registry/magicui/scroll-progress";

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
    metrics: [
      { value: "1905", label: "fundação" },
      { value: "MG", label: "origem" },
      { value: "1ª", label: "do setor" },
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
    metrics: [
      { value: "11", label: "distribuidoras" },
      { value: "20M+", label: "clientes" },
      { value: "862k", label: "km de rede" },
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
    metrics: [
      { value: "100%", label: "renovável" },
      { value: "2030", label: "meta" },
      { value: "Net", label: "zero" },
    ],
    globe: { phi: 1.12, theta: -0.30, highlight: 'sa' },
  },
];

export function TimelineSection() {
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Track scroll progress through the 300svh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Drive tab transitions from scroll position
  useEffect(() => {
    if (shouldReduceMotion) return;
    return scrollYProgress.on("change", (latest) => {
      if (latest < 0.25) setActive(0);
      else if (latest < 0.50) setActive(1);
      else setActive(2);
    });
  }, [scrollYProgress, shouldReduceMotion]);

  // Subtle fade-in as section enters


  // Progress bar: fade in at start, fade out when FlexLab starts sliding over (~75%)
  const barOpacityRaw = useTransform(scrollYProgress, [0, 0.04, 0.75, 0.85], [0, 1, 1, 0]);
  const barOpacity = useSpring(barOpacityRaw, { stiffness: 120, damping: 24 });

  const current = TABS[active];
  const yOffset = shouldReduceMotion ? 0 : 16;
  const yExitOffset = shouldReduceMotion ? 0 : -10;

  return (
    // Scroll track — 300svh gives ~100svh of scroll dwell per tab
    <div
      ref={containerRef}
      style={{ height: shouldReduceMotion ? "100svh" : "400svh" }}
    >
      <motion.section
        id="timeline"
        className="relative overflow-hidden"
        style={{
          position: "sticky",
          top: 0,
          height: "100svh",
          background: "#121312",
          opacity: 1,
        }}
      >
        {/* Energisa yellow progress bar — below the fixed header */}
        {!shouldReduceMotion && (
          <ScrollProgress
            motionValue={scrollYProgress}
            opacityValue={barOpacity}
            className="top-[80px] h-[1.5px]"
            color="#D4EC28"
          />
        )}

        {/* Globe — positioned to the right */}
        <div
          className="hidden md:block absolute top-0 bottom-0 right-0 pointer-events-auto"
          style={{ width: "65%", height: "100%", touchAction: "none" }}
        >
          <VoxelGlobe
            className="w-full h-full"
            targetPhi={TABS[active].globe.phi}
            targetTheta={TABS[active].globe.theta}
            highlightRegion={TABS[active].globe.highlight}
          />
        </div>

        {/* Soft gradient veil — blends the text background into the globe */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 1,
            background: "linear-gradient(to right, #121312 0%, #121312 22%, rgba(18,19,18,0.82) 42%, rgba(18,19,18,0.3) 60%, rgba(18,19,18,0) 75%)",
          }}
        />

        <div
          className="max-w-[1440px] mx-auto relative px-8 md:px-20 flex flex-col justify-center pointer-events-none h-full"
          style={{ zIndex: 2 }}
        >
          {/* Main content */}
          <div className="relative z-10 flex flex-col gap-10 pointer-events-none" style={{ maxWidth: 480 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: yOffset }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
                exit={{ opacity: 0, y: yExitOffset, transition: { duration: 0.15, ease: [0.55, 0, 1, 0.45] } }}
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
                    color: "#FFFFFF",
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

                {/* Metrics */}
                <div className="flex items-center gap-12 mt-4">
                  {(current as any).metrics.map((m: any, idx: number) => (
                    <div key={idx} className="flex items-center gap-12">
                      <div className="flex flex-col gap-1">
                        <span style={{
                          fontFamily: "Sora, sans-serif",
                          fontSize: "32px",
                          color: "#FFFFFF",
                          fontWeight: 400
                        }}>
                          {m.value}
                        </span>
                        <span style={{
                          fontFamily: "Sora, sans-serif",
                          fontSize: "12px",
                          color: "rgba(246, 248, 237, 0.4)",
                          letterSpacing: "0.04em",
                          textTransform: "lowercase"
                        }}>
                          {m.label}
                        </span>
                      </div>
                      {idx < (current as any).metrics.length - 1 && (
                        <div style={{ width: 1, height: 40, background: "rgba(246, 248, 237, 0.1)" }} />
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
