import { child, get, push, ref, update } from 'firebase/database';
import { uploadBytesResumable, ref as sRef, getDownloadURL, deleteObject } from 'firebase/storage';
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

export const loadCard = (cardData) => ({
    type: 'LOAD_CARD',
    cardData
})

// Cloud Actions

export const startSaveCard = async ({ altText, body, link, title, type }, cardKey) => {
    const updates = {}

    updates[`${type}/${cardKey}/altText`] = altText
    updates[`${type}/${cardKey}/body`] = body
    updates[`${type}/${cardKey}/link`] = link
    updates[`${type}/${cardKey}/title`] = title
    updates[`${type}/${cardKey}/type`] = type
    updates[`${type}/${cardKey}/cardKey`] = cardKey

    update(ref(db), updates)
        .catch((error) => {
            console.log('Did not save link', error)
        })
}

const startSaveURL = async (type, cardKey, url) => {
    const updates = {}

    updates[`${type}/${cardKey}/imageURL`] = url

    update(ref(db), updates)
        .catch((error) => {
            console.log('Did not save url', error)
        })

    // return true
}

export const startUploadFile = async (imageFile, type, cardKey) => {
    const pathReference = sRef(storage, `${type}/${cardKey}`)
    uploadBytesResumable(pathReference, imageFile)
        .then(() => {
            return getDownloadURL(pathReference)
        })
        .then((url) => {
            startSaveURL(type, cardKey, url)
        })
        // .then((result) => {
        //     return result
        // })
        .catch((error) => {
            alert('Did not upload image')
            console.log('Did not upload file', error)
        })
}

export const startNewLink = (cardData) => {
    const newCardKey = push(child(ref(db), `${cardData.type}`)).key
    startSaveCard(cardData, newCardKey)
    startUploadFile(cardData.imageFile, cardData.type, newCardKey)
    // .then(() => {
    //     return true
    // })
}

export const startGetCards = async (type) => {

    return get(ref(db, `${type}`))
        .then((snapshot) => {
            const tempList = [];
            if (snapshot.exists()) {
                snapshot.forEach((snap) => {
                    tempList.push(snap.val())
                })
            }
            return tempList
        })
        .catch((error) => {
            console.log('error', error)
        })

}

export const startRemoveCard = async (type = 'undefined', cardKey) => {
    const updates = {}
    const storageRef = sRef(storage, `${type}/${cardKey}/`)

    updates[`${type}/${cardKey}/`] = null

    update(ref(db), updates)
    deleteObject(storageRef)
        .catch((error) => {
            console.log('Error deleting image', error)
        })
}

