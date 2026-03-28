# Product Requirements Document — Portfolio Website

## Executive Summary
A professional portfolio website built on WordPress for a digital efficiency partner who helps clubs and small local businesses eliminate boring repetitive work through custom apps and websites. The site is the primary client acquisition and credibility tool. WordPress is chosen deliberately — it's the same platform recommended to non-technical clients, making the site a live demonstration of the "eat your own cooking" philosophy. Content (projects, testimonials) must be easily updatable without code changes.

## Business Goals
1. **Client Acquisition**: Convert warm referral visitors into leads. Growth model is concentric circles — each happy client opens the next ring of connections. The site gives referrers something concrete to point people to.
2. **Credibility & Trust**: Establish the "reliable local tradesman" brand — show up, deliver, be honest. Testimonials and live project demos do the heavy lifting.
3. **Online Presence Hub**: Canonical link between LinkedIn, GitHub, and all professional profiles. LinkedIn serves as verification; the portfolio site tells the full story.
4. **Mission Communication**: Lead with WHY, not WHAT. Mission front and center: "You started your business to do what you love — not to spend hours on administration, scheduling, and paperwork. I build digital solutions that take the boring stuff off your plate, so you can focus on what matters: your craft, your customers, your passion."
5. **Demonstrate the Craft**: The portfolio site IS a demonstration project. Using WordPress shows clients exactly what they'd get — professional, polished, and manageable without technical knowledge.
6. **Easy Content Management**: Adding new projects and testimonials should be a simple WordPress admin task — no developer needed. This proves the CMS approach recommended to clients.

## Target Audience
- **Primary**: Decision-makers at small local businesses (owners, managers) and club boards/committees — people with low IT affinity who find simple digital solutions magical
- **Secondary**: Referral visitors from existing network (archery club members, friends-of-friends, local professionals like real estate agents, gemeente council members)
- **User Context**: Non-technical stakeholders who care about results, reliability, and plain language — not technical jargon

## Brand DNA & Positioning
The site must communicate these core traits:
- **Efficiency Partner, Not App Builder**: The product is time saved, not software
- **Reliable Tradesman**: Show up on time, explain in plain language, quote clearly, deliver right first time
- **Anti-Expert Expert**: Grounded, down to earth. No pedestal, no buzzwords
- **Honest Advisor**: Will tell clients when they DON'T need an app
- **Local & Accessible**: The guy from town, not a faceless agency
- **Transparency**: Open about how things work, what things cost, no vendor lock-in
- **Show, Don't Tell**: Demo-driven, not pitch-driven

## Visual Design Direction
- **Style**: Futuristic and technology-inspired, but clean and lightweight — never heavy or cluttered
- **Color palette**: Soft, light colors on a bright base. Two directions under consideration — decide during design phase:
  - **Option A (Blue)**: Light blues, soft teals, gentle gradients. Cool and futuristic.
  - **Option B (Green)**: Soft sage greens, mint tones, warm teals. Fresh, environmentally-friendly, natural yet modern.
  - Both options: Enlightening and airy, not dark or moody. White/off-white backgrounds with soft color accents.
- **Motion**: Subtle animations on select decorative artifacts (floating elements, gentle parallax, soft hover transitions). Motion should feel organic and calming, not flashy or distracting. Less is more — only a few elements should move.
- **Typography**: Clean, modern sans-serif. Good readability. Generous whitespace.
- **Overall feel**: Professional, modern, bright, and forward-looking. The visitor should feel they're looking at someone who understands technology and the future, while also feeling welcomed and comfortable — not intimidated.
- **Constraints**: Animations must not impact Lighthouse performance score. Prefer CSS animations over JavaScript where possible. Motion must respect prefers-reduced-motion for accessibility.

## Functional Requirements

### FR-1: Hero / Landing Section
- Mission statement prominently displayed in client-facing language
- Clear value proposition visible within 5 seconds
- Call-to-action to view projects or get in touch
- Subtle animated decorative elements (e.g., floating geometric shapes, soft particle effect, or gentle gradient shift) to convey the futuristic feel
- Acceptance criteria: Visitor understands what you do and for whom within one viewport; animations are smooth and non-distracting
- Error/edge cases: Content renders correctly on all viewport sizes; CTA always visible above fold on desktop; animations gracefully disabled when prefers-reduced-motion is set

### FR-2: About Me Section
- Professional background: architect-level thinker who builds end-to-end solutions
- Personal photo
- Tone: approachable, grounded, "the local mechanic, not the dealership"
- Acceptance criteria: Visitor feels they know who they'd be working with — a real person, not a brand
- Error/edge cases: Missing photo falls back to placeholder; long text doesn't break layout

### FR-3: Mission & Values Section
- Core mission: enabling clubs and firms by removing digital friction
- Values: reliability, honesty, transparency, accessibility, quality, client independence
- Differentiator vs agencies: handles small projects agencies ignore, one person who understands both business and tech, no vendor lock-in
- Optional: subtle icon animations on hover for each value
- Acceptance criteria: Visitor understands the differentiator vs agencies and generic freelancers
- Error/edge cases: Values display consistently regardless of count; section renders well at all viewport sizes

