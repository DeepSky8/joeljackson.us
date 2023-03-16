import { child, push, ref, update } from 'firebase/database';
import { uploadBytesResumable, ref as sRef } from 'firebase/storage';
import { db, storage } from "../api/firebase";

export const updateType = (updatedType) => ({
    type: 'UPDATE_TYPE',
    updatedType
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

// Cloud Actions

export const startSaveLink = ({ altText, body, link, title, type }, cardKey) => {
    const updates = {}

    updates[`${type}/${cardKey}`] = { altText, body, link, title, type, cardKey }

    update(ref(db), updates)
        .catch((error) => {
            console.log('Did not save link', error)
        })
}

export const startUploadFile = (imageFile, cardKey) => {
    const pathReference = sRef(storage, `/images/${cardKey}`)
    const uploadTask = uploadBytesResumable(pathReference, imageFile)
        .catch((error) => {
            alert('Did not upload image')
            console.log('Did not upload file', error)
        })
}

export const startNewLink = (cardData) => {
    const newCardKey = push(child(ref(db), `${cardData.type}`)).key
    startSaveLink(cardData, newCardKey)
    startUploadFile(cardData.imageFile, newCardKey)
}


