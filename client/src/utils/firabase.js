// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "authexamnotes-76077.firebaseapp.com",
  projectId: "authexamnotes-76077",
  storageBucket: "authexamnotes-76077.firebasestorage.app",
  messagingSenderId: "748150179021",
  appId: "1:748150179021:web:bb9709b7463069c6c8d584"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider()

export {auth,provider};