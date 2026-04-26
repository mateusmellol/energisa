import { useRef, useState, useEffect } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";
import { GridPattern } from "@/registry/magicui/grid-pattern";
import { NumberTicker } from "./ui/number-ticker";

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

// ---- Scroll prevention helpers ----
const BLOCKED_KEYS = ["ArrowDown", "ArrowUp", "PageDown", "PageUp", " ", "End", "Home"];
function blockScroll(e: Event) { e.preventDefault(); }
function blockKeys(e: KeyboardEvent) { if (BLOCKED_KEYS.includes(e.key)) e.preventDefault(); }

function lockScroll() {
  document.addEventListener("wheel", blockScroll, { passive: false });
  document.addEventListener("touchmove", blockScroll, { passive: false });
  document.addEventListener("keydown", blockKeys);
}
function unlockScroll() {
  document.removeEventListener("wheel", blockScroll);
  document.removeEventListener("touchmove", blockScroll);
  document.removeEventListener("keydown", blockKeys);
}

// ---- Desktop Version (from commit 14048f189dfc) ----

function StatisticsDesktop() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [played, setPlayed] = useState(false);

  // Lock scroll for a brief moment to ensure animations are seen
  useEffect(() => {
    if (played) return;
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || played) return;
        setPlayed(true);
        lockScroll();
        const timer = setTimeout(unlockScroll, 2500);
        return () => clearTimeout(timer);
      },
      { threshold: 0.6 }
    );

    io.observe(el);
    return () => {
      io.disconnect();
      unlockScroll();
    };
  }, [played]);

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
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "max-content 1fr 1fr",
              columnGap: 54,
              alignItems: "end",
              padding: "0 80px 24px",
            }}
          >
            {/* Title */}
            <h3
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
            </h3>

            {/* Description — now in the second column */}
            <p
              style={{
                fontFamily: "Sora, sans-serif",
                fontSize: "20px",
                color: "rgba(18, 19, 18, 0.48)",
                lineHeight: 1.65,
                margin: 0,
              }}
            >
              Conectamos famílias e impulsionamos comunidades ao redor do Brasil
            </p>

            {/* Empty third column */}
            <div />
          </div>

          {/* ── Bars row ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
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
                  variants={{
                    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: idx * 0.2 }
                    }
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
                    <NumberTicker value={stat.value} duration={2000 + idx * 400} />
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
                  variants={{
                    hidden: { height: shouldReduceMotion ? stat.barHeight : "0%", opacity: 0 },
                    visible: {
                      height: stat.barHeight,
                      opacity: 1,
                      transition: { duration: 1.6, ease: [0.77, 0, 0.175, 1], delay: idx * 0.3 }
                    }
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
  const sectionRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [played, setPlayed] = useState(false);

  useEffect(() => {
    if (played) return;
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || played) return;
        setPlayed(true);
        lockScroll();
        const timer = setTimeout(unlockScroll, 2500);
        return () => clearTimeout(timer);
      },
      { threshold: 0.6 }
    );

    io.observe(el);
    return () => {
      io.disconnect();
      unlockScroll();
    };
  }, [played]);

  return (
    <div ref={sectionRef} className="h-full w-full py-24 px-5 bg-white">
      <div className="flex flex-col gap-6 mb-12">
        <h3
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
        </h3>
        <p
          style={{
            fontFamily: "Sora, sans-serif",
            fontSize: "18px",
            color: "rgba(18, 19, 18, 0.48)",
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          A Energisa distribui energia em 97% do território brasileiro.
        </p>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        className="flex flex-col gap-10"
      >
        {STATS_DATA.map((stat, idx) => (
          <div key={idx} className="flex flex-col">
            <motion.div
              variants={{
                hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: idx * 0.2 }
                }
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
                  <NumberTicker value={stat.value} />
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
              variants={{
                hidden: { height: 0, opacity: 0 },
                visible: {
                  height: 48,
                  opacity: 1,
                  transition: { duration: 1.6, ease: [0.77, 0, 0.175, 1], delay: idx * 0.3 }
                }
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
  return (
    <section
      id="impacto"
      className="relative z-0 bg-white"
      style={{
        minHeight: "100svh",
        scrollSnapAlign: "start",
      }}
    >
      <div className="relative z-10 h-full w-full">
        {/* Desktop View (from commit 14048f1) */}
        <div className="hidden md:block">
          <StatisticsDesktop />
        </div>

        {/* Mobile View (Current) */}
        <div className="block md:hidden">
          <StatisticsMobile />
        </div>
      </div>
    </section>
  );
}
