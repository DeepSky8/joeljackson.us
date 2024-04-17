import { child, push, ref, update } from 'firebase/database';
import { uploadBytesResumable, ref as sRef, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from "../api/firebase";

export const updateType = (updatedType) => ({
    type: 'UPDATE_TYPE',
    updatedType
})

export const updateUID = (userUID) => ({
    type: 'UPDATE_UID',
    userUID
})


export const updateTitle = (updatedTitle) => ({
    type: 'UPDATE_TITLE',
    updatedTitle
})

export const updateBody = (updatedBody) => ({
    type: 'UPDATE_BODY',
    updatedBody
})

export const updateLink = (updatedLink) => ({
    type: 'UPDATE_LINK',
    updatedLink
})

export const updateImageFile = (updatedImageFile) => ({
    type: 'UPDATE_IMAGE_FILE',
    updatedImageFile
})

export const updateImageURL = (updatedImageURL) => ({
    type: 'UPDATE_IMAGE_URL',
    updatedImageURL
})


export const updateAltText = (updatedAltText) => ({
    type: 'UPDATE_ALTTEXT',
    updatedAltText
})

export const clearImage = () => ({
    type: 'CLEAR_IMAGE'
})

export const loadCard = (cardData) => ({
    type: 'LOAD_CARD',
    cardData
})

// Cloud Actions

export const startSaveCard = async ({ altText, body, link, title, type, userUID, dateCreated, dateUpdated }, cardKey) => {
    const updates = {}

    updates[`card/${cardKey}/altText`] = altText
    updates[`card/${cardKey}/body`] = body
    updates[`card/${cardKey}/link`] = link
    updates[`card/${cardKey}/title`] = title
    updates[`card/${cardKey}/type`] = type
    updates[`card/${cardKey}/cardKey`] = cardKey
    updates[`card/${cardKey}/userUID`] = userUID
    updates[`card/${cardKey}/dateCreated`] = dateCreated
    updates[`card/${cardKey}/dateUpdated`] = dateUpdated

    update(ref(db), updates)
        .catch((error) => {
            console.log('Did not save link', error)
        })
}

const startSaveURL = async ({ cardKey, url }) => {
    const updates = {}

    updates[`card/${cardKey}/imageURL`] = url

    update(ref(db), updates)
        .catch((error) => {
            console.log('Did not save url', error)
        })
}

export const startUploadFile = async ({ imageFile, cardKey }) => {
    const pathReference = sRef(storage, `card/${cardKey}`)
    uploadBytesResumable(pathReference, imageFile)
        .then(() => {
            return getDownloadURL(pathReference)
        })
        .then((url) => {
            startSaveURL({ cardKey, url })
        })

        .catch((error) => {
            alert('Did not upload image')
            console.log('Did not upload file', error)
        })
}

export const startNewLink = ({ cardData }) => {
    const newCardKey = push(child(ref(db), `card`)).key
    startSaveCard({ ...cardData }, newCardKey)
    if (cardData.imageFile) {
        startUploadFile({ imageFile: cardData.imageFile, cardKey: newCardKey })
    }
}

export const startRemoveCard = async ({ cardKey }) => {
    const updates = {}
    const storageRef = sRef(storage, `card/${cardKey}/`)

    updates[`card/${cardKey}/`] = null

    update(ref(db), updates)
    deleteObject(storageRef)
        .catch((error) => {
            console.log('Error deleting image', error)
        })
}

export const startStarCard = async ({ cardKey }) => {
    const updates = {}

    updates[`card/${cardKey}/starStatus`] = 'selected'

    update(ref(db), updates)
        .catch((error) => {
            alert('Did not star card,', error)
        })
}

export const startUnstarCard = async ({ cardKey }) => {
    const updates = {}

    updates[`card/${cardKey}/starStatus`] = null

    update(ref(db), updates)
        .catch((error) => {
            alert('Did not unstar card,', error)
        })
}