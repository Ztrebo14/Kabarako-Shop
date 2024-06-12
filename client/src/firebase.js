// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkICeiEWTYs2ohzo9jdyIRI95rlRvZsf0",
  authDomain: "kabarako-shop.firebaseapp.com",
  projectId: "kabarako-shop",
  storageBucket: "kabarako-shop.appspot.com",
  messagingSenderId: "24565015206",
  appId: "1:24565015206:web:51fc04d8be69e0a3c00a67",
  measurementId: "G-5SSTVGMXZF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const db = getFirestore(app)

// Detect auth state
onAuthStateChanged(auth, user => {
  if(user != null) {
    console.log('Logged in!')
  } else {
    console.log('No user')
  }
})