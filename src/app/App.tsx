import { useState } from "react";
import imgButton from "figma:asset/ef92594731423388a0c490d6f715c05317eb5700.png";
import imgGlobe from "figma:asset/249de7226f0a73ca1906ad78d8cf5bb510be4e42.png";
import svgPaths from "../imports/Site/svg-swy5fdu2p6";

/* ─── Logo ─────────────────────────────────────────────────────────── */
function Logo({ light = false }: { light?: boolean }) {
  const textColor = light ? "#fff" : "#121312";
  return (
    <div className="flex items-center gap-1 select-none">
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="0" y="6" width="16" height="16" fill={light ? "rgba(255,255,255,0.4)" : "#121312"} />
        <rect x="8" y="0" width="16" height="16" fill="#4EB383" />
      </svg>
      <span style={{ fontFamily: "Sora, sans-serif", fontWeight: 600, fontSize: "18px", letterSpacing: "-0.5px", color: textColor }}>
        energisa
      </span>
    </div>
  );
}

/* ─── Header ────────────────────────────────────────────────────────── */
function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 h-20">
      <Logo />
      {/* Desktop nav */}
      <nav className="hidden md:flex items-center gap-8 backdrop-blur-sm bg-white/20 rounded px-8 h-16">
        {["Soluções", "Ecossistema", "Impacto"].map((item) => (
          <a
            key={item}
            href="#"
            style={{ fontFamily: "Sora, sans-serif", fontSize: "16px", color: "#20201f" }}
            className="hover:opacity-70 transition-opacity whitespace-nowrap"
          >
            {item}
          </a>
        ))}
      </nav>
      {/* CTA Button */}
      <div className="hidden md:flex">
        <button
          className="relative flex items-center justify-center px-6 py-4 rounded overflow-hidden"
          style={{ fontFamily: "Sora, sans-serif", fontSize: "16px", color: "#20201f" }}
        >
          <span
            className="absolute inset-0"
            style={{ backgroundImage: "linear-gradient(113.065deg, rgb(219,230,76) 34.987%, rgb(11,207,129) 100%)" }}
          />
          <span className="absolute inset-0 mix-blend-overlay overflow-hidden rounded">
            <img alt="" className="absolute w-full h-[227%] top-[-69%] left-0 max-w-none" src={imgButton} />
          </span>
          <span className="relative">Serviços</span>
        </button>
      </div>
      {/* Mobile hamburger */}
      <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setOpen(!open)}>
        <span className="block w-6 h-0.5 bg-black" />
        <span className="block w-6 h-0.5 bg-black" />
        <span className="block w-6 h-0.5 bg-black" />
      </button>
      {open && (
        <div className="absolute top-20 left-0 right-0 bg-white shadow-lg flex flex-col gap-4 p-6 md:hidden z-50">
          {["Soluções", "Ecossistema", "Impacto"].map((item) => (
            <a key={item} href="#" style={{ fontFamily: "Sora, sans-serif" }} className="text-lg text-black">
              {item}
            </a>
          ))}
          <button
            className="relative flex items-center justify-center px-6 py-3 rounded overflow-hidden w-fit"
            style={{ fontFamily: "Sora, sans-serif", fontSize: "16px", color: "#20201f" }}
          >
            <span
              className="absolute inset-0"
              style={{ backgroundImage: "linear-gradient(113.065deg, rgb(219,230,76) 34.987%, rgb(11,207,129) 100%)" }}
            />
            <span className="relative">Serviços</span>
          </button>
        </div>
      )}
    </header>
  );
}

/* ─── Stock Widget ──────────────────────────────────────────────────── */
function StockWidget() {
  return (
    <div
      className="flex items-center gap-3 rounded px-4 py-3 backdrop-blur-md"
      style={{ background: "rgba(255,255,255,0.2)" }}
    >
      {/* mini dot pattern */}
      <div className="relative shrink-0 w-16 h-16 opacity-60">
        <div
          className="absolute inset-0 rounded-sm"
          style={{ backgroundImage: "linear-gradient(108.628deg, rgba(246,248,237,0.4) 5.11%, rgba(218,218,214,0.4) 97.65%)" }}
        />
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className="absolute backdrop-blur-sm"
            style={{
              width: 10,
              height: 10,
              left: (i % 3) * 12,
              top: Math.floor(i / 3) * 12,
              backgroundImage: "linear-gradient(108.628deg, rgba(246,248,237,0.4) 5.11%, rgba(218,218,214,0.4) 97.65%)",
            }}
          />
        ))}
      </div>
      <div>
        <div style={{ fontFamily: "Sora, sans-serif", fontSize: "9px", color: "#032517" }}>ENGI 11</div>
        <div style={{ fontFamily: "Sora, sans-serif", fontSize: "6px", color: "#032517" }}>BRT 21:30 - 21/12/26</div>
        <div className="flex items-center gap-1 mt-0.5">
          <span style={{ fontFamily: "Sora, sans-serif", fontSize: "22px", color: "#121312", lineHeight: 1 }}>51,27</span>
          <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
            <path d={svgPaths.p36e057f0} fill="#4EB383" transform="rotate(90 9 9)" />
          </svg>
        </div>
        <div
          className="flex items-center justify-center px-2 py-0.5 rounded-full mt-1"
          style={{ background: "rgba(78,179,131,0.2)", fontFamily: "Sora, sans-serif", fontSize: "5px", color: "#1c4632" }}
        >
          1.32 (0.83%)
        </div>
      </div>
    </div>
  );
}

