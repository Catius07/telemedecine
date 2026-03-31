// ============================================================
//  CONFIG.JS — Clefs API à renseigner
//  Remplis chaque valeur marquée "TON_..." puis supprime ce commentaire
// ============================================================

const CONFIG = {

  // ── Firebase (Realtime DB + Firestore + Auth + Storage) ────────
  firebase: {
    apiKey:            "AIzaSyC1x9UVXE2o5fOo3fD4kWKzHGHK_VDIZVU",
    authDomain:        "telemedecine-decb0.firebaseapp.com",
    databaseURL:       "https://telemedecine-decb0-default-rtdb.firebaseio.com",
    projectId:         "telemedecine-decb0",
    storageBucket:     "telemedecine-decb0.appspot.com",
    messagingSenderId: "991526762904",
    appId:             "1:991526762904:web:628841e7f905868f0c13eds",
    measurementId:     "TON_FIREBASE_MEASUREMENT_ID"   // optionnel (Analytics)
  },

  // ── Google OAuth ───────────────────────────────────────────────
  google: {
    clientId: "991526762904-te8q4pupnd1qs4voe0h0f338gne6qjlt.apps.googleusercontent.com"
  },

  // ── WebRTC / STUN-TURN ─────────────────────────────────────────
  // Twilio (optionnel) ou utilise les serveurs Google STUN gratuits
  webrtc: {
    stunServer: "stun:stun.l.google.com:19302",
    turnServer: "",          // "turn:TON_TURN_SERVER"
    turnUsername: "",        // si Twilio / coturn
    turnCredential: ""
  },

  // ── Paiement Mobile Money ──────────────────────────────────────
  payment: {
    // Orange Money / MTN MoMo — Cameroun
    orangeApiKey:    "TON_ORANGE_MONEY_API_KEY",
    orangeMerchant:  "TON_ORANGE_MERCHANT_ID",
    mtnApiKey:       "TON_MTN_MOMO_API_KEY",
    mtnSubscription: "TON_MTN_SUBSCRIPTION_KEY",
    mtnTargetEnv:    "sandbox"   // changer en "production" en prod
  },

  // ── Notifications Push (FCM) ───────────────────────────────────
  fcm: {
    vapidKey: "TON_FCM_VAPID_KEY"   // Firebase Console → Paramètres du projet → Messagerie Cloud
  }

};

export default CONFIG;
