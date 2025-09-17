# 🚀 Mycontacts

![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?style=for-the-badge\&logo=javascript)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge\&logo=react)
![Express](https://img.shields.io/badge/Express.js-4.18-lightgrey?style=for-the-badge\&logo=express)
![Tailwind](https://img.shields.io/badge/TailwindCSS-3.3-blue?style=for-the-badge\&logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-4.5-purple?style=for-the-badge\&logo=vite)

**Mycontacts** est un projet **JavaScript full-stack** réalisé dans le cadre de l'EFREI.
Il permet de gérer vos contacts facilement avec un front moderne en **React** et un backend sécurisé en **Express.js**.

---

## 🛠 Tech Stack

* **Frontend :** React, Vite, TailwindCSS
* **Backend :** Express.js, bcryptjs, jsonwebtoken, cors, validatorjs, swagger-ui
* **Base de données :** MongoDB

---

## 💻 Installation & Démarrage

### Frontend

```bash
cd Mycontacts/Mycontactsfront
npm i
npm run dev
```

### Backend

```bash
cd Mycontacts/Mycontactserver
npm i
npm run start
```

> ⚠️ Frontend : port `3000` | Backend : port `5000`

---

## 📡 API Endpoints

| Méthode | Endpoint              | Description                  |
| ------- | --------------------- | ---------------------------- |
| POST    | `/login`              | Connexion utilisateur        |
| POST    | `/register`           | Inscription utilisateur      |
| GET     | `/contact/all`        | Récupérer tous les contacts  |
| POST    | `/contact/create`     | Créer un nouveau contact     |
| PATCH   | `/contact/update/:id` | Modifier un contact existant |
| DELETE  | `/contact/delete/:id` | Supprimer un contact         |

---

## 🎨 Fonctionnalités Frontend

* 🔑 Connexion & inscription
* 📋 Affichage des contacts
* ✏️ Modification des contacts
* 🗑 Suppression des contacts

---

## 📂 Structure du projet

```
Mycontacts/
├─ Mycontactsfront/
│  └─ src/
│     ├─ components/
│     ├─ assets/
│     └─ styles/
└─ Mycontactserver/
   └─ src/
      ├─ controller/
      ├─ database/
      ├─ middleware/
      ├─ models/
      ├─ routes/
      └─ utils/
```

---

## 🔒 Sécurité & Validation

* 🔑 Mots de passe sécurisés avec **bcryptjs**
* 🔐 Authentification avec **JWT**
* ✅ Validation des données via **validatorjs**
* 📖 Documentation API via **swagger-ui**

---

## 📝 Projet

Projet **personnel** réalisé dans le cadre d’un projet EFREI.

---

✨ *Enjoy managing your contacts!*
