import { initializeApp } from "firebase/app";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
import { startCreateUser, startUpdateUserAccessDate } from "../actions/authActions";

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
const auth = getAuth(app);
const db = getDatabase(app);
const storage = getStorage(app)

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
    try {
        await signInWithPopup(auth, googleProvider)
            .then((result) => {
                startCreateUser({ uid: result.user.uid, authProvider: 'Google', email: result.user.email.split('@')[0].toUpperCase() })
                return result.user.uid
            })
            .then((uid) => {
                startUpdateUserAccessDate({ uid })
            })
            .catch((error) => {
                alert(error)
            })
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logInWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                if (result) {
                    startUpdateUserAccessDate({ uid: result.user.uid })
                }
            })
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const registerWithEmailAndPassword = async (email, password) => {
    try {
        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {

                startCreateUser({
                    uid: result.user.uid,
                    authProvider: 'local',
                    email: email.split('@')[0].toUpperCase()
                })

            })
            .catch((err) => {
                console.error(err);
                alert(err.message);
            })
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const sendPasswordReset = async (email) => {
    await sendPasswordResetEmail(auth, email)
        .then(() => {
            alert("Password reset link sent!");
        })
        .catch((error) => {
            alert(error.message)
        })
};

const logout = () => {
    signOut(auth);
};

export {
    auth,
    db,
    logInWithEmailAndPassword,
    logout,
    registerWithEmailAndPassword,
    sendPasswordReset,
    signInWithGoogle,
    storage
}