import { useRef, useState, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { GridPattern } from "@/registry/magicui/grid-pattern";

import { NumberTicker } from "./ui/number-ticker";

// ---- Data ----

const STATS = [
  {
    value: 25,
    suffix: "",
    label: "milhões de pessoas",
    text: "Mais de 25 milhões de brasileiros têm acesso à energia elétrica todos os dias graças à operação da Energisa — de grandes centros urbanos a comunidades isoladas.",
    barHeight: "35%",
  },
  {
    value: 939,
    suffix: "",
    label: "municípios",
    text: "A Energisa está presente em 939 municípios, levando infraestrutura elétrica confiável para regiões que vão muito além das capitais.",
    barHeight: "48%",
  },
  {
    value: 97,
    suffix: "%",
    label: "cobertura",
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

// ---- Section ----

export function Statistics() {
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

        // Lock immediately when entering viewport
        setPlayed(true);
        lockScroll();

        // Unlock after the bars finish growing (approx 2.5s)
        const timer = setTimeout(unlockScroll, 2500);
        return () => clearTimeout(timer);
      },
      { threshold: 0.6 } // Wait until most of the section is visible
    );

    io.observe(el);
    return () => {
      io.disconnect();
      unlockScroll();
    };
  }, [played]);



  return (
    <section
      ref={sectionRef}
      id="impacto"
      className="relative z-0"
      style={{
        height: "100svh",
        scrollMarginTop: "160px",
        scrollSnapAlign: "start",
      }}
    >
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
              A Energisa distribui energia em 97% do território
              brasileiro, conectando famílias
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
            {STATS.map((stat, idx) => (
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
                    gap: 12,
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
                      lineHeight: 0.9,
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
                      fontSize: "clamp(18px, 1.5vw, 24px)",
                      color: "#121312",
                      display: "block",
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
                >

                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
