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
import { loadLock } from "../actions/registerLockActions";
import { defaultRegisterLockState, registerLockReducer } from "../reducers/registerLockReducer";

const Home = () => {
    const [user] = useAuthState(auth)
    const theme = useContext(ThemeContext)
    const [currentUser, dispatchCurrentUser] = useReducer(userReducer, defaultUserState)
    const [lockData, dispatchLockData] = useReducer(registerLockReducer, defaultRegisterLockState)
    const [allUsers, setAllUsers] = useState([])
    const [visibleUIDs, setVisibleUIDs] = useState([])
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

                setAllUsers(tempUsersArray)

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

    // Auth icon update, changes state for Edit/Remove button display
    useEffect(() => {
        auth.currentUser ? setAuthStatus('lock_open') : setAuthStatus('lock')
    }, [])

    // Locked Registration listener
    useEffect(() => {
        onValue(ref(db, 'admin/'), (snapshot) => {
            if (snapshot.exists) {
                dispatchLockData(loadLock(snapshot.val()))
            }
        })

        return () => {
            off(ref(db, 'admin/'))
        }
    }, [])

    return (
        <div className={`window__background ${theme}`} >
            <Header />
            <div className={`home__content__wrapper ${theme}`}>
                <div className={`home__content--padding ${theme}`}>
                    <Outlet context={{
                        allUsers,
                        authStatus,
                        currentUser,
                        lockData,
                        visibleUIDs,
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