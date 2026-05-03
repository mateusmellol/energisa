import { useRef, useState, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { GridPattern } from "@/registry/magicui/grid-pattern";
import { NumberTicker } from "./ui/number-ticker";
import { useIsMobile } from "./ui/use-mobile";

// ---- Data (Unified for both versions) ----
const STATS_DATA = [
  {
    value: 25,
    suffix: "mi",
    label: "pessoas atendidas",
    text: "Mais de 25 milhões de brasileiros têm acesso à energia elétrica todos os dias graças à operação da Energisa — de grandes centros urbanos a comunidades isoladas.",
    barHeight: "35%",
  },
  {
    value: 939,
    suffix: "",
    label: "municípios atendidos",
    text: "A Energisa está presente em 939 municípios, levando infraestrutura elétrica confiável para regiões que vão muito além das capitais.",
    barHeight: "48%",
  },
  {
    value: 97,
    suffix: "%",
    label: "do território nacional",
    text: "97% do território brasileiro coberto pela rede de distribuição da Energisa — a maior cobertura dentre as distribuidoras privadas do país.",
    barHeight: "62%",
  },
];

type ImpactAnimationMode = "idle" | "charge" | "discharge";

function useImpactAnimation() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isCharged, setIsCharged] = useState(false);
  const [animationCycle, setAnimationCycle] = useState(0);
  const [animationMode, setAnimationMode] = useState<ImpactAnimationMode>("idle");
  const scrollDirectionRef = useRef<"down" | "up">("down");
  const lastScrollYRef = useRef(0);
  const dischargeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY === lastScrollYRef.current) {
        return;
      }

      scrollDirectionRef.current = currentScrollY > lastScrollYRef.current ? "down" : "up";
      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const clearDischargeTimer = () => {
      if (dischargeTimerRef.current !== null) {
        window.clearTimeout(dischargeTimerRef.current);
        dischargeTimerRef.current = null;
      }
    };

    const playChargeAnimation = () => {
      clearDischargeTimer();
      setAnimationMode("charge");
      setIsCharged((previouslyCharged) => {
        if (previouslyCharged) return previouslyCharged;
        setAnimationCycle((currentCycle) => currentCycle + 1);
        return true;
      });
    };

    const playDischargeAnimation = () => {
      clearDischargeTimer();
      setAnimationMode("discharge");
      setIsCharged(false);
      dischargeTimerRef.current = window.setTimeout(() => {
        setAnimationMode("idle");
        dischargeTimerRef.current = null;
      }, 950);
    };

    const handleViewportProgress = () => {
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const loadStartLine = viewportHeight * 0.9;
      const exitWindow = viewportHeight * 0.2;
      const isEnteringFromBottom = rect.top <= loadStartLine && rect.top >= -rect.height * 0.15;
      const isBottomSliceVisible = rect.bottom > 0 && rect.bottom <= exitWindow;

      if (scrollDirectionRef.current === "down") {
        if (!isCharged && isEnteringFromBottom) {
          playChargeAnimation();
          return;
        }

        if (isCharged && isBottomSliceVisible) {
          playDischargeAnimation();
          return;
        }
      }

      if (scrollDirectionRef.current === "up" && !isCharged && isBottomSliceVisible) {
        playChargeAnimation();
        return;
      }

      if (rect.top >= viewportHeight || rect.bottom <= 0) {
        clearDischargeTimer();
        setAnimationMode("idle");
      }
    };

    handleViewportProgress();
    window.addEventListener("scroll", handleViewportProgress, { passive: true });
    window.addEventListener("resize", handleViewportProgress);

    return () => {
      window.removeEventListener("scroll", handleViewportProgress);
      window.removeEventListener("resize", handleViewportProgress);
      clearDischargeTimer();
    };
  }, [isCharged]);

  return { sectionRef, isCharged, animationCycle, animationMode };
}

// ---- Desktop Version (from commit 14048f189dfc) ----

