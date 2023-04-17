import React, { useEffect, useReducer } from "react";
import { userReducer } from "../../reducers/userReducer";
import { startLockUser, startRemoveUser, startUpdateUser, updateAdmin, updateLocked } from "../../actions/userActions";
import AdminSwitch from "./AdminSwitch";

const User = ({ userData }) => {
    const [userState, dispatchUserState] = useReducer(userReducer, userData)
    const lastAccess = new Date(userState.lastAccess).toDateString()
    const dateData = lastAccess === 'Invalid Date' ? 'Never' : lastAccess

    useEffect(() => {
        if (userState.admin !== undefined && userState.locked !== undefined) {
            startUpdateUser({ uid: userState.uid, admin: userState.admin, locked: userState.locked })

        }
    }, [userState])

    const handleDeleteUser = () => {
        startRemoveUser({ uid: userState.uid })
    }

    return (
        <div className="user__container">
            <div className="user__data--email">{userState.email}</div>
            <div>{`Last Accessed: ${dateData}`}</div>
            <AdminSwitch
                uid={userState.uid}
                text='Admin: '
                discrete='admin'
                field={userState.admin}
                action={updateAdmin}
                dispatchUserState={dispatchUserState}
            />

            <AdminSwitch
                uid={userState.uid}
                text='Locked: '
                discrete='locked'
                field={userState.locked}
                action={updateLocked}
                dispatchUserState={dispatchUserState}
            />
            <span>
                <button
                    onClick={handleDeleteUser}
                >Delete User</button>

            </span>
            <hr />
        </div>
    )
}

export default User

// <div>{`Admin: ${userState.admin}`}</div>

// <button>Lock User</button>