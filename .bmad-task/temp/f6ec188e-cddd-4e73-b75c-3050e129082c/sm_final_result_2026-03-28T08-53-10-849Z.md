# Sprint Plan — Portfolio Website

## Overview
**Project**: Portfolio Website (WordPress)
**Sprint Duration**: 1 weekend day (~6-7h deep work) + scattered evenings (~1-2h, few nights) = ~10h/week
**Team Capacity**: 1 developer (solo side hustle, after-hours)
**Prepared By**: Mike (Scrum Master)
**Date**: 2026-03-28

## Sprint Goal
Deliver a fully functional, deployed portfolio website on WordPress with all 5 content sections, CMS-managed projects and testimonials, subtle animations, and responsive design.

## Sprint Backlog

### Sprint 1: Foundation (Week 1 — ~10h)

**Story 1.1: WordPress Setup & Theme Foundation**
- **As a** developer
- **I want** a local WordPress environment with GeneratePress + child theme configured
- **So that** I have a working development environment to build on
- **Story Points**: 5
- **Priority**: High

**Tasks**:
1. [ ] Install LocalWP and create new WordPress site (Est: 30min)
2. [ ] Install GeneratePress parent theme (Est: 15min)
3. [ ] Create child theme `portfolio-developer/` with `style.css` header and `functions.php` (Est: 30min)
4. [ ] Set up CSS custom properties (design tokens: colors, typography, spacing, motion) — both palette options as comments (Est: 1h)
5. [ ] Configure WordPress settings: permalink structure, static front page, site title/tagline (Est: 15min)
6. [ ] Install and configure plugins: ACF Free, Contact Form 7, Yoast SEO (Est: 30min)

**Acceptance Criteria**:
- [ ] LocalWP running with WordPress accessible at local URL
- [ ] Child theme active with design tokens in place
- [ ] All plugins installed and activated
- [ ] Static front page configured

**Story 1.2: Custom Post Types & ACF Fields**
- **As a** site admin
- **I want** Projects and Testimonials as Custom Post Types with structured fields
- **So that** I can add/edit portfolio items and testimonials from the WordPress admin
- **Story Points**: 5
- **Priority**: High

**Tasks**:
1. [ ] Register CPT `portfolio_project` in functions.php with labels, supports, menu icon (Est: 45min)
2. [ ] Register CPT `testimonial` in functions.php with labels, supports, menu icon (Est: 30min)
3. [ ] Create ACF field group for Projects: client_type, problem, solution, result, project_url, video_url (Est: 45min)
4. [ ] Create ACF field group for Testimonials: quote, client_name, client_role, client_org (Est: 30min)
5. [ ] Enable ACF JSON sync in `acf-json/` directory (Est: 15min)
6. [ ] Add 3 sample projects and 3 sample testimonials via admin (Est: 1h)

**Acceptance Criteria**:
- [ ] Projects and Testimonials appear in WP admin sidebar
- [ ] All custom fields visible and editable in admin
- [ ] Sample content saved and retrievable
- [ ] ACF field groups exported to JSON

**Story 1.3: Header & Navigation**
- **As a** visitor
- **I want** a clean, responsive navigation bar
- **So that** I can navigate between sections on any device
- **Story Points**: 3
- **Priority**: High

**Tasks**:
1. [ ] Create `header.php` with site logo/name, navigation menu, mobile hamburger (Est: 1h)
2. [ ] Style navigation: sticky header, smooth scroll links, mobile collapse (Est: 1h)
3. [ ] Add mobile menu toggle in `js/main.js` (Est: 30min)

**Acceptance Criteria**:
- [ ] Navigation visible on all pages
- [ ] Hamburger menu works on mobile (< 768px)
- [ ] Smooth scroll to sections on click
- [ ] Sticky header on scroll

---

### Sprint 2: Content Sections (Week 2 — ~10h)

**Story 2.1: Hero Section**
- **As a** visitor
- **I want** to immediately understand what this business offers
- **So that** I know if this person can help my club/firm
- **Story Points**: 5
- **Priority**: High

**Tasks**:
1. [ ] Create `template-parts/hero.php` with mission statement, subtitle, CTA buttons (Est: 45min)
2. [ ] Style hero: full-viewport height, gradient background, typography (Est: 1h)
3. [ ] Add floating SVG decorative elements with CSS float animation (Est: 1h)
4. [ ] Create `img/hero-shapes.svg` — 2-3 simple geometric shapes (Est: 30min)
5. [ ] Add `prefers-reduced-motion` override to disable hero animations (Est: 15min)

**Acceptance Criteria**:
- [ ] Mission statement readable within 5 seconds
- [ ] CTA buttons visible above fold on desktop
- [ ] Floating elements animate smoothly
- [ ] Animations disabled when reduced motion preferred
- [ ] Responsive on all viewports

**Story 2.2: About Me Section**
- **As a** visitor
- **I want** to know who I'd be working with
- **So that** I can feel confident about this person
- **Story Points**: 3
- **Priority**: High

