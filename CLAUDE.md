# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Enabl'IT** — Portfolio website for a digital efficiency partner (side hustle) that helps clubs and small local businesses eliminate boring repetitive work through custom apps and websites. Built as a WordPress site.

## Business Context

- Business name: **Enabl'IT**
- Positioning: Efficiency partner, not app builder. "Technologie die voor jou werkt."
- Target audience: Decision-makers at small local businesses and club boards (low IT affinity)
- Brand DNA: Reliable tradesman, anti-expert expert, honest advisor, local & accessible, transparent, show don't tell
- Language: **Dutch (nl)**
- Full brainstorming session (96 ideas, pricing, values, strategy) at: `../Dump folder/_bmad-output/brainstorming/brainstorming-session-2026-03-11-1830.md`

## BMAD Workflow Status

Session ID: `f6ec188e-cddd-4e73-b75c-3050e129082c`
Current stage: **Dev** (approved, not yet started coding)

### Completed Stages
1. **PO** (97/100) — `01-product-requirements.md`
2. **Architect** (92/100) — `02-system-architecture.md`
3. **SM** (Sprint Plan) — `03-sprint-plan.md`

All specs in: `.claude/specs/build-a-personal-portfolio-website/`

## Architecture Decisions

- **Platform**: WordPress 6.x + GeneratePress parent theme + custom child theme
- **No page builder** (no Elementor/Divi) — custom templates for Lighthouse >= 90
- **ACF Free** for Custom Post Types (Projects, Testimonials) with structured admin fields
- **6 plugins**: ACF, Contact Form 7, Yoast SEO, WP Super Cache, Wordfence, UpdraftPlus
- **Pure CSS animations** — no JS animation libraries
- **Custom JS**: mobile menu, scroll reveals, orbiting skills, project carousel, stagger testimonials, tree animation
- **Design workflow**: Google Stitch (AI prompt) -> Figma -> WordPress implementation

## Color Palette

- **Green palette (chosen)**: `#6BAF8D` accent, `#5BBFA0` secondary, `#A8DFC4` accent-soft
- Sky gradient top: `#d4eaf7` (bright sky blue)
- Body/base: `#f4f5f4` (soft warm grey)
- Underground dark: `#304d3e` (deep forest green) → smooth gradient to `#f4f5f4`
- Text: `#2D3748`, text-light: `#718096`

## Prototype (`/prototype`)

Static HTML/CSS/JS prototype. Key files:
- `index.html` — All sections, Dutch content
- `style.css` — Design tokens, animations, responsive (breakpoints: 1100px, 1024px, 768px, 480px)
- `main.js` — Mobile menu, scroll reveal, orbiting skills, project carousel, stagger testimonials, value card border glow, "Graaf dieper" scroll fade
- `tree.js` — Generative tree canvas animation with water reflections as roots (2x depth)

### Page Layout (proportions)

- **15vw**: buzzwords (left gutter, 1vw–11vw positions, 5vw buffer to cards)
- **70vw**: content cards (margin-left: 20vw, margin-right: 10vw)
- **10vw**: "Graaf dieper" (fixed bottom-right)

### Page Structure (top to bottom)

1. **Floating pill header** — sticky, rounded, glassmorphism, centered nav links + Contact CTA
   - Mobile: hamburger → slide-out panel from left with overlay
2. **Hero section** — sky gradient background (`#d4eaf7` → dark forest at waterline at 78%)
   - "Enabl'IT" brand name large above title
   - "Technologie die voor jou werkt" title, content starts at 28vh
   - Two CTAs: "Resultaten spreken" + "Samen groeien?"
   - Two generative trees (left + right), collapsing to one at 1100px
   - Water reflections below surface (stretched 2x as roots, canvas 300% hero height)
   - Full-width waterline SVG at 78% hero height
   - 3 birds + 1 cloud floating with slow wander animations
   - Click hero to regrow trees
3. **"Graaf dieper"** — fixed bottom-right (10vw zone), white, fades out at Mission section, z-index behind cards
4. **Underground section** — single smooth gradient (`#304d3e` → `#f4f5f4`, dark stays through about card, lightens by projects)
   - **17 buzzwords** scattered in left gutter, light icons on dark bg, dark icons on light bg
   - Buzzwords: Nieuwsgierig, Eerlijk, Oplossingsgericht, Toewijding, Doorzettingsvermogen, Vakmanschap, Creativiteit, Nuchter, Hands-on, Leergierig, Optimistisch, Betrouwbaar, Flexibel, Techneut, Vindingrijk, Realistisch, Passie
   - Distribution: 2 at About, 3 at Mission, 4 at Projects, 3 at Testimonials, 5 deeper

