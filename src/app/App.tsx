import { lazy, Suspense, useEffect } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { Statistics } from "./components/Statistics";
import { FooterCTA } from "./components/FooterCTA";
import { Footer } from "./components/Footer";
import Lenis from "lenis";

const TimelineSection = lazy(() =>
  import("./components/Timeline").then((module) => ({
    default: module.TimelineSection,
  })),
);

const Ecossistema = lazy(() =>
  import("./components/Ecossistema").then((module) => ({
    default: module.Ecossistema,
  })),
);

const Noticias = lazy(() =>
  import("./components/Noticias").then((module) => ({
    default: module.Noticias,
  })),
);

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      gestureOrientation: "vertical",
      normalizeWheel: true,
    });

    let rafId: number | null = null;
    let idleTimeout: ReturnType<typeof setTimeout>;

    function wakeUp() {
      if (rafId === null) {
        rafId = requestAnimationFrame(raf);
      }
      clearTimeout(idleTimeout);
      idleTimeout = setTimeout(() => {
        if (rafId !== null) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      }, 300);
    }

    function raf(time: number) {
      lenis.raf(time);
      if (rafId !== null) {
        rafId = requestAnimationFrame(raf);
      }
    }

    wakeUp();
    lenis.on("scroll", wakeUp);

    const interactions = ["wheel", "touchstart", "touchmove", "keydown", "mousedown"];
    interactions.forEach((e) => window.addEventListener(e, wakeUp, { passive: true }));

    return () => {
      lenis.destroy();
      if (rafId !== null) cancelAnimationFrame(rafId);
      clearTimeout(idleTimeout);
      interactions.forEach((e) => window.removeEventListener(e, wakeUp));
    };
  }, []);

  return (
    <div className="w-full bg-white">
      <Header />

      <div className="relative bg-white">
        <div className="sticky top-0 z-0 h-[100svh] min-h-[760px] overflow-hidden bg-white">
          <Hero />
        </div>

        <main className="relative z-10 bg-transparent">
          <Services />
          <div className="bg-white">
            <Statistics />
            <Suspense fallback={<section id="timeline" className="min-h-[100svh] bg-[#121312]" />}>
              <TimelineSection />
            </Suspense>
            <Suspense fallback={<section id="ecossistema" className="min-h-[300svh] bg-white" />}>
              <Ecossistema />
            </Suspense>
            <Suspense fallback={<section id="noticias" className="min-h-[70svh] bg-[#f2f2f2]" />}>
              <Noticias />
            </Suspense>
            <FooterCTA />
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
}
