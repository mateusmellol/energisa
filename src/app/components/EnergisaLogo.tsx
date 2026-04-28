import svgPaths from "../../imports/Header/svg-exccz6k13i";

interface EnergisaLogoProps {
  color?: string;
  scale?: number;
  className?: string;
}

const LOGO_SEGMENTS = [
  { inset: "42.17% 45.3% 21.2% 44.71%", viewBox: "0 0 11.5852 13.9184", path: svgPaths.p22035800 },
  { inset: "42.11% 69.3% 21.18% 20.72%", viewBox: "0 0 11.5746 13.9474", path: svgPaths.p459a300 },
  { inset: "42.16% 57.34% 21.8% 32.92%", viewBox: "0 0 11.2952 13.6957", path: svgPaths.p12e93f00 },
  { inset: "42.24% 25.83% 21.11% 63.76%", viewBox: "0 0 12.0719 13.9273", path: svgPaths.p18a8b300 },
  { inset: "42.39% 10.42% 21.41% 81.29%", viewBox: "0 0 9.61278 13.7554", path: svgPaths.pd22a1c0 },
  { inset: "42.17% 37.06% 21.81% 56.91%", viewBox: "0 0 6.99685 13.6905", path: svgPaths.p1d77b700 },
  { inset: "42.81% 21.03% 21.83% 76.49%", viewBox: "0 0 2.86987 13.4366", path: svgPaths.p3ca12800 },
  { inset: "19.52% 59.96% 69.59% 36.47%", viewBox: "0 0 4.13783 4.13968", path: svgPaths.p11889800 },
  { inset: "19.61% 71.41% 69.65% 25.92%", viewBox: "0 0 3.09427 4.07846", path: svgPaths.p22b6c600 },
  { inset: "19.63% 63.95% 69.63% 33.54%", viewBox: "0 0 2.90426 4.07822", path: svgPaths.pf9170c0 },
  { inset: "19.54% 75.14% 69.63% 21.74%", viewBox: "0 0 3.61209 4.11566", path: svgPaths.pd2ea700 },
  { inset: "19.68% 67.59% 69.6% 29.29%", viewBox: "0 0 3.61755 4.07341", path: svgPaths.p3f72aa00 },
  { inset: "29.06% 76.61% 0 2.25%", viewBox: "0 0 24.5099 26.9564", path: svgPaths.p38f1df80 },
  { inset: "0 82.7% 52.24% 1.65%", viewBox: "0 0 18.1386 18.1498", path: svgPaths.p3b3b8980 },
  { inset: "42.16% 0 21.06% 90.71%", viewBox: "0 0 10.7701 13.9751", path: svgPaths.pcc93d80 },
  { inset: "62.55% 89.77% 0 0", viewBox: "0 0 11.8548 14.2322", path: svgPaths.p2a81db00 },
] as const;

export function EnergisaLogo({
  color = "currentColor",
  scale = 1,
  className,
}: EnergisaLogoProps) {
  const width = 115.93 * scale;
  const height = 38 * scale;

  return (
    <div
      className={className}
      style={{ width, height, position: "relative", flexShrink: 0, color }}
    >
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        {LOGO_SEGMENTS.map((segment) => (
          <div key={segment.path} style={{ position: "absolute", inset: segment.inset }}>
            <svg
              className="absolute block inset-0 size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox={segment.viewBox}
            >
              <path d={segment.path} fill="currentColor" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}
