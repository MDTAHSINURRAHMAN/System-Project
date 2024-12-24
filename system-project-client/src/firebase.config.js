// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgnT-vzDI-i5-mXi1fD2Hs0orqBNtiMow",
  authDomain: "system-project-a18ab.firebaseapp.com",
  projectId: "system-project-a18ab",
  storageBucket: "system-project-a18ab.firebasestorage.app",
  messagingSenderId: "37377336926",
  appId: "1:37377336926:web:afe9b688ee9298427ef6cf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);