// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import {getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5UBeyGYCrbCshUDGRHjobsJ8N0D-AJO4",
  authDomain: "react-project-aef29.firebaseapp.com",
  projectId: "react-project-aef29",
  storageBucket: "react-project-aef29.appspot.com",
  messagingSenderId: "946234380061",
  appId: "1:946234380061:web:1cf6ad797b7eaa93b31bf4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);