"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

export const BoxesCore = ({ className, ...rest }: { className?: string }) => {
  const rows = new Array(150).fill(1);
  const cols = new Array(100).fill(1);

  // Using shades of the site's accent color (#D4EC28) for hover cells
  const colors = [
    "rgba(212, 236, 40, 0.8)",  // #D4EC28
    "rgba(227, 246, 84, 0.8)",  // #E3F654
    "rgba(194, 217, 31, 0.8)",  // #C2D91F
    "rgba(233, 252, 112, 0.8)", // #E9FC70
    "rgba(178, 202, 18, 0.8)",  // #B2CA12
    "rgba(212, 236, 40, 0.4)",
    "rgba(227, 246, 84, 0.4)",
  ];

  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div
      style={{
        transform: `translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)`,
      }}
      className={cn(
        "absolute left-1/4 p-4 -top-1/4 flex -translate-x-1/2 -translate-y-1/2 w-full h-full z-0",
        className
      )}
      {...rest}
    >
      {rows.map((_, i) => (
        <motion.div
          key={`row` + i}
          className="w-16 h-8 border-l border-neutral-800 relative"
        >
          {cols.map((_, j) => (
              <motion.div
                whileHover={{
                  backgroundColor: getRandomColor(),
                  boxShadow: "0 0 20px rgba(212, 236, 40, 0.6)",
                  zIndex: 1,
                  transition: { duration: 0 },
                }}
                animate={{
                  transition: { duration: 2 },
                }}
                key={`col` + j}
                className="w-16 h-8 border-r border-t border-neutral-800 relative pointer-events-auto"
              >
                {j % 2 === 0 && i % 2 === 0 ? (
                  <div className="absolute h-6 w-10 -top-[14px] -left-[22px] z-10 pointer-events-none flex items-center justify-center text-neutral-800">
                    <Plus
                      className="w-full h-full stroke-[1px]"
                      strokeWidth="1.5"
                      style={{ color: "inherit" }}
                    />
                  </div>
                ) : null}
              </motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

export const Boxes = React.memo(BoxesCore);
