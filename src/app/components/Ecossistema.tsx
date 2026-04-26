"use client";

import { type CSSProperties } from "react";

// ── Asset URLs ─────────────────────────────────────────────────────────────────
// Backgrounds (from Figma, hover state)
const FLEXLAB_BG = "https://www.figma.com/api/mcp/asset/b5dd4e22-eb5c-41cb-8eb5-8b22f7153dcd";
const ESGAS_BG = "https://www.figma.com/api/mcp/asset/3ac5b52d-4bdf-426c-a6c9-21a05eabfa89";
// (re)energisa — 3 composited layers
const REENERGISA_BG_1 = "https://www.figma.com/api/mcp/asset/b3e5ed59-d655-4245-a03a-4be6448416ff";
const REENERGISA_BG_2 = "https://www.figma.com/api/mcp/asset/34e25aec-76d8-45b6-98b2-06650878ac2c";
const REENERGISA_BG_3 = "https://www.figma.com/api/mcp/asset/c83fbb18-f7e9-49c3-a90b-98b429e895a6";

// Logos
const FLEXLAB_LOGO_A = "https://www.figma.com/api/mcp/asset/ef472955-cd1b-41c0-a6d1-9c9f9db4879a"; // right part
const FLEXLAB_LOGO_B = "https://www.figma.com/api/mcp/asset/6c66f47b-62c9-42b5-bcd5-ee84852e45ec"; // left part
const ESGAS_LOGO = "https://www.figma.com/api/mcp/asset/2b41dc55-dcf7-4da7-8275-3c1ca0728db0";
const REENERGISA_LOGO = "https://www.figma.com/api/mcp/asset/66123b68-8b5a-4479-bce9-dead2baac88b";

// ── Constants ─────────────────────────────────────────────────────────────────
const ACCENT = "#d4ec28";
const CARD_H = 600;
const PANEL_H = 200;

const HEADING = "Ecossistema\nEnergisa";
const SUBTITLE = "Um ecossistema completo de inovação,\ntecnologia e serviços que redefine\ncomo a energia chega a cada brasileiro.";

// ── Text styles ───────────────────────────────────────────────────────────────
const headingStyle: CSSProperties = {
  fontFamily: "Sora, sans-serif",
  fontWeight: 400,
  fontSize: "31pt",
  lineHeight: 1.2,
  letterSpacing: "-0.02em",
  color: "#121312",
  whiteSpace: "pre-line",
};

const subtitleStyle: CSSProperties = {
  fontFamily: "Sora, sans-serif",
  fontSize: "clamp(15px, 1.2vw, 18px)",
  color: "rgba(18, 19, 18, 0.48)",
  lineHeight: 1.65,
  whiteSpace: "pre-line",
};

// ── FlexLab wordmark (two overlapping image assets) ───────────────────────────
function FlexLabLogo() {
  return (
    <div style={{ position: "relative", width: 136, height: 31, flexShrink: 0 }}>
      <img alt="" src={FLEXLAB_LOGO_B} style={{ position: "absolute", left: 0, top: 0.85, width: 68.478, height: 29.148, display: "block" }} />
      <img alt="" src={FLEXLAB_LOGO_A} style={{ position: "absolute", left: 71.14, top: 0, width: 64.184, height: 29.904, display: "block" }} />
    </div>
  );
}

// ── Background renderers ──────────────────────────────────────────────────────
function ReeEnergisaBg() {
  return (
    <>
      <div style={{ position: "absolute", inset: 0, backgroundColor: "#d9d9d9" }} />
      <img alt="" src={REENERGISA_BG_1} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      <img alt="" src={REENERGISA_BG_2} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        <img
          alt=""
          src={REENERGISA_BG_3}
          style={{
            position: "absolute",
            width: "278.01%",
            height: "118.82%",
            left: "-166.67%",
            top: "-18.82%",
            maxWidth: "none",
          }}
        />
      </div>
    </>
  );
}

// ── Card definitions ──────────────────────────────────────────────────────────
const CARDS = [
  {
    id: "flexlab",
    bgImage: FLEXLAB_BG,
    hasOverlay: true,
    renderLogo: () => <FlexLabLogo />,
    description: "Soluções flexíveis de energia para empresas que buscam eficiência e controle inteligente do consumo.",
  },
  {
    id: "esgas",
    bgImage: ESGAS_BG,
    hasOverlay: false,
    renderLogo: () => (
      <img alt="ESgás" src={ESGAS_LOGO} style={{ width: 103, height: 44.567, display: "block", flexShrink: 0, objectFit: "contain" }} />
    ),
    description: "Distribuição de gás natural com segurança, eficiência e presença em todo o território atendido.",
  },
  {
    id: "reenergisa",
    bgImage: null,
    hasOverlay: false,
    renderLogo: () => (
      <img alt="(re)energisa" src={REENERGISA_LOGO} style={{ width: 166, height: 34, display: "block", flexShrink: 0, objectFit: "contain" }} />
    ),
    description: "Modernização da rede elétrica para uma distribuição de energia mais confiável e sustentável.",
  },
];

// ── Component ─────────────────────────────────────────────────────────────────
export function Ecossistema() {
  return (
    <div id="ecossistema" className="relative z-[50] bg-white">
      <style>{`
        .eco-card-visuals {
          transition: transform 300ms cubic-bezier(0.22,1,0.36,1), box-shadow 300ms cubic-bezier(0.22,1,0.36,1);
        }
        .eco-card-hitbox:hover ~ .eco-card-visuals {
          transform: translateY(-5px);
          box-shadow: 0 12px 28px 0 rgba(0,0,0,0.12);
        }
        .eco-panel {
          transform: translateY(100%);
          transition: transform 500ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .eco-card-hitbox:hover ~ .eco-card-visuals .eco-panel {
          transform: translateY(0);
        }
      `}</style>

      <div className="max-w-[1440px] mx-auto w-full px-8 md:px-20 py-24">

        {/* Header: 3-col grid — heading | subtitle | empty */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            alignItems: "end",
            marginBottom: 48,
          }}
        >
          <h4 data-label="ecosystem-heading" style={headingStyle}>Ecossistema Energisa</h4>
          <p style={subtitleStyle}>{SUBTITLE}</p>
          <div />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CARDS.map((card) => (
            <div
              key={card.id}
              className="relative"
              style={{ height: CARD_H, pointerEvents: "none" }}
            >
              {/* Static hitbox — stays still so hover doesn't flicker when card lifts */}
              <div className="eco-card-hitbox absolute inset-0 z-20 pointer-events-auto cursor-pointer" />

              {/* Visuals — lift + shadow on hover */}
              <div className="eco-card-visuals relative overflow-hidden w-full h-full z-10">
                {/* Background */}
                {card.bgImage ? (
                  <>
                    <img
                      alt=""
                      src={card.bgImage}
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                    {card.hasOverlay && (
                      <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.2)" }} />
                    )}
                  </>
                ) : (
                  <ReeEnergisaBg />
                )}

                {/* Yellow panel — slides up on hitbox hover */}
                <div
                  className="eco-panel"
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: PANEL_H,
                    backgroundColor: ACCENT,
                    padding: "33px 24px 24px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 32,
                  }}
                >
                  {card.renderLogo()}
                  <p
                    style={{
                      fontFamily: "Sora, sans-serif",
                      fontSize: "13px",
                      lineHeight: 1.5,
                      letterSpacing: "-0.247px",
                      color: "#121312",
                      margin: 0,
                      maxWidth: 351,
                    }}
                  >
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
