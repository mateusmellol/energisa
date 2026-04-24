import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from "motion/react";
import { ProfileCard } from "./ProfileCard";
import { TextAnimate } from "@/registry/magicui/text-animate";
import { Zap, Leaf, ShieldCheck, Cpu, Globe, Activity } from "lucide-react";

const PROJECTS = [
  {
    id: "smart-grid",
    title: "Inovação que nasce da energia",
    subtitle: "O laboratório de inovação do Grupo Energisa",
    description: "O FlexLab desenvolve soluções em energia renovável, eficiência energética e smart grid",
    color: "#121312",
    overlay: "linear-gradient(to top right, rgba(11,207,129,0.12), transparent 60%)"
  },
  {
    id: "renovavel",
    title: "O futuro é renovável",
    subtitle: "Expandindo a matriz energética limpa",
    description: "Desenvolvemos projetos de geração solar e eólica de alta performance para o mercado nacional",
    color: "#0B2D1D",
    overlay: "linear-gradient(to top right, rgba(234,254,31,0.1), transparent 60%)"
  },
  {
    id: "eficiencia",
    title: "Eficiência em cada watt",
    subtitle: "Reduzindo perdas e otimizando consumo",
    description: "Tecnologia de ponta para gestão inteligente de energia em grandes indústrias e redes complexas",
    color: "#1A1B1A",
    overlay: "linear-gradient(to top right, rgba(101,244,41,0.1), transparent 60%)"
  }
];

