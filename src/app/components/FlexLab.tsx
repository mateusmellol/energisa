import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from "motion/react";
import { ProfileCard } from "./ProfileCard";
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

export function FlexLab() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  // Scroll pinning logic for slide transitions (3 slides = 400vh to have 3 transitions)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Reveal animation that works from both directions (entering from top or bottom)
  const { scrollYProgress: sectionProgress } = useScroll({
    target: containerRef,
    // Tracks from the moment it enters the screen from the bottom (start end)
    // until it leaves the screen from the top (end start)
    offset: ["start end", "end start"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Map scroll progress to slide index with generous buffers
    // 0.0 - 0.4: Stay on Slide 0 (gives "dois scrolls" of time)
    // 0.4 - 0.7: Slide 1
    // 0.7 - 1.0: Slide 2
    const p = latest;
    let newIndex = 0;
    if (p < 0.4) newIndex = 0;
    else if (p < 0.7) newIndex = 1;
    else newIndex = 2;

    if (newIndex !== index) {
      setIndex(newIndex);
    }
  });

  const project = PROJECTS[index];

  // Clip path driven by the section entering and leaving the viewport
  // For a 250vh section:
  // 0.0 to 0.28: entering from bottom (image opens)
  // 0.28 to 0.71: pinned (image stays open)
  // 0.71 to 1.0: leaving to top (image closes)
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
      style={{ height: "250vh", background: "#fdfdfc" }}
    >
      {/* Sticky Viewport Container - starting below the 80px header */}
      <div
        className="sticky top-20 w-full flex flex-col justify-center overflow-hidden bg-[#fdfdfc] px-8 md:px-20"
        style={{ height: "calc(100vh - 80px)" }}
      >
        <div className="max-w-[1440px] mx-auto w-full">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: 100, filter: "blur(20px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -100, filter: "blur(20px)" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-6 md:gap-10 w-full"
            >
              {/* Text Content */}
              <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-start">
                {/* Left Column */}
                <div className="flex flex-col md:w-[420px] shrink-0 gap-8">
                  <div className="flex flex-col gap-3 text-left">
                    <h2
                      style={{
                        fontFamily: "Sora, sans-serif",
                        fontWeight: 400,
                        fontSize: "clamp(32px, 4vw, 49px)",
                        color: "#121312",
                        lineHeight: 1.15,
                      }}
                    >
                      {project.title}
                    </h2>
                    <p
                      style={{
                        fontFamily: "Sora, sans-serif",
                        fontSize: "clamp(15px, 1.3vw, 20px)",
                        color: "#555653",
                        lineHeight: 1.5,
                      }}
                    >
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Navigation & Button */}
                  <div className="flex items-center gap-10 flex-wrap mt-2">
                    <button
                      className="transition-transform active:scale-95"
                      style={{
                        fontFamily: "Sora, sans-serif",
                        fontSize: "16px",
                        color: "#fdfdfc",
                        background: "#121312",
                        border: "none",
                        padding: "14px 32px",
                        cursor: "pointer",
                        borderRadius: "2px",
                        minWidth: 157,
                      }}
                    >
                      Conhecer
                    </button>
                    
                    <div className="flex gap-2.5 items-center">
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
                            background: i === index ? "#121312" : "#dadad6",
                            transition: "all 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
                            border: "none",
                            cursor: "pointer",
                            padding: 0
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="flex-1">
                  <div className="flex flex-col gap-10 text-left ml-auto max-w-[600px]">
                    <p
                      style={{
                        fontFamily: "Sora, sans-serif",
                        fontSize: "clamp(16px, 1.5vw, 20px)",
                        color: "#3b3b39",
                        lineHeight: 1.6,
                      }}
                    >
                      {project.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8">
                      {BENEFITS.map((benefit, i) => (
                        <ProfileCard key={i} icon={benefit.icon} label={benefit.label} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Image Container */}
              <motion.div
                ref={imageRef}
                className="w-full rounded-sm overflow-hidden"
                style={{
                  height: "min(360px, 30vw)",
                  background: project.color,
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
