import React from "react";
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import { useNavigate, useParams } from "react-router";
import { auth, logout } from "../../api/firebase";

const AddLock = ({ authStatus, setAuthStatus }) => {
    const { type } = useParams()
    const theme = useContext(ThemeContext)
    const navigate = useNavigate()

    const addActions = () => {
        if (auth.currentUser) {
            navigate('add')
        } else {
            navigate(`/authenticate/${type}`)
        }
    }

    const authActions = () => {
        if (auth.currentUser) {
            logout()
            setAuthStatus('lock')
        } else {
            navigate(`/authenticate/${type}`)
        }
    }

    return (
        <div className={`addLock__container ${theme}`}>
            <span className={`addLock__container--addAuth ${theme}`}>
                <button
                    className={`material-icons add ${theme} addLock__button--addLock ${theme}`}
                    onClick={addActions} >
                    add
                </button>
                <button
                    className={`material-icons ${authStatus} ${theme} addLock__button--addLock ${theme}`}
                    onClick={authActions} >
                    {`${authStatus}`}
                </button>
            </span>
        </div>
    )
}

export default AddLock