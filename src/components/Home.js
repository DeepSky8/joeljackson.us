import React, { useContext, useReducer } from "react";
import ThemeContext from "./context/ThemeContext";
import Header from "./header/Header";
import { Outlet } from "react-router";
import { useState } from "react";
import { useEffect } from "react";
import { off, onValue, ref } from "firebase/database";
import { auth, db } from "../api/firebase";
import AddLock from "./body/AddLock";
import { defaultUserState, userReducer } from "../reducers/userReducer";
import { clearUser, loadUser } from "../actions/userActions";
import { useAuthState } from "react-firebase-hooks/auth";

const Home = () => {
    const [user, loading, error] = useAuthState(auth)
    const theme = useContext(ThemeContext)
    const [currentUser, dispatchCurrentUser] = useReducer(userReducer, defaultUserState)
    const [visibleUIDs, setVisibleUIDs] = useState([])
    const [madeCardArray, setMadeCardArray] = useState([])
    const [foundCardArray, setFoundCardArray] = useState([])
    const [authStatus, setAuthStatus] = useState('lock')

    // Current User Listener
    useEffect(() => {
        if (user) {
            onValue(ref(db, `users`), (snapshot) => {
                const tempUsersArray = [];
                if (snapshot.exists()) {
                    snapshot.forEach((snap) => {
                        tempUsersArray.push(snap.val())
                    })
                }
                const tempCurrentUserIndex = tempUsersArray
                    .map(user => user.uid)
                    .findIndex(uid => uid === auth.currentUser.uid)

                if (tempCurrentUserIndex >= 0) {
                    dispatchCurrentUser(loadUser(tempUsersArray[tempCurrentUserIndex]))
                } else {
                    alert('failed to dispatch current user')
                }
            })
        } else {
            dispatchCurrentUser(clearUser())
        }

        return () => {
            off(ref(db, `users`))
        }
    }, [user])

    // Users with universally visible items
    useEffect(() => {
        onValue(ref(db, 'visible'), (snapshot) => {
            const tempVisibleUIDs = [];
            if (snapshot.exists()) {
                snapshot.forEach((snap) => {
                    tempVisibleUIDs.push(snap.val())
                })
            }
            setVisibleUIDs(tempVisibleUIDs)
        })

        return (() => {
            off(ref(db, 'visible'))
        })
    }, [])

    // Made Card Listener
    useEffect(() => {
        onValue(ref(db, `made`), (snapshot) => {
            const tempCardsArray = [];
            if (snapshot.exists()) {
                snapshot.forEach((snap) => {
                    tempCardsArray.push(snap.val())
                })
            }
            setMadeCardArray(tempCardsArray)
        })

        return () => {
            off(ref(db, `made`))
        }
    }, [])

    // Found Card Listener
    useEffect(() => {
        onValue(ref(db, `found`), (snapshot) => {
            const tempCardsArray = [];
            if (snapshot.exists()) {
                snapshot.forEach((snap) => {
                    tempCardsArray.push(snap.val())
                })
            }
            setFoundCardArray(tempCardsArray)
        })

        return () => {
            off(ref(db, `found`))
        }
    }, [])

    // Auth icon update, changes state for Edit/Remove button display
    useEffect(() => {
        auth.currentUser ? setAuthStatus('lock_open') : setAuthStatus('lock')
    }, [auth.currentUser])

    return (
        <div className={`window__background ${theme}`} >
            <Header />
            <div className={`home__content__wrapper ${theme}`}>
                <div className={`home__content--padding ${theme}`}>
                    <Outlet context={{
                        madeCardArray,
                        foundCardArray,
                        authStatus,
                        visibleUIDs,
                        currentUser
                    }} />
                </div>
            </div>
            <AddLock
                authStatus={authStatus}
                setAuthStatus={setAuthStatus}
                currentUser={currentUser}
            />
        </div>
    )
}

export default Home