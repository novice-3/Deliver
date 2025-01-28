// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, setDoc, doc, updateDoc, deleteDoc} from "firebase/firestore";


// Firebase configuration (replace with your Firebase credentials)
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCwPQiT1o9kbG3_J0KftK2Iv2Rzpm86Nk0",
    authDomain: "deliverwho-ae358.firebaseapp.com",
    projectId: "deliverwho-ae358",
    storageBucket: "deliverwho-ae358.firebasestorage.app",
    messagingSenderId: "828361846148",
    appId: "1:828361846148:web:496fd111c05a025408c1d1"
  };  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, getDocs, setDoc, doc, updateDoc, deleteDoc };
