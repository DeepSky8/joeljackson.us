
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
    altTextPlaceholder: 'Please describe the image',
    dateCreated: Date.now(),
    dateUpdated: 0,
    starStatus: '',
}

const cardReducer = (state, action) => {

    switch (action.type) {
        case 'UPDATE_TYPE':
            return {
                ...defaultCardState,
                ...state,
                type: action.updatedType,
                dateUpdated: Date.now(),
            }
        case 'UPDATE_UID':
            return {
                ...defaultCardState,
                ...state,
                userUID: action.userUID,
                dateUpdated: Date.now(),
            }
        case 'UPDATE_TITLE':
            return {
                ...defaultCardState,
                ...state,
                title: action.updatedTitle,
                dateUpdated: Date.now(),
            }
        case 'UPDATE_BODY':
            return {
                ...defaultCardState,
                ...state,
                body: action.updatedBody,
                dateUpdated: Date.now(),
            }
        case 'UPDATE_LINK':
            return {
                ...defaultCardState,
                ...state,
                link: action.updatedLink,
                dateUpdated: Date.now(),
            }
        case 'UPDATE_IMAGE_FILE':
            return {
                ...state,
                imageFile: action.updatedImageFile,
                imageURL: null,
                dateUpdated: Date.now(),
            }
        case 'UPDATE_IMAGE_URL':
            return {
                ...state,
                imageURL: action.updatedImageURL,
                dateUpdated: Date.now(),
            }
        case 'CLEAR_IMAGE':
            return {
                ...defaultCardState,
                ...state,
                imageFile: null,
                imageURL: null,
                dateUpdated: Date.now(),
            }
        case 'UPDATE_ALTTEXT':
            return {
                ...defaultCardState,
                ...state,
                altText: action.updatedAltText,
                dateUpdated: Date.now(),
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