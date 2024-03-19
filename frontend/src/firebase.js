// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-b17b5.firebaseapp.com",
  projectId: "mern-blog-b17b5",
  storageBucket: "mern-blog-b17b5.appspot.com",
  messagingSenderId: "432260929514",
  appId: "1:432260929514:web:371a2397b2ec152a144493"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
 