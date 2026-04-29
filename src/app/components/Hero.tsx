"use client";

import imgHero from "../../assets/hero-main.webp";

export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden flex flex-col" style={{ minHeight: "100svh" }}>
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <img
          alt=""
          src={imgHero}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.25)" }} />
        <div
          className="absolute inset-x-0 bottom-0 pointer-events-none"
          style={{
            height: "60%",
            background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col flex-1 pt-32 pb-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 md:gap-8 mt-auto w-full max-w-[1440px] mx-auto px-5 md:px-20">
          <div className="flex flex-col items-start gap-6">
            <h1
              style={{
                fontFamily: "Sora, sans-serif",
                fontWeight: 500,
                fontSize: "clamp(36px, 6.5vw, 84px)",
                letterSpacing: "-0.03em",
                color: "#f6f8ed",
                lineHeight: 1.05,
              }}
            >
              A Energisa
              <br />
              move o Brasil
            </h1>
          </div>

          <div className="flex flex-col items-start w-full md:max-w-[380px] shrink-0 self-stretch">
            <div className="mt-auto flex flex-col items-start gap-6 w-full">
              <p
                style={{
                  fontFamily: "Sora, sans-serif",
                  fontSize: "clamp(15px, 1.2vw, 18px)",
                  color: "rgba(246, 248, 237, 0.85)",
                  lineHeight: 1.6,
                  fontWeight: 300,
                }}
              >
                De Norte a Sul. Quando uma luz
                <br />
                acende, é a Energisa que faz acontecer.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full">
                <button
                  onClick={() => document.getElementById("solucoes")?.scrollIntoView({ behavior: "smooth" })}
                  className="relative px-8 py-4 overflow-hidden rounded-[4px] transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.97] hover:opacity-90 cursor-pointer"
                  style={{
                    backgroundColor: "#D4EC28",
                    boxShadow: "0 10px 30px -10px rgba(0,0,0,0.2)",
                  }}
                >
                  <span className="relative inline-block font-medium text-[16px] text-[#20201f]" style={{ fontFamily: "Sora, sans-serif" }}>
                    Serviços
                  </span>
                </button>

                <button
                  onClick={() => document.getElementById("ecossistema")?.scrollIntoView({ behavior: "smooth" })}
                  className="px-8 py-4 rounded-[4px] border border-white/20 text-[#f6f8ed] font-medium text-[16px] transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-white/5 active:scale-[0.97] cursor-pointer"
                  style={{ fontFamily: "Sora, sans-serif" }}
                >
                  <span className="inline-block">Ecossistema</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
