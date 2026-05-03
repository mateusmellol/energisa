"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { EnergisaLogo } from "./EnergisaLogo";
import { NAV_LINKS, getSectionId, scrollToSection } from "./navigation";

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToSection(getSectionId(href));
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className="group relative font-sans font-medium leading-[24px] text-[16px] whitespace-nowrap active:scale-[0.97] transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]"
      style={{ fontFamily: 'var(--font-sora)' }}
    >
      <span className="group-hover:opacity-80 transition-opacity">{children}</span>
    </a>
  );
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkSection, setIsDarkSection] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (id: string) => {
    scrollToSection(id);
    setMobileOpen(false);
  };

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPos = window.scrollY;
          // Scrolled past hero
          setIsScrolled(scrollPos > window.innerHeight - 80);

          // Check if inside any dark section (Timeline or Footer CTA)
          const timeline = document.getElementById('timeline');
          const footerCTA = document.getElementById('footer-cta');
          
          const timelineRect = timeline?.getBoundingClientRect();
          const footerRect = footerCTA?.getBoundingClientRect();

          const isInsideTimeline = Boolean(timelineRect && timelineRect.top <= 80 && timelineRect.bottom >= 80);
          const isInsideFooter = Boolean(footerRect && footerRect.top <= 80);

          setIsDarkSection(isInsideTimeline || isInsideFooter);

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
  const headerClasses = isDarkSection
    ? "backdrop-blur-lg bg-black/40 border-b border-white/10 text-[#fdfdfc] shadow-lg"
    : isScrolled
      ? "backdrop-blur-lg bg-[#FFFFFF]/80 border-b border-black/5 text-neutral-900 shadow-sm"
      : "backdrop-blur-sm bg-black/10 border-b border-white/10 text-[#FFFFFF]";

  const isLight = isScrolled && !isDarkSection;

  return (
    <>
      <AnimatePresence initial={false}>
        <motion.header
          key="site-header"
          initial={false}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -96, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-20 transition-all duration-300 ease-out ${headerClasses}`}
        >
        <div className="flex items-center justify-between w-full max-w-[1440px] mx-auto px-5 md:px-20">
          <button
            onClick={() => scrollToSection("hero")}
            className="transition-all duration-300 hover:opacity-80 active:scale-95 cursor-pointer outline-none"
            aria-label="Voltar para o topo"
          >
            <EnergisaLogo />
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.href} href={link.href}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop CTA */}
          <button
            onClick={() => document.getElementById('solucoes')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            className={`hidden md:inline-flex px-8 py-4 rounded-[4px] border font-medium text-[16px] transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.97] cursor-pointer ${isLight
              ? "border-black/20 text-[#20201f] hover:bg-black/5"
              : "border-white/20 text-[#FFFFFF] hover:bg-white/5"
              }`}
            style={{ fontFamily: "Sora, sans-serif" }}
          >
            Serviços
          </button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex items-center justify-center w-11 h-11"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Abrir menu"
          >
            {mobileOpen
              ? <X size={24} className={isLight ? "text-[#20201f]" : "text-white"} />
              : <Menu size={24} className={isLight ? "text-[#20201f]" : "text-white"} />
            }
          </button>
        </div>
        </motion.header>
      </AnimatePresence>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="fixed top-20 left-0 right-0 z-40 bg-white border-b border-black/10 shadow-lg md:hidden"
          >
            <div className="flex flex-col px-5 py-6 gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(getSectionId(link.href))}
                  className="flex items-center min-h-[44px] text-[18px] font-medium text-neutral-900 text-left"
                  style={{ fontFamily: "Sora, sans-serif" }}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => scrollTo("solucoes")}
                className="mt-4 w-full min-h-[52px] rounded-[4px] border border-black/20 font-medium text-[16px] text-[#20201f] transition-all active:scale-[0.97]"
                style={{ fontFamily: "Sora, sans-serif" }}
              >
                Serviços
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
