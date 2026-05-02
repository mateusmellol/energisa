import { type PointerEvent, useRef, useState } from "react"
import { FlickeringGrid } from "@/registry/magicui/flickering-grid"
import { InteractiveGridPattern } from "@/registry/magicui/interactive-grid-pattern"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

function scrollToEditais() {
  const target = document.getElementById("editais") ?? document.getElementById("solucoes")
  target?.scrollIntoView({ behavior: "smooth" })
}

export function FooterCTA() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [pointer, setPointer] = useState<{ x: number; y: number } | null>(null)

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    const rect = sectionRef.current?.getBoundingClientRect()

    if (!rect) {
      return
    }

    setPointer({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    })
  }

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden border-y border-white/[0.06] bg-[#090b09]"
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setPointer(null)}
      style={{ scrollSnapAlign: "start" }}
    >
      <div aria-hidden="true" className="absolute inset-0 z-0 pointer-events-none">
        <InteractiveGridPattern
          width={80}
          height={80}
          highlightColor="rgba(212, 236, 40, 0.18)"
          strokeColor="rgba(255, 255, 255, 0.06)"
          activePoint={pointer}
          className={cn("relative z-0 opacity-55", "h-full w-full")}
        />
        <FlickeringGrid
          squareSize={4}
          gridGap={6}
          color="#6B7280"
          maxOpacity={0.05}
          flickerChance={0.01}
          width={800}
          height={800}
          className="absolute inset-0 z-30 h-full w-full opacity-35"
        />
        <div className="absolute inset-0 z-40 bg-[radial-gradient(circle_at_center,transparent_24%,rgba(9,11,9,0.34)_62%,rgba(9,11,9,0.92)_100%)]" />
        <div className="absolute inset-0 z-50 bg-[linear-gradient(180deg,rgba(9,11,9,0.22)_0%,transparent_14%,transparent_86%,rgba(9,11,9,0.44)_100%)]" />
      </div>

      <div className="relative z-60 mx-auto flex min-h-[500px] w-full max-w-[1440px] flex-col items-center justify-center px-5 py-28 text-center md:min-h-[620px] md:px-20">
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
          Vamos juntos mudar o futuro
        </h4>
        <button
          onClick={scrollToEditais}
          className="group mt-10 inline-flex min-h-[52px] items-center gap-3 rounded-[4px] bg-[#D4EC28] px-6 text-[#20201f] shadow-[0_0_32px_rgba(212,236,40,0.26),inset_0_1px_0_rgba(255,255,255,0.34)] transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[#e3f654] hover:shadow-[0_0_46px_rgba(212,236,40,0.42),inset_0_1px_0_rgba(255,255,255,0.42)] active:scale-[0.97]"
          style={{ fontFamily: "Sora, sans-serif" }}
          type="button"
        >
          <span className="text-[16px] font-semibold">Ver Editais</span>
          <ArrowUpRight
            aria-hidden="true"
            className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={2}
          />
        </button>
      </div>
    </section>
  )
}
