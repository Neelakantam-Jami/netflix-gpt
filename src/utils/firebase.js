// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDlQoy--ywi2MLTyVD0GR3XlAhNNdXsVSQ",
  authDomain: "netflix-gpt-b3847.firebaseapp.com",
  projectId: "netflix-gpt-b3847",
  storageBucket: "netflix-gpt-b3847.firebasestorage.app",
  messagingSenderId: "763527152524",
  appId: "1:763527152524:web:252507c311d1bc5da94ca9",
  measurementId: "G-4MVJP9VYKY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();