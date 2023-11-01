import React, { useEffect, useReducer, useState } from "react";
import { off, onValue, ref } from "firebase/database";
import { auth, db } from "../../api/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router";
import User from "./User";
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import RegisterLock from "./RegisterLock";
import { defaultUserState, userReducer } from "../../reducers/userReducer";
import { loadUser } from "../../actions/userActions";
import { startRemoveCard } from "../../actions/cardActions";
import LoadingSpinner from "../LoadingSpinner";

const AdminPage = () => {
    const [user] = useAuthState(auth)
    const navigate = useNavigate()
    const theme = useContext(ThemeContext);
    const [currentUser, dispatchCurrentUser] = useReducer(userReducer, defaultUserState)
    const [userArray, setUserArray] = useState([])
    const [allCardsArray, setAllCards] = useState([])

    useEffect(() => {
        if (user) {

            onValue(ref(db, `users`), (snapshot) => {
                const tempUsersArray = [];
                if (snapshot.exists()) {
                    snapshot.forEach((snap) => {
                        tempUsersArray.push(snap.val())
                    })

                }
                if (tempUsersArray.length > 1) {
                    const sortedUsers = tempUsersArray.sort((a, b) => b.lastAccess - a.lastAccess)
                    setUserArray(sortedUsers)
                } else {
                    setUserArray(tempUsersArray)
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
            navigate('/')
        }

        return () => {
            off(ref(db, `users`))
        }
    }, [user])

    useEffect(() => {
        const cardListener = ref(db, `card`)

        onValue(cardListener, snapshot => {
            const tempArray = [];
            if (snapshot.exists()) {
                snapshot.forEach(snap => {
                    tempArray.push(snap.val())
                })
            }
            setAllCards(tempArray)
        })
        return (() => {
            off(cardListener)
        }
        )
    }, [])


    const removeAllItems = async (uid) => {
        if (currentUser.admin) {

            const cardsToRemove = allCardsArray
                .filter(card => card.userUID === uid)
                .map(card => card.cardKey);

            cardsToRemove.forEach(cardKey => {
                return startRemoveCard({ cardKey })
            })
        }
    }

    if (userArray.length > 0) {
        return (
            <div className={`adminPage__container`}>
                <h3
                    className={`adminPage__header ${theme}`}
                >
                    Administration
                </h3>
                <RegisterLock />

                <hr />

                <h3
                    className={`adminPage__header ${theme}`}
                >
                    Users
                </h3>
                <hr />
                {userArray.map((user) => {
                    return (
                        <User
                            key={user.uid}
                            userData={user}
                            removeAllItems={() => { removeAllItems(user.uid) }}
                        />
                    )
                })}
            </div>
        )
    } else {
        return (
            <LoadingSpinner />
        )
    }


}

export default AdminPage


