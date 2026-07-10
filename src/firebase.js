import { initializeApp } from "firebase/app";
import {
  getAuth,
} from "firebase/auth";
import {
  getFirestore,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyByfTrgt0wZxwEmJQDXuJO22kigbs0efnw",
  authDomain:
    "supermarket-app-c1eb7.firebaseapp.com",
  projectId: "supermarket-app-c1eb7",
  storageBucket:
    "supermarket-app-c1eb7.firebasestorage.app",
  messagingSenderId:
    "207119897601",
  appId:
    "1:207119897601:web:068b626ce86788459c5c00",
  measurementId:
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