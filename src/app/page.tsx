import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Ecosystem } from "@/components/Ecosystem";
import { Timeline } from "@/components/Timeline";
import { NewsGrid } from "@/components/NewsGrid";

/**
 * Energisa — Redesign UI
 *
 * Seções mapeadas do Figma (node 183:2578):
 * 1. Hero (183:1949) — Header + bg-image + stock + headline + CTAs
 * 2. Services (183:2433) — Toggle Casa/Empresa + 4 cards
 * 3. Ecosystem (183:2755) — FlexLab + estatísticas
 * 4. Timeline (186:3160, 186:3210, 186:3245) — 3 marcos históricos
 * 5. News (186:3303) — 4 cards de conteúdo
 */

const timelineData = [
  {
    id: "1905",
    tabs: ["Antes", "Agora", "Futuro"],
    activeTab: 0,
    title: "Começamos assim",
    description:
      "Em 1905, nascia em Cataguases, Minas Gerais, uma pequena empresa de energia que viria a transformar o cenário energético brasileiro. Com raízes profundas no interior do país, a Energisa cresceu junto com as comunidades que atende.",
    year: "1905",
    location: "MG",
    image: "/globe-placeholder.jpg",
  },
  {
    id: "2023",
    tabs: ["Antes", "Agora", "Futuro"],
    activeTab: 1,
    title: "Estamos prontos para inovar",
    description:
      "Com investimentos massivos em tecnologia e inovação, a Energisa se posiciona na vanguarda da transição energética. O FlexLab lidera projetos de energia renovável e smart grid.",
    year: "2023",
    location: "SP",
    image: "/globe-placeholder.jpg",
  },
  {
    id: "2030",
    tabs: ["Antes", "Agora", "Futuro"],
    activeTab: 2,
    title: "Acolhemos o novo",
    description:
      "Com a colaboração global, estamos redefinindo como trabalhamos e interagimos no mundo digital moderno. A meta é 100% de energia renovável até 2030.",
    year: "2030",
    location: "RJ",
    image: "/globe-placeholder.jpg",
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Ecosystem />
        {timelineData.map((data) => (
          <Timeline key={data.id} {...data} />
        ))}
        <NewsGrid />
      </main>
    </>
  );
}
