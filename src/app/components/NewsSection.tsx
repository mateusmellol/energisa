import { motion, useReducedMotion } from "motion/react";

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
    desc: "Uma publicação que celebra mais de um século de história, inovação e compromisso com o desenvolvimento do Brasil.",
  },
  {
    category: "Promoção",
    date: "Abr 2025",
    title: "Show de Prêmios: pague com Pix e concorra a mais de 500 prêmios",
    desc: "Clientes que pagam a fatura via Pix participam automaticamente de sorteios com centenas de prêmios todo mês.",
  },
  {
    category: "Serviços",
    date: "Abr 2025",
    title: "Economize até 30% na fatura com o (re)energisa em MS e MT",
    desc: "Programa de eficiência energética oferece descontos expressivos para clientes do Mato Grosso e Mato Grosso do Sul.",
  },
];

function CategoryBadge({ label }: { label: string }) {
  return (
    <span
      style={{
        fontFamily: "Sora, sans-serif",
        fontSize: "10px",
        fontWeight: 600,
        letterSpacing: "0.1em",
        textTransform: "uppercase" as const,
        color: "#0BCF81",
      }}
    >
      {label}
    </span>
  );
}

function ArticleCard({
  category,
  date,
  title,
  desc,
  featured = false,
}: {
  category: string;
  date: string;
  title: string;
  desc?: string;
  featured?: boolean;
}) {
  return (
    <a
      href="#"
      className="group flex flex-col gap-4 no-underline"
      style={{ textDecoration: "none" }}
    >
      {/* Media */}
      <div
        className="w-full rounded-xl border overflow-hidden"
        style={{
          background: "#121312",
          aspectRatio: featured ? "16/9" : "16/10",
          border: "1px solid #e8e8e5",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 30% 50%, rgba(11,207,129,0.18) 0%, transparent 65%), radial-gradient(ellipse at 80% 20%, rgba(78,179,131,0.10) 0%, transparent 50%)",
            transition: "opacity 300ms cubic-bezier(0.16,1,0.3,1)",
          }}
          className="group-hover:opacity-80"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2">
        {/* Meta row */}
        <div className="flex items-center gap-2">
          <CategoryBadge label={category} />
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

        {/* Title */}
        <h3
          style={{
            fontFamily: "Sora, sans-serif",
            fontSize: featured ? "clamp(18px, 1.6vw, 22px)" : "15px",
            fontWeight: 600,
            color: "#121312",
            lineHeight: 1.35,
            margin: 0,
            transition: "color 200ms ease",
          }}
          className="group-hover:text-[#0BCF81]"
        >
          {title}
        </h3>

        {/* Description */}
        {desc && (
          <p
            style={{
              fontFamily: "Sora, sans-serif",
              fontSize: "14px",
              color: "#71726b",
              lineHeight: 1.65,
              margin: 0,
            }}
          >
            {desc}
          </p>
        )}

        {/* CTA */}
        <span
          style={{
            fontFamily: "Sora, sans-serif",
            fontSize: "13px",
            fontWeight: 500,
            color: "#aaa9a2",
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            marginTop: 2,
            transition: "color 200ms ease",
          }}
          className="group-hover:text-[#121312]"
        >
          Ler artigo{" "}
          <span className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 inline-block">
            →
          </span>
        </span>
      </div>
    </a>
  );
}

export function NewsSection() {
  const shouldReduceMotion = useReducedMotion();
  const yOffset = shouldReduceMotion ? 0 : 12;

  return (
    <section style={{ background: "#fdfdfc", scrollSnapAlign: "start" }} className="py-20">
      <div className="max-w-[1440px] mx-auto px-8 md:px-20">

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
              transition: "color 200ms ease",
            }}
            className="hover:text-[#121312]"
          >
            Ver todas →
          </a>
        </div>

        {/* Grid: 1 featured + 3 cards */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1fr] gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.08 },
            },
          }}
        >
          {/* Featured — spans 2 cols on lg */}
          <motion.div
            className="lg:col-span-2"
            variants={{
              hidden: { opacity: 0, y: yOffset },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
              },
            }}
          >
            <ArticleCard {...FEATURED} featured />
          </motion.div>

          {/* Secondary stack — 3 cards stacked vertically */}
          <div className="flex flex-col gap-8">
            {ARTICLES.map((a, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: yOffset },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.4,
                      ease: [0.16, 1, 0.3, 1],
                      delay: (i + 1) * 0.08,
                    },
                  },
                }}
              >
                <a
                  href="#"
                  className="group flex flex-row gap-4 no-underline"
                  style={{ textDecoration: "none" }}
                >
                  {/* Thumbnail */}
                  <div
                    className="rounded-xl border flex-shrink-0 overflow-hidden"
                    style={{
                      width: 96,
                      height: 72,
                      background: "#121312",
                      border: "1px solid #e8e8e5",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "radial-gradient(ellipse at 30% 60%, rgba(11,207,129,0.22) 0%, transparent 70%)",
                        transition: "opacity 250ms ease",
                      }}
                      className="group-hover:opacity-70"
                    />
                  </div>

                  {/* Text */}
                  <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <CategoryBadge label={a.category} />
                      <span
                        style={{
                          fontFamily: "Sora, sans-serif",
                          fontSize: "11px",
                          color: "#aaa9a2",
                        }}
                      >
                        {a.date}
                      </span>
                    </div>
                    <p
                      style={{
                        fontFamily: "Sora, sans-serif",
                        fontSize: "13px",
                        fontWeight: 500,
                        color: "#121312",
                        lineHeight: 1.45,
                        margin: 0,
                        transition: "color 200ms ease",
                      }}
                      className="group-hover:text-[#0BCF81]"
                    >
                      {a.title}
                    </p>
                    <span
                      style={{
                        fontFamily: "Sora, sans-serif",
                        fontSize: "12px",
                        color: "#aaa9a2",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 3,
                        transition: "color 200ms ease",
                      }}
                      className="group-hover:text-[#121312]"
                    >
                      Ler artigo{" "}
                      <span className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 inline-block">
                        →
                      </span>
                    </span>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
