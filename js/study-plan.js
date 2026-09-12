/* =========================================================
   C++ CODE LAB — js/study-plan.js
   Loads data/study-plan.json and renders the 30-Day Plan section:
   progress ring, day checklist, streak tracker, fun facts, magic trick.
========================================================= */

const PLAN_STORAGE = {
  planProgress: 'cpplab_plan_progress',
  streak: 'cpplab_streak',
  factIndex: 'cpplab_fact_index',
  magicIndex: 'cpplab_magic_index'
};

let STUDY_DATA = { studyPlan: [], funFacts: [], magicTrick: null };
let ROADMAP_LENGTH = 16; // set from script.js's roadmap data once loaded

function initStudyPlan() {
  fetch('data/study-plan.json')
    .then(r => r.json())
    .then(json => {
      STUDY_DATA = json;
      renderStudyPlan();
      renderStreakAndFacts();
      renderMagicTrick();
      wireMagicControls();
      wireResetProgress();
    })
    .catch(err => {
      console.error('Failed to load study-plan.json', err);
    });
}

function getPlanProgress() {
  try {
    return JSON.parse(localStorage.getItem(PLAN_STORAGE.planProgress)) || {};
  } catch (e) { return {}; }
}
function savePlanProgress(progress) {
  localStorage.setItem(PLAN_STORAGE.planProgress, JSON.stringify(progress));
}

function renderStudyPlan() {
  const list = document.getElementById('planList');
  if (!list) return;
  const progress = getPlanProgress();

  list.innerHTML = STUDY_DATA.studyPlan.map(day => {
    const done = !!progress[day.day];
    return `
      <div class="plan-day ${done ? 'done' : ''}" data-day="${day.day}">
        <div class="plan-day-top">
          <span class="plan-day-num">DAY ${String(day.day).padStart(2, '0')}</span>
          <span class="badge badge-${day.difficulty}">${day.difficulty}</span>
        </div>
        <h4>${escapeHtml(day.topic)}</h4>
        <p>${escapeHtml(day.task)}</p>
        <button class="day-toggle" data-day="${day.day}">
          ${done ? '✓ Completed' : 'Mark Complete'}
        </button>
      </div>
    `;
  }).join('');

  list.querySelectorAll('.day-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const day = btn.getAttribute('data-day');
      const progress = getPlanProgress();
      progress[day] = !progress[day];
      savePlanProgress(progress);
      updateStreakOnActivity();
      renderStudyPlan();
      updatePlanDashboard();
    });
  });

  updatePlanDashboard();
}

function updatePlanDashboard() {
  const progress = getPlanProgress();
  const totalDays = STUDY_DATA.studyPlan.length;
  const completedDays = Object.values(progress).filter(Boolean).length;
  const totalModules = ROADMAP_LENGTH;
  const modulesCompleted = Math.min(totalModules, Math.round((completedDays / totalDays) * totalModules));
  const pct = totalDays ? Math.round((completedDays / totalDays) * 100) : 0;

  const daysEl = document.getElementById('daysCompleted');
  const modsEl = document.getElementById('modulesCompleted');
  const pctEl = document.getElementById('ringPercent');
  if (daysEl) daysEl.textContent = `${completedDays} / ${totalDays}`;
  if (modsEl) modsEl.textContent = `${modulesCompleted} / ${totalModules}`;
  if (pctEl) pctEl.textContent = `${pct}%`;

  const circumference = 2 * Math.PI * 60;
  const offset = circumference - (pct / 100) * circumference;
  const ringFill = document.getElementById('ringFill');
  if (ringFill) {
    ringFill.style.strokeDasharray = String(circumference);
    ringFill.style.strokeDashoffset = String(offset);
  }
}

function wireResetProgress() {
  const resetBtn = document.getElementById('resetProgressBtn');
  const continueBtn = document.getElementById('continueBtn');
  if (resetBtn) resetBtn.addEventListener('click', () => {
    localStorage.removeItem(PLAN_STORAGE.planProgress);
    localStorage.removeItem(PLAN_STORAGE.streak);
    localStorage.removeItem(PLAN_STORAGE.factIndex);
    localStorage.removeItem(PLAN_STORAGE.magicIndex);
    renderStudyPlan();
    renderStreakAndFacts();
  });
  if (continueBtn) continueBtn.addEventListener('click', () => {
    const progress = getPlanProgress();
    const nextDay = STUDY_DATA.studyPlan.find(d => !progress[d.day]);
    document.getElementById('plan').scrollIntoView({ behavior: 'smooth' });
    if (nextDay) {
      setTimeout(() => {
        const el = document.querySelector(`.plan-day[data-day="${nextDay.day}"]`);
        if (el) el.style.outline = '2px solid var(--gold)';
      }, 400);
    }
  });
}

/* ---------------- STREAK ---------------- */
function getStreakData() {
  try {
    return JSON.parse(localStorage.getItem(PLAN_STORAGE.streak)) || { count: 0, lastDate: null };
  } catch (e) { return { count: 0, lastDate: null }; }
}
function updateStreakOnActivity() {
  const data = getStreakData();
  const today = new Date().toDateString();
  if (data.lastDate === today) return;

  const yesterday = new Date(Date.now() - 86400000).toDateString();
  data.count = (data.lastDate === yesterday) ? data.count + 1 : 1;
  data.lastDate = today;
  localStorage.setItem(PLAN_STORAGE.streak, JSON.stringify(data));
}

function renderStreakAndFacts() {
  const streak = getStreakData();
  const streakEl = document.getElementById('streakCount');
  if (streakEl) streakEl.textContent = `${streak.count} Day${streak.count === 1 ? '' : 's'}`;

  renderFunFact();
  const factBtn = document.getElementById('factBtn');
  if (factBtn && !factBtn.dataset.bound) {
    factBtn.addEventListener('click', showNextFact);
    factBtn.dataset.bound = 'true';
  }
}

