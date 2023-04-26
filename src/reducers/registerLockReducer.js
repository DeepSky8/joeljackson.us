
const defaultRegisterLockState = {
    registerLock: true,
    userUID: 'SYSTEM',
    updatedOn: 0
}

const registerLockReducer = (state, action) => {
    switch (action.type) {
        case 'LOAD_LOCK':
            return {
                ...action.lockData,
            }
        case 'UPDATE_LOCK':
            return {
                ...state,
                registerLock: !state.registerLock,
                userUID: action.uid,
                updatedOn: Date.now()

            }
        default:
            return {
                ...state
            }
    }
}

export { registerLockReducer, defaultRegisterLockState }