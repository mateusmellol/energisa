export const motionEase = {
  out: [0.16, 1, 0.3, 1] as [number, number, number, number],
  in: [0.55, 0, 1, 0.45] as [number, number, number, number],
  inOut: [0.65, 0, 0.35, 1] as [number, number, number, number],
} as const;

export const motionTransition = {
  micro: { duration: 0.12, ease: motionEase.out },
  fast: { duration: 0.18, ease: motionEase.out },
  entrance: { duration: 0.52, ease: motionEase.out },
  section: { duration: 0.62, ease: motionEase.out },
  exit: { duration: 0.18, ease: motionEase.in },
  layout: { duration: 0.28, ease: motionEase.inOut },
  press: { type: "spring", stiffness: 520, damping: 34, mass: 0.7 },
  scrollSpring: { stiffness: 110, damping: 28, mass: 0.28 },
} as const;

export const motionViewport = {
  once: true,
  amount: 0.24,
  margin: "0px 0px -80px 0px",
} as const;

export const sectionHeaderVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: motionTransition.section,
  },
} as const;

export const textRevealVariants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: motionTransition.section,
  },
} as const;

export const listContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
} as const;

export const cardRevealVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: motionTransition.entrance,
  },
} as const;

export const liftHover = {
  transition: motionTransition.fast,
} as const;

export const pressTap = {
  scale: 0.97,
  transition: motionTransition.press,
} as const;
