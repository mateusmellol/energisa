# Energisa Project Memory

This file is the base memory for Codex while working in this repository.
It was adapted from the original project `CLAUDE.md` and updated to reflect
the current state of the codebase on April 28, 2026.

## Project Overview

- Project: redesign of the Energisa Nova Friburgo website.
- Goal: build a portfolio-grade, narrative-rich interactive experience, not a
  technical demo.
- Positioning: "energy company of the future" with innovation, renewable
  energy, and digital experience as the core story.
- UX posture: UI-first execution supported by UX thinking and heuristic review.

## What Matters Most

- Prioritize a strong, high-impact visual experience.
- Treat interactivity as part of the brand language, not decoration.
- Keep the site navigable, coherent, and presentation-ready.
- If a component becomes a time sink, simplify without losing the concept.
- Prefer finishing a polished experience over chasing technically ambitious but
  brittle effects.

## Visual Pillars

- Renewable energy should guide both narrative and aesthetics.
- FlexLab should feel like the proof point of innovation.
- Brand gradients should be intentional, not sprayed everywhere.
- Motion should communicate energy, scale, and sophistication.
- The site should feel immersive, but still readable and structured.

## Core Experience Areas

- Interactive hero is the centerpiece and usually deserves the most attention.
- Background depth, spatial movement, or environmental motion are welcome when
  they support clarity.
- Globe or geography-driven visuals help reinforce group scale and presence.
- Text animation should strengthen storytelling, especially in hero and
  institutional sections.

## Delivery Rules

- Start with the most complex, identity-defining component when building a new
  area.
- If stuck for more than one work session on a single component, cut scope or
  choose a simpler implementation.
- Optimize for portfolio presentation quality over production system breadth.
- Preserve responsiveness and mobile readability even when the desktop
  experience is more expressive.

## Current Source Of Truth

- The original plan referenced `Next.js + React + Tailwind + Framer Motion`.
- The current runnable app in this repository is primarily `Vite + React +
  Tailwind CSS v4`.
- There are still `Next` artifacts in the repo, so always trust the actual
  entrypoints, scripts, and active imports over older planning documents.
- When in doubt, follow:
  1. current code in `src/`
  2. `package.json` scripts and dependencies
  3. active design direction in the components
  4. older planning docs only as historical context

## Historical Context

- Original design system milestone: April 16, 2026.
- Original Claude Code build sprint: April 23-27, 2026.
- Those dates are useful as project history only. Do not treat them as the
  current execution state.

## Useful References

- Figma: `https://www.figma.com/design/ZloXvLh1eS5A2ZJ7XC1ywW/Energisa---Case-Study?node-id=3-5`
- Current brand/site reference: `https://www.energisa.com.br`
- Local notes likely relevant:
  - `MOBILE_PLAN.md`
  - `guidelines/Guidelines.md`
  - files under `skills-energisa/` when a task matches a local skill

## Working Style For This Repo

- Make decisions that preserve concept strength.
- Prefer bold but controlled UI.
- Keep motion purposeful and avoid gratuitous effects.
- Be careful with duplicate or legacy component trees before refactoring.
- Do not assume older docs are fully accurate if the code says otherwise.
