// ===========================
// Mobile Menu
// ===========================
const navToggle = document.getElementById('nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
const mobileMenuClose = document.getElementById('mobile-menu-close');

function openMobileMenu() {
  mobileMenu.classList.add('open');
  navToggle.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  mobileMenu.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

if (navToggle && mobileMenu) {
  navToggle.addEventListener('click', openMobileMenu);
  mobileMenuOverlay.addEventListener('click', closeMobileMenu);
  mobileMenuClose.addEventListener('click', closeMobileMenu);

  // Close menu when clicking a link
  mobileMenu.querySelectorAll('.mobile-menu__link').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });
}

// ===========================
// Header scroll effect
// ===========================
const header = document.getElementById('site-header');

if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

// ===========================
// Scroll reveal (IntersectionObserver)
// ===========================
const digElements = document.querySelectorAll('.reveal, .dig');

if (digElements.length > 0 && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  digElements.forEach(el => observer.observe(el));
} else {
  digElements.forEach(el => el.classList.add('visible'));
}

// ===========================
// "Graaf dieper" — fades out when reaching mission section
// ===========================
const digHint = document.querySelector('.hero__dig-hint');
const missionSection = document.getElementById('mission');
if (digHint) {
  digHint.classList.add('visible');

  if (missionSection) {
    window.addEventListener('scroll', () => {
      const missionTop = missionSection.getBoundingClientRect().top;
      const fadeStart = window.innerHeight * 1.5;
      const fadeEnd = window.innerHeight * 0.3;
      if (missionTop > fadeStart) {
        digHint.style.opacity = '1';
      } else if (missionTop < fadeEnd) {
        digHint.style.opacity = '0';
      } else {
        const ratio = (missionTop - fadeEnd) / (fadeStart - fadeEnd);
        digHint.style.opacity = ratio.toFixed(2);
      }
    }, { passive: true });
  }
}


// ===========================
// Value card border glow on proximity
// ===========================
const valueCards = document.querySelectorAll('.value-card');
const GLOW_RANGE = 120;

// Inject glow element into each card
valueCards.forEach(card => {
  const glow = document.createElement('div');
  glow.className = 'value-card__glow';
  card.appendChild(glow);
});

document.addEventListener('pointermove', (e) => {
  const { clientX: x, clientY: y } = e;

  valueCards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const cx = Math.max(rect.left, Math.min(x, rect.right));
    const cy = Math.max(rect.top, Math.min(y, rect.bottom));
    const dist = Math.hypot(x - cx, y - cy);
    const glow = card.querySelector('.value-card__glow');

    if (dist < GLOW_RANGE && glow) {
      const opacity = Math.pow(1 - dist / GLOW_RANGE, 1.5).toFixed(2);
      const lx = x - rect.left + 3; // offset for the -3px inset
      const ly = y - rect.top + 3;
      glow.style.setProperty('--glow-x', lx + 'px');
      glow.style.setProperty('--glow-y', ly + 'px');
      glow.style.setProperty('--glow-opacity', opacity);
    } else if (glow) {
      glow.style.setProperty('--glow-opacity', '0');
    }
  });
});

