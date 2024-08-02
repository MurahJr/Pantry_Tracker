// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApldvGY1uEabDSSj8WmR-2YSN8foH0NPI",
  authDomain: "pantry-tracker-55d63.firebaseapp.com",
  projectId: "pantry-tracker-55d63",
  storageBucket: "pantry-tracker-55d63.appspot.com",
  messagingSenderId: "884632155579",
  appId: "1:884632155579:web:fb9a049af6996caba5c09e",
  measurementId: "G-4VBR3LTTNE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { db, auth };