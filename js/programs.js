/* =========================================================
   C++ CODE LAB — js/programs.js
   Loads data/programs.json and renders the Projects section:
   filtering, searching, show more/less, and the code modal.
========================================================= */

let PROGRAMS_DATA = [];
let currentFilter = 'all';
let currentSearch = '';
let projectsExpanded = false;
const INITIAL_PROJECT_COUNT = 8;

function initPrograms() {
  fetch('data/programs.json')
    .then(r => r.json())
    .then(json => {
      PROGRAMS_DATA = json.projects || [];
      renderProjects();
      wireProjectToolbar();
      wireShowAllLess();
      applyTranslations();
    })
    .catch(err => {
      console.error('Failed to load programs.json', err);
      const grid = document.getElementById('projectsGrid');
      if (grid) grid.innerHTML = '<div class="no-results">Unable to load programs. Please make sure data/programs.json is present.</div>';
    });

  initModal();
}

function getFilteredProjects() {
  return PROGRAMS_DATA.filter(p => {
    const matchesFilter = currentFilter === 'all' || p.difficulty === currentFilter;
    const matchesSearch = currentSearch === '' ||
      p.title.toLowerCase().includes(currentSearch) ||
      p.concepts.join(' ').toLowerCase().includes(currentSearch);
    return matchesFilter && matchesSearch;
  });
}

function renderProjects() {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;
  const filtered = getFilteredProjects();
  const list = projectsExpanded ? filtered : filtered.slice(0, INITIAL_PROJECT_COUNT);

  if (filtered.length === 0) {
    grid.innerHTML = `<div class="no-results">No projects match your search.</div>`;
  } else {
    grid.innerHTML = list.map((p, i) => `
      <div class="project-card reveal-item" data-id="${p.id}" style="--delay:${(i % 8) * 0.05}s">
        <div class="project-card-top">
          <div class="project-icon">${String(p.id).padStart(2, '0')}</div>
          <span class="badge badge-${p.difficulty}">${p.difficulty}</span>
        </div>
        <h3>${escapeHtml(p.title)}</h3>
        <p>${escapeHtml(p.description)}</p>
        <div class="project-tags">
          ${p.concepts.slice(0, 2).map(c => `<span class="tag">${escapeHtml(c)}</span>`).join('')}
        </div>
        <div class="project-actions">
          <button class="btn btn-ghost view-details-btn" data-id="${p.id}" data-i18n="view_details">View Details</button>
          <button class="btn btn-primary view-code-btn" data-id="${p.id}" data-i18n="view_code">View Code</button>
        </div>
      </div>
    `).join('');
  }

  grid.querySelectorAll('.view-code-btn, .view-details-btn').forEach(btn => {
    btn.addEventListener('click', () => openProjectModal(parseInt(btn.getAttribute('data-id'), 10)));
  });

  const showAllBtn = document.getElementById('showAllBtn');
  const showLessBtn = document.getElementById('showLessBtn');
  const hasMore = filtered.length > INITIAL_PROJECT_COUNT;
  if (showAllBtn) showAllBtn.classList.toggle('hidden', !hasMore || projectsExpanded);
  if (showLessBtn) showLessBtn.classList.toggle('hidden', !projectsExpanded);

  applyTranslations();
  observeReveal();
}

function wireProjectToolbar() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-filter');
      projectsExpanded = false;
      renderProjects();
    });
  });

  const searchInput = document.getElementById('projectSearch');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      currentSearch = searchInput.value.trim().toLowerCase();
      projectsExpanded = false;
      renderProjects();
    });
  }
}

function wireShowAllLess() {
  const showAllBtn = document.getElementById('showAllBtn');
  const showLessBtn = document.getElementById('showLessBtn');
  if (showAllBtn) showAllBtn.addEventListener('click', () => {
    projectsExpanded = true;
    renderProjects();
  });
  if (showLessBtn) showLessBtn.addEventListener('click', () => {
    projectsExpanded = false;
    renderProjects();
    document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
  });
}

/* ---------------- CODE MODAL (shared by programs + practice) ---------------- */
function initModal() {
  const closeBtn = document.getElementById('modalClose');
  const overlay = document.getElementById('codeModal');
  const copyBtn = document.getElementById('copyBtn');
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (overlay) overlay.addEventListener('click', (e) => {
    if (e.target.id === 'codeModal') closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
  if (copyBtn) copyBtn.addEventListener('click', copyModalCode);
}

function openProjectModal(id) {
  const p = PROGRAMS_DATA.find(proj => proj.id === id);
  if (!p) return;
  openCodeModal({
    title: `${String(p.id).padStart(2, '0')}. ${p.title}`,
    metaHtml: `
      <span class="badge badge-${p.difficulty}">${p.difficulty}</span>
      ${p.concepts.map(c => `<span class="tag">${escapeHtml(c)}</span>`).join('')}
    `,
    description: p.description + ' ' + p.explanation,
    code: p.code,
    output: p.output
  });
}

/* Generic modal opener, reused by practice.js for "view full solution". */
function openCodeModal({ title, metaHtml, description, code, output }) {
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalMeta').innerHTML = metaHtml || '';
  document.getElementById('modalDescription').textContent = description || '';
  document.getElementById('modalCode').textContent = code || '';
  document.getElementById('modalOutput').textContent = output || '';

  const modal = document.getElementById('codeModal');
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('codeModal').classList.add('hidden');
  document.body.style.overflow = '';
}

function copyModalCode() {
  const code = document.getElementById('modalCode').textContent;
  const btn = document.getElementById('copyBtn');
  copyToClipboard(code).then(() => {
    const original = btn.textContent;
    btn.textContent = t('copied', 'Copied!');
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = original;
      btn.classList.remove('copied');
    }, 1500);
  });
}

function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text);
  }
  return new Promise((resolve) => {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(ta);
    resolve();
  });
}
