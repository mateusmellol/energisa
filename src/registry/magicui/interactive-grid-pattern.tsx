"use client"

import { useEffect, useMemo, useRef, useState } from "react"

import { cn } from "@/lib/utils"

export interface InteractiveGridPatternProps extends React.SVGProps<SVGSVGElement> {
  width?: number
  height?: number
  x?: number
  y?: number
  className?: string
  squaresClassName?: string
  highlightColor?: string
  strokeColor?: string
  activePoint?: { x: number; y: number } | null
}

export function InteractiveGridPattern({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  className,
  squaresClassName,
  highlightColor = "rgba(255, 255, 255, 0.3)",
  strokeColor = "rgba(255, 255, 255, 0.08)",
  activePoint,
  ...props
}: InteractiveGridPatternProps) {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const element = svgRef.current
    if (!element) {
      return
    }

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const nextWidth = entry.contentRect.width
        const nextHeight = entry.contentRect.height
        setSize((currentSize) =>
          currentSize.width === nextWidth && currentSize.height === nextHeight
            ? currentSize
            : { width: nextWidth, height: nextHeight },
        )
      }
    })

    resizeObserver.observe(element)

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  const { columns, rows } = useMemo(() => {
    if (!size.width || !size.height) {
      return { columns: 0, rows: 0 }
    }

    return {
      columns: Math.ceil((size.width - x) / width) + 2,
      rows: Math.ceil((size.height - y) / height) + 2,
    }
  }, [height, size.height, size.width, width, x, y])

  const activeSquare = useMemo(() => {
    if (!activePoint || !size.width || !size.height) {
      return null
    }

    const nextX = Math.floor((activePoint.x - x) / width)
    const nextY = Math.floor((activePoint.y - y) / height)

    if (nextX < 0 || nextX >= columns || nextY < 0 || nextY >= rows) {
      return null
    }

    return { x: nextX, y: nextY }
  }, [activePoint, columns, rows, width, x, y, size.height, size.width, height])

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      width="100%"
      height="100%"
      className={cn("absolute inset-0 h-full w-full select-none", className)}
      {...props}
    >
      {Array.from({ length: rows }).flatMap((_, row) =>
        Array.from({ length: columns }).map((__, column) => {
          const rectX = x + column * width
          const rectY = y + row * height
          const isActive = activeSquare?.x === column && activeSquare?.y === row

          return (
            <rect
              key={`${row}-${column}`}
              x={rectX}
              y={rectY}
              width={width}
              height={height}
              fill={isActive ? highlightColor : "transparent"}
              stroke={strokeColor}
              strokeWidth="1"
              className={cn("transition-[fill,stroke] duration-150 ease-out", squaresClassName)}
            />
          )
        }),
      )}
    </svg>
  )
}
