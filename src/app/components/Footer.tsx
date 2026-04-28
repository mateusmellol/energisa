import { EnergisaLogo } from "./EnergisaLogo";

const COLUMNS = [
  {
    title: "Navegação",
    links: [
      { label: "Impacto", href: "#impacto" },
      { label: "Sobre", href: "#timeline" },
      { label: "Ecossistema", href: "#ecossistema" },
    ],
  },
  {
    title: "Serviços",
    links: [
      { label: "Residencial", href: "#" },
      { label: "Empresarial", href: "#" },
      { label: "Agronegócio", href: "#" },
      { label: "Mobilidade Elétrica", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Política de Privacidade", href: "#" },
      { label: "Termos de Uso", href: "#" },
      { label: "LGPD", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-[#0e0f0e] border-t border-white/[0.06]" style={{ scrollSnapAlign: "start" }}>
      {/* Main grid */}
      <div className="max-w-[1440px] mx-auto px-8 md:px-20 pt-16 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr] gap-x-8 gap-y-12">
          {COLUMNS.map((col) => (
            <div key={col.title} className="flex flex-col gap-4">
              <span
                style={{
                  fontFamily: "Sora, sans-serif",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.35)",
                }}
              >
                {col.title}
              </span>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      style={{
                        fontFamily: "Sora, sans-serif",
                        fontSize: "13px",
                        color: "rgba(255,255,255,0.55)",
                        textDecoration: "none",
                        transition: "color 0.15s",
                      }}
                      className="hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-[1440px] mx-auto px-8 md:px-20 pb-10 pt-6 border-t border-white/[0.06] flex items-end justify-between">
        <div className="flex flex-col gap-3">
          <EnergisaLogo color="#CAD71D" scale={1.4} />
          <span
            style={{
              fontFamily: "Sora, sans-serif",
              fontSize: "11px",
              color: "rgba(255,255,255,0.2)",
              letterSpacing: "0.04em",
            }}
          >
            © 2026 Energisa. Todos os direitos reservados.
          </span>
        </div>
      </div>
    </footer>
  );
}
