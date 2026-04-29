import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { ScrollProgress } from "@/registry/magicui/scroll-progress";
import { cn } from "@/lib/utils";
import { GridPattern } from "@/registry/magicui/grid-pattern";
import { useIsMobile } from "./ui/use-mobile";

const VoxelGlobe = lazy(() =>
  import("./VoxelGlobe").then((module) => ({
    default: module.VoxelGlobe,
  })),
);

function GlobeFallback() {
  return (
    <div
      className="h-full w-full"
      style={{ background: "radial-gradient(ellipse at 50% 55%, #2a3020 0%, #121312 70%)" }}
    />
  );
}

const TABS = [
  {
    id: "antes",
    label: "Antes",
    title: "Começamos assim",
    body: "Em 1905, nascia em Cataguases, Minas Gerais, uma pequena empresa de energia que viria a transformar o cenário energético brasileiro.",
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
    body: "A meta é clara: 100% de energia renovável até 2030. Com o ecossistema Energisa, estamos redefinindo como o Brasil se conecta.",
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

  const isManualScrolling = useRef(false);
  const animationRef = useRef<any>(null);

  useEffect(() => {
    if (shouldReduceMotion) return;
    return scrollYProgress.on("change", (latest) => {
      if (isManualScrolling.current) return;
      if (latest < 0.39) setActive(0);
      else if (latest < 0.52) setActive(1);
      else setActive(2);
    });
  }, [scrollYProgress, shouldReduceMotion]);

  const barOpacityRaw = useTransform(scrollYProgress, [0.25, 0.32, 0.59, 0.65], [0, 1, 1, 0]);
  const barOpacity = useSpring(barOpacityRaw, { stiffness: 120, damping: 24 });
  const barProgress = useTransform(scrollYProgress, [0.28, 0.61], [0, 1]);

  const scrollToTab = (index: number) => {
    if (animationRef.current) animationRef.current.stop();
    isManualScrolling.current = true;
    setActive(index);

    if (shouldReduceMotion || !containerRef.current) {
      isManualScrolling.current = false;
      return;
    }

    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const elementTop = rect.top + scrollTop;
    const elementHeight = rect.height;
    const windowHeight = window.innerHeight;

    // Progress values that correspond to each tab's center in the scroll range
    const targets = [0.335, 0.455, 0.565];
    const targetProgress = targets[index];

    const targetScroll = targetProgress * (elementHeight + windowHeight) + elementTop - windowHeight;

    // Custom smooth scroll animation using framer-motion's animate
    animationRef.current = animate(window.scrollY, targetScroll, {
      duration: 1.0,
      ease: [0.22, 1, 0.36, 1], // Balanced smooth scroll
      onUpdate: (latest) => window.scrollTo(0, latest),
      onComplete: () => {
        isManualScrolling.current = false;
        animationRef.current = null;
      },
    });
  };

  const current = TABS[active];
  const yOffset = shouldReduceMotion ? 0 : 16;
  const yExitOffset = shouldReduceMotion ? 0 : -10;

  return (
    <div
      ref={containerRef}
      style={{ height: shouldReduceMotion ? "100svh" : "200svh", marginTop: "-15svh", position: "relative", zIndex: 1, background: "#121312" }}
    >
      <motion.section
        className="timeline-visual relative overflow-hidden will-change-transform"
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
            className="top-[80px] h-[1px]"
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
          <Suspense fallback={<GlobeFallback />}>
            <VoxelGlobe
              className="w-full h-full"
              targetPhi={TABS[active].globe.phi}
              targetTheta={TABS[active].globe.theta}
              highlightRegion={TABS[active].globe.highlight}
            />
          </Suspense>
        </motion.div>

        {/* Content — vertically centered */}
        <div className="max-w-[1440px] mx-auto relative px-20 flex flex-col justify-center pointer-events-none h-full" style={{ zIndex: 3 }}>
          <div className="relative z-10 flex flex-col gap-12 pointer-events-none" style={{ maxWidth: 480 }}>
            {/* Toggles (outside AnimatePresence for persistence) */}
            <div className="flex items-center gap-2 pointer-events-auto">
              {TABS.map((tab, i) => (
                <button
                  key={tab.id}
                  onClick={() => scrollToTab(i)}
                  className="relative px-6 min-h-[44px] rounded-[4px] text-xs font-medium transition-colors duration-200 overflow-hidden"
                  style={{
                    fontFamily: "Sora, sans-serif",
                    border: "1px solid rgba(246, 248, 237, 0.08)",
                  }}
                >
                  {/* Active pill background */}
                  {active === i && (
                    <motion.div
                      layoutId="active-pill-desktop"
                      className="absolute inset-0 bg-white/5 rounded-[4px] z-0"
                      style={{ boxShadow: "inset 0 0 0 1px rgba(212, 236, 40, 0.4)" }}
                      transition={{ type: "spring", stiffness: 300, damping: 35 }}
                    />
                  )}
                  <motion.span
                    initial={false}
                    animate={{ color: active === i ? "#D4EC28" : "rgba(246, 248, 237, 0.4)" }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="relative z-10"
                  >
                    {tab.label}
                  </motion.span>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: yOffset }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
                exit={{ opacity: 0, y: yExitOffset, transition: { duration: 0.15, ease: [0.55, 0, 1, 0.45] } }}
                className="flex flex-col gap-6"
              >
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
        </div>
      </motion.section>
    </div>
  );
}

function TimelineMobile() {
  const [active, setActive] = useState(0);
  const current = TABS[active];

  const hasWebGL = useMemo(() => {
    try {
      const canvas = document.createElement('canvas');
      return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
    } catch {
      return false;
    }
  }, []);

  return (
    <section
      className="relative overflow-hidden bg-[#121312]"
      style={{ minHeight: "100svh" }}
    >
      {/* Globe -- shifted up on mobile */}
      <div
        className="absolute top-[-5svh] left-0 right-0 h-[65svh] pointer-events-none"
        style={{ touchAction: "none" }}
      >
        {hasWebGL ? (
          <Suspense fallback={<GlobeFallback />}>
            <VoxelGlobe
              className="w-full h-full"
              targetPhi={TABS[active].globe.phi}
              targetTheta={TABS[active].globe.theta}
              highlightRegion={TABS[active].globe.highlight}
            />
          </Suspense>
        ) : (
          <GlobeFallback />
        )}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent 40%, #121312 95%)" }}
        />
      </div>

      {/* Content -- pinned to bottom */}
      <div className="relative z-10 flex flex-col justify-end" style={{ minHeight: "100svh" }}>
        <div className="px-5 pb-14 flex flex-col gap-10">

          {/* Toggles (Always visible) */}
          <div className="flex items-center gap-2">
            {TABS.map((tab, i) => (
              <button
                key={tab.id}
                onClick={() => setActive(i)}
                className="relative flex-1 min-h-[44px] rounded-[4px] text-xs font-medium transition-colors duration-200"
                style={{
                  fontFamily: "Sora, sans-serif",
                  color: active === i ? "#D4EC28" : "rgba(246, 248, 237, 0.4)",
                  border: "1px solid rgba(246, 248, 237, 0.08)",
                }}
              >
                <AnimatePresence>
                  {active === i && (
                    <motion.div
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 bg-white/5 rounded-[4px] z-0"
                      style={{ boxShadow: "inset 0 0 0 1px rgba(212, 236, 40, 0.4)" }}
                    />
                  )}
                </AnimatePresence>
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Animated content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
              exit={{ opacity: 0, y: -10, transition: { duration: 0.15, ease: [0.55, 0, 1, 0.45] } }}
              className="flex flex-col gap-6"
            >
              {/* Title */}
              <h2 style={{ fontFamily: "Sora, sans-serif", fontWeight: 400, fontSize: "24px", color: "#FFFFFF", lineHeight: 1.25 }}>
                {current.title}
              </h2>

              {/* Body */}
              <p style={{ fontFamily: "Sora, sans-serif", fontSize: "14px", color: "rgba(246, 248, 237, 0.6)", lineHeight: 1.7 }}>
                {current.body}
              </p>

              {/* Metrics */}
              <div className="flex items-center gap-8 mt-1">
                {current.metrics.map((m, idx) => (
                  <div key={idx} className="flex items-center gap-8">
                    <div className="flex flex-col gap-1">
                      <span style={{ fontFamily: "Sora, sans-serif", fontSize: "28px", color: "#FFFFFF", fontWeight: 400 }}>
                        {m.value}
                      </span>
                      <span style={{ fontFamily: "Sora, sans-serif", fontSize: "10px", color: "rgba(246, 248, 237, 0.4)", letterSpacing: "0.04em", textTransform: "lowercase" }}>
                        {m.label}
                      </span>
                    </div>
                    {idx < current.metrics.length - 1 && (
                      <div style={{ width: 1, height: 36, background: "rgba(246, 248, 237, 0.1)" }} />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   EXPORTED WRAPPER — renders the right instance per breakpoint
───────────────────────────────────────────────────────────── */
export function TimelineSection() {
  const isMobile = useIsMobile();

  return (
    <div id="timeline" className="section origin-center bg-[#121312]">
      <div className="section-inner">
        {isMobile ? <TimelineMobile /> : <TimelineDesktop />}
      </div>
    </div>
  );
}
