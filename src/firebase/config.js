// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLy5LN6XUyylurZVRzzgBsh9oajk2Lj_4",
  authDomain: "supapp-86107.firebaseapp.com",
  projectId: "supapp-86107",
  storageBucket: "supapp-86107.firebasestorage.app",
  messagingSenderId: "134578506306",
  appId: "1:134578506306:web:e02dfdd6a2a5d252287bdb",
  measurementId: "G-KNWTEB2JEJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Auth
const auth = getAuth(app);

export { db, auth };