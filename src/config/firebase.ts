// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARY4AiDSX248BygFFS-mMkHlk3HlZDe04",
  authDomain: "jobbox-68180.firebaseapp.com",
  projectId: "jobbox-68180",
  storageBucket: "jobbox-68180.firebasestorage.app",
  messagingSenderId: "23402354000",
  appId: "1:23402354000:web:e6bfa10ab8dc62484b4855",
  measurementId: "G-CKJNC55007"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);