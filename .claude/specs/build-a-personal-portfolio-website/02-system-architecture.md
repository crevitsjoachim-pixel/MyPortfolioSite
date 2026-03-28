# System Architecture Design

## Overview
**Project**: Portfolio Website
**Version**: 1.0
**Date**: 2026-03-28
**Architect**: Winston

## Architecture Summary
A WordPress-based portfolio website using a lightweight starter theme (GeneratePress) with a custom child theme for the futuristic light design. Content is managed through two Custom Post Types (Projects, Testimonials) with Advanced Custom Fields (ACF) for structured data entry. The site is statically cached for performance and hosted on affordable WordPress hosting with SSL.

## Architecture Principles
- **WordPress-native first**: Use WordPress core features and established plugins over custom code wherever possible
- **Minimal plugin footprint**: Every plugin must justify its existence — fewer plugins means fewer security vectors and better performance
- **CSS-first motion**: All animations via CSS keyframes/transitions — no heavy JS animation libraries
- **Content-code separation**: All editable content lives in the database (CPTs + ACF fields), not hardcoded in templates
- **Performance by default**: Lightweight theme, optimized images, browser caching, minimal HTTP requests

## Technology Stack

### CMS & Backend
- **Platform**: WordPress 6.x (latest stable)
- **PHP**: 8.1+ (WordPress recommended)
- **Database**: MySQL 8.0 / MariaDB 10.6+

### Theme & Frontend
- **Parent Theme**: GeneratePress (lightweight, fast, <10KB CSS, well-maintained)
- **Child Theme**: Custom child theme for all design customizations
- **CSS**: Custom CSS with CSS custom properties (variables) for design tokens (colors, spacing, typography)
- **Animations**: Pure CSS keyframes and transitions. No GSAP, no AOS library, no heavy JS.
- **JavaScript**: Vanilla JS only where needed (mobile menu toggle, smooth scroll polyfill, intersection observer for scroll-triggered animations)

### Plugins (Minimal Set)
| Plugin | Purpose | Justification |
|--------|---------|---------------|
| **ACF (Free)** | Custom fields for Projects & Testimonials CPTs | Industry standard for structured content; intuitive admin UI |
| **Contact Form 7** or **WPForms Lite** | Contact form | Lightweight, free, widely used |
| **Yoast SEO (Free)** | SEO management, sitemaps, Open Graph | Industry standard, handles meta tags and sitemaps |
| **WP Super Cache** or **LiteSpeed Cache** | Page caching | Essential for Lighthouse performance target |
| **Wordfence (Free)** or **Sucuri** | Security hardening | Login protection, firewall, malware scanning |
| **UpdraftPlus (Free)** | Automated backups | Database + files backup to cloud storage |

**Technology Justification**:
- **GeneratePress** over Astra/Kadence: Smallest footprint (~10KB), cleanest hooks system for child theme customization, no bloat. Best fit for the "lightweight" requirement.
- **ACF Free** over Pods/Meta Box: Most intuitive admin UI for non-technical users, aligns with "add content in under 5 minutes" metric.
- **No page builder** (no Elementor, Divi, WPBakery): Page builders add 200-500KB+ of CSS/JS. Custom child theme templates keep the site lean and hit Lighthouse ≥ 90.
- **No JS animation libraries**: CSS animations are GPU-accelerated, zero-dependency, and respect prefers-reduced-motion natively.

## System Components

