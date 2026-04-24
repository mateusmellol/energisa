import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { VoxelGlobe } from "./VoxelGlobe";

const GRADIENT = "linear-gradient(135deg, #EAFE1F 0%, #65F429 100%)";

const TABS = [
  {
    id: "antes",
    label: "Antes",
    year: "1905",
    location: "MG",
    title: "Começamos assim",
    body: "Em 1905, nascia em Cataguases, Minas Gerais, uma pequena empresa de energia que viria a transformar o cenário energético brasileiro. Com raízes profundas no interior do país, a Energisa cresceu junto com as comunidades que atende.",
    // Zoomed in on Minas Gerais (lat -18, lon -44)
    // phi = lon × π/180 = -44 × 0.01745 = -0.77  |  theta = -lat × π/180 = +0.31
    globe: { phi: -0.77, theta: 0.31, scale: 0.95 },
  },
  {
    id: "agora",
    label: "Agora",
    year: "2023",
    location: "SP",
    title: "Estamos prontos para inovar",
    body: "Com investimentos massivos em tecnologia e inovação, a Energisa se posiciona na vanguarda da transição energética. O FlexLab lidera projetos de energia renovável e smart grid em todo o Brasil.",
    // Brazil view (lat -15, lon -51)
    globe: { phi: -0.89, theta: 0.26, scale: 0.90 },
  },
  {
    id: "futuro",
    label: "Futuro",
    year: "2030",
    location: "RJ",
    title: "Acolhemos o novo",
    body: "A meta é clara: 100% de energia renovável até 2030. Com o ecossistema Energisa, estamos redefinindo como o Brasil se conecta com o futuro da energia.",
    // Latin America view (lat -5, lon -62)
    globe: { phi: -1.08, theta: 0.09, scale: 0.85 },
  },
];

export function TimelineSection() {
  const [active, setActive] = useState(0);
  const current = TABS[active];

  return (
    <section
      id="timeline"
      className="relative overflow-hidden"
      style={{ background: "#121312", minHeight: "100svh" }}
    >
      <div
        className="max-w-[1440px] mx-auto relative px-8 md:px-20 py-20 flex flex-col justify-between"
        style={{ minHeight: "100svh" }}
      >
        {/* Tabs */}
        <div className="flex items-center gap-8 relative z-10">
          {TABS.map((tab, i) => (
            <button
              key={tab.id}
              onClick={() => setActive(i)}
              className="relative pb-2 cursor-pointer active:scale-[0.97] transition-transform duration-100"
              style={{
                fontFamily: "Sora, sans-serif",
                fontSize: "20px",
                color: i === active ? "#F6F8ED" : "rgba(246, 248, 237, 0.4)",
                transition: "color 0.2s ease, transform 0.1s ease",
                background: "transparent",
                border: "none",
                padding: 0,
              }}
            >
              {tab.label}
              {i === active && (
                <motion.div
                  layoutId="timeline-tab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F6F8ED]"
                  transition={{ duration: 0.3, ease: [0.65, 0, 0.35, 1] }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Main content — bottom aligned */}
        <div className="relative z-10 flex items-end justify-between gap-8">
          {/* Left: animated text + badges */}
          <div className="flex flex-col gap-8" style={{ maxWidth: 520 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                className="flex flex-col gap-5"
              >
                <h2
                  style={{
                    fontFamily: "Sora, sans-serif",
                    fontWeight: 400,
                    fontSize: "clamp(28px, 3.2vw, 39px)",
                    color: "#F6F8ED",
                    lineHeight: 1.2,
                  }}
                >
                  {current.title}
                </h2>
                <p
                  style={{
                    fontFamily: "Sora, sans-serif",
                    fontSize: "clamp(15px, 1.3vw, 20px)",
                    color: "rgba(246, 248, 237, 0.7)",
                    lineHeight: 1.65,
                  }}
                >
                  {current.body}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Badges + progress dots */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id + "-badges"}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, delay: 0.1 }}
                className="flex items-center gap-4"
              >
                {[current.year, current.location].map((val) => (
                  <div
                    key={val}
                    style={{
                      border: "1px solid rgba(246, 248, 237, 0.2)",
                      padding: "18px 28px",
                      background: "rgba(246, 248, 237, 0.05)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Sora, sans-serif",
                        fontWeight: 400,
                        fontSize: "clamp(30px, 3.5vw, 49px)",
                        color: "#F6F8ED",
                        lineHeight: 1,
                        display: "block",
                      }}
                    >
                      {val}
                    </span>
                  </div>
                ))}

                {/* Pill progress */}
                <div className="flex items-center gap-1.5 ml-4">
                  {TABS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      style={{
                        width: i === active ? 28 : 6,
                        height: 6,
                        borderRadius: 3,
                        background: i === active ? GRADIENT : "rgba(246, 248, 237, 0.25)",
                        border: "none",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        padding: 0,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Globe — absolute right, full height */}
      <div
        className="hidden md:block absolute top-0 right-0 pointer-events-auto"
        style={{ width: "52%", height: "100%", display: "flex", alignItems: "center" }}
      >
        <div style={{ width: "100%", padding: "40px 40px 40px 0" }}>
          <VoxelGlobe
          className="w-full"
          targetPhi={TABS[active].globe.phi}
          targetTheta={TABS[active].globe.theta}
          targetScale={TABS[active].globe.scale}
        />
        </div>
        {/* Fade left edge into bg */}
        <div
          className="absolute inset-y-0 left-0 pointer-events-none"
          style={{
            width: "30%",
            background: "linear-gradient(to right, #121312, transparent)",
          }}
        />
      </div>
    </section>
  );
}
