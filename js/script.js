/* =========================================================
   C++ CODE LAB — js/script.js
   Core orchestrator: theme, professional navbar, hero animations
   (typing + rotating text), "What is C++?", Why-Learn, Roadmap,
   Interview accordion, Resources, About, and scroll-reveal engine.
   Loads data/interview.json itself; programs.js / practice.js /
   study-plan.js / language.js handle their own sections.
========================================================= */

const THEME_KEY = 'cpplab_theme';

/* ---------------- STATIC CONTENT (not split into a data file) ---------------- */
const WHAT_IS_STATS = [
  { key: 'stat_created', value: '1979', suffix: '' },
  { key: 'stat_paradigms', value: 4, suffix: '+' },
  { key: 'stat_standard', value: 'C++23', suffix: '' },
  { key: 'stat_powers', value: '', suffix: '', text: 'Chrome · Windows · MySQL · Unreal Engine · Adobe · Spotify' }
];

const WHY_LEARN = [
  { title: 'Blazing Performance', text: 'Compiles straight to native machine code — as close to the metal as you can get.', icon: 'bolt', ribbon: 'Fastest' },
  { title: 'True Object-Oriented Power', text: 'Model real-world systems with classes, inheritance and polymorphism.', icon: 'cube' },
  { title: 'DSA & Interview Ready', text: 'The default language for data structures, algorithms and coding interviews.', icon: 'tree', ribbon: 'Interview Favorite' },
  { title: 'Competitive Programming Edge', text: 'The fastest language accepted on nearly every online judge.', icon: 'trophy' },
  { title: 'Game Development', text: 'Powers engines like Unreal Engine and countless AAA titles.', icon: 'gamepad', ribbon: 'High-Paying' },
  { title: 'Systems & OS Programming', text: 'Build operating systems, drivers, compilers and embedded firmware.', icon: 'cpu' },
  { title: 'Backbone of Real Software', text: 'Runs inside browsers, databases and the desktop apps you use daily.', icon: 'code' },
  { title: 'In High Industry Demand', text: 'Consistently ranked among the top-paying, most in-demand languages.', icon: 'chart', ribbon: 'Top-Ranked' },
  { title: 'A Gateway Language', text: 'Master C++ and picking up C, C#, Java or Rust becomes far easier.', icon: 'shield' }
];

const ROADMAP_STAGES = [
  'C++ Basics', 'Variables & Data Types', 'Operators', 'Control Flow', 'Loops',
  'Functions', 'Arrays & Strings', 'Pointers & References', 'OOP Fundamentals',
  'Inheritance & Polymorphism', 'STL Containers', 'Templates', 'Exception Handling',
  'File Handling', 'Data Structures', 'Projects & Practice'
];

const RESOURCES = [
  { title: 'C++ Basics', text: 'Syntax, variables, data types and operators explained simply.' },
  { title: 'Pointers & Memory', text: 'Understand pointers, references and manual memory management.' },
  { title: 'Object-Oriented C++', text: 'Classes, objects, inheritance, polymorphism and encapsulation.' },
  { title: 'The STL', text: 'Vectors, maps, sets, iterators and algorithms you will use constantly.' },
  { title: 'Modern C++ (11/14/17/20/23)', text: 'Lambdas, smart pointers, move semantics and newer language features.' },
  { title: 'Competitive Programming', text: 'Time complexity, STL tricks and fast I/O for contests.' },
  { title: 'Compilers & Build Tools', text: 'GCC, Clang, CMake and how a .cpp file becomes an executable.' },
  { title: 'Interview Preparation', text: 'Common DSA patterns and the questions interviewers actually ask.' }
];

ROADMAP_LENGTH = ROADMAP_STAGES.length;

/* ---------------- INIT ---------------- */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initThemeToggle();
  initNav();
  initLangSwitcher();
  initHeroTyping();
  initHeroRotator();
  initCounters();
  renderWhatIs();
  renderWhyLearn();
  renderRoadmap();
  renderResources();
  loadInterview();
  initPrograms();   // js/programs.js
  initPractice();   // js/practice.js
  initStudyPlan();  // js/study-plan.js
  applyTranslations();
  observeReveal();
});