### High-Level Architecture
```
┌──────────────────────────────────────────────────┐
│                    BROWSER                        │
│  (HTML + CSS Animations + Minimal Vanilla JS)     │
└──────────────────────┬───────────────────────────┘
                       │ HTTPS
                       ▼
┌──────────────────────────────────────────────────┐
│              WEB SERVER (Apache/Nginx)             │
│         + SSL Certificate (Let's Encrypt)          │
│         + Browser Caching Headers                  │
│         + Gzip Compression                         │
└──────────────────────┬───────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────┐
│                   WORDPRESS                       │
│                                                    │
│  ┌─────────────┐  ┌─────────────┐  ┌───────────┐ │
│  │ GeneratePress│  │    ACF      │  │  Yoast    │ │
│  │ + Child Theme│  │ (Custom     │  │   SEO     │ │
│  │ (Templates, │  │  Fields)    │  │           │ │
│  │  CSS, JS)   │  │             │  │           │ │
│  └─────────────┘  └─────────────┘  └───────────┘ │
│                                                    │
│  ┌─────────────┐  ┌─────────────┐  ┌───────────┐ │
│  │  Contact    │  │  WP Super   │  │ Wordfence │ │
│  │  Form 7     │  │  Cache      │  │ Security  │ │
│  └─────────────┘  └─────────────┘  └───────────┘ │
│                                                    │
│  ┌─────────────────────────────────────────────┐  │
│  │        Custom Post Types (functions.php)     │  │
│  │  ┌──────────────┐  ┌─────────────────────┐  │  │
│  │  │  CPT:        │  │  CPT:               │  │  │
│  │  │  portfolio   │  │  testimonial        │  │  │
│  │  │  _project    │  │                     │  │  │
│  │  └──────────────┘  └─────────────────────┘  │  │
│  └─────────────────────────────────────────────┘  │
└──────────────────────┬───────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────┐
│              MySQL / MariaDB                      │
│  wp_posts (CPTs), wp_postmeta (ACF fields)        │
│  + UpdraftPlus automated backups                  │
└──────────────────────────────────────────────────┘
```

### Component Descriptions

**1. Child Theme (`theme/portfolio-developer/`)**
- **Responsibility**: All visual presentation — templates, CSS design tokens, animations, responsive layout
- **Key files**:
  - `style.css` — Design tokens (CSS custom properties), base styles, animations
  - `functions.php` — CPT registration, ACF field groups, enqueue scripts, theme setup
  - `front-page.php` — Homepage template (hero, about, mission, projects, testimonials, contact)
  - `template-parts/hero.php` — Hero section with animated elements
  - `template-parts/project-card.php` — Reusable project card template
  - `template-parts/testimonial-card.php` — Reusable testimonial card template
  - `js/main.js` — Mobile menu, intersection observer for scroll animations (~2KB)

**2. Custom Post Type: `portfolio_project`**
- **ACF Fields**:
  - `project_client_type` (Select: Club / Firm / Other)
  - `project_problem` (Textarea — the problem solved)
  - `project_solution` (Textarea — approach and tech used)
  - `project_result` (Textarea — outcome, time/money saved)
  - `project_url` (URL — link to live project, optional)
  - `project_video_url` (URL — video embed, optional)
  - Featured Image (WordPress native — visual preview)
- **Archive**: Grid display on homepage, ordered by menu_order for manual sorting

**3. Custom Post Type: `testimonial`**
- **ACF Fields**:
  - `testimonial_quote` (Textarea)
  - `testimonial_client_name` (Text)
  - `testimonial_client_role` (Text)
  - `testimonial_client_org` (Text)
  - Featured Image (WordPress native — optional client photo)
- **Display**: Card layout on homepage, ordered by menu_order

## Data Model

### WordPress Database (standard wp_ tables)

**wp_posts** (used for both CPTs)
- `post_type`: `portfolio_project` or `testimonial`
- `post_title`: Project name or testimonial identifier
- `post_status`: `publish` / `draft`
- `menu_order`: For manual ordering
- `post_date`: For chronological fallback

**wp_postmeta** (ACF custom fields stored here)
- All ACF fields stored as key-value pairs per post
- Featured images stored as `_thumbnail_id` meta

### Data Flow
1. Admin adds project/testimonial via WordPress admin → saved to wp_posts + wp_postmeta
2. Page request → WordPress queries CPTs → child theme templates render HTML
3. WP Super Cache stores rendered HTML → subsequent requests served from cache
4. Cache invalidated automatically when content is updated

## Design System (CSS Custom Properties)

