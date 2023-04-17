import { ref, update } from "firebase/database";
import { db } from "../api/firebase";

export const loadUser = (userData) => ({
    type: 'LOAD_USER',
    userData
})

export const updateAdmin = (admin) => ({
    type: 'UPDATE_ADMIN',
    admin
})

export const updateLocked = (locked) => ({
    type: 'UPDATE_LOCK',
    locked
})

export const clearUser = () => ({
    type: 'CLEAR_USER'
})

export const startRemoveUser = ({ uid }) => {
    const updates = {};

    updates[`users/${uid}`] = null

    update(ref(db), updates)
        .catch((error) => {
            alert('Did not remove user', error)
        })
}

const startLockUser = ({ uid, lockStatus }) => {
    const updates = {};

    updates[`users/${uid}/locked`] = lockStatus

    update(ref(db), updates)
        .catch((error) => {
            alert('Did not process user lock command', error)
        })
}

export const startUpdateUser = ({ uid, admin, locked }) => {
    const updates = {};

    updates[`users/${uid}/admin`] = admin
    updates[`users/${uid}/locked`] = locked


    update(ref(db), updates)
        .catch((error) => {
            alert('Did not update user', error)
        })
}