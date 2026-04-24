import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import imgGlobe from "figma:asset/249de7226f0a73ca1906ad78d8cf5bb510be4e42.png";

const GRADIENT = "linear-gradient(135deg, #EAFE1F 0%, #65F429 100%)";

const TABS = [
  {
    id: "antes",
    label: "Antes",
    year: "1905",
    location: "MG",
    title: "Começamos assim",
    body: "Em 1905, nascia em Cataguases, Minas Gerais, uma pequena empresa de energia que viria a transformar o cenário energético brasileiro. Com raízes profundas no interior do país, a Energisa cresceu junto com as comunidades que atende.",
  },
  {
    id: "agora",
    label: "Agora",
    year: "2023",
    location: "SP",
    title: "Estamos prontos para inovar",
    body: "Com investimentos massivos em tecnologia e inovação, a Energisa se posiciona na vanguarda da transição energética. O FlexLab lidera projetos de energia renovável e smart grid em todo o Brasil.",
  },
  {
    id: "futuro",
    label: "Futuro",
    year: "2030",
    location: "RJ",
    title: "Acolhemos o novo",
    body: "A meta é clara: 100% de energia renovável até 2030. Com o ecossistema Energisa, estamos redefinindo como o Brasil se conecta com o futuro da energia.",
  },
];

export function TimelineSection() {
  const [active, setActive] = useState(0);
  const current = TABS[active];

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "#121312", minHeight: "100svh" }}
    >
      <div
        className="max-w-[1440px] mx-auto relative px-8 md:px-20 py-20 flex flex-col justify-between"
        style={{ minHeight: "100svh" }}
      >
        {/* Tabs */}
        <div className="flex items-center gap-2 relative z-10">
          {TABS.map((tab, i) => (
            <button
              key={tab.id}
              onClick={() => setActive(i)}
              style={{
                fontFamily: "Sora, sans-serif",
                fontSize: "clamp(13px, 1.1vw, 16px)",
                color: i === active ? "#121312" : "rgba(253,253,252,0.45)",
                background: i === active ? GRADIENT : "transparent",
                padding: "6px 18px",
                border: i === active ? "none" : "1px solid rgba(253,253,252,0.12)",
                cursor: "pointer",
                transition: "all 0.25s ease",
                borderRadius: "2px",
                lineHeight: 1.5,
              }}
            >
              {tab.label}
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
                    color: "#fdfdfc",
                    lineHeight: 1.2,
                  }}
                >
                  {current.title}
                </h2>
                <p
                  style={{
                    fontFamily: "Sora, sans-serif",
                    fontSize: "clamp(15px, 1.3vw, 20px)",
                    color: "rgba(253,253,252,0.55)",
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
                      border: "1px solid rgba(253,253,252,0.1)",
                      padding: "18px 28px",
                      background: "rgba(253,253,252,0.03)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Sora, sans-serif",
                        fontWeight: 400,
                        fontSize: "clamp(30px, 3.5vw, 49px)",
                        color: "#fdfdfc",
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
                        background: i === active ? GRADIENT : "rgba(253,253,252,0.2)",
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
        className="hidden md:block absolute top-0 right-0 overflow-hidden pointer-events-none"
        style={{ width: "52%", height: "100%" }}
      >
        <img
          alt=""
          src={imgGlobe}
          className="absolute max-w-none"
          style={{
            width: "162.58%",
            height: "157.32%",
            left: "-33.31%",
            top: "-10%",
            opacity: 0.9,
          }}
        />
        {/* Gradient fade: blend left edge into dark bg */}
        <div
          className="absolute inset-y-0 left-0"
          style={{
            width: "35%",
            background: "linear-gradient(to right, #121312, transparent)",
          }}
        />
        {/* Gradient fade: bottom edge */}
        <div
          className="absolute inset-x-0 bottom-0"
          style={{
            height: "20%",
            background: "linear-gradient(to top, #121312, transparent)",
          }}
        />
      </div>
    </section>
  );
}
