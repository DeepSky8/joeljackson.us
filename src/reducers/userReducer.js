const defaultUserState = {
    authProvider: '',
    email: '',
    uid: '',
    admin: false,
    hidden: true,
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
        case 'UPDATE_HIDDEN':
            return {
                ...defaultUserState,
                ...state,
                hidden: action.hidden
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