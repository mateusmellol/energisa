export const NAV_LINKS = [
  { label: "Impacto", href: "#impacto" },
  { label: "Sobre", href: "#timeline" },
  { label: "Ecossistema", href: "#ecossistema" },
  { label: "Notícias", href: "#noticias" },
] as const;

export function getSectionId(href: string) {
  return href.replace("#", "");
}

export function scrollToSection(sectionId: string, offset = 80) {
  const el = document.getElementById(sectionId);
  if (!el) return;
  const sectionOffset =
    sectionId === "timeline" ? -80 : sectionId === "impacto" ? 140 : sectionId === "solucoes" ? 90 : offset;
  const top = el.getBoundingClientRect().top + window.scrollY - sectionOffset;
  window.scrollTo({ top, behavior: "smooth" });
}
