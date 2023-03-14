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