export function Logo({ light = false }: { light?: boolean }) {
  const textColor = light ? "#fff" : "#121312";
  return (
    <div className="flex items-center gap-1 select-none">
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="0" y="6" width="16" height="16" fill={light ? "rgba(255,255,255,0.4)" : "#121312"} />
        <rect x="8" y="0" width="16" height="16" fill="#4EB383" />
      </svg>
      <span
        style={{
          fontFamily: "Sora, sans-serif",
          fontWeight: 600,
          fontSize: "18px",
          letterSpacing: "-0.5px",
          color: textColor,
        }}
      >
        energisa
      </span>
    </div>
  );
}
