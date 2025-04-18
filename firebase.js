// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGFB0FCK8zzZ8isWMOu8Zqx_3O5f7hies",
  authDomain: "my-website-1c476.firebaseapp.com",
  projectId: "my-website-1c476",
  storageBucket: "my-website-1c476.firebasestorage.app",
  messagingSenderId: "287393160134",
  appId: "1:287393160134:web:b0791ce0690938e306f0c7",
  measurementId: "G-85HRGK4YW6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics }; // Export the app and analytics for use in other files