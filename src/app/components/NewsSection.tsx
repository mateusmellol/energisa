const FEATURED = {
  category: "Inovação",
  date: "Abr 2025",
  title: "Novos caminhos para a flexibilidade energética",
  desc: "O energisa FlexLab é uma plataforma de inovação aberta que conecta ecossistema, infraestrutura robusta e aplicação prática — criando novos modelos de geração, distribuição e consumo de energia.",
};

const ARTICLES = [
  {
    category: "Institucional",
    date: "Abr 2025",
    title: "Livro revisita os 120 anos da nossa trajetória",
  },
  {
    category: "Promoção",
    date: "Abr 2025",
    title: "Show de Prêmios: pague com Pix e concorra a mais de 500 prêmios",
  },
  {
    category: "Serviços",
    date: "Abr 2025",
    title: "Economize até 30% na fatura com o (re)energisa em MS e MT",
  },
];

function SmallCard({ category, date, title }: { category: string; date: string; title: string }) {
  return (
    <div
      className="flex flex-row gap-4 group cursor-pointer"
      style={{ borderTop: "1px solid #e8e8e5", paddingTop: 20, paddingBottom: 4 }}
    >
      {/* Image placeholder */}
      <div
        style={{
          width: 88,
          height: 72,
          background: "#e8e8e5",
          flexShrink: 0,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, rgba(11,207,129,0.2) 0%, transparent 60%)",
            opacity: 0,
            transition: "opacity 250ms ease",
          }}
          className="group-hover:opacity-100"
        />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-1.5 flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span
            style={{
              fontFamily: "Sora, sans-serif",
              fontSize: "10px",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#0BCF81",
            }}
          >
            {category}
          </span>
          <span
            style={{
              fontFamily: "Sora, sans-serif",
              fontSize: "11px",
              color: "#aaa9a2",
            }}
          >
            {date}
          </span>
        </div>
        <p
          style={{
            fontFamily: "Sora, sans-serif",
            fontSize: "13px",
            fontWeight: 500,
            color: "#121312",
            lineHeight: 1.45,
            transition: "color 200ms ease",
          }}
          className="group-hover:text-[#0BCF81]"
        >
          {title}
        </p>
        <span
          style={{
            fontFamily: "Sora, sans-serif",
            fontSize: "12px",
            color: "#aaa9a2",
            marginTop: 4,
            transition: "color 200ms ease",
          }}
          className="group-hover:text-[#121312]"
        >
          Ler artigo →
        </span>
      </div>
    </div>
  );
}

export function NewsSection() {
  return (
    <section style={{ background: "#fdfdfc" }} className="py-20 px-8 md:px-20">
      <div className="max-w-[1440px] mx-auto">
        {/* Section header */}
        <div className="flex items-end justify-between mb-12">
          <h2
            style={{
              fontFamily: "Sora, sans-serif",
              fontWeight: 400,
              fontSize: "clamp(24px, 3vw, 39px)",
              color: "#121312",
              lineHeight: 1.2,
            }}
          >
            Últimas notícias
          </h2>
          <a
            href="#"
            style={{
              fontFamily: "Sora, sans-serif",
              fontSize: "14px",
              color: "#8b8d85",
              textDecoration: "none",
              letterSpacing: "0.02em",
            }}
          >
            Ver todas →
          </a>
        </div>

        {/* Featured row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 mb-6">
          {/* Left: large image */}
          <div
            style={{
              background: "#121312",
              aspectRatio: "16/10",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(ellipse at 30% 50%, rgba(11,207,129,0.18) 0%, transparent 65%), radial-gradient(ellipse at 80% 20%, rgba(78,179,131,0.10) 0%, transparent 50%)",
              }}
            />
          </div>

          {/* Right: featured content */}
          <div
            style={{
              background: "#f3f3f0",
              padding: "40px 36px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <span
                  style={{
                    fontFamily: "Sora, sans-serif",
                    fontSize: "10px",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#0BCF81",
                  }}
                >
                  {FEATURED.category}
                </span>
                <span
                  style={{
                    fontFamily: "Sora, sans-serif",
                    fontSize: "12px",
                    color: "#aaa9a2",
                  }}
                >
                  {FEATURED.date}
                </span>
              </div>

              <h3
                style={{
                  fontFamily: "Sora, sans-serif",
                  fontSize: "clamp(20px, 2.2vw, 28px)",
                  fontWeight: 600,
                  color: "#121312",
                  lineHeight: 1.3,
                }}
              >
                {FEATURED.title}
              </h3>

              <p
                style={{
                  fontFamily: "Sora, sans-serif",
                  fontSize: "clamp(14px, 1.1vw, 16px)",
                  color: "#71726b",
                  lineHeight: 1.65,
                }}
              >
                {FEATURED.desc}
              </p>
            </div>

            <a
              href="#"
              style={{
                fontFamily: "Sora, sans-serif",
                fontSize: "14px",
                fontWeight: 500,
                color: "#121312",
                textDecoration: "none",
                letterSpacing: "0.02em",
                marginTop: 32,
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                borderBottom: "1px solid #121312",
                paddingBottom: 2,
                width: "fit-content",
                transition: "border-color 200ms ease, color 200ms ease",
              }}
              className="hover:text-[#0BCF81] hover:border-[#0BCF81]"
            >
              Ler artigo
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>

        {/* Secondary row — 3 horizontal cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {ARTICLES.map((a, i) => (
            <SmallCard key={i} {...a} />
          ))}
        </div>
      </div>
    </section>
  );
}
