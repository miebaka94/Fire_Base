// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2xPm__k5bOqvJSu6pKua9vGGJjYAkt7I",
  authDomain: "cprg306-assignments-bd479.firebaseapp.com",
  projectId: "cprg306-assignments-bd479",
  storageBucket: "cprg306-assignments-bd479.appspot.com",
  messagingSenderId: "18826965025",
  appId: "1:18826965025:web:993d20b4c0d443731b7360",
  measurementId: "G-KW1TKDF9ET"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
