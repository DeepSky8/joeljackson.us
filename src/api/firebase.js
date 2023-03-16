import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBLLiiPD4ClwO7ejHFPDDP8d74LzF7YMJ0",
    authDomain: "joeljacksonus.firebaseapp.com",
    projectId: "joeljacksonus",
    storageBucket: "joeljacksonus.appspot.com",
    messagingSenderId: "143570559003",
    appId: "1:143570559003:web:eabbd1b46ad4be454898be"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const storage = getStorage(app)

export { db, storage }