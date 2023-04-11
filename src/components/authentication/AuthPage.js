import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logInWithEmailAndPassword, registerWithEmailAndPassword, signInWithGoogle } from "../../api/firebase";
import { useNavigate, useParams } from "react-router";
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import { Link } from "react-router-dom";

const AuthPage = () => {
    const theme = useContext(ThemeContext)
    const navigate = useNavigate()
    const { back = '' } = useParams()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    const [user, loading, error] = useAuthState(auth)
    const [showRegisterPane, setRegisterPane] = useState(false)
    const login = 'Login'
    const register = 'Register now'
    const confirm = "Don't have an account?"
    const instead = 'Already have account? Login instead'

    useEffect(() => {
        if (loading) {
            console.log('loading', loading)
            return;
        }
        if (user) navigate(`/${back}`);
    }, [user, loading]);

    const booleanRegister = () => {
        setRegisterPane(!showRegisterPane)
    }

    const loginRegister = () => {
        if (showRegisterPane && (password === confirmPassword)) {
            registerWithEmailAndPassword(email, password)
        } else if (!showRegisterPane) {
            logInWithEmailAndPassword(email, password)
        } else {
            alert('Please ensure passwords match')
        }


    }

    return (
        <div>
            <button
                onClick={booleanRegister}>
                {
                    showRegisterPane ? instead : confirm
                }
            </button>

            <hr />
            <label htmlFor="email">Email</label>
            <input
                id="email"
                type="text"
                className="login__textBox"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail Address"
            />
            <label htmlFor="password">Password</label>
            <input
                id="password"
                type="password"
                className="login__textBox"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            {
                showRegisterPane
                &&
                <span>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        id="confirmPassword"
                        type="password"
                        className="login__textBox"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm Password"
                    />
                </span>

            }
            <button
                className="login__btn"
                onClick={loginRegister}
            >
                {showRegisterPane ? register : login}
            </button>

            <button className="login__btn login__google" onClick={signInWithGoogle}>
                Login with Google
            </button>
            <hr />
            <div>
                <Link to={`/${back}`}>Go Back</Link>
                <Link to="/reset">Forgot Password</Link>
            </div>

        </div>
    )
}

export default AuthPage