```css
:root {
  /* Colors — Soft, light, futuristic
     Two palette options — swap accent/secondary values to switch direction.
     Decision deferred to design phase. */

  /* Option A (Blue): Cool, futuristic */
  /* --color-accent: #5B9BD5;        */
  /* --color-accent-soft: #A8D1F0;   */
  /* --color-accent-glow: rgba(91, 155, 213, 0.15); */
  /* --color-secondary: #6BCCC8;     */
  /* --color-secondary-soft: rgba(107, 204, 200, 0.15); */

  /* Option B (Green): Fresh, eco-friendly */
  /* --color-accent: #6BAF8D;        */
  /* --color-accent-soft: #A8DFC4;   */
  /* --color-accent-glow: rgba(107, 175, 141, 0.15); */
  /* --color-secondary: #5BBFA0;     */
  /* --color-secondary-soft: rgba(91, 191, 160, 0.15); */

  /* Shared base (same for both options) */
  --color-bg: #FAFBFE;
  --color-bg-alt: #F0F4FA;
  --color-text: #2D3748;
  --color-text-light: #718096;
  --color-white: #FFFFFF;
  
  /* Typography */
  --font-primary: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-size-base: 1rem;
  --font-size-lg: 1.25rem;
  --font-size-xl: 2rem;
  --font-size-hero: clamp(2rem, 5vw, 3.5rem);
  --line-height: 1.7;
  
  /* Spacing */
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 2rem;
  --space-xl: 4rem;
  --space-section: clamp(4rem, 8vw, 8rem);
  
  /* Motion */
  --transition-base: 300ms ease;
  --transition-slow: 600ms ease;
  --animation-float: 6s ease-in-out infinite;
  
  /* Layout */
  --max-width: 1200px;
  --border-radius: 12px;
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Animation Definitions
```css
/* Hero floating elements */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

@keyframes float-delayed {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-15px) rotate(5deg); }
}

