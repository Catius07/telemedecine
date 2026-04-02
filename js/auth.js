// js/auth.js — Auth guards & helpers (GitHub Pages compatible)
import { auth, db } from './firebase.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  onAuthStateChanged,
  updateProfile
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { doc, setDoc, getDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { googleProvider } from './firebase.js';

// ── Chemin relatif auto selon position de la page ───────────────
function basePath() {
  return window.location.pathname.includes('/pages/') ? '../' : './';
}
function loginPage()     { return basePath() + 'pages/login.html'; }
function dashboardPage() { return basePath() + 'pages/dashboard.html'; }

// ── Auth observer ────────────────────────────────────────────────
export function onAuth(callback) {
  return onAuthStateChanged(auth, callback);
}

// ── Guard pages protégées ────────────────────────────────────────
export function requireAuth() {
  return new Promise((resolve) => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      unsub();
      if (!user) {
        window.location.href = loginPage();
      } else {
        const profile = await getUserProfile(user.uid);
        resolve({ user, profile });
      }
    });
  });
}

// ── Guard pages publiques (login/register) ───────────────────────
export function redirectIfLoggedIn(to) {
  const dest = to || dashboardPage();
  const unsub = onAuthStateChanged(auth, (user) => {
    unsub();
    if (user) window.location.href = dest;
  });
}

// ── Gérer le retour du redirect Google ──────────────────────────
// À appeler au chargement de login.html
export async function handleGoogleRedirect() {
  try {
    const result = await getRedirectResult(auth);
    if (!result) return null;
    const user = result.user;
    const role = sessionStorage.getItem('pendingRole') || 'patient';
    sessionStorage.removeItem('pendingRole');
    const ref = doc(db, 'users', user.uid);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      await setDoc(ref, {
        uid:       user.uid,
        name:      user.displayName,
        email:     user.email,
        photo:     user.photoURL,
        role,
        createdAt: serverTimestamp()
      });
    }
    return { user, role: snap.exists() ? snap.data().role : role };
  } catch (err) {
    console.error('Google redirect error:', err);
    throw err;
  }
}

// ── Register ─────────────────────────────────────────────────────
export async function register({ email, password, name, role = 'patient', extra = {} }) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(cred.user, { displayName: name });
  await setDoc(doc(db, 'users', cred.user.uid), {
    uid: cred.user.uid, name, email, role,
    createdAt: serverTimestamp(), ...extra
  });
  return cred.user;
}

// ── Login email ──────────────────────────────────────────────────
export async function loginEmail(email, password) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
}

// ── Google login (redirect — fonctionne sur GitHub Pages) ────────
export async function loginGoogle(role = 'patient') {
  sessionStorage.setItem('pendingRole', role);
  await signInWithRedirect(auth, googleProvider);
}

// ── Logout ───────────────────────────────────────────────────────
export async function logout() {
  await signOut(auth);
  window.location.href = loginPage();
}

// ── Profil ───────────────────────────────────────────────────────
export async function getUserProfile(uid) {
  const snap = await getDoc(doc(db, 'users', uid));
  return snap.exists() ? snap.data() : null;
}

export async function updateUserProfile(uid, data) {
  await setDoc(doc(db, 'users', uid), data, { merge: true });
}

// ── UI helpers ───────────────────────────────────────────────────
export function getInitials(name = '') {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || '?';
}
