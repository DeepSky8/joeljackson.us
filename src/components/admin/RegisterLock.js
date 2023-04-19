import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../api/firebase";
import { startLockRegistration, updateLock } from "../../actions/registerLockActions";
import AdminSwitch from "./AdminSwitch";
import { useReducer } from "react";
import { defaultRegisterLockState, registerLockReducer } from "../../reducers/registerLockReducer";
import { useOutletContext } from "react-router";
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import { useEffect } from "react";

const RegisterLock = () => {
    const [user, loading, error] = useAuthState(auth)
    const theme = useContext(ThemeContext);
    const { allUsers, lockData } = useOutletContext();
    const [lockState, dispatchLockState] = useReducer(registerLockReducer, lockData)
    const updatedBy = allUsers
        .filter(user => user.uid === lockData.userUID)
        .map(user => user.email)[0]
        .split('@')[0]
        .toUpperCase()

    useEffect(() => {
        if (lockState.userUID !== 'SYSTEM') {
            startLockRegistration({ lockData: lockState })
        }
    }, [lockState])

    return (
        <div className="registerLock__container">

            <AdminSwitch
                uid={user ? user.uid : 'SYSTEM'}
                text="Lock Registration: "
                discrete='lock'
                field={true}
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
                    {new Date(lockState.updatedOn).toDateString()}
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