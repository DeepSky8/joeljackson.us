
const defaultCardState = {
    cardKey: '',
    userUID: '',
    type: 'found',
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
                ...defaultCardState,
                ...state,
                type: action.updatedType
            }
        case 'UPDATE_UID':
            return {
                ...defaultCardState,
                ...state,
                userUID: action.userUID,
            }
        case 'UPDATE_TITLE':
            return {
                ...defaultCardState,
                ...state,
                title: action.updatedTitle
            }
        case 'UPDATE_BODY':
            return {
                ...defaultCardState,
                ...state,
                body: action.updatedBody
            }
        case 'UPDATE_LINK':
            return {
                ...defaultCardState,
                ...state,
                link: action.updatedLink
            }
        case 'UPDATE_IMAGE_FILE':
            return {
                ...state,
                imageFile: action.updatedImageFile,
                imageURL: null
            }
        case 'UPDATE_IMAGE_URL':
            return {
                ...state,
                imageURL: action.updatedImageURL
            }
        case 'CLEAR_IMAGE':
            return {
                ...defaultCardState,
                ...state,
                imageFile: null,
                imageURL: null,
            }
        case 'UPDATE_ALTTEXT':
            return {
                ...defaultCardState,
                ...state,
                altText: action.updatedAltText
            }
        case 'LOAD_CARD':
            return {
                ...defaultCardState,
                ...state,
                ...action.cardData
            }
        default:
            return state
    }
}

export { defaultCardState, cardReducer }