import { ref, update } from "firebase/database";
import { db } from "../api/firebase";


export const startCreateUser = async ({ uid, authProvider, email = 'none provided' }) => {
    const updates = {};

    updates[`users/${uid}`] = { uid, authProvider, email, admin: false, hidden: true }

    update(ref(db), updates)
        .catch((error) => {
            console.log('Did not save link', error)
        })
}

export const startUpdateUserAccessDate = async ({ uid }) => {
    const updates = {};

    updates[`users/${uid}/lastAccess`] = Date.now()

    update(ref(db), updates)
        .catch((error) => {
            console.log('Did not update access date', error)
        })
}