import { useEffect, useRef, useCallback, useState } from "react"
import createGlobe from "cobe"

const BASE_ANGLE = 108.63;
const TILE = 52;
const SPOTLIGHT_RADIUS = 200;

function GlassMosaic({ mousePos, width, height }: { mousePos: { x: number; y: number } | null; width: number; height: number }) {
  const maskImage = mousePos
    ? `radial-gradient(circle ${SPOTLIGHT_RADIUS}px at ${mousePos.x}px ${mousePos.y}px, black 20%, transparent 100%)`
    : `radial-gradient(circle 0px at -999px -999px, black 0%, transparent 0%)`;

  const cols = Math.ceil(width / TILE);
  const rows = Math.ceil(height / TILE);
  const tiles = [];
  // Use a predictable pseudo-random rotation pattern
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      tiles.push({ col: c, row: r, rotation: ((c * 7 + r * 13) % 4) * 90 });
    }
  }

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden rounded-full"
      style={{ maskImage, WebkitMaskImage: maskImage, zIndex: 10 }}
    >
      {tiles.map(({ col, row, rotation }, i) => (
        <div
          key={i}
          className="absolute backdrop-blur-[4px]"
          style={{
            width: TILE,
            height: TILE,
            left: col * TILE,
            top: row * TILE,
            backgroundImage: `linear-gradient(${BASE_ANGLE + rotation}deg, rgba(246, 248, 237, 0.4) 5%, rgba(218, 218, 214, 0.4) 98%)`,
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        />
      ))}
    </div>
  );
}

interface GlobeCdnProps {
  targetPhi?: number
  targetTheta?: number
  targetScale?: number
  className?: string
}

export function GlobeCdn({
  targetPhi = -0.77,
  targetTheta = 0.31,
  targetScale = 1.8,
  className = "",
}: GlobeCdnProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Live camera state (lerped each frame toward targets)
  const currentPhi = useRef(targetPhi)
  const currentTheta = useRef(targetTheta)
  const currentScale = useRef(targetScale)

  // Target refs — updated by props without re-creating the globe
  // phi = lon × π/180  (negative for western hemisphere)
  // theta = -lat × π/180 (positive for southern hemisphere)
  const targetPhiRef = useRef(targetPhi)
  const targetThetaRef = useRef(targetTheta)
  const targetScaleRef = useRef(targetScale)

  // Drag state
  const pointerStart = useRef<{ x: number; y: number } | null>(null)
  const dragDelta = useRef({ phi: 0, theta: 0 })

  // Sync target refs when props change (tab switch)
  useEffect(() => {
    targetPhiRef.current = targetPhi
    targetThetaRef.current = targetTheta
    targetScaleRef.current = targetScale
  }, [targetPhi, targetTheta, targetScale])

  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null)
  const [globeSize, setGlobeSize] = useState({ width: 0, height: 0 })

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    pointerStart.current = { x: e.clientX, y: e.clientY }
    if (canvasRef.current) canvasRef.current.style.cursor = "grabbing"
  }, [])

  const handlePointerUp = useCallback(() => {
    pointerStart.current = null
    dragDelta.current = { phi: 0, theta: 0 }
    if (canvasRef.current) canvasRef.current.style.cursor = "grab"
  }, [])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect()
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    }
  }, [])

  const handlePointerLeave = useCallback(() => {
    setMousePos(null)
  }, [])

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!pointerStart.current) return
      dragDelta.current = {
        phi: (e.clientX - pointerStart.current.x) / 280,
        theta: (e.clientY - pointerStart.current.y) / 900,
      }
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    window.addEventListener("pointerup", handlePointerUp, { passive: true })
    return () => {
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerup", handlePointerUp)
    }
  }, [handlePointerUp])

  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    let globe: ReturnType<typeof createGlobe> | null = null
    let rafId: number

    function init() {
      const width = canvas.offsetWidth
      if (width === 0 || globe) return

      globe = createGlobe(canvas, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        width,
        height: width,
        phi: targetPhiRef.current,
        theta: targetThetaRef.current,
        scale: targetScaleRef.current,
        dark: 0,
        diffuse: 1.4,
        mapSamples: 16000,
        mapBrightness: 9,
        baseColor: [1, 1, 1],
        markerColor: [0, 0, 0],
        glowColor: [0.94, 0.93, 0.91],
        markers: [],
        arcs: [],
        opacity: 0.85,
      })

      function animate() {
        const LERP = 0.04
        currentPhi.current += (targetPhiRef.current - currentPhi.current) * LERP
        currentTheta.current += (targetThetaRef.current - currentTheta.current) * LERP
        currentScale.current += (targetScaleRef.current - currentScale.current) * LERP

        globe!.update({
          phi: currentPhi.current + dragDelta.current.phi,
          theta: currentTheta.current + dragDelta.current.theta,
          scale: currentScale.current,
        })
        rafId = requestAnimationFrame(animate)
      }
      animate()
      setTimeout(() => { if (canvas) canvas.style.opacity = "1" })
    }

    if (canvas.offsetWidth > 0) {
      init()
    } else {
      const ro = new ResizeObserver((entries) => {
        if (entries[0]?.contentRect.width > 0) {
          ro.disconnect()
          init()
        }
      })
      ro.observe(canvas)
      return () => ro.disconnect()
    }

    return () => {
      cancelAnimationFrame(rafId)
      globe?.destroy()
    }
  }, []) // Globe created once, driven by refs

  return (
    <div 
      className={`relative aspect-square select-none ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        style={{
          width: "100%",
          height: "100%",
          cursor: "grab",
          opacity: 0,
          transition: "opacity 1.2s ease",
          borderRadius: "50%",
          touchAction: "none",
        }}
      />
      {canvasRef.current && (
        <GlassMosaic 
          mousePos={mousePos} 
          width={canvasRef.current.offsetWidth} 
          height={canvasRef.current.offsetHeight} 
        />
      )}
    </div>
  )
}