function getFactIndex() {
  const total = STUDY_DATA.funFacts.length || 1;
  let idx = parseInt(localStorage.getItem(PLAN_STORAGE.factIndex) || '0', 10);
  if (!Number.isFinite(idx)) idx = 0;
  return ((idx % total) + total) % total;
}

function showNextFact() {
  if (!STUDY_DATA.funFacts.length) return;
  const idx = (getFactIndex() + 1) % STUDY_DATA.funFacts.length;
  localStorage.setItem(PLAN_STORAGE.factIndex, String(idx));
  renderFunFact(idx);
}

function renderFunFact(forcedIndex) {
  if (!STUDY_DATA.funFacts.length) return;
  const idx = Number.isInteger(forcedIndex) ? forcedIndex : getFactIndex();
  const fact = STUDY_DATA.funFacts[idx];

  const textEl = document.getElementById('funFactText');
  const titleEl = document.getElementById('funFactTitle');
  const counterEl = document.getElementById('factCounter');

  if (textEl) {
    textEl.classList.remove('cwcpp-fade-in');
    void textEl.offsetWidth;
    textEl.textContent = fact;
    textEl.classList.add('cwcpp-fade-in');
  }
  if (titleEl) titleEl.textContent = `C++ Fact #${String(idx + 1).padStart(2, '0')}`;
  if (counterEl) counterEl.textContent = `${String(idx + 1).padStart(2, '0')} / ${String(STUDY_DATA.funFacts.length).padStart(2, '0')}`;
  renderDots('factDots', STUDY_DATA.funFacts.length, idx);
}

function renderDots(containerId, total, activeIndex) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  for (let i = 0; i < total; i++) {
    const dot = document.createElement('span');
    dot.className = `cwcpp-dot${i === activeIndex ? ' active' : ''}`;
    dot.setAttribute('aria-hidden', 'true');
    container.appendChild(dot);
  }
}

/* ---------------- MAGIC TRICKS ---------------- */
function getMagicTricks() {
  if (Array.isArray(STUDY_DATA.magicTricks) && STUDY_DATA.magicTricks.length) {
    return STUDY_DATA.magicTricks;
  }
  return STUDY_DATA.magicTrick ? [STUDY_DATA.magicTrick] : [];
}

function getMagicIndex() {
  const tricks = getMagicTricks();
  const total = tricks.length || 1;
  let idx = parseInt(localStorage.getItem(PLAN_STORAGE.magicIndex) || '0', 10);
  if (!Number.isFinite(idx)) idx = 0;
  return ((idx % total) + total) % total;
}

function renderMagicTrick(forcedIndex) {
  const tricks = getMagicTricks();
  if (!tricks.length) return;

  const idx = Number.isInteger(forcedIndex) ? forcedIndex : getMagicIndex();
  const trick = tricks[idx];

  const numberEl = document.getElementById('magicNumber');
  const titleEl = document.getElementById('magicTitleText');
  const teaserEl = document.getElementById('magicTeaser');
  const codeEl = document.getElementById('magicCode');
  const explainEl = document.getElementById('magicExplain');
  const revealEl = document.getElementById('magicReveal');
  const btn = document.getElementById('magicBtn');

  if (numberEl) numberEl.textContent = `TRICK ${String(idx + 1).padStart(2, '0')}`;
  if (titleEl) titleEl.textContent = trick.title || 'C++ Magic Trick';
  if (teaserEl) teaserEl.textContent = trick.teaser || '';
  if (codeEl) codeEl.textContent = trick.code || '';
  if (explainEl) explainEl.textContent = trick.reveal || '';
  if (revealEl) revealEl.classList.remove('show');

  if (titleEl) {
    titleEl.classList.remove('cwcpp-fade-in');
    void titleEl.offsetWidth;
    titleEl.classList.add('cwcpp-fade-in');
  }

  if (btn) {
    btn.textContent = idx === tricks.length - 1
      ? '✨ Show First Trick'
      : '✨ Reveal Another Trick';
  }

  renderDots('magicDots', tricks.length, idx);
}

function wireMagicControls() {
  const btn = document.getElementById('magicBtn');
  const reveal = document.getElementById('magicReveal');
  const copyBtn = document.getElementById('magicCopyBtn');

  if (btn && !btn.dataset.bound) {
    btn.addEventListener('click', () => {
      const tricks = getMagicTricks();
      if (!tricks.length) return;
      const nextIndex = (getMagicIndex() + 1) % tricks.length;
      localStorage.setItem(PLAN_STORAGE.magicIndex, String(nextIndex));
      renderMagicTrick(nextIndex);
    });
    btn.dataset.bound = 'true';
  }

  if (reveal && !reveal.dataset.bound) {
    const card = reveal.closest('.cwcpp-trick-card');
    const codeBox = card ? card.querySelector('.cwcpp-code-box') : null;
    if (codeBox) {
      codeBox.addEventListener('click', () => reveal.classList.toggle('show'));
    }
    reveal.dataset.bound = 'true';
  }

  if (copyBtn && !copyBtn.dataset.bound) {
    copyBtn.addEventListener('click', async (event) => {
      event.stopPropagation();
      const code = document.getElementById('magicCode')?.textContent || '';
      try {
        await navigator.clipboard.writeText(code);
        copyBtn.textContent = '✓ Copied';
        setTimeout(() => copyBtn.textContent = '▣ Copy', 1200);
      } catch (e) {
        copyBtn.textContent = 'Copy failed';
        setTimeout(() => copyBtn.textContent = '▣ Copy', 1200);
      }
    });
    copyBtn.dataset.bound = 'true';
  }
}

