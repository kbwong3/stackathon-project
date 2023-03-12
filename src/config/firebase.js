import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCrYYwHICeHtsl-9h0-XaR-fdIuk8d4wjg",
  authDomain: "stackathon-bc353.firebaseapp.com",
  projectId: "stackathon-bc353",
  storageBucket: "stackathon-bc353.appspot.com",
  messagingSenderId: "720732383002",
  appId: "1:720732383002:web:d9c0b2589f94854cad2ea3",
  measurementId: "G-4RWGXP6640",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Authentication
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

//Cloud Firestore Database
export const db = getFirestore(app);
