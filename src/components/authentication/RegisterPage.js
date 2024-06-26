import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, registerWithEmailAndPassword } from "../../api/firebase";
import { useNavigate, useOutletContext, useParams } from "react-router";
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

const RegisterPage = () => {
    const theme = useContext(ThemeContext)
    const { lockData } = useOutletContext();
    const navigate = useNavigate()
    const { back = '' } = useParams()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [user, loading] = useAuthState(auth)
    const registerTitle = 'Create New Account'
    const registerText = 'Register now'
    const returnLogin = 'Return to Login'
    const returnApp = 'Return to App'
    const lockAlert = 'Account Registration is currently locked'

    useEffect(() => {
        if (loading) {
            return;
        }
        if (user) navigate(`/${back}`);
        if (lockData.registerLock) {
            alert(lockAlert)
            navigate(`/${back}`)
        }
    }, [user, loading]);


    return (
        <div className={`authPage__container`}>

            <span className={`authPage__container--title ${theme}`}>
                <h3>{registerTitle}</h3>
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
                        placeholder="Email Address"
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

                <span className="authPage__container--input">
                    <span className="authPage__login--label">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                    </span>
                    <input
                        id="confirmPassword"
                        type="password"
                        className={`authPage__login--textBox ${theme}`}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm Password"
                    />
                </span>
            </span>

            <span className='authPage__container--buttons'>

                <span className="authPage__container--button">
                    <button
                        className={`authPage__login--button ${theme}`}
                        onClick={() => {
                            registerWithEmailAndPassword(email, password)
                        }}
                    >
                        {registerText}
                    </button>
                </span>

                <hr />

                <span className="authPage__container--button">
                    <button
                        className={`authPage__login--button ${theme}`}
                        onClick={() => {
                            navigate(`/authenticate/${back}`)
                        }}>
                        {returnLogin}
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

export default RegisterPage