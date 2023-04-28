
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

import { 
  getFirestore,
  doc,
  getDoc,
  setDoc
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseConfig = {
  apiKey: "AIzaSyBmJ51QUF0_Ye6CuEvgyVW-jcsSB0G_a4A",
  authDomain: "free-bank-40f39.firebaseapp.com",
  projectId: "free-bank-40f39",
  storageBucket: "free-bank-40f39.appspot.com",
  messagingSenderId: "26739509620",
  appId: "1:26739509620:web:c86dc4af40f445bb108421",
  measurementId: "G-T1DW83WXRB"
};

const app = initializeApp(firebaseConfig);
console.log(app);

export const auth = getAuth(app);


export const db = getFirestore();





