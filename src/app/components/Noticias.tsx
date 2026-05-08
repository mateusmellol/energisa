import { motion } from "motion/react";
import { GridPattern } from "@/registry/magicui/grid-pattern";
import { cn } from "@/lib/utils";
import {
  liftHover,
  motionTransition,
  motionViewport,
  pressTap,
  sectionHeaderVariants,
} from "@/lib/motion";
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
    title: "FlexLab amplia testes com tecnologias",
    summary:
      "Novas frentes de pesquisa conectam automação, dados e eficiência operacional para acelerar soluções que chegam ao cliente.",
    image: laboratorioImage,
    imageAlt:
      "Equipe técnica trabalhando em bancada de prototipagem com equipamentos eletrônicos.",
  },
  {
    category: "Sustentabilidade",
    date: "14 abr 2026",
    dateTime: "2026-04-14",
    title: "GreenTech revoluciona energia renovável",
    summary:
      "Novas soluções em energia solar e eólica reduzem custos e aumentam a eficiência, transformando o mercado energético.",
    image: infraestruturaImage,
    imageAlt:
      "Vista aérea de planta industrial com tanques, tubulações e áreas verdes ao redor.",
  },
  {
    category: "Inteligência Artificial",
    date: "02 abr 2026",
    dateTime: "2026-04-02",
    title: "AI Health transforma cuidados médicos",
    summary:
      "A integração de IA na análise de dados médicos promete diagnósticos mais rápidos e precisão no tratamento de doenças.",
    image: solarImage,
    imageAlt:
      "Técnico instalando painéis solares em uma estrutura de geração fotovoltaica.",
  },
];

function NewsCard({ item, index }: { item: NewsItem; index: number }) {
  return (
    <motion.article
      className="flex min-w-0 cursor-pointer flex-col gap-4"
      initial="hidden"
      whileInView="visible"
      viewport={motionViewport}
      whileHover="hover"
      custom={index}
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: (cardIndex: number) => ({
          opacity: 1,
          y: 0,
          transition: {
            ...motionTransition.entrance,
            delay: cardIndex * 0.08,
          },
        }),
        hover: {
          y: -4,
          transition: motionTransition.fast,
        },
      }}
    >
      <motion.div
        className="relative block aspect-[1.18] w-full overflow-hidden bg-[#e6e7e4] shadow-[0_15px_35px_-5px_rgba(0,0,0,0.1),0_10px_20px_-10px_rgba(0,0,0,0.05)]"
        variants={{
          hover: {
            boxShadow:
              "0 25px 50px -12px rgba(0,0,0,0.15), 0 12px 22px -14px rgba(0,0,0,0.12)",
          },
        }}
      >
        <motion.img
          src={item.image}
          alt={item.imageAlt}
          className="h-full w-full object-cover"
          loading={index === 0 ? "eager" : "lazy"}
          decoding="async"
          variants={{
            hover: {
              scale: 1.035,
              transition: motionTransition.fast,
            },
          }}
        />
      </motion.div>

      <div className="flex flex-col items-start gap-4">
        <div className="flex h-[34px] items-center justify-center rounded-full bg-[#D4EC28] px-4">
          <span className="font-['Sora',sans-serif] text-[13px] leading-[1.4] text-[#121312]">
            {item.category}
          </span>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <h3 className="font-['Sora',sans-serif] text-[31px] font-normal leading-[1.16] text-[#121312]">
              {item.title}
            </h3>
            <p className="font-['Sora',sans-serif] text-[16px] leading-[1.6] text-[#555653]">
              {item.summary}
            </p>
          </div>

          <time
            dateTime={item.dateTime}
            className="font-['Sora',sans-serif] text-[10px] leading-[1.4] text-[#555653]"
          >
            {item.date}
          </time>
        </div>
      </div>
    </motion.article>
  );
}

export function Noticias() {
  return (
    <section
      id="noticias"
      className="relative overflow-hidden bg-[#FFFFFF] pt-12 pb-24 md:pt-16 md:pb-[128px]"
    >
      <GridPattern
        width={40}
        height={40}
        x={-1}
        y={-1}
        className={cn(
          "pointer-events-none absolute inset-0 h-full w-full stroke-gray-900/[0.06]",
          "[mask-image:radial-gradient(900px_circle_at_top_right,white,transparent)]",
        )}
      />
      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col gap-7 px-5 md:px-20">
        <motion.div
          className="flex flex-col items-start justify-between gap-8 pb-8 md:flex-row md:items-end"
          initial="hidden"
          whileInView="visible"
          viewport={motionViewport}
          variants={sectionHeaderVariants}
        >
          <h2 className="font-['Sora',sans-serif] text-[39px] font-normal leading-[1.4] text-[#121312]">
            Notícias
          </h2>

          <motion.button
            type="button"
            className="inline-flex items-center text-[16px] font-medium text-[#121312] underline underline-offset-4 cursor-pointer"
            style={{ fontFamily: "Sora, sans-serif" }}
            whileHover={liftHover}
            whileTap={pressTap}
          >
            Ver tudo
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-3">
          {NEWS_ITEMS.map((item, index) => (
            <NewsCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
