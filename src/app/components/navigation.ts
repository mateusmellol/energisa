export const NAV_LINKS = [
  { label: "Impacto", href: "#impacto" },
  { label: "Sobre", href: "#timeline" },
] as const;

export function getSectionId(href: string) {
  return href.replace("#", "");
}

export function scrollToSection(sectionId: string) {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
}
