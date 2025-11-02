## Smart Home Project for IoT , Cloud Computing & Network

## 🚀 Getting Started

### 1. Clone & Install

git clone https://github.com/Abdellah-Abrkaoui/smarthome.git
cd smarthome
npm install

## 2. Setup Firebase

Firebase Console → New Project
Enable:
Service : Configuration
Authentication : Email/Password + Google
Firestore : Start in test mode

Copy config to src/firebase.js:

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
apiKey: "your-api-key",
authDomain: "your-project.firebaseapp.com",
projectId: "your-project-id",
storageBucket: "your-project.appspot.com",
messagingSenderId: "123456789",
appId: "your-app-id"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

## 3. Run Development Server

npm run dev
