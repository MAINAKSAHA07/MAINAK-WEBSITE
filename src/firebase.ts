import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";

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
let app: FirebaseApp;
let analytics: Analytics;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;

if (typeof window !== "undefined" && !getApps().length) {
  app = initializeApp(firebaseConfig);
  analytics = getAnalytics(app);
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
}

export { app, analytics, auth, db, storage }; 