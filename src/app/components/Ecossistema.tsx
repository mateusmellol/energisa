import { motion, useInView, useScroll, useTransform } from "motion/react";
import { Sparkles } from "lucide-react";
import { useRef } from "react";
import { GridPattern } from "@/registry/magicui/grid-pattern";
import { cn } from "@/lib/utils";
import flexlabImage from "@/assets/ecossistema/flexlab-solar.webp";
import reenergisaImage from "@/assets/ecossistema/reenergisa-building.webp";
import esgasImage from "@/assets/ecossistema/esgas-field.webp";

type EcosystemCard = {
  title: string;
  eyebrow?: string;
  body: string[];
  cta: string;
  image: string;
  imageAlt: string;
};

const ECOSYSTEM_CARDS: EcosystemCard[] = [
  {
    title: "FlexLab",
    body: [
      "O FlexLab acelera projetos de inovação em energia solar, eficiência energética e novas tecnologias para clientes residenciais e empresariais.",
      "É o espaço onde a Energisa testa soluções digitais, valida modelos de negócio e transforma pesquisa aplicada em serviços mais simples, seguros e escaláveis.",
    ],
    cta: "Ver FlexLab",
    image: flexlabImage,
    imageAlt: "Painéis solares em campo aberto representando inovação e energia renovável.",
  },
  {
    title: "Reenergisa",
    body: [
      "A Reenergisa conecta a experiência centenária do grupo a soluções para mercado livre de energia, geração distribuída e gestão inteligente do consumo.",
      "Com uma operação orientada por dados, ajuda empresas a reduzir custos, ampliar previsibilidade e avançar em metas de descarbonização.",
    ],
    cta: "Ver Reenergisa",
    image: reenergisaImage,
    imageAlt: "Fachada de edifício corporativo da Energisa.",
  },
  {
    title: "ESgas",
    eyebrow: "Novidade",
    body: [
      "A ESgas amplia o ecossistema Energisa para a distribuição de gás canalizado, fortalecendo a infraestrutura energética no Espírito Santo.",
      "A operação combina segurança, expansão de rede e atendimento próximo para apoiar indústrias, comércios e cidades em uma transição energética mais eficiente.",
    ],
    cta: "Ver ESgas",
    image: esgasImage,
    imageAlt: "Técnico da ESgas operando equipamentos de distribuição de gás.",
  },
];

function EcosystemButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      className="inline-flex items-center justify-center gap-2 rounded-[4px] bg-[#121312] px-8 py-4 text-[16px] font-medium text-[#fdfdfc] transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:bg-[#20221f] active:scale-[0.97] cursor-pointer"
      style={{ fontFamily: "Sora, sans-serif" }}
    >
      <span>{children}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M7 7h10v10" />
        <path d="M7 17 17 7" />
      </svg>
    </button>
  );
}

function EcosystemSlide({
  card,
  index,
  isLast,
  id,
  style,
}: {
  card: EcosystemCard;
  index: number;
  isLast: boolean;
  id?: string;
  style?: React.CSSProperties;
}) {
  const slideRef = useRef<HTMLElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: slideRef,
    offset: ["start start", "end start"],
  });
  const isTextInView = useInView(textRef, { once: true, margin: "0px 0px -60px 0px" });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.86, 0.72]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [0, -42, -120]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.14]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -54]);

  return (
    <section
      ref={slideRef}
      id={id}
      style={style}
      className={cn(
        "relative flex min-h-[87svh] justify-center",
        !isLast && "mb-0",
      )}
    >
      <motion.div
        style={{ scale, y }}
        className="sticky top-[4svh] flex h-[85svh] w-full items-center px-3 py-0 md:px-5"
      >
        <div className="relative mx-auto grid h-full w-full max-w-[1440px] grid-cols-1 items-center gap-8 px-5 py-8 md:grid-cols-12 md:gap-8 md:px-12 md:py-10">
          <motion.div
            ref={index === 0 ? textRef : undefined}
            initial={index === 0 ? { opacity: 0, x: -40, filter: "blur(8px)" } : false}
            animate={index === 0 ? (isTextInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}) : undefined}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex min-h-[562px] flex-col items-start justify-between gap-14 md:col-span-5"
          >
            <div className="flex w-full flex-col gap-10">
              <div className="flex flex-col items-start gap-4">
                {card.eyebrow && (
                  <span
                    className="inline-flex items-center gap-1 rounded-full bg-[#D4EC28] px-3 py-1.5 text-[13px] text-[#121312]"
                    style={{ fontFamily: "Sora, sans-serif" }}
                  >
                    <Sparkles size={14} strokeWidth={1.5} />
                    {card.eyebrow}
                  </span>
                )}

                <h2
                  style={{
                    fontFamily: "Sora, sans-serif",
                    fontSize: "clamp(40px, 3.4vw, 49px)",
                    fontWeight: 400,
                    lineHeight: 1.18,
                    color: "#000000",
                    letterSpacing: "-0.035em",
                  }}
                >
                  {card.title}
                </h2>
              </div>

              <div className="flex flex-col gap-6">
                <div
                  className="flex flex-col gap-4 text-[18px] leading-[1.55] md:text-[20px]"
                  style={{
                    fontFamily: "Sora, sans-serif",
                    color: "rgba(18, 19, 18, 0.48)",
                  }}
                >
                  {card.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>

            <EcosystemButton>{card.cta}</EcosystemButton>
          </motion.div>

          <motion.div
            style={{ scale: imageScale, y: imageY }}
            initial={index === 0 ? { opacity: 0, x: -40, filter: "blur(8px)" } : false}
            animate={index === 0 ? (isTextInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}) : undefined}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="relative z-10 h-[48svh] overflow-hidden rounded-none md:col-span-7 md:h-[633px]"
          >
            <img
              src={card.image}
              alt={card.imageAlt}
              className="h-full w-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export function Ecossistema() {
  return (
    <section className="relative overflow-hidden bg-white pt-3 pb-0 md:pt-5 md:pb-0">
      <GridPattern
        width={40}
        height={40}
        x={-1}
        y={-1}
        className={cn(
          "pointer-events-none absolute inset-0 h-full w-full stroke-gray-900/[0.06]",
          "[mask-image:radial-gradient(900px_circle_at_top_left,white,transparent)]",
        )}
      />

      <div className="relative z-10">
        {ECOSYSTEM_CARDS.map((card, index) => (
          <EcosystemSlide
            key={card.title}
            id={index === 0 ? "ecossistema" : undefined}
            card={card}
            index={index}
            isLast={index === ECOSYSTEM_CARDS.length - 1}
            style={index === 0 ? { scrollMarginTop: "80px" } : undefined}
          />
        ))}
      </div>

      <GridPattern
        width={40}
        height={40}
        x={-1}
        y={-1}
        className={cn(
          "pointer-events-none absolute inset-0 h-full w-full stroke-gray-900/[0.06]",
          "[mask-image:radial-gradient(900px_circle_at_bottom_right,white,transparent)]",
        )}
      />
    </section>
  );
}
