import { cn } from "../../lib/utils";

interface GridBackgroundProps {
  className?: string;
}

export function GridBackground({ className }: GridBackgroundProps) {
  return (
    <div
      className={cn("absolute inset-0 z-0 pointer-events-none", className)}
      style={{
        backgroundImage: `
          radial-gradient(circle at 25% 25%, #222222 1px, transparent 1.5px),
          radial-gradient(circle at 75% 75%, #111111 1px, transparent 1.5px)
        `,
        backgroundSize: '10px 10px',
      }}
    />
  );
}