**Tasks**:
1. [ ] Create `template-parts/about.php` with photo, bio text, background summary (Est: 45min)
2. [ ] Style: two-column layout (photo + text), single column on mobile (Est: 45min)
3. [ ] Add placeholder image fallback (Est: 15min)

**Acceptance Criteria**:
- [ ] Photo + bio visible
- [ ] Responsive layout works on all viewports
- [ ] Placeholder shows when no photo uploaded

**Story 2.3: Mission & Values Section**
- **As a** visitor
- **I want** to understand this person's mission and values
- **So that** I can assess if their approach aligns with my needs
- **Story Points**: 3
- **Priority**: High

**Tasks**:
1. [ ] Create `template-parts/mission.php` with mission statement and values grid (Est: 45min)
2. [ ] Style values as cards/icons with hover effect (Est: 45min)
3. [ ] Add subtle hover animation on value cards (Est: 15min)

**Acceptance Criteria**:
- [ ] Mission clearly stated
- [ ] Values displayed in a grid/flex layout
- [ ] Hover animations smooth and subtle
- [ ] Responsive on all viewports

**Story 2.4: Projects Section**
- **As a** visitor
- **I want** to see examples of past work
- **So that** I can judge quality and relevance
- **Story Points**: 5
- **Priority**: High

**Tasks**:
1. [ ] Create `template-parts/projects.php` with WP_Query loop for `portfolio_project` CPT (Est: 45min)
2. [ ] Create `template-parts/project-card.php` with featured image, title, problem/solution/result, link (Est: 1h)
3. [ ] Style project cards: grid layout, hover lift effect, consistent sizing (Est: 1h)
4. [ ] Handle edge cases: empty portfolio message, missing image fallback, broken external link (Est: 30min)

**Acceptance Criteria**:
- [ ] All published projects display in grid
- [ ] Each card shows problem → solution → result narrative
- [ ] Hover animation on cards
- [ ] Missing images show placeholder
- [ ] Empty state handled gracefully

---

### Sprint 3: Contact, Polish & Deploy (Week 3 — ~10h)

**Story 3.1: Testimonials Section**
- **As a** visitor
- **I want** to read what other clients say
- **So that** I feel more confident about reaching out
- **Story Points**: 3
- **Priority**: High

**Tasks**:
1. [ ] Create `template-parts/testimonials.php` with WP_Query loop for `testimonial` CPT (Est: 30min)
2. [ ] Create `template-parts/testimonial-card.php` with quote, name, role, org, optional photo (Est: 45min)
3. [ ] Style testimonial cards: quote styling, client info, optional photo circle (Est: 45min)
4. [ ] Handle edge cases: long quotes, missing photo fallback, fewer than 3 testimonials (Est: 15min)

**Acceptance Criteria**:
- [ ] All published testimonials display attractively
- [ ] Long quotes don't break layout
- [ ] Missing photos show fallback
- [ ] Works with 1-5+ testimonials

**Story 3.2: Contact Section**
- **As a** visitor
- **I want** to easily get in touch or find social profiles
- **So that** I can start a conversation about my project
- **Story Points**: 3
- **Priority**: High

**Tasks**:
1. [ ] Create `template-parts/contact.php` with CF7 shortcode and social links (Est: 30min)
2. [ ] Configure Contact Form 7: name, email, message fields, honeypot, email recipient (Est: 30min)
3. [ ] Style contact section: form layout, social link icons, CTA text (Est: 45min)
4. [ ] Social links open in new tab, add `rel="noopener noreferrer"` (Est: 15min)

**Acceptance Criteria**:
- [ ] Contact form submits and delivers email
- [ ] Form validation works (empty fields, invalid email)
- [ ] Social links (LinkedIn, GitHub) work and open in new tab
- [ ] Spam protection active (honeypot)

**Story 3.3: Footer**
- **As a** visitor
- **I want** a clean footer with essential info
- **So that** I can find navigation and legal basics
- **Story Points**: 1
- **Priority**: Medium

**Tasks**:
1. [ ] Create `footer.php` with copyright, navigation links, social links (Est: 30min)
2. [ ] Style footer: clean, minimal, consistent with design (Est: 30min)

**Acceptance Criteria**:
- [ ] Footer visible on all pages
- [ ] Copyright year dynamic
- [ ] Social links present

**Story 3.4: Scroll Animations**
- **As a** visitor
- **I want** sections to gently animate into view as I scroll
- **So that** the site feels polished and modern
- **Story Points**: 3
- **Priority**: Medium

**Tasks**:
1. [ ] Implement IntersectionObserver in `js/main.js` to detect section entry (Est: 45min)
2. [ ] Add `fade-up` CSS animation class triggered on scroll (Est: 30min)
3. [ ] Apply to: about, mission, project cards, testimonial cards, contact (Est: 30min)
4. [ ] Ensure `prefers-reduced-motion` disables all scroll animations (Est: 15min)

**Acceptance Criteria**:
- [ ] Sections animate in smoothly on first scroll
- [ ] No animation replay on re-scroll
- [ ] Animations disabled for reduced motion preference
- [ ] No layout shift (CLS < 0.1)

