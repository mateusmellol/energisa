const ARTICLES = [
  {
    title: "FlexLab lança programa de eficiência energética para pequenas empresas",
    desc: "Iniciativa atende mais de 200 negócios em Minas Gerais com consultoria gratuita e soluções de smart grid.",
  },
  {
    title: "Energisa supera meta de 800 municípios atendidos antes do prazo",
    desc: "Expansão no interior do Brasil garante acesso à energia elétrica para mais de 1,2 milhão de novas famílias.",
  },
  {
    title: "Nova usina solar do Grupo Energisa entra em operação no Nordeste",
    desc: "Capacidade instalada de 120 MW representa avanço significativo na transição para energia renovável.",
  },
  {
    title: "Relatório de sustentabilidade 2024: carbono neutro em 2030",
    desc: "Documento detalha metas e investimentos em energia limpa, eficiência e responsabilidade socioambiental.",
  },
];

interface NewsCardProps {
  title: string;
  desc: string;
}

function NewsCard({ title, desc }: NewsCardProps) {
  return (
    <div
      className="flex flex-col w-full group cursor-pointer"
      style={{ transition: "transform 0.25s ease" }}
    >
      {/* Image area */}
      <div
        style={{
          height: 260,
          background: "#121312",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle green glow overlay on hover */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, rgba(11,207,129,0.08) 0%, transparent 60%)",
            opacity: 0,
            transition: "opacity 0.3s ease",
          }}
          className="group-hover:opacity-100"
        />
      </div>

      {/* Content */}
      <div
        style={{
          background: "#f8f8f7",
          padding: "20px 20px 20px",
          display: "flex",
          flexDirection: "column",
          gap: 16,
          borderBottom: "2px solid transparent",
          transition: "border-color 0.25s ease",
        }}
        className="group-hover:[border-color:#0BCF81]"
      >
        <div className="flex flex-col gap-2">
          <p
            style={{
              fontFamily: "Sora, sans-serif",
              fontSize: "clamp(14px, 1.2vw, 16px)",
              color: "#121312",
              lineHeight: 1.5,
              fontWeight: 400,
            }}
          >
            {title}
          </p>
          <p
            style={{
              fontFamily: "Sora, sans-serif",
              fontSize: "clamp(12px, 1vw, 14px)",
              color: "#71726b",
              lineHeight: 1.5,
            }}
          >
            {desc}
          </p>
        </div>

        <button
          style={{
            fontFamily: "Sora, sans-serif",
            fontSize: "13px",
            color: "#121312",
            background: "transparent",
            border: "none",
            padding: 0,
            cursor: "pointer",
            textAlign: "left",
            letterSpacing: "0.02em",
            opacity: 0.5,
            transition: "opacity 0.2s ease",
          }}
          className="group-hover:opacity-100"
        >
          Ler mais →
        </button>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ARTICLES.map((a, i) => (
            <NewsCard key={i} title={a.title} desc={a.desc} />
          ))}
        </div>
      </div>
    </section>
  );
}