### FR-4: Projects / Portfolio Section (CMS-Managed)
- **Must be a Custom Post Type in WordPress** so new projects can be added via the admin panel without code changes
- Each project includes: name, client type (club/firm), problem solved, approach/tech used, visual preview (featured image or video embed), link to live project
- Frame each project as: problem → solution → result (time/money saved)
- **Show, don't tell**: Prefer screen recordings, video embeds, or multiple images over single screenshots
- Initial projects: archery club app, proposal automation tool, portfolio site itself
- Subtle hover/scroll animations on project cards
- Acceptance criteria: New projects can be added entirely from WordPress admin; each project tells a problem→solution→result story; projects display in a grid/list with consistent styling
- Error/edge cases: External project links that are down show gracefully; empty portfolio shows meaningful message; missing images show fallback; video embeds that fail don't break layout

### FR-5: Testimonials Section (CMS-Managed)
- **Must be a Custom Post Type in WordPress** so new testimonials can be added via the admin panel without code changes
- Each testimonial includes: quote text, client name, role, organization, optional photo
- 3-5 testimonials from different client types (clubs, businesses)
- Acceptance criteria: New testimonials can be added entirely from WordPress admin; testimonials display attractively and build trust; adding a testimonial requires no technical knowledge
- Error/edge cases: Very long quotes handled gracefully; fewer than 3 testimonials still looks balanced; special characters render correctly; missing client photo uses fallback

### FR-6: Contact Section
- Clear call-to-action for prospective clients
- Contact form (WordPress plugin such as Contact Form 7 or WPForms)
- Social profile links: LinkedIn, GitHub, and others — opening in new tabs
- Tone: inviting, low-pressure
- Acceptance criteria: Visitor can reach out or find profiles within 2 clicks from any page; form submissions arrive via email
- Error/edge cases: Form validation for empty/invalid fields; submission failure shows user-friendly error; spam protection (honeypot or reCAPTCHA); broken social links handled gracefully

### FR-7: Navigation & Responsiveness
- Responsive navigation on mobile (320px), tablet, and desktop (up to 2560px)
- Smooth scrolling between sections or clear page navigation
- Mobile-first approach
- Acceptance criteria: All content readable and navigable across all target viewports
- Error/edge cases: Menu collapses to hamburger on mobile; works without JavaScript for basic navigation

## Technical Requirements
- **Platform**: WordPress (latest stable version)
- **Theme**: Custom theme or quality starter theme (e.g., GeneratePress, Astra, Kadence) — lightweight, fast, customizable. Must support the futuristic light design direction.
- **Custom Post Types**: Projects and Testimonials as CPTs with custom fields (via ACF or similar)
- **Plugins**: Minimal plugin footprint — contact form, custom fields, SEO, caching, security essentials only
- **Animations**: CSS-based where possible (keyframes, transitions). Minimal JavaScript for motion. Respect prefers-reduced-motion media query.
- **Hosting**: WordPress-compatible hosting (options: managed WP hosting, Azure App Service, or affordable shared hosting). Budget constraint: ~30 EUR/year or use free tier where possible
- **Performance**: Lighthouse performance score ≥ 90, FCP < 1.5s (animations must not degrade this)
- **Accessibility**: WCAG 2.1 AA compliance, semantic HTML, keyboard navigable, prefers-reduced-motion support
- **SEO**: Yoast SEO or similar, Open Graph tags, semantic headings, XML sitemap
- **Security**: Keep WordPress core and plugins updated, strong admin password, limit login attempts, SSL certificate
- **Browser support**: Latest 2 versions of Chrome, Firefox, Safari, Edge
- **Backup**: Regular automated backups of database and uploads

## Scope & Priorities

### Must-Have (MVP)
- WordPress installation with custom theme or configured starter theme
- Futuristic light visual design with soft color palette
- Hero section with mission statement and subtle animated elements
- About Me section
- Mission & Values section
- Projects CPT with admin-editable fields (3 initial projects)
- Testimonials CPT with admin-editable fields (3 initial testimonials)
- Contact section with form and social links
- Responsive design (mobile-first)
- Subtle motion on select elements (hero, project cards)
- Basic SEO setup
- SSL and basic security hardening

### Nice-to-Have (Post-MVP)
- Project filtering by type (club/firm) or technology
- Additional scroll-triggered animations
- Video embeds in project showcases
- Analytics integration (Google Analytics or privacy-friendly alternative)
- Multilingual support if needed later

### Out of Scope
- Dark mode (design is intentionally light and enlightening)
- E-commerce or payments
- User accounts or membership features
- Blog (can be added later as WordPress supports it natively)
- Custom plugin development
- Multi-site setup
- Heavy JavaScript animation libraries

## Success Metrics
- **Performance**: Lighthouse score ≥ 90 for performance, accessibility, SEO, best practices
- **Load time**: First Contentful Paint < 1.5s on 3G connection
- **Responsiveness**: All sections usable on viewports from 320px to 2560px
- **Content management**: Non-technical user can add a new project or testimonial in under 5 minutes via WordPress admin
- **Visual quality**: Animations smooth at 60fps, no layout shifts caused by motion
- **Engagement**: Average session duration > 60 seconds (once analytics added)
- **Conversion**: Contact form submissions trackable once analytics added
- **Quality**: Zero broken links, images load or show fallbacks, smooth navigation
- **Accessibility**: Animations disabled when prefers-reduced-motion is active

## Timeline & Milestones
- **Milestone 1**: WordPress setup, hosting, theme selection, and design system (colors, typography, motion rules)
- **Milestone 2**: Custom Post Types (Projects, Testimonials) with admin fields configured
- **Milestone 3**: All page sections implemented with real content and visual design applied
- **Milestone 4**: Animations, responsive polish, performance optimization, SEO, accessibility
- **Milestone 5**: Final review, cross-browser testing, deployment, admin walkthrough

## Open Items
- None — all questions resolved