import React from "react";
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import { useLocation, useNavigate, useParams } from "react-router";
import { auth, logout } from "../../api/firebase";

const AddLock = ({ authStatus, setAuthStatus, currentUser }) => {
    const { type = '' } = useParams()
    const location = useLocation()
    const theme = useContext(ThemeContext)
    const navigate = useNavigate()

    const addActions = () => {
        if (auth.currentUser) {
            navigate(`/add/${type}`)
        } else {
            navigate(`/authenticate/${type}`)
        }
    }

    const adminActions = () => {
        const location1 = location.pathname.split('/')[1]

        if (auth.currentUser && location1 === 'admin') {
            navigate('/')
        } else if (auth.currentUser) {
            navigate('/admin')
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
                    className={`material-icons add ${theme} addLock__button--addLock`}
                    onClick={addActions} >
                    add
                </button>

                {
                    currentUser.admin
                    &&
                    <button
                        className={`material-symbols-outlined demography ${theme} addLock__button--addLock`}
                        onClick={adminActions} >
                        demography
                    </button>}

                <button
                    className={`material-icons ${authStatus} ${theme} addLock__button--addLock`}
                    onClick={authActions} >
                    {`${authStatus}`}
                </button>

            </span>
        </div>
    )
}

export default AddLock