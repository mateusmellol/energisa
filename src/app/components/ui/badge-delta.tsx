import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "./utils"
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
} from "lucide-react"

const badgeDeltaVariants = cva(
  "inline-flex items-center text-xs font-semibold",
  {
    variants: {
      variant: {
        outline:
          "gap-x-1 rounded-md px-2 py-1 ring-1 ring-inset ring-border",
        solid: "gap-x-1 rounded-full px-2.5 py-1 backdrop-blur-md",
        solidOutline:
          "gap-x-1 rounded-md px-2 py-1 ring-1 ring-inset",
        complex:
          "space-x-2.5 rounded-lg bg-tremor-background py-1 pl-2.5 pr-1 ring-1 ring-inset ring-gray-200 dark:ring-gray-800 dark:bg-dark-tremor-background",
      },
      deltaType: {
        increase: "",
        decrease: "",
        neutral: "",
      },
      iconStyle: {
        filled: "",
        line: "",
      },
    },
    compoundVariants: [
      {
        deltaType: "increase",
        variant: "outline",
        className: "text-emerald-700 dark:text-emerald-500",
      },
      {
        deltaType: "decrease",
        variant: "outline",
        className: "text-red-700 dark:text-red-500",
      },
      {
        deltaType: "neutral",
        variant: "outline",
        className: "text-gray-700 dark:text-gray-400",
      },
      // Solid variants
      {
        deltaType: "increase",
        variant: "solid",
        className:
          "bg-white/10 text-[#f6f8ed] border border-white/10 backdrop-blur-md",
      },
      {
        deltaType: "decrease",
        variant: "solid",
        className:
          "bg-red-500/30 text-red-50 border border-red-400/20 backdrop-blur-md dark:bg-red-500/30 dark:text-red-100",
      },
      {
        deltaType: "neutral",
        variant: "solid",
        className:
          "bg-gray-500/30 text-gray-50 border border-gray-400/20 backdrop-blur-md dark:bg-gray-500/30 dark:text-gray-100",
      },
      // Solid outline variants
      {
        deltaType: "increase",
        variant: "solidOutline",
        className:
          "bg-emerald-100 text-emerald-800 ring-emerald-600/10 dark:bg-emerald-400/20 dark:text-emerald-500 dark:ring-emerald-400/20",
      },
      {
        deltaType: "decrease",
        variant: "solidOutline",
        className:
          "bg-red-100 text-red-800 ring-red-600/10 dark:bg-red-400/20 dark:text-red-500 dark:ring-red-400/20",
      },
      {
        deltaType: "neutral",
        variant: "solidOutline",
        className:
          "bg-gray-100 text-gray-700 ring-gray-600/10 dark:bg-gray-500/30 dark:text-gray-300 dark:ring-gray-400/20",
      },
    ],
  },
)

interface BadgeDeltaProps
  extends React.HTMLAttributes<HTMLSpanElement>,
  VariantProps<typeof badgeDeltaVariants> {
  value: string | number
}

const DeltaIcon = ({
  deltaType,
  iconStyle,
  stroke,
}: {
  deltaType: "increase" | "decrease" | "neutral"
  iconStyle: "filled" | "line"
  stroke?: string
}) => {
  const icons = {
    increase: {
      filled: ArrowUp,
      line: ArrowUp,
    },
    decrease: {
      filled: ArrowDown,
      line: ArrowDown,
    },
    neutral: {
      filled: ArrowRight,
      line: ArrowRight,
    },
  }

  const Icon = icons[deltaType][iconStyle]
  return <Icon className="size-3.5" strokeWidth={3} stroke={stroke || "currentColor"} aria-hidden={true} />
}

export function BadgeDelta({
  className,
  variant = "outline",
  deltaType = "neutral",
  iconStyle = "filled",
  value,
  ...props
}: BadgeDeltaProps) {
  if (variant === "complex") {
    return (
      <span
        className={cn(badgeDeltaVariants({ variant, className }))}
        {...props}
      >
        <span
          className={cn(
            "text-xs font-semibold",
            deltaType === "increase" &&
            "text-emerald-700 dark:text-emerald-500",
            deltaType === "decrease" && "text-red-700 dark:text-red-500",
            deltaType === "neutral" &&
            "text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis",
          )}
        >
          {value}
        </span>
        <span
          className={cn(
            "rounded-full px-2 py-1 text-xs font-bold",
            deltaType === "increase" && "bg-emerald-500/30 text-emerald-50",
            deltaType === "decrease" && "bg-red-500/30 text-red-50",
            deltaType === "neutral" &&
            "bg-gray-500/30 text-gray-50",
          )}
        >
          <DeltaIcon deltaType={deltaType} iconStyle="line" />
        </span>
      </span>
    )
  }

  return (
    <span
      className={cn(badgeDeltaVariants({ variant, deltaType, className }))}
      {...props}
    >
      <svg className="sr-only" width="0" height="0">
        <defs>
          <linearGradient id="brand-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EAFE1F" />
            <stop offset="100%" stopColor="#65F429" />
          </linearGradient>
        </defs>
      </svg>
      <span className="flex items-center gap-1">
        <DeltaIcon
          deltaType={deltaType}
          iconStyle={iconStyle}
        />
        {value}
      </span>
    </span>
  )
}
