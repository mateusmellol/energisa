"use client"

import { useId, useMemo } from "react"

import { cn } from "@/lib/utils"

export interface FlickeringGridProps extends React.SVGProps<SVGSVGElement> {
  squareSize?: number
  gridGap?: number
  color?: string
  maxOpacity?: number
  flickerChance?: number
  width?: number
  height?: number
}

type FlickerCell = {
  id: string
  flickers: boolean
  delay: number
  duration: number
  opacity: number
}

const CELL_COUNT = 180

export function FlickeringGrid({
  squareSize = 4,
  gridGap = 6,
  color = "#6B7280",
  maxOpacity = 0.5,
  flickerChance = 0.1,
  width = 800,
  height = 800,
  className,
  ...props
}: FlickeringGridProps) {
  const blurId = useId()
  const columns = Math.ceil(width / (squareSize + gridGap))
  const rows = Math.ceil(height / (squareSize + gridGap))
  const cellsToRender = Math.min(CELL_COUNT, columns * rows)

  const cells = useMemo<FlickerCell[]>(
    () =>
      Array.from({ length: cellsToRender }, (_, index) => ({
        id: `${index}`,
        flickers: Math.random() < flickerChance,
        delay: Math.random() * 3,
        duration: 1.8 + Math.random() * 2.8,
        opacity: Math.random() * maxOpacity,
      })),
    [cellsToRender, flickerChance, maxOpacity],
  )

  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      width="100%"
      height="100%"
      className={cn("absolute inset-0 h-full w-full pointer-events-none", className)}
      {...props}
    >
      <defs>
        <filter id={blurId}>
          <feGaussianBlur stdDeviation="0.2" />
        </filter>
      </defs>

      {cells.map((cell, index) => {
        const column = index % columns
        const row = Math.floor(index / columns)
        const x = column * (squareSize + gridGap)
        const y = row * (squareSize + gridGap)
        const baseOpacity = cell.flickers ? Math.max(0.01, cell.opacity) : cell.opacity * 0.08

        return (
          <rect
            key={cell.id}
            x={x}
            y={y}
            width={squareSize}
            height={squareSize}
            fill={color}
            filter={`url(#${blurId})`}
            opacity={baseOpacity}
            style={{
              animationDuration: `${cell.duration}s`,
              animationDelay: `${cell.delay}s`,
              animationIterationCount: "infinite",
              animationName: "flickerOpacity",
              animationTimingFunction: "ease-in-out",
            }}
          />
        )
      })}

      <style>{`
        @keyframes flickerOpacity {
          0%, 100% { opacity: 0.015; }
          50% { opacity: 0.06; }
        }
      `}</style>
    </svg>
  )
}