/* ─── Profile Card ──────────────────────────────────────────────────── */
function ProfileCard({ name, desc }: { name: string; desc: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-10 h-10 rounded-full bg-[#121312] shrink-0" />
      <div>
        <p style={{ fontFamily: "Sora, sans-serif", fontSize: "13px", color: "#121312" }}>{name}</p>
        <p style={{ fontFamily: "Sora, sans-serif", fontSize: "10px", color: "#555653", opacity: 0.5 }}>{desc}</p>
      </div>
    </div>
  );
}

/* ─── Hero Section ──────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative bg-white overflow-hidden min-h-screen flex flex-col">
      <Header />
      {/* Background SVG shape */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="absolute inset-0 w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1440.5 797.243">
          <path d={svgPaths.p1a831c00} fill="black" fillOpacity="0.06" />
          <ellipse cx="816.799" cy="304.965" fill="#CDCDC9" rx="73.8462" ry="73.8916" />
        </svg>
      </div>
      {/* Content */}
      <div className="relative z-10 flex flex-col flex-1 px-8 md:px-20 pt-28 pb-16">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-0">
          <StockWidget />
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
            <ProfileCard name="Nome exemplo" desc="Descrição de algo" />
            <ProfileCard name="Nome exemplo" desc="Descrição de algo" />
          </div>
        </div>
        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mt-auto pt-32 md:pt-48">
          <h1
            style={{ fontFamily: "Sora, sans-serif", fontWeight: 400, fontSize: "clamp(36px, 5vw, 61px)", color: "#000", lineHeight: 1.15, maxWidth: 520 }}
          >
            Lorem ipsum dolor sit amet
          </h1>
          <div className="flex flex-col items-start md:items-end gap-8 max-w-md">
            <p style={{ fontFamily: "Sora, sans-serif", fontSize: "clamp(16px, 1.5vw, 20px)", color: "#000", lineHeight: 1.4 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            </p>
            <div className="flex gap-4">
              <button
                className="relative px-8 py-4 border border-[#585858] bg-transparent"
                style={{ fontFamily: "Sora, sans-serif", fontSize: "16px", color: "#121312", minWidth: 154 }}
              >
                Saiba mais
              </button>
              <button
                className="px-8 py-4 bg-[#585858]"
                style={{ fontFamily: "Sora, sans-serif", fontSize: "16px", color: "#fff", minWidth: 154 }}
              >
                Começar
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Service Icon components ───────────────────────────────────────── */
function IconNoEnergy() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round">
      <path d={svgPaths.p1f803b20} />
      <path d="M4 3L18 17" />
      <path d={svgPaths.p34a4cd00} />
      <path d="M9 18H15" />
      <path d="M10 22H14" />
    </svg>
  );
}
function IconPayment() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1.5" strokeLinecap="square">
      <path d="M12 1V23" />
      <path d={svgPaths.p2ba0dca0} />
    </svg>
  );
}
function IconRefresh() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1.5" strokeLinecap="square">
      <path d={svgPaths.p1a26da80} />
    </svg>
  );
}
function IconDocument() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1.5" strokeLinecap="square">
      <path d={svgPaths.p30b05a80} />
      <path d="M13 3V9H19" />
    </svg>
  );
}

