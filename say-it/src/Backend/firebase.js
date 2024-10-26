// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.GoogleFirebaseAPIKey,
  authDomain: process.env.AuthentificationId,
  projectId: process.env.ProjectId,
  storageBucket: "sayit-2af2e.appspot.com",
  messagingSenderId: "567470998924",
  appId: "1:567470998924:web:f2f1a358b9c96cf95102a9",
  measurementId: "G-ELG0YFV91C"
};

const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Export db and serverTimestamp for use in other files
export { db, serverTimestamp };