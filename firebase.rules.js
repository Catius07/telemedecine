// ============================================================
//  FIRESTORE SECURITY RULES — telemedecine-decb0
//  À coller dans Firebase Console → Firestore → Règles
// ============================================================

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // ── Helpers ─────────────────────────────────────────────────
    function isAuth()  { return request.auth != null; }
    function uid()     { return request.auth.uid; }
    function isAdmin() {
      return isAuth() &&
        get(/databases/$(database)/documents/users/$(uid())).data.role == 'admin';
    }
    function isDoc() {
      return isAuth() &&
        get(/databases/$(database)/documents/users/$(uid())).data.role == 'medecin';
    }

    // ── Users ────────────────────────────────────────────────────
    match /users/{userId} {
      allow read:   if isAuth();
      allow create: if isAuth() && uid() == userId;
      allow update: if isAuth() && (uid() == userId || isAdmin());
      allow delete: if isAdmin();
    }

    // ── RDV ─────────────────────────────────────────────────────
    match /rdv/{rdvId} {
      allow read:   if isAuth() &&
        (resource.data.patientId == uid() ||
         resource.data.medecinId == uid() ||
         isAdmin());
      allow create: if isAuth();
      allow update: if isAuth() &&
        (resource.data.patientId == uid() ||
         resource.data.medecinId == uid() ||
         isAdmin());
      allow delete: if isAdmin();
    }

    // ── Paiements ────────────────────────────────────────────────
    match /paiements/{payId} {
      allow read:   if isAuth() &&
        (resource.data.patientId == uid() || isAdmin() || isDoc());
      allow create: if isAuth();
      allow update: if isAdmin();
      allow delete: if isAdmin();
    }

    // ── Documents médicaux ───────────────────────────────────────
    match /documents/{docId} {
      allow read:   if isAuth() &&
        (resource.data.patientId == uid() ||
         resource.data.uploadedBy == uid() ||
         isAdmin());
      allow create: if isAuth();
      allow delete: if isAuth() && resource.data.uploadedBy == uid() || isAdmin();
    }
  }
}

// ============================================================
//  REALTIME DATABASE RULES — Firebase Console → Realtime DB
// ============================================================
/*
{
  "rules": {
    "chats": {
      "$roomId": {
        ".read": "auth != null",
        ".write": "auth != null"
      }
    },
    "rooms": {
      "$roomId": {
        ".read": "auth != null",
        ".write": "auth != null"
      }
    }
  }
}
*/

// ============================================================
//  FIREBASE STORAGE RULES
// ============================================================
/*
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /documents/{userId}/{fileName} {
      allow read:  if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId
                   && request.resource.size < 5 * 1024 * 1024;
    }
  }
}
*/
