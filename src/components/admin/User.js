import React, { useReducer } from "react";
import { defaultUserState, userReducer } from "../../reducers/userReducer";

const User = ({ userData }) => {
    const [userState, dispatchUserState] = useReducer(userReducer, userData)
    const lastAccess = new Date(userState.lastAccess).toDateString()
    return (
        <div>
            <div>{userState.email}</div>
            <div>{`Last Accessed: ${lastAccess}`}</div>
            <div>{`Admin: ${userState.admin}`}</div>
            <hr />
        </div>
    )
}

export default User