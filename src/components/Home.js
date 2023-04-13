import React, { useContext } from "react";
import ThemeContext from "./context/ThemeContext";
import Header from "./header/Header";
import { Outlet } from "react-router";
import { useState } from "react";
import { useEffect } from "react";
import { off, onValue, ref } from "firebase/database";
import { db } from "../api/firebase";
import AddLock from "./body/AddLock";

const Home = () => {
    const theme = useContext(ThemeContext)
    const [madeCardArray, setMadeCardArray] = useState([])
    const [foundCardArray, setFoundCardArray] = useState([])
    const [authStatus, setAuthStatus] = useState('lock')


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

    return (
        <div className={`window__background ${theme}`} >
            <Header />
            <div className={`home__content__wrapper ${theme}`}>
                <div className={`home__content--padding ${theme}`}>
                    <Outlet context={{ madeCardArray, foundCardArray, authStatus, setAuthStatus }} />
                </div>
            </div>
            <AddLock
                authStatus={authStatus}
                setAuthStatus={setAuthStatus}
            />
        </div>
    )
}

export default Home