import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { TextReveal } from "@/registry/magicui/text-reveal";

// ── Layout constants ─────────────────────────────────────────────────────────
const CARD_W = 500;
const CARD_H = 400;
const CARD_GAP = 12;
const CARDS_COUNT = 4;

// Total list height
const LIST_H = CARDS_COUNT * CARD_H + (CARDS_COUNT - 1) * CARD_GAP;

// Visible window: 1 card + small peek of next (~56px)
const PEEK = 56;
const MAX_Y = LIST_H - CARD_H - PEEK; // px the list must travel

// ── Scroll phases ────────────────────────────────────────────────────────────
// [0 → TEXT_END]   : text reveal animates
// [CARDS_START → 1]: cards scroll up
const TEXT_END = 0.38;
const CARDS_START = 0.40; // small overlap so transition feels seamless

// ── Card data ────────────────────────────────────────────────────────────────
const CARDS = [
  { id: "001", color: "#E8E9E2" },
  { id: "002", color: "#D4D5CE" },
  { id: "003", color: "#C0C1BA" },
  { id: "004", color: "#ACADA7" },
];

export function Ecossistema() {
  const outerRef = useRef<HTMLDivElement>(null);

  // Single scroll driver for the entire section
  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });

  // ── Cards Y translation ───────────────────────────────────────────────────
  // Cards only start moving after text is done.
  // useTransform with cubic easing: [CARDS_START, 1] → [0, -MAX_Y]
  // We use a velocity-responsive linear map (no spring) for direct 1:1 feel,
  // which is what the user asked for ("suave mas não do jeito que está").
  // Emil principle: scroll-linked parallax should be direct, not springed.
  const cardY = useTransform(
    scrollYProgress,
    [CARDS_START, 1],
    [0, -MAX_Y],
    { clamp: true }
  );

  return (
    <div
      id="ecossistema"
      ref={outerRef}
      className="relative z-10 shadow-[0_-40px_80px_rgba(0,0,0,0.3)]"
      // Dwell = MAX_Y px of extra scroll height beyond the 100svh sticky section
      // We reserve extra room for text phase too (TEXT_END fraction)
      style={{
        height: `calc(100svh + ${Math.round(MAX_Y / (1 - CARDS_START))}px)`,
        marginTop: "-100svh",
      }}
    >
      <section
        className="sticky top-0 overflow-hidden bg-[#FFFFFF]"
        style={{ height: "100svh" }}
      >
        <div
          className="max-w-[1440px] mx-auto w-full h-full px-8 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-16"
          style={{ paddingTop: "80px" }}
        >

          {/* ── LEFT: Text ──────────────────────────────────────────────── */}
          <div className="flex flex-col justify-center gap-8 h-full">
            {/* Headline — animates in [0 → TEXT_END * 0.6] of overall progress */}
            <TextReveal
              className="max-w-[400px]"
              externalProgress={scrollYProgress}
              scrollRange={[0, TEXT_END * 0.55]}
            >
              {"Ecossistema\nEnergisa"}
            </TextReveal>

            {/* Body — animates in [TEXT_END * 0.5 → TEXT_END] */}
            <TextReveal
              externalProgress={scrollYProgress}
              scrollRange={[TEXT_END * 0.45, TEXT_END]}
              style={{
                fontFamily: "Sora, sans-serif",
                fontSize: "clamp(15px, 1.2vw, 18px)",
                color: "#71726B",
                lineHeight: 1.65,
                maxWidth: 460,
              }}
            >
              Um ecossistema completo de inovação, tecnologia e serviços que redefine como a energia chega a cada brasileiro.
            </TextReveal>
          </div>

          {/* ── RIGHT: Card column ──────────────────────────────────────── */}
          {/*
            This container defines the "viewport" for the cards.
            Height is exactly 1 card + the peek area.
            It is centered vertically to align with the text.
          */}
          <div className="flex items-center justify-center h-full">
            <div
              className="relative overflow-hidden rounded-xl"
              style={{
                width: CARD_W,
                height: CARD_H + PEEK,
                // Background color or border could be added here for debugging the box
              }}
            >
              <motion.div
                style={{
                  y: cardY,
                  display: "flex",
                  flexDirection: "column",
                  gap: CARD_GAP,
                  willChange: "transform",
                }}
              >
                {CARDS.map((card) => (
                  <a
                    key={card.id}
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="block flex-shrink-0 rounded-xl cursor-pointer active:scale-[0.985]"
                    style={{
                      width: CARD_W,
                      height: CARD_H,
                      background: card.color,
                      textDecoration: "none",
                      transition: "transform 160ms cubic-bezier(0.23, 1, 0.32, 1)",
                    }}
                  />
                ))}
              </motion.div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
