"use client";

import { useState, useEffect } from "react";
import svgPaths from "../../imports/Header/svg-exccz6k13i";
import imgButton from "figma:asset/ef92594731423388a0c490d6f715c05317eb5700.png";
import { motion } from "motion/react";

function Logo() {
  return (
    <div className="h-[38px] relative shrink-0 w-[115.93px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute inset-[42.17%_45.3%_21.2%_44.71%]">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.5852 13.9184">
            <path d={svgPaths.p22035800} fill="currentColor" />
          </svg>
        </div>
        <div className="absolute inset-[42.11%_69.3%_21.18%_20.72%]">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.5746 13.9474">
            <path d={svgPaths.p459a300} fill="currentColor" />
          </svg>
        </div>
        <div className="absolute inset-[42.16%_57.34%_21.8%_32.92%]">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.2952 13.6957">
            <path d={svgPaths.p12e93f00} fill="currentColor" />
          </svg>
        </div>
        <div className="absolute inset-[42.24%_25.83%_21.11%_63.76%]">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.0719 13.9273">
            <path d={svgPaths.p18a8b300} fill="currentColor" />
          </svg>
        </div>
        <div className="absolute inset-[42.39%_10.42%_21.41%_81.29%]">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.61278 13.7554">
            <path d={svgPaths.pd22a1c0} fill="currentColor" />
          </svg>
        </div>
        <div className="absolute inset-[42.17%_37.06%_21.81%_56.91%]">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.99685 13.6905">
            <path d={svgPaths.p1d77b700} fill="currentColor" />
          </svg>
        </div>
        <div className="absolute inset-[42.81%_21.03%_21.83%_76.49%]">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.86987 13.4366">
            <path d={svgPaths.p3ca12800} fill="currentColor" />
          </svg>
        </div>
        <div className="absolute inset-[19.52%_59.96%_69.59%_36.47%]">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.13783 4.13968">
            <path d={svgPaths.p11889800} fill="currentColor" />
          </svg>
        </div>
        <div className="absolute inset-[19.61%_71.41%_69.65%_25.92%]">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.09427 4.07846">
            <path d={svgPaths.p22b6c600} fill="currentColor" />
          </svg>
        </div>
        <div className="absolute inset-[19.63%_63.95%_69.63%_33.54%]">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.90426 4.07822">
            <path d={svgPaths.pf9170c0} fill="currentColor" />
          </svg>
        </div>
        <div className="absolute inset-[19.54%_75.14%_69.63%_21.74%]">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.61209 4.11566">
            <path d={svgPaths.pd2ea700} fill="currentColor" />
          </svg>
        </div>
        <div className="absolute inset-[19.68%_67.59%_69.6%_29.29%]">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.61755 4.07341">
            <path d={svgPaths.p3f72aa00} fill="currentColor" />
          </svg>
        </div>
        <div className="absolute inset-[29.06%_76.61%_0_2.25%]">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.5099 26.9564">
            <path d={svgPaths.p38f1df80} fill="currentColor" />
          </svg>
        </div>
        <div className="absolute inset-[0_82.7%_52.24%_1.65%]">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.1386 18.1498">
            <path d={svgPaths.p3b3b8980} fill="currentColor" />
          </svg>
        </div>
        <div className="absolute inset-[42.16%_0_21.06%_90.71%]">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.7701 13.9751">
            <path d={svgPaths.pcc93d80} fill="currentColor" />
          </svg>
        </div>
        <div className="absolute inset-[62.55%_89.77%_0_0]">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.8548 14.2322">
            <path d={svgPaths.p2a81db00} fill="currentColor" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="group relative font-sans font-medium leading-[24px] text-[16px] whitespace-nowrap active:scale-[0.97] transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]"
      style={{ fontFamily: 'var(--font-sora)' }}
    >
      <span className="group-hover:opacity-80 transition-opacity">{children}</span>
      <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-current origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" />
    </a>
  );
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isInTimeline, setIsInTimeline] = useState(false);
  const [isInEcossistema, setIsInEcossistema] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPos = window.scrollY;
          // Scrolled past hero
          setIsScrolled(scrollPos > window.innerHeight - 80);

          // Check if inside Timeline (Dark Section)
          const timeline = document.getElementById('timeline');
          if (timeline) {
            const rect = timeline.getBoundingClientRect();
            setIsInTimeline(rect.top <= 80 && rect.bottom >= 80);
          }

          // Check if inside Ecossistema (light section after timeline)
          const ecossistema = document.getElementById('ecossistema');
          if (ecossistema) {
            const rect = ecossistema.getBoundingClientRect();
            setIsInEcossistema(rect.top <= 80 && rect.bottom >= 80);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determine header appearance
  const headerClasses = isInEcossistema
    ? "backdrop-blur-lg bg-[#FFFFFF]/90 border-b border-black/5 text-neutral-900 shadow-sm"
    : isInTimeline
      ? "backdrop-blur-lg bg-black/40 border-b border-white/10 text-[#fdfdfc] shadow-lg"
      : isScrolled
        ? "backdrop-blur-lg bg-[#FFFFFF]/80 border-b border-black/5 text-neutral-900 shadow-sm"
        : "backdrop-blur-sm bg-black/10 border-b border-transparent text-[#FFFFFF]";

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-20 transition-all duration-300 ease-out ${headerClasses}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="flex items-center justify-between w-full max-w-[1440px] mx-auto px-8 md:px-20">
        <Logo />

        <nav className="flex items-center gap-8">
          <NavLink href="#solucoes">Soluções</NavLink>
          <NavLink href="#impacto">Impacto</NavLink>
          <NavLink href="#ecossistema">Ecossistema</NavLink>
        </nav>

        <button
          onClick={() => document.getElementById('solucoes')?.scrollIntoView({ behavior: 'smooth' })}
          className={`px-8 py-4 rounded-[4px] border font-medium text-[16px] transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.97] hover:bg-white/5 cursor-pointer ${(isScrolled || isInEcossistema) && !isInTimeline
            ? "border-black/20 text-[#20201f] hover:bg-black/5"
            : "border-white/20 text-[#FFFFFF] hover:bg-white/5"
            }`}
          style={{ fontFamily: "Sora, sans-serif" }}
        >
          Serviços
        </button>
      </div>
    </motion.header>
  );
}
