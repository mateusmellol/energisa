import { NumberTicker } from "./ui/number-ticker";
import { useState, useRef } from "react";

// --- Glass mosaic — identical tile style to Services ---
const BASE_ANGLE = 108.63;
const TILE = 52;
const SPOTLIGHT_RADIUS = 170;

type TileConfig = { col: number; row: number; rotation: number };

// Re-randomized for TILE=52, dense right-side clusters
const ROW_TILES: TileConfig[][] = [
  // 939 municípios
  [
    { col: 0, row: 0, rotation: 180 },
    { col: 0, row: 1, rotation: -90 },
    { col: 1, row: 0, rotation:  90 },
    { col: 1, row: 2, rotation:   0 },
    { col: 2, row: 1, rotation: 180 },
    { col: 3, row: 0, rotation: -90 },
    { col: 3, row: 1, rotation:  90 },
    { col: 4, row: 0, rotation:   0 },
    { col: 4, row: 2, rotation: -90 },
    { col: 5, row: 1, rotation: 180 },
  ],
  // +18 mil clientes
  [
    { col: 0, row: 1, rotation:  90 },
    { col: 0, row: 2, rotation: -90 },
    { col: 1, row: 0, rotation: 180 },
    { col: 1, row: 1, rotation:   0 },
    { col: 2, row: 0, rotation: -90 },
    { col: 2, row: 2, rotation: 180 },
    { col: 3, row: 1, rotation:  90 },
    { col: 4, row: 0, rotation:   0 },
    { col: 4, row: 1, rotation: -90 },
    { col: 5, row: 0, rotation:  90 },
  ],
  // 25 milhões
  [
    { col: 0, row: 0, rotation: -90 },
    { col: 1, row: 1, rotation:   0 },
    { col: 1, row: 2, rotation:  90 },
    { col: 2, row: 0, rotation: 180 },
    { col: 2, row: 1, rotation: -90 },
    { col: 3, row: 0, rotation:  90 },
    { col: 3, row: 2, rotation:   0 },
    { col: 4, row: 1, rotation: 180 },
    { col: 5, row: 0, rotation: -90 },
    { col: 5, row: 1, rotation:  90 },
  ],
];

function GlassMosaic({ tiles, mousePos }: {
  tiles: TileConfig[];
  mousePos: { x: number; y: number } | null;
}) {
  const maskImage = mousePos
    ? `radial-gradient(circle ${SPOTLIGHT_RADIUS}px at ${mousePos.x}px ${mousePos.y}px, black 20%, transparent 100%)`
    : `radial-gradient(circle 0px at -999px -999px, black 0%, transparent 0%)`;

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ maskImage, WebkitMaskImage: maskImage }}
    >
      {tiles.map(({ col, row, rotation }, i) => (
        <div
          key={i}
          className="absolute backdrop-blur-[6px]"
          style={{
            width: TILE,
            height: TILE,
            right: col * TILE,
            top: row * TILE,
            backgroundImage: `linear-gradient(${BASE_ANGLE + rotation}deg, #fdfdfc 5%, #dadad6 98%)`,
            mixBlendMode: "luminosity",
          }}
        />
      ))}
    </div>
  );
}

// ---- Data ----

// Bar colors: three progressively darker shades of lime-green (from screenshot)
const BAR_COLORS = ["#D4EC28", "#BEDD10", "#A8C800"];

const STATS = [
  {
    number: "939",
    suffix: "",
    label: "municípios",
    text: "Presença ativa em mais de 800 municípios com cobertura direta de distribuição de energia",
    widthPct: "55%",
  },
  {
    number: "+18",
    suffix: "mil",
    label: "clientes",
    text: "Milhares de unidades consumidoras — residências, comércios e indústrias — em todo o Brasil",
    widthPct: "72%",
  },
  {
    number: "25",
    suffix: "milhões",
    label: "de pessoas atendidas",
    text: "Mais de 25 milhões de pessoas em todo o país com acesso à energia distribuída pela Energisa",
    widthPct: "88%",
  },
];

