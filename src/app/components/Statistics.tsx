import { NumberTicker } from "./ui/number-ticker";

// ---- Data ----

const BAR_COLORS = ["#A8C800", "#BEDD10", "#C8DC14"];

const STATS = [
  {
    number: 25,
    prefix: "",
    suffix: "mi",
    label: "de pessoas",
    text: "Mais de 25 milhões de pessoas com acesso à energia",
  },
  {
    number: 18,
    prefix: "+",
    suffix: "mil",
    label: "clientes",
    text: "Milhares de unidades consumidoras atendidas",
  },
  {
    number: 939,
    prefix: "",
    suffix: "",
    label: "municípios",
    text: "Presença ativa em todo o território nacional",
  },
];

// Heights cascade downward — all bars start at the same top, end at different points
const HEIGHTS = [300, 400, 520];

// ---- StatBar (vertical) ----

function StatBar({
  stat,
  color,
  height,
}: {
  stat: (typeof STATS)[number];
  color: string;
  height: number;
}) {
  return (
    <div
      style={{
        height,
        background: color,
        borderRadius: 16,
        padding: "28px 28px 24px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        flex: 1,
        minWidth: 0,
        flexShrink: 0,
      }}
    >
      {/* Number — top */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 4 }}>
        <span
          style={{
            fontFamily: "Sora, sans-serif",
            fontWeight: 300,
            fontSize: "clamp(52px, 6.5vw, 88px)",
            color: "#121312",
            lineHeight: 1,
            letterSpacing: "-0.03em",
          }}
        >
          {stat.prefix}
          <NumberTicker value={stat.number} duration={2500} />
        </span>
        {stat.suffix && (
          <span
            style={{
              fontFamily: "Sora, sans-serif",
              fontSize: "clamp(11px, 0.9vw, 14px)",
              color: "rgba(18,19,18,0.5)",
              lineHeight: 1,
              marginTop: 10,
            }}
          >
            {stat.suffix}
          </span>
        )}
      </div>

      {/* Label + text — bottom left */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <p
          style={{
            fontFamily: "Sora, sans-serif",
            fontSize: "clamp(16px, 1.8vw, 24px)",
            fontWeight: 400,
            color: "#121312",
            lineHeight: 1.2,
            margin: 0,
          }}
        >
          {stat.label}
        </p>
        <p
          style={{
            fontFamily: "Sora, sans-serif",
            fontSize: "clamp(11px, 0.85vw, 13px)",
            color: "rgba(18,19,18,0.55)",
            lineHeight: 1.5,
            margin: 0,
          }}
        >
          {stat.text}
        </p>
      </div>
    </div>
  );
}

// ---- Section ----

export function Statistics() {
  return (
    <section
      id="impacto"
      style={{ background: "#F6F8ED", overflow: "hidden" }}
    >
      <div
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1.6fr",
          alignItems: "start",
        }}
      >
        {/* Left — header text, vertically centered with padding */}
        <div
          style={{
            padding: "80px 48px 80px 80px",
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <h2
            style={{
              fontFamily: "Sora, sans-serif",
              fontWeight: 400,
              fontSize: "clamp(28px, 3.5vw, 49px)",
              color: "#121312",
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            A Energisa acompanha você
          </h2>
          <p
            style={{
              fontFamily: "Sora, sans-serif",
              fontSize: "clamp(14px, 1.2vw, 18px)",
              color: "#555653",
              lineHeight: 1.55,
              margin: 0,
            }}
          >
            De Norte a Sul. Quando uma luz acende, a Energisa está por trás.
          </p>
        </div>

        {/* Right — bars cascading from top */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            gap: 12,
            paddingRight: 80,
            paddingBottom: 80,
            paddingTop: 0,
          }}
        >
          {STATS.map((s, idx) => (
            <StatBar
              key={s.label}
              stat={s}
              color={BAR_COLORS[idx]}
              height={HEIGHTS[idx]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
