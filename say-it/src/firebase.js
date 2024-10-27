// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import CONFIG from './config.js';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: CONFIG.GoogleFirebaseAPIKey,
  authDomain: CONFIG.AuthentificationId,
  projectId: CONFIG.ProjectId,
  storageBucket: "sayit-2af2e.appspot.com",
  messagingSenderId: "567470998924",
  appId: "1:567470998924:web:a1800929a7f82a8f5102a9",
  measurementId: "G-ZLWYQX2MPL"
};

const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Export db and serverTimestamp for use in other files
export { db, serverTimestamp };