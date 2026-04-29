import { lazy, Suspense, useRef } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { Ecossistema } from "./components/Ecossistema";
import { Statistics } from "./components/Statistics";
import { Footer } from "./components/Footer";
import { motion, useScroll, useTransform } from "motion/react";

const TimelineSection = lazy(() =>
  import("./components/Timeline").then((module) => ({
    default: module.TimelineSection,
  })),
);

export default function App() {
  const containerRef = useRef(null);
  const { scrollYProgress: cardProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"]
  });

  const yHero = useTransform(cardProgress, [0, 1], ["0%", "-20%"]);
  const scaleHero = useTransform(cardProgress, [0, 1], [1, 1.05]);

  return (
    <div className="w-full bg-[#121312]">
      <Header />
      {/* Sticky Hero Background */}
      <div className="sticky top-0 h-svh w-full z-0 overflow-hidden">
        <motion.div style={{ y: yHero, scale: scaleHero }} className="h-full w-full">
          <Hero />
        </motion.div>
      </div>

      {/* Main Content "Card" sliding over Hero */}
      <main
        ref={containerRef}
        className="relative z-10 bg-[#FFFFFF] shadow-[0_-40px_80px_rgba(0,0,0,0.3)]"
      >
        <Services />
        <Statistics />
        <Suspense fallback={<section id="timeline" className="min-h-[100svh] bg-[#121312]" />}>
          <TimelineSection />
        </Suspense>
        <Ecossistema />
        <Footer />
      </main>
    </div>
  );
}
