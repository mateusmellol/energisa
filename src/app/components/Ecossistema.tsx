import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import {
  ArrowUpRight,
  BarChart3,
  Building2,
  Factory,
  Flame,
  FlaskConical,
  Network,
  type LucideIcon,
  ShieldCheck,
  Sparkles,
  SunMedium,
  Telescope,
  TrendingDown,
  Zap,
} from "lucide-react";
import { useRef } from "react";
import { GridPattern } from "@/registry/magicui/grid-pattern";
import { cn } from "@/lib/utils";
import {
  liftHover,
  motionTransition,
  motionViewport,
  pressTap,
} from "@/lib/motion";
import flexlabImage from "@/assets/ecossistema/flexlab-solar.webp";
import reenergisaImage from "@/assets/ecossistema/reenergisa-building.webp";
import esgasImage from "@/assets/ecossistema/esgas-field.webp";

type EcosystemHighlight = {
  icon: LucideIcon;
  label: string;
  description: string;
};

type EcosystemCard = {
  title: string;
  eyebrow?: string;
  intro: string;
  highlights: EcosystemHighlight[];
  cta: string;
  image: string;
  imageAlt: string;
};

const ECOSYSTEM_CARDS: EcosystemCard[] = [
  {
    title: "FlexLab",
    intro:
      "O FlexLab acelera projetos de inovação em energia solar, eficiência energética e novas tecnologias para clientes residenciais e empresariais.",
    highlights: [
      {
        icon: FlaskConical,
        label: "Testes rápidos",
        description: "Experimenta soluções digitais com agilidade.",
      },
      {
        icon: Telescope,
        label: "Validação",
        description: "Refina modelos de negócio antes da escala.",
      },
      {
        icon: Zap,
        label: "Pesquisa aplicada",
        description: "Transforma estudo em serviço utilizável.",
      },
      {
        icon: ShieldCheck,
        label: "Escalabilidade",
        description: "Leva inovação com mais segurança operacional.",
      },
    ],
    cta: "Ver FlexLab",
    image: flexlabImage,
    imageAlt: "Painéis solares em campo aberto representando inovação e energia renovável.",
  },
  {
    title: "Reenergisa",
    intro:
      "A Reenergisa conecta a experiência centenária do grupo a soluções para mercado livre de energia, geração distribuída e gestão inteligente do consumo.",
    highlights: [
      {
        icon: BarChart3,
        label: "Dados operacionais",
        description: "Orienta decisões com leitura contínua de consumo.",
      },
      {
        icon: TrendingDown,
        label: "Redução de custos",
        description: "Cria eficiência financeira para empresas.",
      },
      {
        icon: SunMedium,
        label: "Previsibilidade",
        description: "Amplia controle sobre demanda e geração.",
      },
      {
        icon: Building2,
        label: "Descarbonização",
        description: "Apoia metas energéticas mais sustentáveis.",
      },
    ],
    cta: "Ver Reenergisa",
    image: reenergisaImage,
    imageAlt: "Fachada de edifício corporativo da Energisa.",
  },
  {
    title: "ESgas",
    eyebrow: "Novidade",
    intro:
      "A ESgas amplia o ecossistema Energisa para a distribuição de gás canalizado, fortalecendo a infraestrutura energética no Espírito Santo.",
    highlights: [
      {
        icon: ShieldCheck,
        label: "Segurança",
        description: "Opera a rede com foco em confiabilidade.",
      },
      {
        icon: Network,
        label: "Expansão",
        description: "Amplia cobertura para novos territórios.",
      },
      {
        icon: Factory,
        label: "Atendimento próximo",
        description: "Apoia indústrias e comércios no dia a dia.",
      },
      {
        icon: Flame,
        label: "Transição eficiente",
        description: "Integra gás à evolução energética regional.",
      },
    ],
    cta: "Ver ESgas",
    image: esgasImage,
    imageAlt: "Técnico da ESgas operando equipamentos de distribuição de gás.",
  },
];

