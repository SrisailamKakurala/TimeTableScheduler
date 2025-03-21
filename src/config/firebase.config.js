import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCgjJLLQtC036wjmcqMhc81IM_aBUdwAcA",
  authDomain: "attendance-ed859.firebaseapp.com",
  projectId: "attendance-ed859",
  storageBucket: "attendance-ed859.appspot.com",
  messagingSenderId: "704377201850",
  appId: "1:704377201850:web:6927061dc3554929918e83",
  measurementId: "G-MKBGJ9175F"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
