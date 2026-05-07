import { useRef } from "react"
import { motion } from "motion/react"
import { DottedSurface } from "@/components/ui/dotted-surface"
import { ArrowUpRight } from "lucide-react"
import { liftHover, motionTransition, pressTap } from "@/lib/motion"

function scrollToEditais() {
  const target = document.getElementById("editais") ?? document.getElementById("solucoes")
  target?.scrollIntoView({ behavior: "smooth" })
}

export function FooterCTA() {
  const sectionRef = useRef<HTMLElement | null>(null)

  return (
    <section
      id="footer-cta"
      ref={sectionRef}
      className="relative isolate overflow-hidden border-y border-white/[0.06] bg-[#090b09]"
      style={{ scrollSnapAlign: "start" }}
    >
      <div aria-hidden="true" className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-[#090b09] z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
        <DottedSurface className="absolute inset-0 z-30" />
        <div className="absolute inset-0 z-40 bg-[radial-gradient(circle_at_center,transparent_24%,rgba(9,11,9,0.34)_62%,rgba(9,11,9,0.92)_100%)] pointer-events-none" />
        <div className="absolute inset-0 z-50 bg-[linear-gradient(180deg,rgba(9,11,9,0.22)_0%,transparent_14%,transparent_86%,rgba(9,11,9,0.44)_100%)] pointer-events-none" />
      </div>

      <div className="relative z-60 mx-auto flex min-h-[504px] w-full max-w-[1440px] flex-col items-center justify-center px-5 py-22 text-center md:min-h-[630px] md:px-20 pointer-events-none">
        <h4
          className="max-w-[620px] text-[#f6f8ed]"
          style={{
            fontFamily: "Sora, sans-serif",
            fontSize: "clamp(28px, 3.8vw, 54px)",
            fontWeight: 500,
            letterSpacing: "-0.03em",
            lineHeight: 1.08,
          }}
        >
          Vamos juntos <br /> mudar o futuro
        </h4>
        <motion.button
          onClick={scrollToEditais}
          className="mt-10 inline-flex min-h-[52px] cursor-pointer items-center gap-3 rounded-[4px] bg-[#D4EC28] px-8 text-[#20201f] pointer-events-auto"
          style={{ fontFamily: "Sora, sans-serif" }}
          type="button"
          initial="rest"
          whileHover="hover"
          whileTap="tap"
          variants={{
            rest: { y: 0, scale: 1, backgroundColor: "#D4EC28" },
            hover: { ...liftHover, backgroundColor: "#e3f654" },
            tap: pressTap,
          }}
        >
          <span className="text-[16px] font-semibold">Editais</span>
          <motion.span
            aria-hidden="true"
            className="inline-flex"
            variants={{
              hover: { x: 2, y: -2, transition: motionTransition.fast },
            }}
          >
            <ArrowUpRight className="h-5 w-5" strokeWidth={2} />
          </motion.span>
        </motion.button>
      </div>
    </section>
  )
}
