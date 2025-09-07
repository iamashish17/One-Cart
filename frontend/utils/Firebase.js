import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "loginonecart-85cc3.firebaseapp.com",
  projectId: "loginonecart-85cc3",
  storageBucket: "loginonecart-85cc3.firebasestorage.app",
  messagingSenderId: "591305003715",
  appId: "1:591305003715:web:d78f6e979c37dfd15f4876"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth, provider}