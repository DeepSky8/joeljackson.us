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

export const updateHidden = (hidden) => ({
    type: 'UPDATE_HIDDEN',
    hidden
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

export const startUpdateUser = ({ uid, admin, hidden }) => {
    const updates = {};

    updates[`users/${uid}/admin`] = admin
    updates[`users/${uid}/hidden`] = hidden


    update(ref(db), updates)
        .catch((error) => {
            alert('Did not update user', error)
        })
}

export const startAddVisible = ({ uid }) => {
    const updates = {};

    updates[`visible/${uid}`] = uid

    update(ref(db), updates)
        .catch((error) => {
            alert('Did not update visible', error)
        })
}

export const startRemoveVisible = ({ uid }) => {
    const updates = {};

    updates[`visible/${uid}`] = null

    update(ref(db), updates)
        .catch((error) => {
            alert('Did not update visible', error)
        })
}