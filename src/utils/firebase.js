// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA01ln8mY7d6nOUkERqup7tDd03xQOqP98",
  authDomain: "netflixclone-gpt.firebaseapp.com",
  projectId: "netflixclone-gpt",
  storageBucket: "netflixclone-gpt.appspot.com",
  messagingSenderId: "649045463134",
  appId: "1:649045463134:web:4022bb17637a5d3bb3a4cf",
  measurementId: "G-4Y93BW7LYP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();

