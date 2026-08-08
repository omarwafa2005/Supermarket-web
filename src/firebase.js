import { initializeApp } from "firebase/app";
import {
  getAuth,
} from "firebase/auth";
import {
  getFirestore,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey:
    import.meta.env.VITE_FIREBASE_API_KEY ||
    "AIzaSyByfTrgt0wZxwEmJQDXuJO22kigbs0efnw",
  authDomain:
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ||
    "supermarket-app-c1eb7.firebaseapp.com",
  projectId:
    import.meta.env.VITE_FIREBASE_PROJECT_ID ||
    "supermarket-app-c1eb7",
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ||
    "supermarket-app-c1eb7.firebasestorage.app",
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ||
    "207119897601",
  appId:
    import.meta.env.VITE_FIREBASE_APP_ID ||
    "1:207119897601:web:068b626ce86788459c5c00",
  measurementId:
    import.meta.env.VITE_FIREBASE_MEASUREMENT_ID ||
    "G-KYQ841P4RP",
};

const app =
  initializeApp(
    firebaseConfig
  );

export const auth =
  getAuth(app);

export const db =
  getFirestore(app);

export default app;