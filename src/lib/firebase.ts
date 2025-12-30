import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCTbIWxoMYCeBCHzKx43S2rHy7-QyvBXxc",
  authDomain: "kamus-online.firebaseapp.com",
  projectId: "kamus-online",
  storageBucket: "kamus-online.firebasestorage.app",
  messagingSenderId: "417412593769",
  appId: "1:417412593769:web:4d6d2eb9f7da2d2edd4af8",
  measurementId: "G-SNWF4MRNBQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Analytics (only in browser)
export const initAnalytics = async () => {
  if (await isSupported()) {
    return getAnalytics(app);
  }
  return null;
};

export default app;
