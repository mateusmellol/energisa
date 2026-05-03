import { EnergisaLogo } from "./EnergisaLogo";
import { scrollToSection } from "./navigation";

const COLUMNS = [
  {
    title: "Navegação",
    links: [
      { label: "Serviços", href: "#servicos" },
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
    <footer className="bg-[#0e0f0e]" style={{ scrollSnapAlign: "start" }}>
      <div className="max-w-[1440px] mx-auto px-5 md:px-20 py-10 lg:py-16">
        <div className="flex flex-col md:flex-row md:justify-between items-start gap-12 md:gap-8">
          {/* Logo and Copyright */}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => scrollToSection("hero")}
              className="transition-all duration-300 hover:opacity-80 active:scale-95 cursor-pointer outline-none w-fit text-left"
              aria-label="Voltar para o topo"
            >
              <EnergisaLogo color="#CAD71D" scale={1.4} />
            </button>
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

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-12 lg:gap-x-[122px] gap-y-12">
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
      </div>
    </footer>
  );
}
