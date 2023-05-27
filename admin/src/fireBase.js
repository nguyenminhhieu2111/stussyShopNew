// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpnpe0kc9zTTqRlbinXZfgUGVfZwYHc-A",
  authDomain: "stussyshop-cf95a.firebaseapp.com",
  projectId: "stussyshop-cf95a",
  storageBucket: "stussyshop-cf95a.appspot.com",
  messagingSenderId: "464192293055",
  appId: "1:464192293055:web:c67ed7ce8c432baa2f9e0a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;