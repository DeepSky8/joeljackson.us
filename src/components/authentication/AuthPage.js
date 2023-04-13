import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../../api/firebase";
import { useNavigate, useParams } from "react-router";
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

const AuthPage = () => {
    const theme = useContext(ThemeContext)
    const navigate = useNavigate()
    const { back = '' } = useParams()
    const [email, setEmail] = useState("")
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
            // console.log('loading', loading)
            return;
        }
        if (user) navigate(`/${back}`);
    }, [user, loading]);

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
                        className="authPage__login--textBox"
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
                        className="authPage__login--textBox"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                </span>
            </span>

            <span className='authPage__container--buttons'>

                <span className="authPage__container--button">
                    <button
                        className="authPage__login--button"
                        onClick={() => {
                            logInWithEmailAndPassword(email, password)
                        }}
                    >
                        {emailText}
                    </button>
                </span>

                <span className="authPage__container--button">
                    <button className="authPage__login--button"
                        onClick={signInWithGoogle}
                    >
                        {googleText}
                    </button>
                </span>

                <hr />

                <span className="authPage__container--button">
                    <button
                        className="authPage__login--button"
                        onClick={() => {
                            navigate(`/reset`)
                        }}
                    >
                        {resetPasswordText}
                    </button>
                </span>

                <span className="authPage__container--button">
                    <button
                        className="authPage__login--button"
                        onClick={() => {
                            navigate(`/register/${back}`)
                        }}>
                        {newAccountText}
                    </button>
                </span>



                <span className="authPage__container--button">
                    <button
                        className="authPage__login--button"
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