function EcosystemButton({ children }: { children: React.ReactNode }) {
  return (
    <motion.button
      type="button"
      className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-[4px] bg-[#121312] px-8 py-4 text-[16px] font-medium text-[#fdfdfc]"
      style={{ fontFamily: "Sora, sans-serif" }}
      whileHover={{ ...liftHover, backgroundColor: "#20221f" }}
      whileTap={pressTap}
    >
      <span>{children}</span>
      <ArrowUpRight size={24} strokeWidth={2} aria-hidden="true" />
    </motion.button>
  );
}

function EcosystemSlide({
  card,
  index,
  isLast,
}: {
  card: EcosystemCard;
  index: number;
  isLast: boolean;
}) {
  const slideRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: slideRef,
    offset: ["start start", "end start"],
  });

  const scaleRaw = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.94, 0.88]);
  const yRaw = useTransform(scrollYProgress, [0, 0.5, 1], [0, -20, -58]);
  const imageScaleRaw = useTransform(scrollYProgress, [0, 1], [1, 1.045]);
  const imageYRaw = useTransform(scrollYProgress, [0, 1], [0, -18]);
  const scrollResponse = { ...motionTransition.scrollSpring, stiffness: 1000, damping: 80, mass: 0.18 };
  const scale = useSpring(scaleRaw, scrollResponse);
  const y = useSpring(yRaw, scrollResponse);
  const imageScale = useSpring(imageScaleRaw, scrollResponse);
  const imageY = useSpring(imageYRaw, scrollResponse);

  return (
    <section
      ref={slideRef}
      className={cn("relative flex min-h-[87svh] justify-center", !isLast && "mb-0")}
    >
      <motion.div
        style={{
          scale: shouldReduceMotion ? 1 : scale,
          y: shouldReduceMotion ? 0 : y,
        }}
        initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.92, y: 48 }}
        whileInView="visible"
        viewport={motionViewport}
        variants={{
          visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
              type: "spring",
              stiffness: 180,
              damping: 24,
              mass: 0.5,
            },
          },
        }}
        className="sticky top-[4svh] flex h-[85svh] w-full items-center px-3 py-0 md:px-5"
      >
        <div className="relative mx-auto grid h-full w-full max-w-[1440px] grid-cols-1 items-center gap-8 px-5 py-8 md:grid-cols-12 md:gap-8 md:px-12 md:py-10">
          <div
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
                  className="text-[18px] leading-[1.55] md:text-[20px]"
                  style={{
                    fontFamily: "Sora, sans-serif",
                    color: "rgba(18, 19, 18, 0.48)",
                  }}
                >
                  <p>{card.intro}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  {card.highlights.map((highlight) => {
                    const Icon = highlight.icon;

                    return (
                      <div
                        key={highlight.label}
                        className="pr-4 pb-1"
                      >
                        <div className="mb-3 inline-flex text-[#121312]">
                          <Icon size={18} strokeWidth={2} aria-hidden="true" />
                        </div>

                        <div className="space-y-1">
                          <p
                            className="text-[14px] leading-none text-[#121312] md:text-[15px]"
                            style={{ fontFamily: "Sora, sans-serif", fontWeight: 500 }}
                          >
                            {highlight.label}
                          </p>
                          <p
                            className="text-[13px] leading-[1.45] text-[#121312]/58 md:text-[14px]"
                            style={{ fontFamily: "Sora, sans-serif" }}
                          >
                            {highlight.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <EcosystemButton>{card.cta}</EcosystemButton>
          </div>

          <motion.div
            style={{
              scale: shouldReduceMotion ? 1 : imageScale,
              y: shouldReduceMotion ? 0 : imageY,
            }}
            className="relative z-10 h-[48svh] overflow-hidden rounded-none md:col-span-7 md:h-[633px]"
          >
            <div className="h-full w-full cursor-pointer">
              <img
                src={card.image}
                alt={card.imageAlt}
                className="h-full w-full object-cover"
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function MobileEcosystemCard({
  card,
  index,
}: {
  card: EcosystemCard;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ type: "spring", stiffness: 200, damping: 26, mass: 0.5 }}
      className="flex flex-col"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <img
          src={card.image}
          alt={card.imageAlt}
          className="h-full w-full object-cover"
          loading={index === 0 ? "eager" : "lazy"}
          decoding="async"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-6 px-5 pt-7 pb-2">
        <div className="flex flex-col items-start gap-3">
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
              fontSize: "32px",
              fontWeight: 400,
              lineHeight: 1.18,
              color: "#000000",
              letterSpacing: "-0.035em",
            }}
          >
            {card.title}
          </h2>
        </div>

        <p
          className="text-[16px] leading-[1.55]"
          style={{
            fontFamily: "Sora, sans-serif",
            color: "rgba(18, 19, 18, 0.48)",
          }}
        >
          {card.intro}
        </p>

        <div className="grid grid-cols-2 gap-3">
          {card.highlights.map((highlight) => {
            const Icon = highlight.icon;
            return (
              <div key={highlight.label} className="pr-2 pb-1">
                <div className="mb-2 inline-flex text-[#121312]">
                  <Icon size={16} strokeWidth={2} aria-hidden="true" />
                </div>
                <div className="space-y-0.5">
                  <p
                    className="text-[13px] leading-none text-[#121312]"
                    style={{ fontFamily: "Sora, sans-serif", fontWeight: 500 }}
                  >
                    {highlight.label}
                  </p>
                  <p
                    className="text-[12px] leading-[1.45] text-[#121312]/58"
                    style={{ fontFamily: "Sora, sans-serif" }}
                  >
                    {highlight.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <EcosystemButton>{card.cta}</EcosystemButton>
      </div>
    </motion.article>
  );
}

export function Ecossistema() {
  return (
    <section id="ecossistema" className="relative overflow-hidden bg-white pt-3 pb-0 md:pt-5 md:pb-0" style={{ scrollMarginTop: "80px" }}>
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

      {/* Desktop: sticky scroll cards */}
      <div className="relative z-10 hidden md:block">
        {ECOSYSTEM_CARDS.map((card, index) => (
          <EcosystemSlide
            key={card.title}
            card={card}
            index={index}
            isLast={index === ECOSYSTEM_CARDS.length - 1}
          />
        ))}
      </div>

      {/* Mobile: simple vertical stack */}
      <div className="relative z-10 flex flex-col gap-12 py-10 md:hidden">
        {ECOSYSTEM_CARDS.map((card, index) => (
          <MobileEcosystemCard key={card.title} card={card} index={index} />
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
