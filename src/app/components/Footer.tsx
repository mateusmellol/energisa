import { Logo } from "./Logo";

const COLUMNS = [
  {
    title: "Empresa",
    links: [
      "Sobre a Energisa",
      "Grupo Empresarial",
      "Carreiras",
      "Imprensa",
      "Sustentabilidade",
      "Relações com Investidores",
    ],
  },
  {
    title: "Serviços",
    links: [
      "Residencial",
      "Empresarial",
      "Agronegócio",
      "Segunda Via de Conta",
      "Falta de Energia",
      "Ligação Nova",
    ],
  },
  {
    title: "Inovação",
    links: [
      "FlexLab",
      "Mobilidade Elétrica",
      "Energia Solar",
      "Eficiência Energética",
      "Smart Grid",
    ],
  },
  {
    title: "Atendimento",
    links: [
      "Central 0800",
      "Chat Online",
      "Ouvidoria",
      "Agência Virtual",
      "App Energisa",
    ],
  },
  {
    title: "Legal",
    links: [
      "Política de Privacidade",
      "Termos de Uso",
      "Política de Cookies",
      "LGPD",
      "Canal de Ética",
    ],
  },
];

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer className="bg-[#0e0f0e] border-t border-white/[0.06]" style={{ scrollSnapAlign: "start" }}>
      {/* Main grid */}
      <div className="max-w-[1440px] mx-auto px-8 md:px-20 pt-16 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1fr_1fr_auto] gap-x-8 gap-y-12">
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
                  <li key={link}>
                    <a
                      href="#"
                      style={{
                        fontFamily: "Sora, sans-serif",
                        fontSize: "13px",
                        color: "rgba(255,255,255,0.55)",
                        textDecoration: "none",
                        transition: "color 0.15s",
                      }}
                      className="hover:text-white"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social column */}
          <div className="flex flex-col gap-4">
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
              Redes Sociais
            </span>
            <div className="flex flex-col gap-3">
              {SOCIAL_LINKS.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  style={{ color: "rgba(255,255,255,0.5)", transition: "color 0.15s" }}
                  className="hover:text-white flex items-center gap-2.5"
                >
                  {icon}
                  <span
                    style={{
                      fontFamily: "Sora, sans-serif",
                      fontSize: "13px",
                      color: "inherit",
                    }}
                  >
                    {label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-[1440px] mx-auto px-8 md:px-20 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-t border-white/[0.06]">
        <Logo light />
        <p
          style={{
            fontFamily: "Sora, sans-serif",
            fontSize: "12px",
            color: "rgba(255,255,255,0.25)",
          }}
        >
          © 2025 Energisa. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
