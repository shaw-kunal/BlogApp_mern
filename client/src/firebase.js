// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:  process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "blogapplication-6abdf.firebaseapp.com",
  projectId: "blogapplication-6abdf",
  storageBucket: "blogapplication-6abdf.appspot.com",
  messagingSenderId: "546824924151",
  appId: "1:546824924151:web:7f454f47822aaf0e541cf2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 export const storage = getStorage();
 