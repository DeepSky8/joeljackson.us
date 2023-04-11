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
import { startCreateUser } from "../actions/authActions";

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
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        console.log('user data popup', user)
        // const q = query(collection(db, "users"), where("uid", "==", user.uid));
        // const docs = await getDocs(q);
        // if (docs.docs.length === 0) {
        //     await addDoc(collection(db, "users"), {
        //         uid: user.uid,
        //         name: user.displayName,
        //         authProvider: "google",
        //         email: user.email,
        //     });
        // }
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logInWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
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
                    email
                })

            })
            .catch((err) => {
                console.error(err);
                alert(err.message);
            })


        // await addDoc(collection(db, "users"), {
        //     uid: user.uid,
        //     name,
        //     authProvider: "local",
        //     email,
        // });
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent!");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
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