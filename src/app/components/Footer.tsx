import { Logo } from "./Logo";

const NAV_ITEMS = ["Soluções", "Ecossistema", "Impacto", "Serviços", "Contato"];

export function Footer() {
  return (
    <footer className="bg-[#121312] py-12 px-8 md:px-20">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <Logo light />

        <div className="flex flex-wrap gap-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item}
              href="#"
              style={{ fontFamily: "Sora, sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.6)" }}
              className="hover:opacity-100 transition-opacity"
            >
              {item}
            </a>
          ))}
        </div>

        <p style={{ fontFamily: "Sora, sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>
          © 2025 Energisa
        </p>
      </div>
    </footer>
  );
}
