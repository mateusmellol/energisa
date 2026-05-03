'use client';

import React from 'react';
import { motion } from 'motion/react';

type GradientDotsProps = React.ComponentProps<typeof motion.div> & {
	/** Dot size (default: 8) */
	dotSize?: number;
	/** Spacing between dots (default: 10) */
	spacing?: number;
	/** Animation duration (default: 30) */
	duration?: number;
	/** Background color (default: 'transparent') */
	backgroundColor?: string;
};

export function GradientDots({
	dotSize = 8,
	spacing = 10,
	duration = 30,
	backgroundColor = 'transparent',
	className,
	...props
}: GradientDotsProps) {
	const hexSpacing = spacing * 1.732; // Hexagonal spacing calculation

	return (
		<motion.div
			className={`absolute inset-0 ${className}`}
			style={{
				backgroundImage: `
          radial-gradient(circle at 50% 50%, #D4EC28, transparent 60%),
          radial-gradient(circle at 50% 50%, #cad71d, transparent 60%),
          radial-gradient(circle at 50% 50%, #E0F450, transparent 60%),
          radial-gradient(ellipse at 50% 50%, #A3B81A, transparent 60%)
        `,
				backgroundSize: `
          200% 200%,
          200% 200%,
          200% 200%,
          200% ${hexSpacing}px
        `,
				backgroundPosition: `
          0% 0%,
          0% 0%,
          0% 0px
        `,
				WebkitMaskImage: `
          radial-gradient(circle at 50% 50%, black 2px, transparent 2px),
          radial-gradient(circle at 50% 50%, black 2px, transparent 2px)
        `,
				WebkitMaskSize: `${spacing}px ${hexSpacing}px, ${spacing}px ${hexSpacing}px`,
				WebkitMaskPosition: `0px 0px, ${spacing / 2}px ${hexSpacing / 2}px`,
				maskImage: `
          radial-gradient(circle at 50% 50%, black 2px, transparent 2px),
          radial-gradient(circle at 50% 50%, black 2px, transparent 2px)
        `,
				maskSize: `${spacing}px ${hexSpacing}px, ${spacing}px ${hexSpacing}px`,
				maskPosition: `0px 0px, ${spacing / 2}px ${hexSpacing / 2}px`,
			}}
			animate={{
				backgroundPosition: [
					`800% 400%, 1000% -400%, -1200% -600%, 400% ${hexSpacing}px`,
					`0% 0%, 0% 0%, 0% 0%, 0% 0%`,
				]
			}}
			transition={{
				backgroundPosition: {
					duration: duration,
					ease: 'linear',
					repeat: Number.POSITIVE_INFINITY,
				}
			}}
			{...props}
		/>
	);
}
