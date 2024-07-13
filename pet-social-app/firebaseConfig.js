import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore';
import {getAuth, onAuthStateChanged , signInWithEmailAndPassword , createUserWithEmailAndPassword } from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyCuRpCOSpbXILjG5p4Vi25JZ_gep1zUcvw",
  authDomain: "pet-social-app-b2dfa.firebaseapp.com",
  projectId: "pet-social-app-b2dfa",
  storageBucket: "pet-social-app-b2dfa.appspot.com",
  messagingSenderId: "450912024610",
  appId: "1:450912024610:web:6e4789665fa58a6167327b"
};

const app = initializeApp(firebaseConfig); 
const auth = getAuth(app);
const db = getFirestore(app);
export {db, auth, signInWithEmailAndPassword, createUserWithEmailAndPassword}

