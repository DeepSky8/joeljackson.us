import React, { useEffect, useState } from "react";
import { off, onValue, ref } from "firebase/database";
import { auth, db } from "../../api/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router";
import User from "./User";

const AdminPage = () => {
    const [user, loading, error] = useAuthState(auth)
    const navigate = useNavigate()
    const [userArray, setUserArray] = useState([])

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
            })


        } else if (loading) {

        } else {
            navigate('/')
        }

        return () => {
            off(ref(db, `users`))
        }
    }, [user])

    return (
        <div className="adminPage__container">
            <h3>Admin Access</h3>
            <hr />
            {userArray.map((user) => {
                return (
                    <User
                        key={user.uid}
                        userData={user}
                    />
                )
            })}
        </div>
    )
}

export default AdminPage


