
const defaultRegisterLockState = {
    registerLock: true,
    userUID: 'SYSTEM',
    updatedOn: Date.now()
}

const registerLockReducer = (state, action) => {
    switch (action.type) {
        case 'LOAD_LOCK':
            return {
                ...defaultRegisterLockState,
                ...action.lockData,
                updatedOn: Date.now()

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