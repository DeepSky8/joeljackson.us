import { ref, update } from "firebase/database";
import { db } from "../api/firebase";


export const startCreateUser = async ({ uid, authProvider, email }) => {
    const updates = {};

    updates[`users/${uid}`] = { uid, authProvider, email }

    update(ref(db), updates)
        .catch((error) => {
            console.log('Did not save link', error)
        })
}