import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAnalytics, Analytics, isSupported } from "firebase/analytics";
import { getAuth, Auth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, Firestore, connectFirestoreEmulator } from "firebase/firestore";
import { getStorage, FirebaseStorage, connectStorageEmulator } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyAGFB0FCK8zzZ8isWMOu8Zqx_3O5f7hies",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "my-website-1c476.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "my-website-1c476",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "my-website-1c476.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "287393160134",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:287393160134:web:b0791ce0690938e306f0c7",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-85HRGK4YW6"
};

// Initialize Firebase
let app: FirebaseApp;
let analytics: Analytics | null = null;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;

try {
  if (typeof window !== "undefined" && !getApps().length) {
    app = initializeApp(firebaseConfig);
    
    // Initialize Analytics only if supported
    isSupported().then(supported => {
      if (supported) {
        analytics = getAnalytics(app);
      }
    }).catch(console.error);
    
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);

    // Enable emulator in development
    if (process.env.NODE_ENV === 'development') {
      connectAuthEmulator(auth, 'http://localhost:9099');
      connectFirestoreEmulator(db, 'localhost', 8080);
      connectStorageEmulator(storage, 'localhost', 9199);
    }
  }
} catch (error) {
  console.error('Error initializing Firebase:', error);
  throw error;
}

export { app, analytics, auth, db, storage };

// Export a function to check if Firebase is initialized
export const isFirebaseInitialized = () => getApps().length > 0; 