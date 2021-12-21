import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
	apiKey: "AIzaSyC5ig0hdxvlACwIwfTmi1DEwOzQHO27h_0",
	authDomain: "cinema-hub.firebaseapp.com",
	projectId: "cinema-hub",
	storageBucket: "cinema-hub.appspot.com",
	messagingSenderId: "552348185836",
	appId: "1:552348185836:web:fa6167e2ebe6581731a1c9",
	measurementId: "G-EEC6433XJ9"
  }

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