/* ---------------- THEME ---------------- */
function initTheme() {
  const saved = localStorage.getItem(THEME_KEY) || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
}
function initThemeToggle() {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  btn.setAttribute('aria-pressed', String(current === 'light'));
  btn.addEventListener('click', () => {
    const active = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = active === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem(THEME_KEY, next);
    btn.setAttribute('aria-pressed', String(next === 'light'));
  });
}

/* ---------------- PROFESSIONAL NAVBAR ---------------- */
function initNav() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  // Dropdown groups (click to open on mobile, hover on desktop via CSS)
  document.querySelectorAll('.nav-item.has-dropdown > .nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 900) {
        e.preventDefault();
        link.parentElement.classList.toggle('open');
      }
    });
  });

  navLinks.querySelectorAll('.nav-link:not(.dropdown-toggle)').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.querySelectorAll('.nav-item.open').forEach(i => i.classList.remove('open'));
    });
  });

  // Scroll shadow + active-section highlighting
  const sections = [...document.querySelectorAll('main > section[id]')];
  const allNavLinks = [...navLinks.querySelectorAll('a.nav-link[href^="#"]')];

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 12);
  }, { passive: true });

  if ('IntersectionObserver' in window && sections.length) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          allNavLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${id}`));
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach(s => spy.observe(s));
  }
}

/* ---------------- HERO: TYPED CODE ---------------- */
function initHeroTyping() {
  const codeEl = document.querySelector('#typedCode code');
  if (!codeEl) return;
  const lines = [
    '<span class="kw">#include</span> <span class="str">&lt;iostream&gt;</span>',
    '',
    '<span class="kw">int</span> <span class="fn">main</span>() {',
    '    std::cout &lt;&lt; <span class="str">"Hello, C++!"</span>;',
    '    <span class="kw">return</span> 0;',
    '}'
  ];
  const full = lines.join('\n');
  const plain = full.replace(/<[^>]+>/g, m => '\u0000' + m + '\u0000');
  // Type out the raw markup progressively but reveal tag-safe chunks at once.
  const tokens = full.split(/(<[^>]+>)/g).filter(Boolean);
  let i = 0;
  codeEl.innerHTML = '';
  function typeNext() {
    if (i >= tokens.length) {
      codeEl.classList.add('done');
      return;
    }
    const token = tokens[i++];
    codeEl.innerHTML += token;
    const delay = token.startsWith('<') ? 0 : 18;
    setTimeout(typeNext, delay);
  }
  setTimeout(typeNext, 500);
}

/* ---------------- HERO: ROTATING WORD ---------------- */
function initHeroRotator() {
  const el = document.getElementById('heroRotator');
  if (!el) return;
  const words = ['Programs', 'Games', 'Systems', 'Algorithms', 'Careers'];
  let idx = 0;
  el.textContent = words[0];
  setInterval(() => {
    el.classList.add('rotator-out');
    setTimeout(() => {
      idx = (idx + 1) % words.length;
      el.textContent = words[idx];
      el.classList.remove('rotator-out');
    }, 280);
  }, 2400);
}

/* ---------------- ANIMATED COUNTERS ---------------- */
function initCounters() {
  const els = document.querySelectorAll('[data-counter]');
  if (!els.length || !('IntersectionObserver' in window)) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-counter'), 10);
      const suffix = el.getAttribute('data-suffix') || '';
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 40));
      const tick = () => {
        current = Math.min(target, current + step);
        el.textContent = current + suffix;
        if (current < target) requestAnimationFrame(tick);
      };
      tick();
      obs.unobserve(el);
    });
  }, { threshold: 0.4 });
  els.forEach(el => obs.observe(el));
}

/* ---------------- WHAT IS C++ (new top section) ---------------- */
function renderWhatIs() {
  const grid = document.getElementById('whatIsStats');
  if (!grid) return;
  grid.innerHTML = WHAT_IS_STATS.map(s => `
    <div class="whatis-stat">
      <strong>${escapeHtml(String(s.value))}${escapeHtml(s.suffix)}</strong>
      <span data-i18n="${s.key}">${s.key}</span>
      ${s.text ? `<em>${escapeHtml(s.text)}</em>` : ''}
    </div>
  `).join('');
}

/* ---------------- WHY LEARN ---------------- */
const ICONS = {
  bolt: 'M13 2 3 14h7l-1 8 10-12h-7z',
  cube: 'M21 8l-9-5-9 5 9 5 9-5zM3 8v8l9 5 9-5V8M12 13v8',
  tree: 'M12 2 4 12h5l-4 8h14l-4-8h5z',
  trophy: 'M8 21h8M12 17v4M6 4h12v4a6 6 0 0 1-12 0V4zM6 6H3v2a4 4 0 0 0 4 4M18 6h3v2a4 4 0 0 1-4 4',
  gamepad: 'M6 12h4M8 10v4M15 11h.01M18 13h.01M4 8h16l1 8a3 3 0 0 1-5.2 2l-1.3-1.5a2 2 0 0 0-1.5-.5h-4a2 2 0 0 0-1.5.5L6.2 18A3 3 0 0 1 1 16z',
  cpu: 'M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2M5 5h14v14H5z',
  code: 'M8 6 2 12l6 6M16 6l6 6-6 6',
  chart: 'M3 3v18h18M8 17V9M13 17V5M18 17v-7',
  shield: 'M12 2 4 6v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6z'
};
function renderWhyLearn() {
  const grid = document.getElementById('whyGrid');
  if (!grid) return;
  grid.innerHTML = WHY_LEARN.map((item, i) => `
    <div class="why-card reveal-item" style="--delay:${(i % 9) * 0.05}s">
      ${item.ribbon ? `<span class="why-ribbon">${escapeHtml(item.ribbon)}</span>` : ''}
      <div class="why-icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="${ICONS[item.icon] || ICONS.code}"/>
        </svg>
      </div>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.text)}</p>
    </div>
  `).join('');
  observeReveal();
}

/* ---------------- ROADMAP ---------------- */
function renderRoadmap() {
  const track = document.getElementById('roadmapTrack');
  if (!track) return;
  track.innerHTML = ROADMAP_STAGES.map((stage, i) => `
    <div class="roadmap-step reveal-item" style="--delay:${(i % 8) * 0.04}s">
      <div class="roadmap-num">${String(i + 1).padStart(2, '0')}</div>
      <span class="label">${escapeHtml(stage)}</span>
    </div>
  `).join('');
  observeReveal();
}

/* ---------------- INTERVIEW ---------------- */
function loadInterview() {
  fetch('data/interview.json')
    .then(r => r.json())
    .then(json => renderInterview(json.interviewQuestions || []))
    .catch(err => console.error('Failed to load interview.json', err));
}
function renderInterview(questions) {
  const list = document.getElementById('interviewList');
  if (!list) return;
  list.innerHTML = questions.map(q => `
    <div class="interview-item" data-id="${q.id}">
      <button class="interview-q" aria-expanded="false">
        <span>${q.id}. ${escapeHtml(q.question)}</span>
        <svg class="chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      <div class="interview-a"><p>${escapeHtml(q.answer)}</p></div>
    </div>
  `).join('');

  list.querySelectorAll('.interview-item').forEach(item => {
    const q = item.querySelector('.interview-q');
    q.addEventListener('click', () => {
      const isOpen = item.classList.toggle('open');
      q.setAttribute('aria-expanded', String(isOpen));
    });
  });
}

/* ---------------- RESOURCES ---------------- */
function renderResources() {
  const grid = document.getElementById('resourcesGrid');
  if (!grid) return;
  grid.innerHTML = RESOURCES.map(r => `
    <div class="resource-card reveal-item">
      <h3>${escapeHtml(r.title)}</h3>
      <p>${escapeHtml(r.text)}</p>
    </div>
  `).join('');
  observeReveal();
}

/* ---------------- SCROLL REVEAL ENGINE ---------------- */
let __revealObserver = null;
function observeReveal() {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal-item').forEach(el => el.classList.add('in-view'));
    return;
  }
  if (!__revealObserver) {
    __revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          __revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
  }
  document.querySelectorAll('.reveal-item:not(.in-view)').forEach(el => __revealObserver.observe(el));
}

/* ---------------- UTIL ---------------- */
function escapeHtml(str) {
  if (str === undefined || str === null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
