import { ArrowUpRight } from "lucide-react";
import laboratorioImage from "@/assets/noticias/inovacao-laboratorio.webp";
import infraestruturaImage from "@/assets/noticias/infraestrutura-industrial.webp";
import solarImage from "@/assets/noticias/energia-solar.webp";

type NewsItem = {
  category: string;
  date: string;
  dateTime: string;
  title: string;
  summary: string;
  image: string;
  imageAlt: string;
};

const NEWS_ITEMS: NewsItem[] = [
  {
    category: "Inovação",
    date: "30 abr 2026",
    dateTime: "2026-04-30",
    title: "FlexLab amplia testes com tecnologias para redes mais inteligentes",
    summary:
      "Novas frentes de pesquisa conectam automação, dados e eficiência operacional para acelerar soluções que chegam ao cliente.",
    image: laboratorioImage,
    imageAlt:
      "Equipe técnica trabalhando em bancada de prototipagem com equipamentos eletrônicos.",
  },
  {
    category: "Infraestrutura",
    date: "24 abr 2026",
    dateTime: "2026-04-24",
    title: "Grupo avança em projetos para diversificar a matriz energética",
    summary:
      "Investimentos em operações complementares reforçam segurança, previsibilidade e capacidade de atendimento em novos mercados.",
    image: infraestruturaImage,
    imageAlt:
      "Vista aérea de planta industrial com tanques, tubulações e áreas verdes ao redor.",
  },
  {
    category: "Transição energética",
    date: "16 abr 2026",
    dateTime: "2026-04-16",
    title: "Geração solar ganha escala em iniciativas para empresas e cidades",
    summary:
      "Projetos de energia renovável combinam implantação técnica e gestão digital para apoiar metas de descarbonização.",
    image: solarImage,
    imageAlt:
      "Técnico instalando painéis solares em uma estrutura de geração fotovoltaica.",
  },
];

function NewsCard({ item, index }: { item: NewsItem; index: number }) {
  return (
    <article className="group flex min-w-0 flex-col gap-5">
      <div className="relative block aspect-[1.18] w-full overflow-hidden bg-[#e6e7e4]">
        <img
          src={item.image}
          alt={item.imageAlt}
          className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035]"
          loading={index === 0 ? "eager" : "lazy"}
          decoding="async"
        />
      </div>

      <div className="flex flex-col gap-4">
        <div
          className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[12px] uppercase tracking-[0.14em] text-[#555653]"
          style={{ fontFamily: "Sora, sans-serif" }}
        >
          <span>{item.category}</span>
          <span aria-hidden="true" className="h-1 w-1 bg-[#8b8d85]" />
          <time dateTime={item.dateTime}>{item.date}</time>
        </div>

        <h3
          className="max-w-[720px] text-[#121312] transition-colors duration-200 group-hover:text-[#055e3a]"
          style={{
            fontFamily: "Sora, sans-serif",
            fontSize: "clamp(22px, 2vw, 31px)",
            fontWeight: 400,
            lineHeight: 1.16,
          }}
        >
          {item.title}
        </h3>

        <p
          className="max-w-[610px] text-[15px] leading-[1.6] text-[#71726b] md:text-[16px]"
          style={{ fontFamily: "Sora, sans-serif" }}
        >
          {item.summary}
        </p>
      </div>
    </article>
  );
}

export function Noticias() {
  return (
    <section
      id="noticias"
      className="relative overflow-hidden bg-[#f8f8f7] py-24 md:py-32"
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-14 px-5 md:px-20">
        <div className="flex flex-col items-start justify-between gap-8 border-b border-[#dadad6] pb-8 md:flex-row md:items-end">
          <div className="flex max-w-[770px] flex-col gap-4">
            <span
              className="text-[13px] font-medium uppercase tracking-[0.16em] text-[#055e3a]"
              style={{ fontFamily: "Sora, sans-serif" }}
            >
              Notícias
            </span>
            <h2
              className="text-[#121312]"
              style={{
                fontFamily: "Sora, sans-serif",
                fontSize: "clamp(36px, 4.5vw, 72px)",
                fontWeight: 400,
                lineHeight: 1.04,
              }}
            >
              Atualizações do ecossistema Energisa
            </h2>
          </div>

          <button
            type="button"
            className="group inline-flex min-h-[48px] items-center gap-3 border border-[#121312] px-5 text-[15px] font-medium text-[#121312] transition-colors duration-200 hover:bg-[#121312] hover:text-[#fdfdfc] active:scale-[0.98]"
            style={{ fontFamily: "Sora, sans-serif" }}
          >
            Ver tudo
            <ArrowUpRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={2}
            />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-3">
          {NEWS_ITEMS.map((item, index) => (
            <NewsCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
