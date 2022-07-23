import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB1oP5cYbsD9jtN8UEYXhND75085K1sLq4",
  authDomain: "tinder-clone-fc5ae.firebaseapp.com",
  projectId: "tinder-clone-fc5ae",
  storageBucket: "tinder-clone-fc5ae.appspot.com",
  messagingSenderId: "156899514774",
  appId: "1:156899514774:web:fd665ab60425d0da9c65b7",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export {
  auth,
  db,
  GoogleAuthProvider,
  signInWithCredential,
  signOut,
  onAuthStateChanged,
};