// ===========================
// Stagger Testimonials
// ===========================
const staggerEl = document.getElementById('stagger-testimonials');
if (staggerEl) {
  const cards = Array.from(staggerEl.querySelectorAll('.stagger__card'));
  const prevBtn = document.getElementById('stagger-prev');
  const nextBtn = document.getElementById('stagger-next');
  const cardWidth = 320;
  const cardSpacing = cardWidth / 1.5;

  function layoutStagger() {
    const centerIdx = Math.floor(cards.length / 2);
    cards.forEach((card, i) => {
      const pos = i - centerIdx;
      const isCenter = pos === 0;
      const isOdd = pos % 2 !== 0;

      card.classList.toggle('stagger__card--center', isCenter);

      const tx = cardSpacing * pos;
      const ty = isCenter ? -50 : (isOdd ? 15 : -15);
      const rot = isCenter ? 0 : (isOdd ? 2.5 : -2.5);

      card.style.transform = `translate(-50%, -50%) translateX(${tx}px) translateY(${ty}px) rotate(${rot}deg)`;
      card.style.zIndex = isCenter ? 10 : (5 - Math.abs(pos));
    });
  }

  function moveStagger(steps) {
    if (steps > 0) {
      for (let i = 0; i < steps; i++) cards.push(cards.shift());
    } else {
      for (let i = 0; i < Math.abs(steps); i++) cards.unshift(cards.pop());
    }
    layoutStagger();
  }

  prevBtn.addEventListener('click', () => moveStagger(-1));
  nextBtn.addEventListener('click', () => moveStagger(1));

  // Click a card to bring it to center
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const centerIdx = Math.floor(cards.length / 2);
      const currentIdx = cards.indexOf(card);
      const diff = currentIdx - centerIdx;
      if (diff !== 0) moveStagger(diff);
    });
  });

  layoutStagger();
}

// ===========================
// Project Carousel
// ===========================
const carousel = document.getElementById('project-carousel');
if (carousel) {
  const chips = carousel.querySelectorAll('.carousel__chip');
  const cards = carousel.querySelectorAll('.carousel__card');
  let currentProject = 0;
  let paused = false;
  const INTERVAL = 4000;

  function setActiveProject(index) {
    const len = cards.length;
    const prev = (index - 1 + len) % len;
    const next = (index + 1) % len;

    chips.forEach((c, i) => {
      c.classList.toggle('carousel__chip--active', i === index);
    });

    cards.forEach((c, i) => {
      c.classList.remove('carousel__card--active', 'carousel__card--prev', 'carousel__card--next');
      if (i === index) c.classList.add('carousel__card--active');
      else if (i === prev) c.classList.add('carousel__card--prev');
      else if (i === next) c.classList.add('carousel__card--next');
    });

    currentProject = index;
  }

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      setActiveProject(parseInt(chip.dataset.index));
    });
    chip.addEventListener('mouseenter', () => { paused = true; });
    chip.addEventListener('mouseleave', () => { paused = false; });
  });

  setInterval(() => {
    if (!paused) {
      setActiveProject((currentProject + 1) % cards.length);
    }
  }, INTERVAL);
}

// ===========================
// Orbiting Skills Animation
// ===========================
const orbitContainer = document.getElementById('orbiting-skills');
if (orbitContainer) {
  const skills = orbitContainer.querySelectorAll('.orbit-skill');
  const orbitRadii = { inner: 80, middle: 125, outer: 170 };
  const orbitSpeeds = { inner: 0.8, middle: -0.5, outer: 0.35 };
  let time = 0;
  let paused = false;

  // Add tooltip labels
  skills.forEach(skill => {
    const label = document.createElement('span');
    label.className = 'orbit-skill__label';
    label.textContent = skill.dataset.label;
    skill.appendChild(label);
  });

  orbitContainer.addEventListener('mouseenter', () => { paused = true; });
  orbitContainer.addEventListener('mouseleave', () => { paused = false; });

  let lastTime = performance.now();
  function animateOrbits(now) {
    if (!paused) {
      const dt = (now - lastTime) / 1000;
      time += dt;
    }
    lastTime = now;

    skills.forEach(skill => {
      const orbit = skill.dataset.orbit;
      const radius = orbitRadii[orbit] || 90;
      const speed = orbitSpeeds[orbit] || 0.5;
      const phase = parseFloat(skill.dataset.phase) || 0;
      const angle = time * speed + phase;

      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      skill.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 50%))`;
      skill.style.setProperty('--tx', `calc(${x}px - 50%)`);
      skill.style.setProperty('--ty', `calc(${y}px - 50%)`);
    });

    requestAnimationFrame(animateOrbits);
  }

  requestAnimationFrame(animateOrbits);
}

// ===========================
// Dynamic year in footer
// ===========================
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
