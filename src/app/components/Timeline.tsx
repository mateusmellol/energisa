import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform, useSpring } from "motion/react";
import { VoxelGlobe } from "./VoxelGlobe";
import { Zap, Leaf, Globe, Cpu, Flame, Sparkles } from "lucide-react";
import { ScrollProgress } from "@/registry/magicui/scroll-progress";
import { cn } from "@/lib/utils";
import { GridPattern } from "@/registry/magicui/grid-pattern";

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

/* ─────────────────────────────────────────────────────────────
   DESKTOP — scroll-driven sticky experience (original behaviour)
───────────────────────────────────────────────────────────── */
function TimelineDesktop() {
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    if (shouldReduceMotion) return;
    return scrollYProgress.on("change", (latest) => {
      if (latest < 0.39) setActive(0);
      else if (latest < 0.52) setActive(1);
      else setActive(2);
    });
  }, [scrollYProgress, shouldReduceMotion]);

  const barOpacityRaw = useTransform(scrollYProgress, [0.25, 0.32, 0.59, 0.65], [0, 1, 1, 0]);
  const barOpacity = useSpring(barOpacityRaw, { stiffness: 120, damping: 24 });
  const barProgress = useTransform(scrollYProgress, [0.28, 0.61], [0, 1]);

  const current = TABS[active];
  const yOffset = shouldReduceMotion ? 0 : 16;
  const yExitOffset = shouldReduceMotion ? 0 : -10;

  return (
    <div
      ref={containerRef}
      style={{ height: shouldReduceMotion ? "100svh" : "200svh", marginTop: "-15svh", position: "relative", zIndex: 1, background: "#121312" }}
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
        {/* Progress bar */}
        {!shouldReduceMotion && (
          <ScrollProgress
            motionValue={barProgress}
            opacityValue={barOpacity}
            className="top-[80px] h-[1.5px]"
            color="#D4EC28"
          />
        )}

        {/* Background grid */}
        <GridPattern
          width={40}
          height={40}
          x={-1}
          y={-1}
          className={cn(
            "absolute inset-0 h-full w-full pointer-events-none stroke-white/[0.05] z-[2]",
            "[mask-image:radial-gradient(1000px_circle_at_top_left,white,transparent)]"
          )}
        />

        {/* Globe — right side, full height */}
        <motion.div
          className="absolute top-0 bottom-0 right-0 pointer-events-auto"
          style={{
            width: "65%",
            height: "100%",
            touchAction: "none",
            zIndex: 1,
            maskImage: "linear-gradient(to right, transparent 0%, black 150px)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 150px)",
          }}
        >
          <VoxelGlobe
            className="w-full h-full"
            targetPhi={TABS[active].globe.phi}
            targetTheta={TABS[active].globe.theta}
            highlightRegion={TABS[active].globe.highlight}
          />
        </motion.div>

        {/* Content — vertically centered */}
        <motion.div
          className="max-w-[1440px] mx-auto relative px-20 flex flex-col justify-center pointer-events-none h-full"
          style={{ zIndex: 3 }}
        >
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
                      <Icon size={16} style={{ color: "rgba(246, 248, 237, 0.5)" }} strokeWidth={1.5} />
                      <span style={{ fontFamily: "Sora, sans-serif", fontSize: "12px", color: "rgba(246, 248, 237, 0.45)", letterSpacing: "0.04em" }}>
                        {label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Title */}
                <h2 style={{ fontFamily: "Sora, sans-serif", fontWeight: 400, fontSize: "clamp(24px, 2.6vw, 32px)", color: "#FFFFFF", lineHeight: 1.2 }}>
                  {current.title}
                </h2>

                {/* Body */}
                <p style={{ fontFamily: "Sora, sans-serif", fontSize: "clamp(14px, 1.1vw, 16px)", color: "rgba(246, 248, 237, 0.6)", lineHeight: 1.7, maxWidth: 400 }}>
                  {current.body}
                </p>

                {/* Metrics */}
                <div className="flex items-center gap-12 mt-4">
                  {current.metrics.map((m, idx) => (
                    <div key={idx} className="flex items-center gap-12">
                      <div className="flex flex-col gap-1">
                        <span style={{ fontFamily: "Sora, sans-serif", fontSize: "32px", color: "#FFFFFF", fontWeight: 400 }}>
                          {m.value}
                        </span>
                        <span style={{ fontFamily: "Sora, sans-serif", fontSize: "12px", color: "rgba(246, 248, 237, 0.4)", letterSpacing: "0.04em", textTransform: "lowercase" }}>
                          {m.label}
                        </span>
                      </div>
                      {idx < current.metrics.length - 1 && (
                        <div style={{ width: 1, height: 40, background: "rgba(246, 248, 237, 0.1)" }} />
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MOBILE — manual tab switching, globe on top, content below
───────────────────────────────────────────────────────────── */
function TimelineMobile() {
  const [active, setActive] = useState(0);
  const current = TABS[active];

  return (
    <section
      id="timeline"
      className="relative overflow-hidden bg-[#121312]"
      style={{ minHeight: "100svh" }}
    >
      {/* Globe — top half */}
      <div className="relative w-full h-[45svh]">
        <VoxelGlobe
          className="w-full h-full"
          targetPhi={TABS[active].globe.phi}
          targetTheta={TABS[active].globe.theta}
          highlightRegion={TABS[active].globe.highlight}
        />
        {/* Fade bottom */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent 40%, #121312 95%)" }}
        />
      </div>

      {/* Content — below globe */}
      <div className="relative z-10 px-5 pb-12 flex flex-col gap-8 -mt-8">
        {/* Tab switcher */}
        <div className="flex items-center gap-2">
          {TABS.map((tab, i) => (
            <button
              key={tab.id}
              onClick={() => setActive(i)}
              className="flex-1 min-h-[44px] rounded-[4px] text-sm font-medium transition-all duration-200"
              style={{
                fontFamily: "Sora, sans-serif",
                backgroundColor: active === i ? "rgba(246, 248, 237, 0.12)" : "transparent",
                color: active === i ? "#f6f8ed" : "rgba(246, 248, 237, 0.4)",
                border: active === i ? "1px solid rgba(246, 248, 237, 0.2)" : "1px solid transparent",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Animated content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
            className="flex flex-col gap-5"
          >
            {/* Icons */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {current.icons.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <Icon size={14} style={{ color: "rgba(246, 248, 237, 0.5)" }} strokeWidth={1.5} />
                  <span style={{ fontFamily: "Sora, sans-serif", fontSize: "11px", color: "rgba(246, 248, 237, 0.45)", letterSpacing: "0.04em" }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Title */}
            <h2 style={{ fontFamily: "Sora, sans-serif", fontWeight: 400, fontSize: "24px", color: "#FFFFFF", lineHeight: 1.25 }}>
              {current.title}
            </h2>

            {/* Body */}
            <p style={{ fontFamily: "Sora, sans-serif", fontSize: "14px", color: "rgba(246, 248, 237, 0.6)", lineHeight: 1.7 }}>
              {current.body}
            </p>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-3 mt-2">
              {current.metrics.map((m, idx) => (
                <div key={idx} className="flex flex-col gap-1">
                  <span style={{ fontFamily: "Sora, sans-serif", fontSize: "24px", color: "#FFFFFF", fontWeight: 400 }}>
                    {m.value}
                  </span>
                  <span style={{ fontFamily: "Sora, sans-serif", fontSize: "10px", color: "rgba(246, 248, 237, 0.4)", letterSpacing: "0.04em", textTransform: "lowercase" }}>
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   EXPORTED WRAPPER — renders the right instance per breakpoint
───────────────────────────────────────────────────────────── */
export function TimelineSection() {
  return (
    <>
      {/* Mobile only */}
      <div className="block md:hidden">
        <TimelineMobile />
      </div>
      {/* Desktop only */}
      <div className="hidden md:block">
        <TimelineDesktop />
      </div>
    </>
  );
}
