// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmHzp67k6BnMcCFc-AQ3QjyO3jGyaVTCU",
  authDomain: "restorent-e744f.firebaseapp.com",
  projectId: "restorent-e744f",
  storageBucket: "restorent-e744f.firebasestorage.app",
  messagingSenderId: "58474212280",
  appId: "1:58474212280:web:8350ba96360c4780d17d4d",
  measurementId: "G-3SN94DVSTE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);