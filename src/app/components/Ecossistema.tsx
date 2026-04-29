import { useCallback, useRef, useState } from "react";
import { Flip, gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { GridPattern } from "@/registry/magicui/grid-pattern";
import "./Ecossistema.css";

type LayoutRect = {
  x: number;
  y: number;
  w: number;
  h: number;
};

type LayoutMap = Record<string, LayoutRect>;
type SlotMap = Record<string, string>;

const GALLERY_ITEMS = [
  {
    id: "pattern-1",
    src: "https://images.unsplash.com/photo-1750074905164-916edae569ed?auto=format&fit=crop&w=1600&q=80",
    alt: "Usina termoeletrica a gas natural junto a agua",
  },
  {
    id: "image-12",
    src: "https://images.unsplash.com/photo-1589201529153-5297335c1684?auto=format&fit=crop&w=1600&q=80",
    alt: "Paineis solares em campo aberto",
  },
  {
    id: "image-8",
    src: "https://images.unsplash.com/photo-1509390288171-ce2088f7d08e?auto=format&fit=crop&w=1800&q=85",
    alt: "Usina de gas natural iluminada a noite",
  },
  {
    id: "image-3",
    src: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1600&q=80",
    alt: "Campo de paineis solares visto de cima",
  },
  {
    id: "image-1",
    src: "https://images.unsplash.com/photo-1668097613572-40b7c11c8727?auto=format&fit=crop&w=1600&q=80",
    alt: "Profissional trabalhando em painel solar",
  },
];

const COPY_PARAGRAPHS = [
  "O ecossistema Energisa conecta distribuicao, tecnologia, servicos e novas fontes de energia em uma unica camada de experiencia.",
  "A mesma rede que ilumina cidades agora tambem organiza dados, mobilidade eletrica, geracao distribuida e produtos digitais com a mesma fluidez.",
  "Nesta secao, a animacao deixa isso visivel: blocos que pareciam independentes se reorganizam como partes de um sistema vivo.",
];

const CENTER_ITEM_ID = "image-8";
const INITIAL_ITEM_SLOTS: SlotMap = Object.fromEntries(GALLERY_ITEMS.map((item) => [item.id, item.id]));
const ECOSYSTEM_INTRO_BOTTOM_PADDING = 24;
const ECOSYSTEM_SCROLL_TRIGGER_ID = "ecossistema";
const ECOSYSTEM_SCROLL_START_DESKTOP = "top 40%";
const ECOSYSTEM_SCROLL_START_MOBILE = "top 48%";
const ECOSYSTEM_SCROLL_START_DESKTOP_OFFSET = 0.3;
const ECOSYSTEM_GALLERY_LIFT_DESKTOP = 0.4;
const ECOSYSTEM_GALLERY_LIFT_MOBILE = 0.48;
const ECOSYSTEM_SCROLL_DISTANCE_MULTIPLIER = 1.55;
const ECOSYSTEM_SCROLL_SCRUB = 0.9;
const ECOSYSTEM_CLICK_OPEN_DELAY = 0.18;
const ECOSYSTEM_MAIN_ITEM_FOCUS_START = 72;
const ECOSYSTEM_MAIN_ITEM_FOCUS_END = 82;
const ECOSYSTEM_MAIN_ITEM_SCALE_START = 1.04;
const ECOSYSTEM_MAIN_ITEM_SCALE_END = 1.1;

function getEcosystemScrollStart() {
  return window.innerWidth <= 900 ? ECOSYSTEM_SCROLL_START_MOBILE : ECOSYSTEM_SCROLL_START_DESKTOP;
}

function getEcosystemGalleryLiftDistance(galleryWrapElement: HTMLElement) {
  const liftRatio = window.innerWidth <= 900 ? ECOSYSTEM_GALLERY_LIFT_MOBILE : ECOSYSTEM_GALLERY_LIFT_DESKTOP;
  const paddingTop = Number.parseFloat(window.getComputedStyle(galleryWrapElement).paddingTop) || 0;
  const headerHeight = document.querySelector("header")?.getBoundingClientRect().height ?? 80;

  return Math.max(0, Math.round(window.innerHeight * liftRatio + paddingTop - headerHeight));
}

const DESKTOP_COMPACT_LAYOUT: LayoutMap = {
  "pattern-1": { x: 13.333, y: 4, w: 18, h: 23.04 },
  "image-12": { x: 68.667, y: 4, w: 18, h: 23.04 },
  "image-8": { x: 34, y: 4, w: 32, h: 53.76 },
  "image-3": { x: 13.333, y: 34.24, w: 18, h: 23.04 },
  "image-1": { x: 68.667, y: 34.24, w: 18, h: 23.04 },
};

const MOBILE_COMPACT_LAYOUT: LayoutMap = {
  "pattern-1": { x: 6, y: 4, w: 26, h: 17.28 },
  "image-12": { x: 68, y: 4, w: 26, h: 17.28 },
  "image-8": { x: 18, y: 4, w: 64, h: 40.32 },
  "image-3": { x: 6, y: 26.08, w: 26, h: 17.28 },
  "image-1": { x: 68, y: 26.08, w: 26, h: 17.28 },
};

function waitForImages(container: HTMLElement) {
  const images = Array.from(container.querySelectorAll("img"));

  return Promise.all(
    images.map((img) => {
      if (img.complete && img.naturalWidth > 0) {
        return Promise.resolve();
      }

      return new Promise<void>((resolve) => {
        const done = () => {
          img.removeEventListener("load", done);
          img.removeEventListener("error", done);
          resolve();
        };

        img.addEventListener("load", done, { once: true });
        img.addEventListener("error", done, { once: true });
      });
    }),
  );
}

function clampUnit(value: number) {
  return Math.round(value * 1000) / 1000;
}

function createTunnelLayout(compactLayout: LayoutMap, pushDistance: number, activeItemId: string): LayoutMap {
  return Object.fromEntries(
    Object.entries(compactLayout).map(([id, rect]) => {
      if (id === activeItemId) {
        return [id, { x: 0, y: 0, w: 100, h: 68 }];
      }

      const centerX = rect.x + rect.w / 2;
      const centerY = rect.y + rect.h / 2;
      const vectorX = centerX - 50;
      const vectorY = centerY - 50;
      const length = Math.max(Math.hypot(vectorX, vectorY), 1);
      const distance = pushDistance + length * 0.46;
      const x = rect.x + (vectorX / length) * distance;
      const y = rect.y + (vectorY / length) * distance;

      return [
        id,
        {
          x: clampUnit(x),
          y: clampUnit(y),
          w: rect.w,
          h: rect.h,
        },
      ];
    }),
  );
}

function getSlottedLayout(baseLayout: LayoutMap, itemSlots: SlotMap): LayoutMap {
  return Object.fromEntries(
    GALLERY_ITEMS.map((item) => {
      const slotId = itemSlots[item.id] ?? item.id;
      return [item.id, baseLayout[slotId] ?? baseLayout[item.id]];
    }),
  );
}

function getLayoutSet(activeItemId: string, itemSlots: SlotMap) {
  const baseCompact = window.innerWidth <= 900 ? MOBILE_COMPACT_LAYOUT : DESKTOP_COMPACT_LAYOUT;
  const compact = getSlottedLayout(baseCompact, itemSlots);
  const spread = createTunnelLayout(compact, window.innerWidth <= 900 ? 30 : 42, activeItemId);

  return { compact, spread };
}

function applyLayout(items: HTMLElement[], layout: LayoutMap) {
  items.forEach((item) => {
    const itemId = item.dataset.galleryId;
    if (!itemId) return;

    const rect = layout[itemId];
    if (!rect) return;

    gsap.set(item, {
      left: `${rect.x}%`,
      top: `${rect.y}%`,
      width: `${rect.w}%`,
      height: `${rect.h}%`,
    });
  });
}

export function Ecossistema() {
  const [activeItemId, setActiveItemId] = useState(CENTER_ITEM_ID);
  const [itemSlots, setItemSlots] = useState<SlotMap>(INITIAL_ITEM_SLOTS);
  const sectionRef = useRef<HTMLElement>(null);
  const galleryWrapRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const activeItemIdRef = useRef(activeItemId);
  const pendingOpenRef = useRef(false);
  const shouldReduceMotionRef = useRef(false);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  activeItemIdRef.current = activeItemId;

  const scrollToOpenGallery = useCallback(() => {
    const galleryWrapElement = galleryWrapRef.current;
    if (!galleryWrapElement) return;

    const trigger = scrollTriggerRef.current;
    const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const fallbackTop = window.scrollY + galleryWrapElement.getBoundingClientRect().top + window.innerHeight * 0.66;
    const copyRevealOffset = Math.min(280, Math.max(180, window.innerHeight * 0.29));
    const targetTop = trigger ? trigger.end + copyRevealOffset : fallbackTop;

    window.scrollTo({
      top: Math.min(maxScroll, Math.max(0, targetTop)),
      behavior: shouldReduceMotionRef.current ? "auto" : "smooth",
    });
  }, []);

  const handleGalleryItemClick = useCallback(
    (itemId: string) => {
      if (itemId === activeItemIdRef.current) {
        scrollToOpenGallery();
        return;
      }

      pendingOpenRef.current = true;
      setItemSlots((currentSlots) => {
        const previousActiveItemId = activeItemIdRef.current;
        const clickedSlot = currentSlots[itemId] ?? itemId;
        const activeSlot = currentSlots[previousActiveItemId] ?? CENTER_ITEM_ID;

        return {
          ...currentSlots,
          [itemId]: activeSlot,
          [previousActiveItemId]: clickedSlot,
        };
      });
      setActiveItemId(itemId);
    },
    [scrollToOpenGallery],
  );

  useGSAP(
    () => {
      const galleryWrapElement = galleryWrapRef.current;
      const galleryElement = galleryRef.current;
      const sectionElement = sectionRef.current;
      if (!galleryWrapElement || !galleryElement || !sectionElement) return;

      const galleryItems = gsap.utils.toArray<HTMLElement>(".gallery__item", galleryElement);
      const shouldReduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      shouldReduceMotionRef.current = shouldReduceMotion;

      let cancelled = false;
      let flipCtx: gsap.Context | undefined;
      let resizeCall: gsap.core.Tween | undefined;
      let refreshCall: gsap.core.Tween | undefined;
      let lateRefreshCall: gsap.core.Tween | undefined;
      let openPendingCall: gsap.core.Tween | undefined;

      const openPendingItem = () => {
        if (!pendingOpenRef.current) return;

        pendingOpenRef.current = false;
        if (shouldReduceMotionRef.current) {
          requestAnimationFrame(scrollToOpenGallery);
          return;
        }

        openPendingCall?.kill();
        openPendingCall = gsap.delayedCall(ECOSYSTEM_CLICK_OPEN_DELAY, () => {
          requestAnimationFrame(scrollToOpenGallery);
        });
      };

      const createTween = () => {
        flipCtx?.revert();
        const layouts = getLayoutSet(activeItemId, itemSlots);
        const galleryToCopyDistance = window.innerHeight * 0.2 + ECOSYSTEM_INTRO_BOTTOM_PADDING;
        const startCompensation =
          window.innerWidth <= 900 ? 0 : window.innerHeight * ECOSYSTEM_SCROLL_START_DESKTOP_OFFSET;
        const galleryLiftDistance = getEcosystemGalleryLiftDistance(galleryWrapElement);

        galleryWrapElement.classList.remove("gallery-wrap--animating");

        flipCtx = gsap.context(() => {
          applyLayout(galleryItems, layouts.compact);
          gsap.set(galleryElement, { y: 0 });
          gsap.set(galleryItems, { xPercent: 0, yPercent: 0, scale: 1, rotate: 0 });

          const mainItem = galleryItems.find((item) => item.dataset.galleryId === activeItemId);
          const flipState = Flip.getState(galleryItems);
          applyLayout(galleryItems, layouts.spread);
          galleryItems.forEach((item) => {
            item.classList.toggle("gallery__item--main", item.dataset.galleryId === activeItemId);
          });

          if (mainItem) {
            gsap.set(mainItem, {
              transformOrigin: "50% 50%",
              "--gallery-image-focus-y": `${ECOSYSTEM_MAIN_ITEM_FOCUS_START}%`,
              "--gallery-image-scale": ECOSYSTEM_MAIN_ITEM_SCALE_START,
            });
          }

          const flip = Flip.from(flipState, {
            absolute: true,
            scale: false,
            simple: true,
            ease: "none",
            duration: 1,
          });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: galleryWrapElement,
              id: ECOSYSTEM_SCROLL_TRIGGER_ID,
              start: getEcosystemScrollStart,
              end: `+=${Math.round(
                Math.max(window.innerHeight * 0.18, galleryToCopyDistance * ECOSYSTEM_SCROLL_DISTANCE_MULTIPLIER) +
                  startCompensation,
              )}`,
              scrub: ECOSYSTEM_SCROLL_SCRUB,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              refreshPriority: 2,
              onUpdate: (self) => {
                if (!mainItem) return;

                gsap.set(mainItem, {
                  "--gallery-image-focus-y": `${gsap.utils.interpolate(
                    ECOSYSTEM_MAIN_ITEM_FOCUS_START,
                    ECOSYSTEM_MAIN_ITEM_FOCUS_END,
                    self.progress,
                  )}%`,
                  "--gallery-image-scale": gsap.utils.interpolate(
                    ECOSYSTEM_MAIN_ITEM_SCALE_START,
                    ECOSYSTEM_MAIN_ITEM_SCALE_END,
                    self.progress,
                  ),
                });
              },
              onToggle: (self) => {
                galleryWrapElement.classList.toggle("gallery-wrap--animating", self.isActive || self.progress >= 0.999);
              },
            },
          });

          tl.add(flip, 0);
          tl.to(galleryElement, { y: -galleryLiftDistance, ease: "power2.inOut", duration: 1 }, 0);
          if (mainItem) {
            tl.to(mainItem, { borderRadius: 0, ease: "none", duration: 1 }, 0);
          }
          scrollTriggerRef.current = tl.scrollTrigger ?? null;

          return () => {
            galleryItems.forEach((item) => item.classList.remove("gallery__item--main"));
            gsap.set(galleryElement, { clearProps: "transform" });
            gsap.set(galleryItems, { clearProps: "all" });
          };
        }, sectionRef);
      };

      if (shouldReduceMotion) {
        const layouts = getLayoutSet(activeItemId, itemSlots);
        applyLayout(galleryItems, layouts.compact);
        openPendingItem();
        return;
      }

      applyLayout(galleryItems, getLayoutSet(activeItemId, itemSlots).compact);

      const handleResize = () => {
        resizeCall?.kill();
        resizeCall = gsap.delayedCall(0.12, createTween);
      };

      const fontsReady = document.fonts?.ready ?? Promise.resolve();

      fontsReady.then(() => {
        if (cancelled) return;

        window.addEventListener("resize", handleResize);
        requestAnimationFrame(() => {
          if (cancelled) return;

          createTween();
          ScrollTrigger.refresh();
          refreshCall = gsap.delayedCall(0.25, () => ScrollTrigger.refresh());
          lateRefreshCall = gsap.delayedCall(0.75, () => ScrollTrigger.refresh());
          openPendingItem();
        });
      });

      waitForImages(galleryElement).then(() => {
        if (cancelled) return;

        ScrollTrigger.refresh();
      });

      return () => {
        cancelled = true;
        window.removeEventListener("resize", handleResize);
        resizeCall?.kill();
        refreshCall?.kill();
        lateRefreshCall?.kill();
        openPendingCall?.kill();
        flipCtx?.revert();
        galleryWrapElement.classList.remove("gallery-wrap--animating");
        scrollTriggerRef.current = null;
      };
    },
    { scope: sectionRef, dependencies: [activeItemId, itemSlots, scrollToOpenGallery], revertOnUpdate: true },
  );

  return (
    <section id="ecossistema" ref={sectionRef} className="ecosystem-section">
      <GridPattern
        width={40}
        height={40}
        x={-1}
        y={-1}
        className={cn(
          "absolute inset-0 h-full w-full opacity-100 pointer-events-none stroke-gray-900/[0.06]",
          "[mask-image:radial-gradient(1000px_circle_at_top_left,white,transparent)]",
        )}
      />
      <GridPattern
        width={40}
        height={40}
        x={-1}
        y={-1}
        className={cn(
          "absolute inset-0 h-full w-full opacity-100 pointer-events-none stroke-gray-900/[0.06]",
          "[mask-image:radial-gradient(1000px_circle_at_top_right,white,transparent)]",
        )}
      />
      <div className="ecosystem-intro-copy">
        <h2>Conheça o ecossistema Energisa</h2>
        <p>
          Que move o Brasil de norte a sul, conectando energia, tecnologia e novas soluções para
          um futuro mais limpo.
        </p>
      </div>
      <div ref={galleryWrapRef} className="gallery-wrap">
        <div
          id="gallery-8"
          ref={galleryRef}
          className="gallery gallery--bento gallery--switch"
          aria-label="Galeria visual do ecossistema Energisa"
        >
          {GALLERY_ITEMS.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className="gallery__item"
              data-gallery-id={item.id}
              aria-label={`Abrir imagem: ${item.alt}`}
              aria-pressed={activeItemId === item.id}
              onClick={() => handleGalleryItemClick(item.id)}
            >
              <div className="gallery__media" data-gallery-id={item.id}>
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="eager"
                  decoding="async"
                  fetchPriority={index < 4 ? "high" : "auto"}
                />
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="ecosystem-copy">
        <p className="ecosystem-copy__eyebrow">Ecossistema Energisa</p>
        <h2>Uma rede que muda de forma conforme o futuro pede.</h2>

        <div className="ecosystem-copy__body">
          {COPY_PARAGRAPHS.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