/* ─── Services Section ──────────────────────────────────────────────── */
function Services() {
  const [tab, setTab] = useState<"Casa" | "Empresa">("Casa");
  const cards = [
    { icon: <IconNoEnergy />, label: "Falta de energia" },
    { icon: <IconPayment />, label: "Pagamento" },
    { icon: <IconRefresh />, label: "Renegociar" },
    { icon: <IconDocument />, label: "Segunda via" },
  ];
  return (
    <section className="bg-white py-16 px-8 md:px-20">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-10">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <h2 style={{ fontFamily: "Sora, sans-serif", fontWeight: 400, fontSize: "clamp(28px, 3vw, 39px)", color: "#000" }}>
            Serviços
          </h2>
          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex gap-6 flex-1">
              {(["Casa", "Empresa"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-4 py-2 rounded border transition-all ${
                    tab === t
                      ? "border-[#8b8d85] bg-[#fdfdfc]"
                      : "border-transparent bg-transparent"
                  }`}
                  style={{ fontFamily: "Sora, sans-serif", fontSize: "25px", color: "#121312" }}
                >
                  {t}
                </button>
              ))}
            </div>
            <a
              href="#"
              className="underline"
              style={{ fontFamily: "Sora, sans-serif", fontSize: "25px", color: "#121312" }}
            >
              Mais
            </a>
          </div>
        </div>
        {/* Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {cards.map((card) => (
            <div
              key={card.label}
              className="relative bg-[#fdfdfc] rounded flex flex-col justify-between p-4 h-44 cursor-pointer hover:shadow-md transition-shadow"
              style={{ border: "1px solid #8b8d85" }}
            >
              {card.icon}
              <p style={{ fontFamily: "Sora, sans-serif", fontSize: "clamp(16px, 1.5vw, 20px)", color: "#000", lineHeight: 1.4 }}>
                {card.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FlexLab / Ecossistema Section ────────────────────────────────── */
function FlexLab() {
  return (
    <section
      className="py-20 px-8 md:px-20"
      style={{ backgroundImage: "linear-gradient(244.66deg, #fff 0.95%, #bebebe 100%)" }}
    >
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row gap-16 items-start">
        {/* Left */}
        <div className="flex flex-col gap-12 md:w-[420px] shrink-0">
          <div className="bg-[#8b8b8b] w-28 h-9 rounded-sm" />
          <div className="flex flex-col gap-3">
            <h2 style={{ fontFamily: "Sora, sans-serif", fontWeight: 400, fontSize: "clamp(32px, 4vw, 49px)", color: "#000" }}>
              FlexLab
            </h2>
            <p style={{ fontFamily: "Sora, sans-serif", fontSize: "clamp(16px, 1.5vw, 20px)", color: "#000", lineHeight: 1.4, maxWidth: 530 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing
            </p>
          </div>
        </div>
        {/* Right */}
        <div className="flex flex-col gap-16 flex-1">
          <p style={{ fontFamily: "Sora, sans-serif", fontSize: "clamp(16px, 1.5vw, 20px)", color: "#000", lineHeight: 1.4, maxWidth: 490 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="flex flex-wrap gap-6">
            <ProfileCard name="Nome exemplo" desc="Descrição de algo" />
            <ProfileCard name="Nome exemplo" desc="Descrição de algo" />
            <ProfileCard name="Nome exemplo" desc="Descrição de algo" />
          </div>
          {/* Button + Progress */}
          <div className="flex items-center gap-12 flex-wrap">
            <button
              className="bg-[#121312] px-8 py-4"
              style={{ fontFamily: "Sora, sans-serif", fontSize: "16px", color: "#fff", minWidth: 157 }}
            >
              Conhecer
            </button>
            <div className="flex gap-0">
              {[true, false, false, false, false].map((active, i) => (
                <div key={i} className={`h-3 w-10 ${active ? "bg-[#393838]" : "bg-[#d9d9d9]"}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Large image below */}
      <div className="mt-12 bg-[#565656] w-full" style={{ height: "min(512px, 40vw)" }} />
    </section>
  );
}

/* ─── Statistics Section ────────────────────────────────────────────── */
function Statistics() {
  const stats = [
    {
      bg: "#8b8d85",
      number: "939",
      suffix: "",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing",
    },
    {
      bg: "#555653",
      number: "+18",
      suffix: " mil",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing",
    },
    {
      bg: "#2d2d2c",
      number: "25",
      suffix: " milhões",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing",
    },
  ];
  return (
    <section className="bg-[#fdfdfc] py-20 px-8 md:px-20">
      <div className="max-w-[1240px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-20">
          <div>
            <h2 style={{ fontFamily: "Sora, sans-serif", fontWeight: 400, fontSize: "clamp(28px, 4vw, 49px)", color: "#000", lineHeight: 1.15, maxWidth: 400 }}>
              A Energisa acompanha você
            </h2>
            <p style={{ fontFamily: "Sora, sans-serif", fontSize: "clamp(16px, 1.5vw, 20px)", color: "#000", lineHeight: 1.4, maxWidth: 530 }} className="mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing
            </p>
          </div>
          <p style={{ fontFamily: "Sora, sans-serif", fontSize: "clamp(14px, 1.5vw, 20px)", color: "#8b8d85" }}>
            Dados de 2025
          </p>
        </div>
        {/* Stats */}
        <div className="flex flex-col gap-0">
          {stats.map((s, i) => (
            <div key={i} className="flex items-center gap-8">
              <div
                className="flex flex-col gap-6 p-4 shrink-0"
                style={{
                  background: s.bg,
                  width: `min(${[538, 758, 978][i]}px, 80vw)`,
                  flexShrink: 1,
                }}
              >
                <p style={{ fontFamily: "Sora, sans-serif", fontSize: "clamp(14px, 1.2vw, 20px)", color: "#000", lineHeight: 1.4, maxWidth: 398 }}>
                  {s.text}
                </p>
                <a href="#" style={{ fontFamily: "sans-serif", fontSize: "18px", color: "rgba(0,0,0,0.8)", opacity: 0.4 }}>
                  Saiba mais →
                </a>
              </div>
              <p
                className="shrink-0"
                style={{ fontFamily: "Sora, sans-serif", fontWeight: 400, lineHeight: 1.4 }}
              >
                <span style={{ fontSize: "clamp(48px, 6vw, 96px)", color: "#000" }}>{s.number}</span>
                <span style={{ fontSize: "clamp(14px, 1.5vw, 20px)", color: "#000" }}>{s.suffix}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Timeline Tab ──────────────────────────────────────────────────── */
function TimelineTabs({
  active,
  items,
}: {
  active: "Antes" | "Agora" | "Futuro";
  items: { label: "Antes" | "Agora" | "Futuro"; activeBg: string }[];
}) {
  return (
    <div className="flex items-center gap-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="px-2 py-2"
          style={{
            background: item.label === active ? item.activeBg : "transparent",
            fontFamily: "Sora, sans-serif",
            fontSize: "clamp(16px, 1.8vw, 25px)",
            color: "#000",
          }}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
}

/* ─── Timeline Section ──────────────────────────────────────────────── */
function TimelineSection({
  bg,
  activeTab,
  tabConfig,
  title,
  body,
  year,
  location,
}: {
  bg: string;
  activeTab: "Antes" | "Agora" | "Futuro";
  tabConfig: { label: "Antes" | "Agora" | "Futuro"; activeBg: string }[];
  title: string;
  body: string;
  year: string;
  location: string;
}) {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: bg, minHeight: "600px" }}
    >
      <div className="max-w-[1440px] mx-auto relative" style={{ minHeight: 600 }}>
        {/* Left content */}
        <div
          className="relative z-10 flex flex-col gap-10 px-8 md:px-28 pt-16 pb-8"
          style={{ maxWidth: 620 }}
        >
          <TimelineTabs active={activeTab} items={tabConfig} />
          <div className="flex flex-col gap-6">
            <h2
              style={{ fontFamily: "Sora, sans-serif", fontWeight: 400, fontSize: "clamp(26px, 3vw, 39px)", color: "#000" }}
            >
              {title}
            </h2>
            <p style={{ fontFamily: "Sora, sans-serif", fontSize: "clamp(15px, 1.3vw, 20px)", color: "#000", lineHeight: 1.6, whiteSpace: "pre-line" }}>
              {body}
            </p>
          </div>
          {/* Year + Location */}
          <div className="flex items-center gap-8 mt-8">
            <div className="flex items-center gap-3">
              {/* dot pattern */}
              <div className="relative w-[50px] h-[50px] opacity-60">
                {[0,1,2,3,4,5].map((i) => (
                  <div
                    key={i}
                    style={{
                      position: "absolute",
                      width: 25,
                      height: 25,
                      left: (i % 2) * 25,
                      top: Math.floor(i / 2) * 25,
                      backgroundImage: "linear-gradient(108.628deg, rgba(246,248,237,0.4) 5.11%, rgba(218,218,214,0.4) 97.65%)",
                    }}
                  />
                ))}
              </div>
              <span
                style={{ fontFamily: "Sora, sans-serif", fontWeight: 400, fontSize: "clamp(32px, 4vw, 49px)", color: "#000" }}
              >
                {year}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative w-[50px] h-[50px] opacity-60">
                {[0,1,2,3,4,5].map((i) => (
                  <div
                    key={i}
                    style={{
                      position: "absolute",
                      width: 25,
                      height: 25,
                      left: (i % 2) * 25,
                      top: Math.floor(i / 2) * 25,
                      backgroundImage: "linear-gradient(108.628deg, rgba(246,248,237,0.4) 5.11%, rgba(218,218,214,0.4) 97.65%)",
                    }}
                  />
                ))}
              </div>
              <span
                style={{ fontFamily: "Sora, sans-serif", fontWeight: 400, fontSize: "clamp(32px, 4vw, 49px)", color: "#000" }}
              >
                {location}
              </span>
            </div>
          </div>
        </div>
        {/* Globe image - right side */}
        <div
          className="hidden md:block absolute top-8 right-0 overflow-hidden"
          style={{ width: "49%", height: "88%", borderRadius: "367px" }}
        >
          <img
            alt="Globe"
            src={imgGlobe}
            className="absolute max-w-none"
            style={{ width: "162.58%", height: "157.32%", left: "-33.31%", top: "-42.31%" }}
          />
        </div>
      </div>
    </section>
  );
}

/* ─── News Cards Section ────────────────────────────────────────────── */
function NewsCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="flex flex-col w-full">
      <div className="bg-[#121312]" style={{ height: 300 }} />
      <div className="bg-[#f8f8f7] flex flex-col gap-7 p-6">
        <div className="flex flex-col gap-4">
          <p style={{ fontFamily: "Sora, sans-serif", fontSize: "clamp(16px, 1.5vw, 25px)", color: "#000", lineHeight: 1.4 }}>
            {title}
          </p>
          <p style={{ fontFamily: "Sora, sans-serif", fontSize: "clamp(14px, 1.2vw, 20px)", color: "#3b3b39", lineHeight: 1.4 }}>
            {desc}
          </p>
        </div>
        <button
          className="bg-[#bfc0bb] flex items-center justify-center py-2"
          style={{ fontFamily: "Sora, sans-serif", fontSize: "clamp(14px, 1.2vw, 20px)", color: "#050505" }}
        >
          Ler mais
        </button>
      </div>
    </div>
  );
}

function NewsSection() {
  const articles = [
    {
      title: "Lorem ipsum dolor sit amet, consectetur",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing",
    },
    {
      title: "Lorem ipsum dolor sit amet, consectetur",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing",
    },
    {
      title: "Lof sit amet, consectetur",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing",
    },
    {
      title: "Lof sit amet, consectetur",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing",
    },
  ];
  return (
    <section className="bg-white py-16 px-8 md:px-20">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {articles.map((a, i) => (
            <NewsCard key={i} title={a.title} desc={a.desc} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="bg-[#121312] py-12 px-8 md:px-20">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <Logo light />
        <div className="flex flex-wrap gap-8">
          {["Soluções", "Ecossistema", "Impacto", "Serviços", "Contato"].map((item) => (
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

/* ─── App ───────────────────────────────────────────────────────────── */
export default function App() {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <Services />
      <FlexLab />
      <Statistics />
      <TimelineSection
        bg="#555653"
        activeTab="Antes"
        tabConfig={[
          { label: "Antes", activeBg: "#a6a7a0" },
          { label: "Agora", activeBg: "#535353" },
          { label: "Futuro", activeBg: "transparent" },
        ]}
        title="Começamos assim"
        body={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`}
        year="1905"
        location="MG"
      />
      <TimelineSection
        bg="#a6a7a0"
        activeTab="Agora"
        tabConfig={[
          { label: "Antes", activeBg: "#a6a7a0" },
          { label: "Agora", activeBg: "#535353" },
          { label: "Futuro", activeBg: "transparent" },
        ]}
        title="Estamos prontos para inovar"
        body="A tecnologia tem evoluído rapidamente, trazendo novas possibilidades e desafios para as empresas e consumidores."
        year="2023"
        location="SP"
      />
      <TimelineSection
        bg="#fdfdfc"
        activeTab="Futuro"
        tabConfig={[
          { label: "Antes", activeBg: "#a6a7a0" },
          { label: "Agora", activeBg: "#535353" },
          { label: "Futuro", activeBg: "#9c9c9c" },
        ]}
        title="Acolhemos o novo"
        body="Com a colaboração global, estamos redefinindo como trabalhamos e interagimos no mundo digital moderno."
        year="2030"
        location="RJ"
      />
      <NewsSection />
      <Footer />
    </div>
  );
}