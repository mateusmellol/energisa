# Sections

This file defines all sections, their ordering, impact levels, and descriptions.
The section ID (in parentheses) is the filename prefix used to group rules.

---

## 1. Eliminating Waterfalls (async)

**Impact:** CRITICAL  
**Description:** Waterfalls are the #1 performance killer. Each sequential await adds full network latency. Eliminating them yields the largest gains.

## 2. Bundle Size Optimization (bundle)

**Impact:** CRITICAL  
**Description:** Reducing initial bundle size improves Time to Interactive and Largest Contentful Paint.

## 3. Server-Side Performance (server)

**Impact:** HIGH  
**Description:** Optimizing server-side rendering and data fetching eliminates server-side waterfalls and reduces response times.

## 4. Client-Side Data Fetching (client)

**Impact:** MEDIUM-HIGH  
**Description:** Automatic deduplication and efficient data fetching patterns reduce redundant network requests.

## 5. Re-render Optimization (rerender)

**Impact:** MEDIUM  
**Description:** Reducing unnecessary re-renders minimizes wasted computation and improves UI responsiveness.

## 6. Rendering Performance (rendering)

**Impact:** MEDIUM  
**Description:** Optimizing the rendering process reduces the work the browser needs to do.

## 7. JavaScript Performance (js)

**Impact:** LOW-MEDIUM  
**Description:** Micro-optimizations for hot paths can add up to meaningful improvements.

## 8. Advanced Patterns (advanced)

**Impact:** LOW  
**Description:** Advanced patterns for specific cases that require careful implementation.

---
**Rules:** [[advanced-effect-event-deps]] · [[advanced-event-handler-refs]] · [[advanced-init-once]] · [[advanced-use-latest]] · [[async-api-routes]] · [[async-cheap-condition-before-await]] · [[async-defer-await]] · [[async-dependencies]] · [[async-parallel]] · [[async-suspense-boundaries]] · [[bundle-barrel-imports]] · [[bundle-conditional]] · [[bundle-defer-third-party]] · [[bundle-dynamic-imports]] · [[bundle-preload]] · [[client-event-listeners]] · [[client-localstorage-schema]] · [[client-passive-event-listeners]] · [[client-swr-dedup]] · [[js-batch-dom-css]] · [[js-cache-function-results]] · [[js-cache-property-access]] · [[js-cache-storage]] · [[js-combine-iterations]] · [[js-early-exit]] · [[js-flatmap-filter]] · [[js-hoist-regexp]] · [[js-index-maps]] · [[js-length-check-first]] · [[js-min-max-loop]] · [[js-request-idle-callback]] · [[js-set-map-lookups]] · [[js-tosorted-immutable]] · [[rendering-activity]] · [[rendering-animate-svg-wrapper]] · [[rendering-conditional-render]] · [[rendering-content-visibility]] · [[rendering-hoist-jsx]] · [[rendering-hydration-no-flicker]] · [[rendering-hydration-suppress-warning]] · [[rendering-resource-hints]] · [[rendering-script-defer-async]] · [[rendering-svg-precision]] · [[rendering-usetransition-loading]] · [[rerender-defer-reads]] · [[rerender-dependencies]] · [[rerender-derived-state]] · [[rerender-derived-state-no-effect]] · [[rerender-functional-setstate]] · [[rerender-lazy-state-init]] · [[rerender-memo]] · [[rerender-memo-with-default-value]] · [[rerender-move-effect-to-event]] · [[rerender-no-inline-components]] · [[rerender-simple-expression-in-memo]] · [[rerender-split-combined-hooks]] · [[rerender-transitions]] · [[rerender-use-deferred-value]] · [[rerender-use-ref-transient-values]] · [[server-after-nonblocking]] · [[server-auth-actions]] · [[server-cache-lru]] · [[server-cache-react]] · [[server-dedup-props]] · [[server-hoist-static-io]] · [[server-no-shared-module-state]] · [[server-parallel-fetching]] · [[server-parallel-nested-fetching]] · [[server-serialization]]
