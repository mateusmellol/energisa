/**
 * Energisa — Design Tokens
 * Source: Figma primitives collection
 *
 * Use CSS custom properties in components (via Tailwind).
 * This file exports tokens for JS-side usage (Framer Motion, dynamic styles).
 */

export const colors = {
  darkBlue: {
    100: "#F1F5F8",
    200: "#9CBFE2",
    300: "#218AF3",
    400: "#0854A0",
    500: "#001F3E",
    600: "#04192D",
    700: "#031221",
    800: "#030C14",
    900: "#020509",
  },
  lightGreen: {
    100: "#F4F6F3",
    200: "#D9E2D7",
    300: "#BBD3B6",
    400: "#9AC891",
    500: "#74C465",
    600: "#4EA33E",
    700: "#356F2B",
    800: "#1C3B17",
    900: "#040704",
  },
  green: {
    100: "#F1F8F6",
    200: "#A9E6CE",
    300: "#4FE6AA",
    400: "#0BCF81",
    500: "#00804D",
    600: "#055E3A",
    700: "#034229",
    800: "#032517",
    900: "#020906",
  },
  blue: {
    100: "#F2F4F7",
    200: "#BBC9DF",
    300: "#7A9AD2",
    400: "#346BC9",
    500: "#1E4890",
    600: "#17376E",
    700: "#10264C",
    800: "#09152A",
    900: "#030407",
  },
  neutral: {
    0: "#FDFDFC",
    50: "#F8F8F7",
    100: "#FFFFFF",
    150: "#E6E7E4",
    200: "#DADAD6",
    300: "#BFC0BB",
    400: "#A6A7A0",
    500: "#8B8D85",
    600: "#71726B",
    700: "#555653",
    800: "#3B3B39",
    850: "#2D2D2C",
    900: "#20201F",
    950: "#121312",
    1000: "#050505",
  },
} as const;

/** Gradients used in the Figma design */
export const gradients = {
  /** Hero background — radial green gradient */
  heroGlow:
    "radial-gradient(ellipse at 55% 40%, rgba(11, 207, 129, 0.15), rgba(116, 196, 101, 0.08) 40%, transparent 70%)",
  /** Neutral glass — used on stock ticker and glass elements */
  neutralGlass:
    "linear-gradient(109deg, rgba(255, 255, 255, 0.4) 5%, rgba(218, 218, 214, 0.4) 98%)",
} as const;

/** Animation presets for Framer Motion */
export const motion = {
  fadeInUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
  stagger: {
    animate: { transition: { staggerChildren: 0.1 } },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
} as const;
