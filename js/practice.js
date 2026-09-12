/* =========================================================
   C++ CODE LAB — js/practice.js
   Loads data/practice.json and renders the redesigned Practice Zone:
   difficulty filters, expandable cards, a "mark solved" tracker,
   and solutions opened in the shared code modal.
========================================================= */

let PRACTICE_DATA = [];
let practiceFilter = 'all';
let practiceExpanded = false;
const INITIAL_PRACTICE_COUNT = 4;
const PRACTICE_SOLVED_KEY = 'cpplab_practice_solved';

function initPractice() {
  fetch('data/practice.json')
    .then(r => r.json())
    .then(json => {
      PRACTICE_DATA = json.practiceProblems || [];
      renderPracticeToolbar();
      renderPractice();
      wirePracticeToggle();
    })
    .catch(err => {
      console.error('Failed to load practice.json', err);
      const list = document.getElementById('practiceList');
      if (list) list.innerHTML = '<div class="no-results">Unable to load practice problems.</div>';
    });
}

function getSolvedSet() {
  try {
    return new Set(JSON.parse(localStorage.getItem(PRACTICE_SOLVED_KEY)) || []);
  } catch (e) { return new Set(); }
}
function saveSolvedSet(set) {
  localStorage.setItem(PRACTICE_SOLVED_KEY, JSON.stringify([...set]));
}

function renderPracticeToolbar() {
  const bar = document.getElementById('practiceFilterBar');
  if (!bar) return;
  const diffs = ['all', 'Beginner', 'Intermediate', 'Advanced'];
  bar.innerHTML = diffs.map(d => `
    <button class="filter-btn ${d === 'all' ? 'active' : ''}" data-pfilter="${d}">
      ${d === 'all' ? 'All' : d}
    </button>
  `).join('');
  bar.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      bar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      practiceFilter = btn.getAttribute('data-pfilter');
      practiceExpanded = false;
      renderPractice();
    });
  });
}

function getFilteredPractice() {
  return PRACTICE_DATA.filter(p => practiceFilter === 'all' || p.difficulty === practiceFilter);
}

function renderPractice() {
  const list = document.getElementById('practiceList');
  if (!list) return;
  const solved = getSolvedSet();
  const filtered = getFilteredPractice();
  const visible = practiceExpanded ? filtered : filtered.slice(0, INITIAL_PRACTICE_COUNT);

  updatePracticeProgress(solved);

  if (filtered.length === 0) {
    list.innerHTML = `<div class="no-results">No problems in this difficulty yet.</div>`;
  } else {
    list.innerHTML = visible.map((p, i) => {
      const isSolved = solved.has(p.id);
      return `
      <div class="practice-card reveal-item ${isSolved ? 'is-solved' : ''}" data-id="${p.id}" style="--delay:${(i % 6) * 0.06}s">
        <div class="practice-card-head">
          <span class="practice-num">#${String(p.id).padStart(2, '0')}</span>
          <span class="badge badge-${p.difficulty}">${p.difficulty}</span>
          ${p.category ? `<span class="tag">${escapeHtml(p.category)}</span>` : ''}
          <button class="solved-toggle" data-id="${p.id}" aria-pressed="${isSolved}" title="Mark as solved">
            ${isSolved ? '✓ Solved' : 'Mark Solved'}
          </button>
        </div>
        <h3>${escapeHtml(p.title)}</h3>
        <p class="statement">${escapeHtml(p.statement)}</p>
        <div class="practice-io">
          <div><span class="io-label">Input</span><code>${escapeHtml(p.input)}</code></div>
          <div><span class="io-label">Output</span><code>${escapeHtml(p.output)}</code></div>
        </div>
        <div class="practice-hint hidden" id="hint-${p.id}">💡 ${escapeHtml(p.hint)}</div>
        <div class="practice-card-actions">
          <button class="btn btn-outline btn-sm hint-btn" data-id="${p.id}" data-i18n="hint">Hint</button>
          <button class="btn btn-primary btn-sm solution-btn" data-id="${p.id}" data-i18n="reveal_solution">Reveal Solution</button>
        </div>
      </div>
    `;
    }).join('');
  }

  list.querySelectorAll('.hint-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.getElementById(`hint-${btn.getAttribute('data-id')}`).classList.toggle('hidden');
    });
  });

  list.querySelectorAll('.solution-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const p = PRACTICE_DATA.find(x => x.id === parseInt(btn.getAttribute('data-id'), 10));
      if (!p) return;
      openCodeModal({
        title: `#${String(p.id).padStart(2, '0')} · ${p.title}`,
        metaHtml: `<span class="badge badge-${p.difficulty}">${p.difficulty}</span>${p.category ? `<span class="tag">${escapeHtml(p.category)}</span>` : ''}`,
        description: p.statement,
        code: p.solution,
        output: p.output
      });
    });
  });

  list.querySelectorAll('.solved-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.getAttribute('data-id'), 10);
      const set = getSolvedSet();
      if (set.has(id)) set.delete(id); else set.add(id);
      saveSolvedSet(set);
      renderPractice();
    });
  });

  const showAllBtn = document.getElementById('showAllPracticeBtn');
  const showLessBtn = document.getElementById('showLessPracticeBtn');
  const hasMore = filtered.length > INITIAL_PRACTICE_COUNT;
  if (showAllBtn) showAllBtn.classList.toggle('hidden', !hasMore || practiceExpanded);
  if (showLessBtn) showLessBtn.classList.toggle('hidden', !practiceExpanded);

  applyTranslations();
  observeReveal();
}

function updatePracticeProgress(solved) {
  const bar = document.getElementById('practiceProgressFill');
  const label = document.getElementById('practiceProgressLabel');
  if (!bar || !label || PRACTICE_DATA.length === 0) return;
  const pct = Math.round((solved.size / PRACTICE_DATA.length) * 100);
  bar.style.width = `${pct}%`;
  label.textContent = `${solved.size} / ${PRACTICE_DATA.length} solved`;
}

function wirePracticeToggle() {
  const showAllBtn = document.getElementById('showAllPracticeBtn');
  const showLessBtn = document.getElementById('showLessPracticeBtn');
  if (showAllBtn) showAllBtn.addEventListener('click', () => {
    practiceExpanded = true;
    renderPractice();
  });
  if (showLessBtn) showLessBtn.addEventListener('click', () => {
    practiceExpanded = false;
    renderPractice();
    document.getElementById('practice').scrollIntoView({ behavior: 'smooth' });
  });
}