**Story 3.5: SEO, Performance & Accessibility**
- **As a** business owner
- **I want** the site to rank well and load fast
- **So that** potential clients can find me and have a great experience
- **Story Points**: 3
- **Priority**: High

**Tasks**:
1. [ ] Configure Yoast SEO: title templates, meta descriptions, Open Graph defaults (Est: 30min)
2. [ ] Add semantic HTML: proper heading hierarchy, landmarks, alt texts (Est: 30min)
3. [ ] Optimize images: WebP format, appropriate dimensions, lazy loading verified (Est: 30min)
4. [ ] Run Lighthouse audit and fix any issues to hit ≥ 90 across all categories (Est: 1h)
5. [ ] Test keyboard navigation through all sections (Est: 15min)

**Acceptance Criteria**:
- [ ] Lighthouse ≥ 90 for Performance, Accessibility, SEO, Best Practices
- [ ] FCP < 1.5s
- [ ] All images have alt text
- [ ] Keyboard navigation works end-to-end

**Story 3.6: Deployment**
- **As a** business owner
- **I want** the site live on a real domain
- **So that** clients can visit my portfolio
- **Story Points**: 3
- **Priority**: High

**Tasks**:
1. [ ] Purchase domain and set up hosting (Est: 1h)
2. [ ] Install WordPress on production, configure SSL (Est: 30min)
3. [ ] Upload child theme ZIP, install and activate (Est: 15min)
4. [ ] Install and configure all plugins on production (Est: 30min)
5. [ ] Import ACF field groups via JSON (Est: 15min)
6. [ ] Add real content: projects, testimonials, about text, photo (Est: 1h)
7. [ ] Install WP Super Cache + Wordfence + UpdraftPlus, configure each (Est: 30min)
8. [ ] Final cross-browser test: Chrome, Firefox, Safari, Edge (Est: 30min)
9. [ ] Final responsive test: mobile, tablet, desktop (Est: 30min)

**Acceptance Criteria**:
- [ ] Site accessible at production URL with SSL
- [ ] All content in place
- [ ] Caching, security, and backup plugins configured
- [ ] Passes cross-browser and responsive checks
- [ ] Contact form delivers email from production

## Dependencies

**External Dependencies**:
- [ ] Domain name purchased — **Blocker**: Yes — needed for Sprint 3 deployment
- [ ] Hosting account set up — **Blocker**: Yes — needed for Sprint 3 deployment
- [ ] Real content (bio text, project descriptions, testimonial quotes, photo) — **Blocker**: Yes for final deployment
- [ ] Color palette decision (blue vs green) — **Blocker**: No — can build with one and swap tokens

**Internal Dependencies**:
- Story 1.2 (CPTs) depends on Story 1.1 (WP setup) completion
- Stories 2.1-2.4 depend on Story 1.1 + 1.2 + 1.3 (foundation)
- Story 3.4 (scroll animations) depends on all content sections existing
- Story 3.5 (SEO/perf) depends on all content sections existing
- Story 3.6 (deployment) depends on everything else

## Capacity Planning

**Total Story Points**: 46
**Sprint Velocity**: ~15 points/week (~10h/week)
**Estimated Duration**: 3 weeks (3 sprints)
**Confidence Level**: High — straightforward WordPress development, no unknowns

**Per-Sprint Allocation**:
- Sprint 1 (Foundation): 13 points — setup, CPTs, navigation
- Sprint 2 (Content): 16 points — hero, about, mission, projects
- Sprint 3 (Polish & Deploy): 16 points — testimonials, contact, animations, SEO, deploy

## Definition of Done

A story is considered "Done" when:
- [ ] Code is written in child theme
- [ ] Tested visually on Chrome desktop + mobile
- [ ] Responsive on 320px and 1440px viewports
- [ ] No PHP errors or warnings
- [ ] WordPress coding standards followed
- [ ] All output properly escaped

## Testing Strategy

### Visual Testing
- Check each section on Chrome, Firefox, Safari, Edge
- Screenshot comparison at 320px, 768px, 1024px, 1440px

### Accessibility Testing
- Lighthouse accessibility audit ≥ 90
- Keyboard navigation through all sections
- Screen reader check on hero and navigation

### Performance Testing
- Lighthouse performance ≥ 90
- FCP < 1.5s verified

### Content Management Testing
- Add a new project via WP admin → verify it appears on site
- Add a new testimonial via WP admin → verify it appears on site
- Edit and delete content → verify changes reflected

## Notes & Assumptions

**Assumptions**:
- Developer has WordPress experience (PHP, theme development)
- LocalWP available for local development
- Real content (text, images) prepared by Sprint 3
- Domain and hosting purchased before Sprint 3

**Color Palette**:
- Build Sprint 1-2 with one palette option (e.g., Blue)
- CSS custom properties make switching to Green a 5-minute task
- Final decision can be made at any point before deployment

## Follow-up (Post-MVP)

**Potential future sprints**:
- Project filtering by type (taxonomy + JS filter)
- Video embeds in project showcases
- Analytics integration (Plausible or GA)
- Additional scroll animations
- Content refinement based on visitor feedback