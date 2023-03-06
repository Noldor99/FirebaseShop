import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// const API_KEY = import.meta.env.VITE_API_KEY;

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyDC6AbBsG2jMYoa0tnZ7-Y_SubLN8oI9fw",
  authDomain: "savvy-etching-374715.firebaseapp.com",
  projectId: "savvy-etching-374715",
  storageBucket: "savvy-etching-374715.appspot.com",
  messagingSenderId: "325600194803",
  appId: "1:325600194803:web:a4b0f68162db1e98108786",
  measurementId: "G-YY04WMG8Y0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
