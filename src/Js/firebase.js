// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgPZkpKunjIDSGdZIN1c3uAkUUY4SU0ho",
  authDomain: "metro-events-66a6a.firebaseapp.com",
  projectId: "metro-events-66a6a",
  storageBucket: "metro-events-66a6a.appspot.com",
  messagingSenderId: "90963219342",
  appId: "1:90963219342:web:55e059163336e176d88adf",
  databaseURL: "https://metro-events-66a6a-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);