// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDM_5nqWH2ppDy93nIF1oob4cLgMPgYETc",
  authDomain: "ethereal-estates.firebaseapp.com",
  projectId: "ethereal-estates",
  storageBucket: "ethereal-estates.appspot.com",
  messagingSenderId: "277071346409",
  appId: "1:277071346409:web:7bd3d02630c86d20428e78"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();