// ---- StatRow ----

function StatRow({
  stat,
  tiles,
  barColor,
  isLast,
}: {
  stat: typeof STATS[number];
  tiles: TileConfig[];
  barColor: string;
  isLast: boolean;
}) {
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const barRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = barRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  function handleMouseLeave() {
    setMousePos(null);
  }

  return (
    <div
      className="flex items-stretch relative"
      style={{
        borderTop: "1px solid #e6e7e4",
        borderBottom: isLast ? "1px solid #e6e7e4" : "none",
        minHeight: 112,
      }}
    >
      {/* Colored bar */}
      <div
        ref={barRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          width: stat.widthPct,
          minWidth: 0,
          background: barColor,
          padding: "20px 24px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 12,
          flexShrink: 0,
          position: "relative",
          overflow: "hidden",
          cursor: "default",
        }}
      >
        <GlassMosaic tiles={tiles} mousePos={mousePos} />

        <p
          className="relative z-10"
          style={{
            fontFamily: "Sora, sans-serif",
            fontSize: "clamp(13px, 1.1vw, 16px)",
            color: "rgba(18,19,18,0.7)",
            lineHeight: 1.5,
            maxWidth: 380,
          }}
        >
          {stat.text}
        </p>
        <a
          href="#"
          className="relative z-10"
          style={{
            fontFamily: "Sora, sans-serif",
            fontSize: "13px",
            color: "rgba(18,19,18,0.4)",
            textDecoration: "none",
            letterSpacing: "0.02em",
          }}
        >
          Saiba mais →
        </a>
      </div>

      {/* Number */}
      <div className="flex items-center px-8" style={{ flexShrink: 0 }}>
        <div className="flex items-baseline gap-1.5">
            <span
              style={{
                fontFamily: "Sora, sans-serif",
                fontWeight: 400,
                fontSize: "clamp(48px, 6vw, 80px)",
                color: "#121312",
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              {stat.number.startsWith("+") ? "+" : ""}
              <NumberTicker 
                value={parseInt(stat.number.replace(/\D/g, ""))} 
                duration={2500}
              />
            </span>
          <span
            style={{
              fontFamily: "Sora, sans-serif",
              fontSize: "clamp(13px, 1.2vw, 16px)",
              color: "#8b8d85",
              lineHeight: 1,
            }}
          >
            {stat.suffix}
          </span>
        </div>
      </div>
    </div>
  );
}

// ---- Section ----

export function Statistics() {
  return (
    <section id="impacto" style={{ background: "#fdfdfc" }} className="py-20 px-8 md:px-20">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-4 mb-20">
          <div className="flex flex-col gap-2" style={{ maxWidth: 460 }}>
            <h2
              style={{
                fontFamily: "Sora, sans-serif",
                fontWeight: 400,
                fontSize: "clamp(28px, 4vw, 49px)",
                color: "#121312",
                lineHeight: 1.15,
              }}
            >
              A Energisa acompanha você
            </h2>
            <p
              style={{
                fontFamily: "Sora, sans-serif",
                fontSize: "clamp(15px, 1.3vw, 20px)",
                color: "#555653",
                lineHeight: 1.5,
              }}
            >
              De Norte a Sul. Quando uma luz acende, a Energisa está por trás.
            </p>
          </div>
          <p
            style={{
              fontFamily: "Sora, sans-serif",
              fontSize: "13px",
              color: "#8b8d85",
              letterSpacing: "0.04em",
              paddingTop: "8px",
            }}
          >
            DADOS DE 2025
          </p>
        </div>

        {/* Stats rows */}
        <div className="flex flex-col gap-0">
          {STATS.map((s, idx) => (
            <StatRow
              key={s.number}
              stat={s}
              tiles={ROW_TILES[idx]}
              barColor={BAR_COLORS[idx]}
              isLast={idx === STATS.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
