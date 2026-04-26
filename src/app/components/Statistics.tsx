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
        minHeight: "100svh",
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
          className="relative z-10 flex flex-col h-full"
          style={{
            maxWidth: 1440,
            margin: "0 auto",
          }}
        >
          {/* ── Header row ── */}
          <div
            className="flex flex-col md:grid md:grid-cols-[max-content_1fr_1fr] gap-6 md:gap-[54px] items-start md:items-end px-5 md:px-[80px] pt-24 pb-8 md:pb-12"
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
            className="flex flex-col md:grid md:grid-cols-3 flex-1 px-5 md:px-[80px] gap-8 md:gap-[9px] md:-translate-y-[10%]"
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
                >
                  <div className="flex flex-row items-baseline gap-3 md:gap-4 md:pl-8 mb-3">
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
                  </div>
                </motion.div>

                {/* Bar */}
                <motion.div
                  variants={{
                    hidden: { height: "0%", opacity: 0 },
                    visible: {
                      height: stat.barHeight,
                      opacity: 1,
                      transition: { duration: 1.6, ease: [0.77, 0, 0.175, 1], delay: idx * 0.3 }
                    }
                  }}
                  className="bg-[#D4EC28] w-full min-h-[40px]"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
