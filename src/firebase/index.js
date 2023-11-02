import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDCxtqdG7vzC6_pSJ7YwYNYFtXkGzNYcIM",
  authDomain: "mern-stact-app.firebaseapp.com",
  projectId: "mern-stact-app",
  storageBucket: "mern-stact-app.appspot.com",
  messagingSenderId: "511516027017",
  appId: "1:511516027017:web:c6307c4a6f4b16098dfe58",
};

// Initialize Firebase
export const fireBaseApp = initializeApp(firebaseConfig);

//storege
export const storage = getStorage(fireBaseApp);

//init firebase auth
export const auth = getAuth(fireBaseApp);

//for google
export const google = new GoogleAuthProvider();
