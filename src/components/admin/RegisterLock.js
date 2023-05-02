import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../api/firebase";
import { startLockRegistration, updateLock } from "../../actions/registerLockActions";
import AdminSwitch from "./AdminSwitch";
import { useReducer } from "react";
import { registerLockReducer } from "../../reducers/registerLockReducer";
import { useOutletContext } from "react-router";
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import { useEffect } from "react";

const RegisterLock = () => {
    const [user, loading, error] = useAuthState(auth)
    const theme = useContext(ThemeContext);
    const { allUsers, lockData } = useOutletContext();
    const [lockState, dispatchLockState] = useReducer(registerLockReducer, lockData)
    const updatedOn = new Date(lockState.updatedOn).toDateString()
    const updatedBy = allUsers
        .filter(user => user.uid === lockData.userUID)
        .map(user => user.email)[0]

    useEffect(() => {
        if (lockState.userUID !== 'SYSTEM' && lockState.updatedOn !== lockData.updatedOn) {
            startLockRegistration({ lockData: lockState })
        }
    }, [lockState])

    return (
        <div className="registerLock__container">

            <AdminSwitch
                uid={user ? user.uid : 'SYSTEM'}
                text="Lock Registration: "
                discrete='lock'
                field={lockData.registerLock}
                action={updateLock}
                dispatchState={dispatchLockState}
                value1={user ? user.uid : 'SYSTEM'}
                value2={user ? user.uid : 'SYSTEM'}
            />

            <span
                className="registerLock__container--display"
            >
                <span
                    className={`registerLock__data--descriptor ${theme}`}
                >
                    {`Last Updated: `}
                </span>
                <span
                    className={`registerLock__data--updated ${theme}`}
                >
                    {updatedOn}
                </span>
            </span>

            <span
                className="registerLock__container--display"
            >
                <span
                    className={`registerLock__data--descriptor ${theme}`}
                >
                    {`Updated By: `}
                </span>
                <span
                    className={`registerLock__data--updated ${theme}`}
                >
                    {updatedBy}
                </span>
            </span>
        </div>
    )
}

export default RegisterLock