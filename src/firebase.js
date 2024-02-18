import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; 

const firebaseConfig = {
  apiKey: "AIzaSyD5Ea1sr_df2C6ukWGFuUZWOGC_GUJIXCc",
  authDomain: "fir-login-tutorial-cadb7.firebaseapp.com",
  projectId: "fir-login-tutorial-cadb7",
  storageBucket: "fir-login-tutorial-cadb7.appspot.com",
  messagingSenderId: "199943765563",
  appId: "1:199943765563:web:a80ebd6f79ac677604e61e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore();
export const storage = getStorage();
