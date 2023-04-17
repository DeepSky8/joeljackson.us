const defaultUserState = {
    authProvider: '',
    email: '',
    uid: '',
    admin: false,
    locked: false,
    lastAccess: 0,
}

const userReducer = (state, action) => {
    switch (action.type) {
        case 'LOAD_USER':
            return {
                ...defaultUserState,
                ...action.userData
            }
        case 'UPDATE_ADMIN':
            return {
                ...defaultUserState,
                ...state,
                admin: action.admin
            }
        case 'UPDATE_LOCK':
            return {
                ...defaultUserState,
                ...state,
                locked: action.locked
            }
        case 'CLEAR_USER':
            return {
                ...defaultUserState
            }
        default:
            return state
    }
}

export { defaultUserState, userReducer }