function StatisticsDesktop() {
  const { sectionRef, isCharged, animationCycle, animationMode } = useImpactAnimation();
  const shouldReduceMotion = useReducedMotion();
  const animationState = isCharged ? "visible" : animationMode === "discharge" ? "discharged" : "hidden";
  const showChargedValue = isCharged || animationMode === "discharge";

  return (
    <div ref={sectionRef} className="h-svh w-full overflow-hidden relative bg-white">
      {/* Background Grid Pattern — Top Left */}
      <GridPattern
        width={40}
        height={40}
        x={-1}
        y={-1}
        className={cn(
          "absolute inset-0 h-full w-full opacity-100 pointer-events-none stroke-gray-900/[0.09]",
          "[mask-image:radial-gradient(1000px_circle_at_top_left,white,transparent)]"
        )}
      />
      {/* Background Grid Pattern — Bottom Right */}
      <GridPattern
        width={40}
        height={40}
        x={-1}
        y={-1}
        className={cn(
          "absolute inset-0 h-full w-full opacity-100 pointer-events-none stroke-gray-900/[0.09]",
          "[mask-image:radial-gradient(1000px_circle_at_bottom_right,white,transparent)]"
        )}
      />

      <div className="h-full w-full">
        {/* Max-width wrapper acting as the main grid */}
        <div
          className="relative z-10"
          style={{
            maxWidth: 1440,
            margin: "0 auto",
            height: "100%",
            display: "grid",
            gridTemplateRows: "auto 1fr",
          }}
        >
          {/* ── Header row ── */}
          <motion.div
            initial={false}
            animate={animationState}
            style={{
              display: "grid",
              gridTemplateColumns: "max-content 1fr 1fr",
              columnGap: 54,
              alignItems: "end",
              padding: "6.25vh 80px 24px",
            }}
          >
            {/* Title */}
            <motion.h3
              variants={{
                hidden: { opacity: 0, x: shouldReduceMotion ? 0 : -40, filter: "blur(8px)" },
                visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0 } },
                discharged: { opacity: 0.42, x: 0, filter: "blur(0px)", transition: { duration: 0.45, ease: [0.55, 0, 1, 0.45] } },
              }}
              style={{
                fontFamily: "Sora, sans-serif",
                fontWeight: 400,
                fontSize: "clamp(28px, 3vw, 48px)",
                color: "#121312",
                lineHeight: 1.1,
                margin: 0,
                letterSpacing: "-0.025em",
              }}
            >
              O impacto
              <br />
              da Energisa
            </motion.h3>

            {/* Description — now in the second column */}
            <motion.p
              variants={{
                hidden: { opacity: 0, x: shouldReduceMotion ? 0 : -40, filter: "blur(8px)" },
                visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 } },
                discharged: { opacity: 0.42, x: 0, filter: "blur(0px)", transition: { duration: 0.45, ease: [0.55, 0, 1, 0.45], delay: 0.05 } },
              }}
              style={{
                fontFamily: "Sora, sans-serif",
                fontSize: "20px",
                color: "rgba(18, 19, 18, 0.48)",
                lineHeight: 1.65,
                margin: 0,
              }}
            >
              Conectamos famílias e impulsionamos comunidades ao redor do Brasil
            </motion.p>

            {/* Empty third column */}
            <div />
          </motion.div>

          {/* ── Bars row ── */}
          <motion.div
            initial={false}
            animate={animationState}
            style={{
              height: "100%",
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              padding: "0 80px",
              gap: "9px",
              transform: "translateY(-15%)",
            }}
          >
            {STATS_DATA.map((stat, idx) => (
              <div
                key={stat.label}
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  paddingBottom: "calc(8% + 10svh)",
                }}
              >
                {/* Number — sits on top of the bar, outside */}
                <motion.div
                  custom={idx}
                  variants={{
                    hidden: () => ({ opacity: 0, x: shouldReduceMotion ? 0 : -40, filter: "blur(8px)" }),
                    visible: (index: number) => ({
                      opacity: 1,
                      x: 0,
                      filter: "blur(0px)",
                      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 + index * 0.12 }
                    }),
                    discharged: (index: number) => ({
                      opacity: 0.42,
                      x: 0,
                      filter: "blur(0px)",
                      transition: {
                        duration: 0.45,
                        ease: [0.55, 0, 1, 0.45],
                        delay: (STATS_DATA.length - 1 - index) * 0.08,
                      }
                    }),
                  }}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "baseline",
                    gap: 8,
                    paddingLeft: 32,
                    marginBottom: 12,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Sora, sans-serif",
                      fontWeight: 300,
                      fontSize: "clamp(52px, 5.5vw, 96px)",
                      color: "#121312",
                      lineHeight: 1,
                      letterSpacing: "-0.045em",
                      display: "block",
                    }}
                  >
                    {showChargedValue ? (
                      <NumberTicker
                        key={`${animationCycle}-${stat.label}`}
                        value={stat.value}
                        duration={1200 + idx * 200}
                      />
                    ) : (
                      "0"
                    )}
                    {stat.suffix}
                  </span>
                  <span
                    style={{
                      fontFamily: "Sora, sans-serif",
                      fontWeight: 400,
                      fontSize: "18px",
                      color: "#121312",
                      lineHeight: 1.2,
                      display: "block",
                      maxWidth: 120,
                      transform: "translateY(-25px)",
                    }}
                  >
                    {stat.label}
                  </span>
                </motion.div>

                {/* Bar */}
                <motion.div
                  custom={idx}
                  variants={{
                    hidden: { height: shouldReduceMotion ? stat.barHeight : "0%", opacity: 1 },
                    visible: (index: number) => ({
                      height: stat.barHeight,
                      opacity: 1,
                      transition: { duration: 1.2, ease: [0.77, 0, 0.175, 1], delay: index * 0.3 }
                    }),
                    discharged: (index: number) => ({
                      height: "0%",
                      opacity: 1,
                      transition: {
                        duration: 0.9,
                        ease: [0.55, 0, 1, 0.45],
                        delay: (STATS_DATA.length - 1 - index) * 0.12,
                      }
                    }),
                  }}
                  style={{
                    background: "#D4EC28",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    padding: "0 32px 28px",
                    overflow: "hidden",
                  }}
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ---- Mobile Version (Current) ----

