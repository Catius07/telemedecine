// js/auth.js — Auth guards & helpers
import { auth, db } from './firebase.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { doc, setDoc, getDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { googleProvider } from './firebase.js';

// ── Auth state observer ──────────────────────────────────────────
export function onAuth(callback) {
  return onAuthStateChanged(auth, callback);
}

// ── Guard: redirige si non connecté ─────────────────────────────
export function requireAuth(redirectTo = '/pages/login.html') {
  return new Promise((resolve) => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      unsub();
      if (!user) {
        window.location.href = redirectTo;
      } else {
        const profile = await getUserProfile(user.uid);
        resolve({ user, profile });
      }
    });
  });
}

// ── Guard: redirige si connecté (pour login/register) ──────────
export function redirectIfLoggedIn(to = '/pages/dashboard.html') {
  const unsub = onAuthStateChanged(auth, (user) => {
    unsub();
    if (user) window.location.href = to;
  });
}

// ── Register ────────────────────────────────────────────────────
export async function register({ email, password, name, role = 'patient', extra = {} }) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(cred.user, { displayName: name });
  await setDoc(doc(db, 'users', cred.user.uid), {
    uid: cred.user.uid,
    name,
    email,
    role,
    createdAt: serverTimestamp(),
    ...extra
  });
  return cred.user;
}

// ── Login email ─────────────────────────────────────────────────
export async function loginEmail(email, password) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
}

// ── Google login ────────────────────────────────────────────────
export async function loginGoogle(role = 'patient') {
  const cred = await signInWithPopup(auth, googleProvider);
  const ref = doc(db, 'users', cred.user.uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    await setDoc(ref, {
      uid: cred.user.uid,
      name: cred.user.displayName,
      email: cred.user.email,
      photo: cred.user.photoURL,
      role,
      createdAt: serverTimestamp()
    });
  }
  return cred.user;
}

// ── Logout ──────────────────────────────────────────────────────
export async function logout() {
  await signOut(auth);
  window.location.href = '/pages/login.html';
}

// ── Get user profile ────────────────────────────────────────────
export async function getUserProfile(uid) {
  const snap = await getDoc(doc(db, 'users', uid));
  return snap.exists() ? snap.data() : null;
}

// ── Update user profile ─────────────────────────────────────────
export async function updateUserProfile(uid, data) {
  await setDoc(doc(db, 'users', uid), data, { merge: true });
}

// ── Helpers UI ──────────────────────────────────────────────────
export function getInitials(name = '') {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
}
