// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXW2s9AWz5v30Ypd80bILngBvHqLBiFFY",
  authDomain: "netflix-75d6f.firebaseapp.com",
  projectId: "netflix-75d6f",
  storageBucket: "netflix-75d6f.firebasestorage.app",
  messagingSenderId: "661559334065",
  appId: "1:661559334065:web:a40f65256487dcb5bdbe90",
  measurementId: "G-30C0QDRX3X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();