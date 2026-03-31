// firebase.js — Initialisation Firebase (importé par toutes les pages)
import CONFIG from './config.js';

import { initializeApp }        from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore }         from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getDatabase }          from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
import { getStorage }           from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";
import { getMessaging }         from "https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging.js";

const app       = initializeApp(CONFIG.firebase);
const auth      = getAuth(app);
const db        = getFirestore(app);
const rtdb      = getDatabase(app);
const storage   = getStorage(app);
const googleProvider = new GoogleAuthProvider();

let messaging = null;
try { messaging = getMessaging(app); } catch(e) { /* navigateur sans support push */ }

export { app, auth, db, rtdb, storage, messaging, googleProvider, CONFIG };
