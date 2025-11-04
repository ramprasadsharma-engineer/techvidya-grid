// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1ggJ3TK7WPM6gcnSAuPgG-rKaAd__aDg",
  authDomain: "techvidya-admin.firebaseapp.com",
  projectId: "techvidya-admin",
  storageBucket: "techvidya-admin.firebasestorage.app",
  messagingSenderId: "145993675101",
  appId: "1:145993675101:web:dc3342591645a1c197b8b4",
  measurementId: "G-Y8VY39PR3X"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase services
export const db = getFirestore(app)
export const auth = getAuth(app)

export default app
