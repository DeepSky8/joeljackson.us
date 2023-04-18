import React, { useEffect, useReducer } from "react";
import { userReducer } from "../../reducers/userReducer";
import { startAddVisible, startRemoveUser, startRemoveVisible, startUpdateUser, updateAdmin, updateHidden } from "../../actions/userActions";
import AdminSwitch from "./AdminSwitch";
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

const User = ({ userData }) => {
    const theme = useContext(ThemeContext)
    const [userState, dispatchUserState] = useReducer(userReducer, userData)
    const lastAccess = new Date(userState.lastAccess).toDateString()
    const dateData = lastAccess === 'Invalid Date' ? 'Never' : lastAccess
    const handle = userData.email.split('@')[0].toUpperCase()

    useEffect(() => {
        if (userState.admin !== undefined && userState.hidden !== undefined) {
            startUpdateUser({ uid: userState.uid, admin: userState.admin, hidden: userState.hidden })
            userState.hidden
                ?
                startRemoveVisible({ uid: userState.uid })
                :
                startAddVisible({ uid: userState.uid })
        }
    }, [userState])

    const handleDeleteUser = () => {
        startRemoveUser({ uid: userState.uid })
    }

    return (
        <div className="user__container">

            <span
                className="user__container--header"
            >
                <span className={`user__data--handle ${theme}`}>{handle}</span>

                <span className="user__container--button">
                    <button
                        className="user__button--delete"
                        onClick={handleDeleteUser}
                    >Delete User</button>
                </span>
            </span>

            <span
                className="user__container--accessed"
            >
                <span
                    className={`user__data--last ${theme}`}
                >
                    {`Last Accessed: `}
                </span>
                <span
                    className={`user__data--accessed ${theme}`}
                >
                    {dateData}
                </span>
            </span>
            
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
                text='Hidden: '
                discrete='hidden'
                field={userState.hidden}
                action={updateHidden}
                dispatchUserState={dispatchUserState}
            />
            <hr />
        </div>
    )
}

export default User

// <div>{`Admin: ${userState.admin}`}</div>

// <button>Lock User</button>