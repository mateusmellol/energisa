"use client";

import { type CSSProperties } from "react";
import { motion } from "motion/react";
import { Leaf, Cpu, Zap, Shield, Globe, Settings, Sparkles, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { GridPattern } from "@/registry/magicui/grid-pattern";

// ── Asset URLs ─────────────────────────────────────────────────────────────────
const FLEXLAB_BG = "https://www.figma.com/api/mcp/asset/b5dd4e22-eb5c-41cb-8eb5-8b22f7153dcd";
const ESGAS_BG = "https://www.figma.com/api/mcp/asset/3ac5b52d-4bdf-426c-a6c9-21a05eabfa89";
const REENERGISA_BG_1 = "https://www.figma.com/api/mcp/asset/b3e5ed59-d655-4245-a03a-4be6448416ff";
const REENERGISA_BG_2 = "https://www.figma.com/api/mcp/asset/34e25aec-76d8-45b6-98b2-06650878ac2c";
const REENERGISA_BG_3 = "https://www.figma.com/api/mcp/asset/c83fbb18-f7e9-49c3-a90b-98b429e895a6";

const FLEXLAB_LOGO_A = "https://www.figma.com/api/mcp/asset/ef472955-cd1b-41c0-a6d1-9c9f9db4879a";
const FLEXLAB_LOGO_B = "https://www.figma.com/api/mcp/asset/6c66f47b-62c9-42b5-bcd5-ee84852e45ec";
const ESGAS_LOGO = "https://www.figma.com/api/mcp/asset/2b41dc55-dcf7-4da7-8275-3c1ca0728db0";
const REENERGISA_LOGO = "https://www.figma.com/api/mcp/asset/66123b68-8b5a-4479-bce9-dead2baac88b";

// ── Constants ─────────────────────────────────────────────────────────────────
const ACCENT = "#d4ec28";

const SUBTITLE = "Um ecossistema completo de inovação,\ntecnologia e serviços que redefine\ncomo a energia chega a cada brasileiro.";

// ── Text styles ───────────────────────────────────────────────────────────────
const headingStyle: CSSProperties = {
  fontFamily: "Sora, sans-serif",
  fontWeight: 400,
  fontSize: "clamp(28px, 2.6vw, 42px)",
  lineHeight: 1.15,
  letterSpacing: "-0.02em",
  color: "#121312",
};

const subtitleStyle: CSSProperties = {
  fontFamily: "Sora, sans-serif",
  fontSize: "clamp(14px, 1.1vw, 17px)",
  color: "#404040", // Neutron 700
  lineHeight: 1.65,
  whiteSpace: "pre-line",
  marginTop: 16,
};

const cardDescStyle: CSSProperties = {
  fontFamily: "Sora, sans-serif",
  fontSize: "clamp(14px, 1.1vw, 17px)",
  lineHeight: 1.65,
  letterSpacing: "-0.02em",
  color: "#121312",
  margin: 0,
};

// ── FlexLab wordmark ──────────────────────────────────────────────────────────
function FlexLabLogo() {
  return (
    <div style={{ position: "relative", width: 160, height: 36, flexShrink: 0 }}>
      <img alt="" src={FLEXLAB_LOGO_B} style={{ position: "absolute", left: 0, top: 1, width: 80, height: 34, objectFit: "contain" }} />
      <img alt="" src={FLEXLAB_LOGO_A} style={{ position: "absolute", left: 83, top: 0, width: 75, height: 35, objectFit: "contain" }} />
    </div>
  );
}

// ── ReEnergisa composite background ──────────────────────────────────────────
function ReeEnergisaBg() {
  return (
    <>
      <img alt="" src={REENERGISA_BG_1} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      <img alt="" src={REENERGISA_BG_2} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
    </>
  );
}

// ── Card data ─────────────────────────────────────────────────────────────────
const CARDS = [
  {
    id: "flexlab",
    renderBg: () => (
      <img
        alt="FlexLab"
        src={FLEXLAB_BG}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
      />
    ),
    renderLogo: () => <FlexLabLogo />,
    description: "Soluções flexíveis de energia para empresas que buscam eficiência e controle inteligente do consumo.",
    features: [
      { icon: Leaf, label: "Eficiência" },
      { icon: Cpu, label: "Controle" },
      { icon: Zap, label: "Smart Grid" },
    ],
    panelBg: "#d4ec28",
    panelText: "#121312",
    panelSubtext: "rgba(18, 19, 18, 0.64)",
    buttonBg: "#121312",
    buttonText: "#FFFFFF",
    invertLogo: false,
  },
  {
    id: "esgas",
    renderBg: () => (
      <img
        alt="S-Gás"
        src={ESGAS_BG}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
      />
    ),
    renderLogo: () => (
      <img alt="ESgás" src={ESGAS_LOGO} style={{ width: 103, height: 44.5, display: "block", objectFit: "contain" }} />
    ),
    description: "Distribuição de gás natural com segurança, eficiência e presença em todo o território atendido.",
    features: [
      { icon: Shield, label: "Segurança" },
      { icon: Globe, label: "Presença" },
      { icon: Zap, label: "Eficiência" },
    ],
    panelBg: "#121312",
    panelText: "#FFFFFF",
    panelSubtext: "rgba(255, 255, 255, 0.7)",
    buttonBg: "#FFFFFF",
    buttonText: "#121312",
    invertLogo: true,
  },
  {
    id: "reenergisa",
    renderBg: () => <ReeEnergisaBg />,
    renderLogo: () => (
      <img alt="(re)energisa" src={REENERGISA_LOGO} style={{ width: 166, height: 34, display: "block", objectFit: "contain" }} />
    ),
    description: "Modernização da rede elétrica para uma distribuição de energia mais confiável e sustentável.",
    features: [
      { icon: Settings, label: "Modernização" },
      { icon: Leaf, label: "Energia Limpa" },
      { icon: Sparkles, label: "Inovação" },
    ],
    panelBg: "#F8F8F7", // Neutral 050 (Off-white)
    panelText: "#121312",
    panelSubtext: "rgba(18, 19, 18, 0.64)",
    buttonBg: "#d4ec28",
    buttonText: "#121312",
    invertLogo: false,
  },
];

// ── Component ─────────────────────────────────────────────────────────────────
export function Ecossistema() {
  return (
    <div id="ecossistema" className="relative z-[50] bg-white overflow-hidden">
      {/* Background Grid Pattern */}
      <GridPattern
        width={40}
        height={40}
        x={-1}
        y={-1}
        className={cn(
          "absolute inset-0 h-full w-full opacity-100 pointer-events-none stroke-gray-900/[0.09]",
          "[mask-image:radial-gradient(1000px_circle_at_top_right,white,transparent)]"
        )}
      />

      {/* Heading — top left */}
      <div
        className="px-5 md:px-[80px] pt-24 md:pt-[144px] pb-12 md:pb-[64px]"
        style={{
          maxWidth: 1440,
          margin: "0 auto",
        }}
      >
        <div style={{ maxWidth: 520 }}>
          <h2 style={headingStyle}>
            Ecossistema<br />Energisa
          </h2>
          <p style={subtitleStyle}>{SUBTITLE}</p>
        </div>
      </div>

      {/* Stacked cards — constrained to grid */}
      <div
        className="px-5 md:px-[80px] pb-24 flex flex-col gap-6"
        style={{
          maxWidth: 1440,
          margin: "0 auto",
        }}
      >
        {CARDS.map((card, idx) => (
          <motion.div
            key={card.id}
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{
              duration: 0.8,
              delay: idx * 0.1,
              ease: [0.21, 1, 0.36, 1]
            }}
            className="flex flex-col md:flex-row min-h-[640px] md:h-[480px] w-full overflow-hidden"
          >
            {/* Left column — photo */}
            <div
              className="h-[280px] md:h-full md:flex-[0_0_60%] relative overflow-hidden"
            >
              {card.renderBg()}
            </div>

            {/* Right column — content panel */}
            <div
              className="flex-1 md:flex-[0_0_40%] flex flex-col justify-between p-8 md:p-[64px]"
              style={{
                backgroundColor: card.panelBg,
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
                <div style={{ filter: card.invertLogo ? "invert(1) brightness(2)" : "none" }}>
                  {card.renderLogo()}
                </div>
                <p style={{ ...cardDescStyle, color: card.panelSubtext }}>{card.description}</p>
              </div>

              <div className="flex flex-col gap-12">
                {/* Features — 2x2 grid */}
                <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                  {card.features.map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-3">
                      <Icon size={20} style={{ color: card.panelText }} strokeWidth={1.5} />
                      <span
                        style={{
                          fontFamily: "Sora, sans-serif",
                          fontSize: "15px",
                          color: card.panelText,
                          fontWeight: 500,
                        }}
                      >
                        {label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button
                  className="flex items-center justify-center gap-2 px-8 py-4 rounded-[4px] w-fit group cursor-pointer active:scale-95 transition-all hover:opacity-90 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.2)]"
                  style={{
                    backgroundColor: card.buttonBg,
                    color: card.buttonText,
                  }}
                >
                  <span style={{
                    fontFamily: "Sora, sans-serif",
                    fontSize: "15px",
                    fontWeight: 600,
                  }}>
                    Saiba mais
                  </span>
                  <ArrowUpRight size={18} style={{ color: card.buttonText }} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
}