5. **About card** — profile card with orbiting skills + gradient card body
   - Left: 3-orbit animation (Java/Python/JS inner, React/Spring/WordPress middle, Azure/AI/"& meer" outer)
   - Right: transparent-to-white gradient card with circular cutout mask, right-aligned text
   - Avatar with gradient border (accent → secondary → soft) next to "Over mij" heading
   - Social icons (LinkedIn, GitHub, Email) in accent green circles
   - `underground__card--about` overrides: no bg/shadow on hover

6. **Mission & Waarden card** — 4-column grid layout
   - Top-left: title + intro text spanning 2 columns (left-aligned)
   - Top-right: 2 value cards (Betrouwbaarheid, Eerlijkheid)
   - Bottom row: 4 value cards (Transparantie, Kwaliteit, Toegankelijkheid, Onafhankelijkheid)
   - Value cards: semi-transparent glass bg, border glow effect (dark green, cursor-proximity driven via JS, mask-composite for border-only glow), 3D-ish hover lift
   - Glow element injected via JS, uses `--glow-x/y/opacity` CSS vars

7. **Projects carousel** — feature carousel layout
   - Left panel (40%): accent green bg, rounded left corners only, 3 project chips (Boogschietclub App, Offerte-automatisering, Portfoliosite)
   - Right panel (60%): transparent bg, stacked image cards with prev/next rotation
   - Cards show tech stack logos in pill-shaped badge (React Native/TS/Firebase, Python/Java/Spring, WordPress/CSS/JS)
   - Auto-play 4s, pause on hover, click to select
   - `underground__card--carousel` overrides: no bg on hover

8. **Stagger testimonials** — fan-layout carousel
   - 5 testimonial cards with corner-cut polygon clip-path
   - Center card: accent green bg, white text, bottom shadow + corner cut line
   - Side cards: staggered offset, alternating rotation (±2.5deg)
   - Click card to center, prev/next navigation buttons
   - `underground__card--testimonials` overrides: no bg
   - Testimonials: Jan Peeters, Thomas Vermeulen, Sarah De Smet, Pieter Claes, Lisa Wouters

9. **Contact section** — form + social links (outside underground)
10. **Footer** — copyright + nav links

### Responsive Cascade
- **<= 1100px**: Left tree hides, right tree expands, bird-3 hides
- **<= 1024px**: "Graaf dieper" wraps to two lines, mission grid → 3 cols, project carousel chips stay
- **<= 768px**: Buzzwords hidden, cards expand (margin-left: 1rem), header hamburger, orbit stacks above card, project carousel stacks vertically, stagger cards shrink
- **<= 480px**: "Graaf dieper" hidden, cards near full-width, stagger cards shrink more

### Interactive Features
- **Generative trees**: canvas-based, click to regrow, `prefers-reduced-motion` support
- **Water reflections**: mirrored branches stretched 2x, ripple distortion, fade gradient
- **Orbiting skills**: 3 orbits, pause on hover, tooltip labels, requestAnimationFrame
- **Value card border glow**: proximity-based (100px range), dark green glow via mask-composite, JS-injected glow element
- **Project carousel**: auto-play 4s, chip selection, card transitions with scale/rotate/opacity
- **Stagger testimonials**: array rotation, click-to-center, fan layout with offset/rotation
- **Scroll reveals**: IntersectionObserver for `.reveal` and `.dig` classes
- **"Graaf dieper"**: fixed position, fades based on mission section proximity

### Tech Stack shown in orbit
- **Inner** (clockwise): Java, Python, JavaScript
- **Middle** (counter-clockwise): React, Spring, WordPress
- **Outer** (slow clockwise): Azure, AI, & meer...

## Sprint Plan (3 weeks, ~10h/week)

- **Sprint 1**: WordPress setup, child theme, CPTs + ACF fields, navigation
- **Sprint 2**: Hero, About, Mission & Values, Projects sections
- **Sprint 3**: Testimonials, Contact, scroll animations, SEO/performance, deployment

### Blockers for Sprint 3
- Domain + hosting purchased
- Real content ready (bio, project descriptions, testimonials, photo)

## Content Sections (Dutch)

| Section | Dutch Title | CPT |
|---------|-----------|-----|
| Navigation | Over mij, Missie, Projecten, Referenties, Contact | - |
| Hero | "Technologie die voor jou werkt" | - |
| About | "Over mij" (profile card + orbiting skills) | - |
| Mission | "Missie & Waarden" (6 values in 4-col grid) | - |
| Projects | "Ons werk" (carousel, 3 projects) | `portfolio_project` |
| Testimonials | "Wat klanten zeggen" (stagger carousel, 5) | `testimonial` |
| Contact | "Laten we praten" | - |
| Footer | "Met zorg gebouwd" | - |

## Next Steps

1. Optionally: Design in Google Stitch using prompts from `design-prompt.md`, export to Figma
2. Resume BMAD dev stage — implement Sprint 1 (WordPress setup + child theme + CPTs)
3. Build WordPress theme matching the prototype design
