import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../api/firebase";
import { useNavigate, useParams } from "react-router";
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import { sendPasswordResetEmail } from "firebase/auth";

const ResetPage = () => {
    const theme = useContext(ThemeContext)
    const navigate = useNavigate()
    const { back = '' } = useParams()
    const [email, setEmail] = useState("");
    const [user, loading, error] = useAuthState(auth)
    const resetTitle = 'Password Reset'
    const sendResetEmail = 'Send Password Reset Email'
    const newAccountText = "Create New Account"
    const returnLogin = 'Return to Login'
    const returnApp = 'Return to App'


    useEffect(() => {
        if (loading) {
            console.log('loading', loading)
            return;
        }
        if (user) navigate(`/${back}`);
    }, [user, loading]);

    return (
        <div className={`authPage__container`}>

            <span className={`authPage__container--title ${theme}`}>
                <h3>{resetTitle}</h3>
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
            </span>

            <span className='authPage__container--buttons'>

                <span className="authPage__container--button">
                    <button
                        className="authPage__login--button"
                        onClick={() => {
                            sendPasswordResetEmail(email)
                        }}
                    >
                        {sendResetEmail}
                    </button>
                </span>

                <hr />

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
                            navigate(`/authenticate/${back}`)
                        }}>
                        {returnLogin}
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

export default ResetPage