function StatisticsMobile() {
  const { sectionRef, isCharged, animationCycle, animationMode } = useImpactAnimation();
  const shouldReduceMotion = useReducedMotion();
  const animationState = isCharged ? "visible" : animationMode === "discharge" ? "discharged" : "hidden";
  const showChargedValue = isCharged || animationMode === "discharge";

  return (
    <div ref={sectionRef} className="h-full w-full px-5 bg-white" style={{ paddingTop: "calc(6rem + 6.25vh)", paddingBottom: "6rem" }}>
      <motion.div
        initial={false}
        animate={animationState}
        className="flex flex-col gap-6 mb-12"
      >
        <motion.h3
          variants={{
            hidden: { opacity: 0, x: shouldReduceMotion ? 0 : -40, filter: "blur(8px)" },
            visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0 } },
            discharged: { opacity: 0.42, x: 0, filter: "blur(0px)", transition: { duration: 0.45, ease: [0.55, 0, 1, 0.45] } },
          }}
          style={{
            fontFamily: "Sora, sans-serif",
            fontWeight: 400,
            fontSize: "32px",
            color: "#121312",
            lineHeight: 1.1,
            margin: 0,
            letterSpacing: "-0.02em",
          }}
        >
          O impacto<br />da Energisa
        </motion.h3>
        <motion.p
          variants={{
            hidden: { opacity: 0, x: shouldReduceMotion ? 0 : -40, filter: "blur(8px)" },
            visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 } },
            discharged: { opacity: 0.42, x: 0, filter: "blur(0px)", transition: { duration: 0.45, ease: [0.55, 0, 1, 0.45], delay: 0.05 } },
          }}
          style={{
            fontFamily: "Sora, sans-serif",
            fontSize: "18px",
            color: "rgba(18, 19, 18, 0.48)",
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          Conectamos famílias e impulsionamos comunidades ao redor do Brasil
        </motion.p>
      </motion.div>

      <motion.div
        initial={false}
        animate={animationState}
        className="flex flex-col gap-10"
      >
        {STATS_DATA.map((stat, idx) => (
          <div key={idx} className="flex flex-col">
            <motion.div
              custom={idx}
              variants={{
                hidden: () => ({ opacity: 0, x: shouldReduceMotion ? 0 : -40, filter: "blur(8px)" }),
                visible: (index: number) => ({
                  opacity: 1,
                  x: 0,
                  filter: "blur(0px)",
                  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 + index * 0.12 }
                }),
                discharged: (index: number) => ({
                  opacity: 0.42,
                  x: 0,
                  filter: "blur(0px)",
                  transition: {
                    duration: 0.4,
                    ease: [0.55, 0, 1, 0.45],
                    delay: (STATS_DATA.length - 1 - index) * 0.06,
                  }
                }),
              }}
            >
              <div className="flex flex-row items-baseline gap-3 mb-4">
                <span
                  style={{
                    fontFamily: "Sora, sans-serif",
                    fontWeight: 300,
                    fontSize: "52px",
                    color: "#121312",
                    lineHeight: 0.9,
                    letterSpacing: "-0.04em",
                  }}
                >
                  {showChargedValue ? (
                    <NumberTicker
                      key={`${animationCycle}-${stat.label}`}
                      value={stat.value}
                      duration={1200 + idx * 200}
                    />
                  ) : (
                    "0"
                  )}
                  {stat.suffix}
                </span>
                <span
                  style={{
                    fontFamily: "Sora, sans-serif",
                    fontSize: "18px",
                    color: "#121312",
                  }}
                >
                  {stat.label}
                </span>
              </div>
            </motion.div>
            <motion.div
              custom={idx}
              variants={{
                hidden: { height: 0, opacity: 1 },
                visible: (index: number) => ({
                  height: 48,
                  opacity: 1,
                  transition: { duration: 1.2, ease: [0.77, 0, 0.175, 1], delay: index * 0.3 }
                }),
                discharged: (index: number) => ({
                  height: 0,
                  opacity: 1,
                  transition: {
                    duration: 0.8,
                    ease: [0.55, 0, 1, 0.45],
                    delay: (STATS_DATA.length - 1 - index) * 0.08,
                  }
                }),
              }}
              className="bg-[#D4EC28] w-full"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// ---- Main Section Wrapper ----


export function Statistics() {
  const isMobile = useIsMobile();

  return (
    <section
      id="impacto"
      className="relative z-0 bg-white"
      style={{
        minHeight: "100svh",
        scrollSnapAlign: "start",
        scrollMarginTop: "80px",
      }}
    >
      <div className="relative z-10 h-full w-full">
        {isMobile ? <StatisticsMobile /> : <StatisticsDesktop />}
      </div>
    </section>
  );
}
