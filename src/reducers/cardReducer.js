
const defaultCardState = {
    cardKey: '',
    type: 'made',
    title: '',
    titlePlaceholder: 'Catchy or otherwise',
    body: '',
    bodyPlaceholder: 'A reason to visit',
    link: '',
    linkPlaceholder: "So ... where we goin'?",
    imageFile: null,
    imageURL: null,
    altText: '',
    altTextPlaceholder: 'Please describe the image'
}

const cardReducer = (state, action) => {

    switch (action.type) {
        case 'UPDATE_TYPE':
            return {
                ...state,
                type: action.updatedType
            }
        case 'UPDATE_TITLE':
            return {
                ...state,
                title: action.updatedTitle
            }
        case 'UPDATE_BODY':
            return {
                ...state,
                body: action.updatedBody
            }
        case 'UPDATE_LINK':
            return {
                ...state,
                link: action.updatedLink
            }
        case 'UPDATE_IMAGE_FILE':
            return {
                ...state,
                imageFile: action.updatedImageFile
            }
        case 'UPDATE_IMAGE_URL':
            return {
                ...state,
                imageURL: action.updatedImageURL
            }
        case 'CLEAR_IMAGE':
            return {
                ...state,
                imageFile: null,
                imageURL: null,
            }
        case 'UPDATE_ALTTEXT':
            return {
                ...state,
                altText: action.updatedAltText
            }
        default:
            return state
    }
}

export { defaultCardState, cardReducer }