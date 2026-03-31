// js/utils.js — Utilitaires globaux

// ── Toast notifications ─────────────────────────────────────────
function ensureContainer() {
  let c = document.getElementById('toast-container');
  if (!c) {
    c = document.createElement('div');
    c.id = 'toast-container';
    document.body.appendChild(c);
  }
  return c;
}

export function toast(msg, type = 'info', duration = 3500) {
  const icons = { info: '💡', success: '✅', error: '❌', warn: '⚠️' };
  const container = ensureContainer();
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.innerHTML = `<span>${icons[type] || '💡'}</span><span>${msg}</span>`;
  container.appendChild(el);
  setTimeout(() => el.remove(), duration);
}

// ── Format date ─────────────────────────────────────────────────
export function fmtDate(ts) {
  if (!ts) return '—';
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });
}

export function fmtTime(ts) {
  if (!ts) return '';
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
}

export function fmtDateTime(ts) {
  return `${fmtDate(ts)} à ${fmtTime(ts)}`;
}

export function timeAgo(ts) {
  const d = ts?.toDate ? ts.toDate() : new Date(ts);
  const diff = (Date.now() - d.getTime()) / 1000;
  if (diff < 60)    return 'à l\'instant';
  if (diff < 3600)  return `il y a ${Math.floor(diff/60)} min`;
  if (diff < 86400) return `il y a ${Math.floor(diff/3600)} h`;
  return fmtDate(ts);
}

// ── Render sidebar active link ───────────────────────────────────
export function setActiveNav() {
  const path = window.location.pathname;
  document.querySelectorAll('.nav-item').forEach(el => {
    const href = el.getAttribute('href') || '';
    if (path.endsWith(href.split('/').pop())) {
      el.classList.add('active');
    }
  });
}

// ── Loading screen ───────────────────────────────────────────────
export function showLoader() {
  const el = document.createElement('div');
  el.id = 'app-loader';
  el.className = 'loading-full';
  el.innerHTML = `<div class="spinner"></div><p style="color:var(--text2);font-size:.85rem">Chargement…</p>`;
  document.body.appendChild(el);
}
export function hideLoader() {
  document.getElementById('app-loader')?.remove();
}

// ── Sidebar mobile toggle ────────────────────────────────────────
export function initMobileMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const sidebar = document.querySelector('.sidebar');
  if (!toggle || !sidebar) return;
  toggle.addEventListener('click', () => sidebar.classList.toggle('open'));
  document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && !toggle.contains(e.target)) {
      sidebar.classList.remove('open');
    }
  });
}

// ── Generate unique ID ───────────────────────────────────────────
export function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

// ── Currency format ──────────────────────────────────────────────
export function fmtCFA(amount) {
  return new Intl.NumberFormat('fr-CM', { style: 'currency', currency: 'XAF', maximumFractionDigits: 0 }).format(amount);
}
