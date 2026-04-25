import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

import { NumberTicker } from "./ui/number-ticker";
import { GridPattern } from "@/registry/magicui/grid-pattern";
import { cn } from "@/lib/utils";

// ---- Data ----

const STATS = [
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

// ---- Section ----

export function Statistics() {
  const sectionRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <section
      ref={sectionRef}
      id="impacto"
      className="relative z-0"
      style={{
        height: "80svh",
        paddingTop: "10vh",
        scrollSnapAlign: "start",
        overflow: "hidden",
      }}
    >
      <motion.div style={{ y: shouldReduceMotion ? 0 : yParallax }} className="h-full w-full">
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
              gridTemplateColumns: "1fr 1fr 1fr",
              alignItems: "end",
              padding: "48px 80px 32px",
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

            {/* Empty middle column */}
            <div />

            {/* Description — bottom-aligned to the title */}
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
              brasileiro, conectando famílias e impulsionando
              comunidades de Norte a Sul do país.
            </p>
          </div>

          {/* ── Bars row ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            style={{
              height: "100%",
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              padding: "0 80px",
              gap: "9px",
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
                  paddingBottom: "8%",
                }}
              >
                {/* Number — sits on top of the bar, outside */}
                <motion.span
                  variants={{
                    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: idx * 0.2 }
                    }
                  }}
                  style={{
                    fontFamily: "Sora, sans-serif",
                    fontWeight: 300,
                    fontSize: "clamp(52px, 5.5vw, 96px)",
                    color: "#121312",
                    lineHeight: 0.9,
                    letterSpacing: "-0.045em",
                    display: "block",
                    paddingLeft: 32,
                    marginBottom: 12,
                  }}
                >
                  <NumberTicker value={stat.value} duration={2000 + idx * 400} />
                  {stat.suffix}
                </motion.span>

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
                  <motion.p
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1, transition: { duration: 0.8, delay: 0.8 + idx * 0.3 } }
                    }}
                    style={{
                      fontFamily: "Sora, sans-serif",
                      fontSize: "clamp(11px, 0.8vw, 13px)",
                      color: "rgba(18, 19, 18, 0.6)",
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {stat.text}
                  </motion.p>
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