/* Scroll-reveal (triggered by IntersectionObserver) */
@keyframes fade-up {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Soft gradient shift on hero background */
@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
```

## Security Architecture

### WordPress Security
- **Admin access**: Strong password, limited login attempts (Wordfence)
- **SSL**: Let's Encrypt certificate (free, auto-renewing)
- **Updates**: WordPress core, theme, and plugins kept updated
- **File permissions**: Standard WordPress recommended (755 dirs, 644 files)
- **wp-config.php**: Security keys configured, debug mode off in production
- **XML-RPC**: Disabled (not needed, reduces attack surface)

### Contact Form Security
- **Spam protection**: Honeypot field + optional reCAPTCHA v3
- **Input sanitization**: WordPress built-in sanitization + Contact Form 7 validation
- **Email delivery**: Form submissions sent to configured email, no data stored in DB by default

### Data Protection
- **In transit**: TLS via Let's Encrypt
- **Backups**: UpdraftPlus to external storage (cloud), encrypted
- **No user data stored**: No accounts, no PII beyond contact form submissions (which go to email)

## Scalability & Performance

### Performance Strategy
- **Caching**: WP Super Cache serves static HTML for all visitors
- **No page builder**: ~300-500KB saved vs Elementor/Divi
- **Image optimization**: WebP format, lazy loading (WordPress native since 5.5), responsive srcset
- **Font loading**: `font-display: swap` for Inter, loaded from Google Fonts or self-hosted
- **Minimal JS**: ~2KB custom JS (mobile menu + intersection observer)
- **CSS**: Single stylesheet, ~15-20KB with all design + animations

### Performance Targets
- Lighthouse Performance: ≥ 90
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- Total page weight: < 500KB (excluding images)

### Scalability
- This is a small portfolio site — scalability beyond hosting plan limits is not a concern
- If traffic spikes: caching handles it. If sustained: upgrade hosting plan.

## Deployment Architecture

### Hosting Recommendation
**Option A (Recommended)**: Managed WordPress hosting (e.g., Starter plan on hosting provider ~30-50 EUR/year)
- Includes: MySQL, PHP, SSL, email, backups, auto-updates
- Easiest path to production

**Option B**: Azure App Service (if leveraging existing Azure skills)
- WordPress on Azure App Service + Azure Database for MySQL
- More complex setup, potentially free tier eligible
- Skills transfer to day job

### Environments
- **Development**: Local WordPress install (LocalWP — free, one-click setup)
- **Production**: Managed hosting with SSL

### Design Workflow
1. Generate layout with **Google Stitch** using a crafted AI prompt (see `design-prompt.md`)
2. Export Stitch output to **Figma** for review and refinement
3. Use Figma as the visual reference during WordPress development

### Deployment Process
1. Design in Google Stitch → Figma (visual reference)
2. Develop child theme locally in LocalWP, matching Figma design
3. Export child theme as ZIP
4. Upload to production via WordPress admin (Appearance → Themes → Add New → Upload)
5. Configure ACF field groups (export/import JSON)
6. Add content via WordPress admin

## File Structure

```
portfolio-developer/          (Child theme directory)
├── style.css                 (Theme header + design tokens + all styles)
├── functions.php             (CPTs, ACF fields, enqueue, theme support)
├── front-page.php            (Homepage — all sections)
├── header.php                (Navigation, site head)
├── footer.php                (Footer, social links, scripts)
├── template-parts/
│   ├── hero.php              (Hero section + animated elements)
│   ├── about.php             (About me section)
│   ├── mission.php           (Mission & values section)
│   ├── projects.php          (Projects grid loop)
│   ├── project-card.php      (Single project card)
│   ├── testimonials.php      (Testimonials loop)
│   ├── testimonial-card.php  (Single testimonial card)
│   └── contact.php           (Contact form + social links)
├── js/
│   └── main.js               (Mobile menu, scroll animations ~2KB)
├── img/
│   ├── hero-shapes.svg       (Floating decorative elements)
│   └── placeholder.svg       (Fallback for missing images)
├── acf-json/                 (ACF field group exports for version control)
│   ├── group_projects.json
│   └── group_testimonials.json
└── screenshot.png            (Theme screenshot for WP admin)
```

## Technical Risks & Mitigation

**Risk 1**: Plugin conflicts or updates breaking the site
- **Impact**: Medium
- **Probability**: Low (minimal plugins, all well-maintained)
- **Mitigation**: UpdraftPlus backups before updates; staging test in LocalWP; auto-update only for minor versions

**Risk 2**: Performance degradation from image-heavy projects
- **Impact**: Medium
- **Probability**: Medium
- **Mitigation**: Lazy loading, WebP format, recommended max image dimensions in admin guidance, consider ShortPixel or Imagify plugin if needed

**Risk 3**: Contact form spam
- **Impact**: Low
- **Probability**: High
- **Mitigation**: Honeypot field (default in CF7), add reCAPTCHA v3 if spam becomes an issue

## Development Guidelines

### WordPress Coding Standards
- Follow WordPress PHP Coding Standards
- Prefix all custom functions with `pd_` (portfolio developer)
- Use WordPress template hierarchy conventions
- Escape all output (`esc_html`, `esc_attr`, `esc_url`)

### Testing Strategy
- **Visual testing**: Check all sections on Chrome, Firefox, Safari, Edge
- **Responsive testing**: 320px, 768px, 1024px, 1440px, 2560px
- **Accessibility testing**: Lighthouse accessibility audit, keyboard navigation check
- **Performance testing**: Lighthouse performance audit
- **Content testing**: Add/edit/delete a project and testimonial via admin

## Future Considerations
- **Blog**: WordPress supports it natively — just create posts and add blog template
- **Project filtering**: Can be added via taxonomy on CPT + AJAX or simple JS filter
- **Analytics**: Add Google Analytics or Plausible via plugin or header script
- **Multilingual**: WPML or Polylang plugin when needed

---

## Quality Score: 92/100

**Breakdown**:
- Design Quality: 28/30 (clean separation, well-defined components, WordPress-native patterns)
- Technology Selection: 24/25 (proven stack, minimal footprint, perfect fit for requirements)
- Scalability: 18/20 (caching handles it, not overengineered for a portfolio site)
- Security: 13/15 (standard WP hardening, no user data stored, SSL)
- Feasibility: 9/10 (straightforward implementation, familiar tools, achievable by one developer)

**Trade-offs Made**:
- **No page builder**: Sacrifices visual admin editing for performance and Lighthouse score
- **GeneratePress over full custom theme**: Faster to build, well-maintained, but slight dependency on third party
- **ACF Free over Pro**: Loses repeater/flexible content fields, but free tier covers our field types
- **No staging environment**: LocalWP for testing, direct deploy to production — acceptable for a solo portfolio site