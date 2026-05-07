"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { EnergisaLogo } from "./EnergisaLogo";
import { NAV_LINKS, getSectionId, scrollToSection } from "./navigation";
import { liftHover, motionTransition, pressTap } from "@/lib/motion";

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToSection(getSectionId(href));
  };

  return (
    <motion.a
      href={href}
      onClick={handleClick}
      className="relative font-sans font-medium leading-[24px] text-[16px] whitespace-nowrap"
      style={{ fontFamily: 'var(--font-sora)' }}
      whileHover={{ opacity: 0.8 }}
      whileTap={pressTap}
    >
      <span>{children}</span>
    </motion.a>
  );
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkSection, setIsDarkSection] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const headerTheme = isDarkSection
    ? {
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        borderColor: "rgba(255, 255, 255, 0.1)",
        color: "#fdfdfc",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.18)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
      }
    : isScrolled
      ? {
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          borderColor: "rgba(0, 0, 0, 0.05)",
          color: "#171717",
          boxShadow: "0 8px 24px rgba(15, 15, 15, 0.06)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
        }
      : {
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderColor: "rgba(0, 0, 0, 0.05)",
          color: "#171717",
          boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        };

  const ctaTheme = isDarkSection
    ? {
        borderColor: "rgba(255, 255, 255, 0.2)",
        color: "#FFFFFF",
      }
    : {
        borderColor: "rgba(0, 0, 0, 0.2)",
        color: "#20201f",
      };

  const mobileIconTheme = {
    color: isDarkSection ? "#FFFFFF" : "#20201f",
  };

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

  const isLight = !isDarkSection;

  return (
    <>
      <AnimatePresence initial={false}>
        <motion.header
          key="site-header"
          initial={false}
          animate={{ y: 0, opacity: 1, ...headerTheme }}
          exit={{ y: -96, opacity: 0 }}
          transition={{ ...motionTransition.layout, duration: 0.25 }}
          className="fixed top-0 left-0 right-0 z-50 flex h-20 items-center justify-between border-b"
        >
        <div className="flex items-center justify-between w-full max-w-[1440px] mx-auto px-5 md:px-20">
          <motion.button
            onClick={() => scrollToSection("hero")}
            className="cursor-pointer outline-none"
            aria-label="Voltar para o topo"
            whileHover={{ opacity: 0.8 }}
            whileTap={pressTap}
          >
            <EnergisaLogo />
          </motion.button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.href} href={link.href}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop CTA */}
          <motion.button
            onClick={() => document.getElementById('solucoes')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            className="hidden md:inline-flex px-8 py-4 rounded-[4px] border font-medium text-[16px] cursor-pointer"
            style={{ fontFamily: "Sora, sans-serif" }}
            animate={ctaTheme}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ ...liftHover, backgroundColor: isLight ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.05)" }}
            whileTap={pressTap}
          >
            Serviços
          </motion.button>

          {/* Mobile hamburger */}
          <motion.button
            className="md:hidden flex items-center justify-center w-11 h-11"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Abrir menu"
            animate={mobileIconTheme}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            whileTap={pressTap}
          >
            {mobileOpen
              ? <X size={24} />
              : <Menu size={24} />
            }
          </motion.button>
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
            transition={motionTransition.fast}
            className="fixed top-20 left-0 right-0 z-40 bg-white border-b border-black/10 shadow-lg md:hidden"
          >
            <div className="flex flex-col px-5 py-6 gap-1">
              {NAV_LINKS.map((link) => (
                <motion.button
                  key={link.href}
                  onClick={() => scrollTo(getSectionId(link.href))}
                  className="flex items-center min-h-[44px] text-[18px] font-medium text-neutral-900 text-left"
                  style={{ fontFamily: "Sora, sans-serif" }}
                  whileTap={pressTap}
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.button
                onClick={() => scrollTo("solucoes")}
                className="mt-4 w-full min-h-[52px] rounded-[4px] border border-black/20 font-medium text-[16px] text-[#20201f]"
                style={{ fontFamily: "Sora, sans-serif" }}
                whileTap={pressTap}
              >
                Serviços
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
