# 🏥 TéléMéd — Plateforme de Télémédecine

Application web complète de consultation médicale en ligne.  
Stack : HTML/CSS/JS pur · Firebase · WebRTC · PWA

---

## 📁 Structure du projet

```
telemedecine/
├── index.html               ← Landing page
├── config.js                ← ⚠️ Clefs API à renseigner
├── firebase.rules.js        ← Règles Firestore / RTDB / Storage
├── css/
│   └── main.css             ← Design system complet
├── js/
│   ├── firebase.js          ← Initialisation Firebase
│   ├── auth.js              ← Auth (login, register, guards)
│   └── utils.js             ← Toast, dates, helpers
└── pages/
    ├── login.html           ← Connexion
    ├── register.html        ← Inscription (patient / médecin)
    ├── dashboard.html       ← Tableau de bord patient
    ├── medecin-dashboard.html ← Tableau de bord médecin
    ├── medecins.html        ← Liste + recherche médecins
    ├── rdv.html             ← Gestion rendez-vous
    ├── chat.html            ← Messagerie temps réel
    ├── video.html           ← Consultation vidéo (WebRTC)
    ├── dossier.html         ← Dossier médical + upload
    ├── paiements.html       ← Paiements Mobile Money
    ├── profil.html          ← Profil utilisateur
    └── admin.html           ← Dashboard admin
```

---

## ⚡ Installation rapide

### 1. Remplir `config.js`

Ouvre le fichier `config.js` à la racine et remplace chaque `TON_...` :

| Clef | Où trouver |
|------|-----------|
| `FIREBASE_API_KEY` | Firebase Console → Paramètres du projet → Général |
| `FIREBASE_APP_ID` | Même endroit |
| `FCM_VAPID_KEY` | Paramètres du projet → Messagerie Cloud |
| `ORANGE_MONEY_API_KEY` | Portail développeur Orange Cameroun |
| `MTN_MOMO_API_KEY` | MoMo Developer → sandbox |
| `TURN_SERVER` | (optionnel) coturn ou Twilio |

**Firebase déjà configuré :**
- Project ID : `telemedecine-decb0`
- Google Client ID : `991526762904-te8q4pupnd1qs4voe0h0f338gne6qjlt.apps.googleusercontent.com`

---

### 2. Configurer Firebase Console

#### Firestore
- Firebase Console → Firestore Database → Créer base de données (mode production)
- Onglet **Règles** → Coller le contenu `Firestore` de `firebase.rules.js`

#### Realtime Database  
- Firebase Console → Realtime Database → Créer base de données
- Onglet **Règles** → Coller le bloc JSON de `firebase.rules.js`

#### Storage
- Firebase Console → Storage → Commencer
- Onglet **Règles** → Coller le bloc Storage de `firebase.rules.js`

#### Authentication
- Firebase Console → Authentication → Commencer
- Activer : **Email/Mot de passe** + **Google**
- Ajouter les domaines autorisés (ton domaine GitHub Pages)

---

### 3. Héberger sur GitHub Pages

```bash
# 1. Créer un repo GitHub
git init
git add .
git commit -m "init: TéléMéd"
git remote add origin https://github.com/TON_USER/telemedecine.git
git push -u origin main

# 2. GitHub → Settings → Pages → Source: main / root
# 3. URL : https://TON_USER.github.io/telemedecine/
```

Ajoute cette URL dans Firebase Console → Authentication → Domaines autorisés.

---

### 4. Créer un compte Admin

Après inscription normale, va dans Firebase Console → Firestore → `users` → ton document → édite `role` : mettre `"admin"`.

---

## 🗺️ Flux utilisateurs

### Patient
`/` → Register (patient) → Dashboard → Chercher médecin → Prendre RDV → Chat / Vidéo → Payer → Dossier

### Médecin
`/` → Register (médecin) → Dashboard médecin → Confirmer RDV → Rejoindre vidéo → Rédiger notes → Dossier patient

### Admin
Login → `admin.html` → Gérer users / Vérifier médecins / Voir stats

---

## 🔧 APIs manquantes — `config.js`

```
TON_FIREBASE_API_KEY          → Firebase Console
TON_FIREBASE_APP_ID           → Firebase Console
TON_FIREBASE_MEASUREMENT_ID   → Firebase Analytics (optionnel)
TON_FCM_VAPID_KEY             → Firebase Messaging
TON_ORANGE_MONEY_API_KEY      → developer.orange.com/cameroun
TON_ORANGE_MERCHANT_ID        → Portail marchand Orange
TON_MTN_MOMO_API_KEY          → momodeveloper.mtn.com
TON_MTN_SUBSCRIPTION_KEY      → MoMo developer portal
TON_TURN_SERVER               → coturn / Twilio (optionnel pour WebRTC NAT)
TON_TURN_USERNAME             → Si TURN activé
TON_TURN_CREDENTIAL           → Si TURN activé
```

---

## 📱 Fonctionnalités implémentées

| Fonctionnalité | Statut |
|---|---|
| Auth email + Google OAuth | ✅ Complet |
| Inscription patient / médecin | ✅ Complet |
| Liste + recherche médecins | ✅ Complet |
| Prise de RDV | ✅ Complet |
| Confirmation RDV par médecin | ✅ Complet |
| Chat temps réel (Firebase RTDB) | ✅ Complet |
| Appel vidéo WebRTC | ✅ Complet |
| Partage d'écran | ✅ Complet |
| Dossier médical + notes | ✅ Complet |
| Upload de documents | ✅ Complet |
| Paiements Mobile Money | ⚠️ Simulation (ajouter clefs API) |
| Notifications push FCM | ⚠️ Ajouter VAPID key |
| Dashboard admin | ✅ Complet |
| Vérification médecins | ✅ Complet |
| Profil complet | ✅ Complet |
| Design responsive mobile | ✅ Complet |
| Sécurité Firestore rules | ✅ Complet |

---

## 🌐 Compatibilité

- Chrome, Firefox, Edge, Safari (desktop + mobile)
- WebRTC : requis pour vidéo (tous navigateurs modernes)
- GitHub Pages ✅ (aucun serveur backend requis)

---

## 📞 Support

Pour les intégrations Mobile Money :
- Orange Money API : https://developer.orange.com
- MTN MoMo API : https://momodeveloper.mtn.com
- Pour WebRTC en production avec NAT : utiliser un serveur TURN (coturn gratuit ou Twilio)
