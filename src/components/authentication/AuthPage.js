import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../../api/firebase";
import { useNavigate, useParams } from "react-router";
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import useLocalStorageState from 'use-local-storage-state';

const AuthPage = () => {
    const theme = useContext(ThemeContext)
    const navigate = useNavigate()
    const { back = '' } = useParams()
    const [resetEmail, setResetEmail, { removeItem }] = useLocalStorageState('jjResetEmail', { defaultValue: '' })
    const [email, setEmail] = useState(resetEmail)
    const [password, setPassword] = useState("")
    const [user, loading, error] = useAuthState(auth)
    const loginTitle = 'Login'
    const emailText = 'Login with Email'
    const newAccountText = "Create New Account"
    const resetPasswordText = 'Reset Password'
    const googleText = 'Login with Google'
    const returnApp = 'Return to App'


    useEffect(() => {
        if (loading) {
            return;
        }
        if (user) {
            removeItem();
            navigate(`/${back}`)
        };
    }, [user, loading]);



    const loginEmail = () => {
        logInWithEmailAndPassword(email, password)
    }

    return (
        <div className={`authPage__container`}>

            <span className={`authPage__container--title ${theme}`}>
                <h3>{loginTitle}</h3>
            </span>

            <hr />

            <span className={`authPage__container--login ${theme}`}>
                <span className="authPage__container--input">
                    <span className="authPage__login--label">
                        <label htmlFor="email">Email</label>
                    </span>
                    <input
                        id="email"
                        type="text"
                        className={`authPage__login--textBox ${theme}`}
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="E-mail Address"
                    />
                </span>
                <span className="authPage__container--input">
                    <span className="authPage__login--label">
                        <label htmlFor="password">Password</label>
                    </span>
                    <input
                        id="password"
                        type="password"
                        className={`authPage__login--textBox ${theme}`}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                </span>
            </span>

            <span className='authPage__container--buttons'>

                <span className="authPage__container--button">
                    <button
                        className={`authPage__login--button ${theme}`}
                        onClick={loginEmail}
                    >
                        {emailText}
                    </button>
                </span>

                <span className="authPage__container--button">
                    <button className={`authPage__login--button ${theme}`}
                        onClick={signInWithGoogle}
                    >
                        {googleText}
                    </button>
                </span>

                <hr />

                <span className="authPage__container--button">
                    <button
                        className={`authPage__login--button ${theme}`}
                        onClick={() => {
                            navigate(`/reset`)
                        }}
                    >
                        {resetPasswordText}
                    </button>
                </span>

                <span className="authPage__container--button">
                    <button
                        className={`authPage__login--button ${theme}`}
                        onClick={() => {
                            navigate(`/register/${back}`)
                        }}>
                        {newAccountText}
                    </button>
                </span>



                <span className="authPage__container--button">
                    <button
                        className={`authPage__login--button ${theme}`}
                        onClick={() => {
                            navigate(`/${back}`)
                        }}>
                        {returnApp}
                    </button>
                </span>
            </span>

        </div>
    )
}

export default AuthPage