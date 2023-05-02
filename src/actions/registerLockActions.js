import { ref, update } from "firebase/database";
import { db } from "../api/firebase";

export const loadLock = (lockData) => ({
    type: 'LOAD_LOCK',
    lockData
})

export const updateLock = (uid) => ({
    type: 'UPDATE_LOCK',
    uid
})

export const startLockRegistration = ({ lockData }) => {
    const updates = {};

    updates[`admin/`] = {...lockData}

    update(ref(db), updates)
        .catch((error) => {
            alert('Did not update Registration lock', error)
        })
}