const BENEFITS = [
  { icon: Zap, label: "Smart Grid" },
  { icon: Leaf, label: "Energia Limpa" },
  { icon: ShieldCheck, label: "Eficiência" },
  { icon: Cpu, label: "Inovação" },
  { icon: Globe, label: "Sustentabilidade" },
  { icon: Activity, label: "Monitoramento" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

// Returns motion props for a blur-up reveal gated by inView
function blurUp(inView: boolean, delay = 0) {
  return {
    initial: { opacity: 0, y: 10, filter: "blur(8px)" },
    animate: inView
      ? { opacity: 1, y: 0, filter: "blur(0px)" }
      : { opacity: 0, y: 10, filter: "blur(8px)" },
    transition: { duration: 0.65, ease: EASE, delay },
  };
}

export function FlexLab() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [inView, setInView] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const { scrollYProgress: sectionProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  useMotionValueEvent(sectionProgress, "change", (latest) => {
    if (!inView && latest >= 0.2) setInView(true);
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const p = latest;
    let newIndex = 0;
    if (p < 0.4) newIndex = 0;
    else if (p < 0.7) newIndex = 1;
    else newIndex = 2;
    if (newIndex !== index) setIndex(newIndex);
  });

  const project = PROJECTS[index];

  const clipPath = useTransform(
    sectionProgress,
    [0, 0.28, 0.71, 1],
    [
      "inset(0% 50% 0% 50%)",
      "inset(0% 0% 0% 0%)",
      "inset(0% 0% 0% 0%)",
      "inset(0% 50% 0% 50%)"
    ]
  );

  return (
    <section
      id="ecossistema"
      ref={containerRef}
      className="relative w-full"
      style={{ height: "250vh", background: "#F6F8ED" }}
    >
      <div
        className="sticky top-20 w-full flex flex-col justify-center overflow-hidden bg-[#F6F8ED] px-8 md:px-20"
        style={{ height: "calc(100vh - 80px)" }}
      >
        <div className="max-w-[1440px] mx-auto w-full">

          <AnimatePresence mode="wait">
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: 100, filter: "blur(20px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -100, filter: "blur(20px)" }}
              transition={{ duration: 0.45, ease: EASE }}
              className="flex flex-col gap-6 md:gap-10 w-full"
            >
              {/* Text Content */}
              <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-start">

                {/* Left Column */}
                <div className="flex flex-col md:w-[420px] shrink-0 gap-8">
                  <div className="flex flex-col gap-3 text-left">

                    {/* H2 — by character */}
                    <h2
                      style={{
                        fontFamily: "Sora, sans-serif",
                        fontWeight: 400,
                        fontSize: "clamp(32px, 4vw, 49px)",
                        color: "#121312",
                        lineHeight: 1.15,
                      }}
                    >
                      {inView ? (
                        <TextAnimate
                          animation="blurInUp"
                          by="character"
                          duration={0.55}
                          stagger={0.022}
                        >
                          {project.title}
                        </TextAnimate>
                      ) : (
                        <span style={{ opacity: 0 }}>{project.title}</span>
                      )}
                    </h2>

                    {/* Subtitle — by word */}
                    <p
                      style={{
                        fontFamily: "Sora, sans-serif",
                        fontSize: "clamp(15px, 1.3vw, 20px)",
                        color: "#555653",
                        lineHeight: 1.5,
                      }}
                    >
                      {inView ? (
                        <TextAnimate
                          animation="blurInUp"
                          by="word"
                          duration={0.55}
                          stagger={0.09}
                          delay={0.3}
                        >
                          {project.subtitle}
                        </TextAnimate>
                      ) : (
                        <span style={{ opacity: 0 }}>{project.subtitle}</span>
                      )}
                    </p>
                  </div>

                  {/* Button + dots */}
                  <div className="flex items-center gap-10 flex-wrap mt-2">
                    <motion.button
                      {...blurUp(inView, 0.5)}
                      className="transition-all active:scale-95 hover:bg-white/5"
                      style={{
                        fontFamily: "Sora, sans-serif",
                        fontSize: "16px",
                        color: "#121312",
                        background: "transparent",
                        border: "1px solid rgba(18, 19, 18, 0.3)",
                        padding: "14px 32px",
                        cursor: "pointer",
                        borderRadius: "4px",
                        minWidth: 157,
                      }}
                    >
                      Conhecer
                    </motion.button>

                    <motion.div {...blurUp(inView, 0.55)} className="flex gap-2.5 items-center">
                      {PROJECTS.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            const section = containerRef.current;
                            if (!section) return;
                            const scrollPos = section.offsetTop + (i / PROJECTS.length) * section.offsetHeight;
                            window.scrollTo({ top: scrollPos + 50, behavior: "smooth" });
                          }}
                          style={{
                            height: 6,
                            width: i === index ? 32 : 6,
                            borderRadius: 3,
                            background: i === index ? "#121312" : "rgba(18,19,18,0.2)",
                            transition: "all 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
                            border: "none",
                            cursor: "pointer",
                            padding: 0
                          }}
                        />
                      ))}
                    </motion.div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="flex-1">
                  <div className="flex flex-col gap-10 text-left ml-auto max-w-[600px]">

                    {/* Description — by word */}
                    <p
                      style={{
                        fontFamily: "Sora, sans-serif",
                        fontSize: "clamp(16px, 1.5vw, 20px)",
                        color: "#333432",
                        lineHeight: 1.6,
                      }}
                    >
                      {inView ? (
                        <TextAnimate
                          animation="blurInUp"
                          by="word"
                          duration={0.55}
                          stagger={0.07}
                          delay={0.25}
                        >
                          {project.description}
                        </TextAnimate>
                      ) : (
                        <span style={{ opacity: 0 }}>{project.description}</span>
                      )}
                    </p>

                    {/* Benefits — staggered per icon */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8 text-[#555653]">
                      {BENEFITS.map((benefit, i) => (
                        <motion.div key={i} {...blurUp(inView, 0.4 + i * 0.07)}>
                          <ProfileCard icon={benefit.icon} label={benefit.label} />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Image */}
              <motion.div
                ref={imageRef}
                className="w-full rounded-sm overflow-hidden"
                style={{
                  height: "min(360px, 30vw)",
                  background: "#e6e7e4",
                  position: "relative",
                  clipPath: clipPath,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: project.overlay,
                  }}
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
