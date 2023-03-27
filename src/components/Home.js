import React, { useContext, useEffect } from "react";
import ThemeContext from "./context/ThemeContext";
import Header from "./header/Header";
import useLocalStorageState from "use-local-storage-state";
import { off, onValue, ref } from "firebase/database";
import { db } from "../api/firebase";
import { Outlet } from "react-router";
import { clearLocalCards } from "../api/local";




const Home = () => {
    const theme = useContext(ThemeContext)
    const [madeKeys, setMadeKeys] = useLocalStorageState('madeKeys', { defaultValue: [] })
    const [foundKeys, setFoundKeys] = useLocalStorageState('foundKeys', { defaultValue: [] })

    useEffect(() => {
        onValue(ref(db, `made`), (snapshot) => {
            const tempKeysArray = [];
            const tempCardsArray = [];
            if (snapshot.exists()) {
                clearLocalCards(madeKeys)
                snapshot.forEach((snap) => {
                    tempKeysArray.push(snap.val().cardKey)
                    tempCardsArray.push(snap.val())
                })
            } else {
                setMadeKeys([])
            }
            setMadeKeys(tempKeysArray)
            tempCardsArray.forEach((card) => {
                localStorage.setItem(card.cardKey, JSON.stringify(card))
            })
        })

        return () => {
            off(ref(db, 'made'))
        }
    }, [])

    useEffect(() => {
        onValue(ref(db, `found`), (snapshot) => {
            const tempKeysArray = [];
            const tempCardsArray = [];
            if (snapshot.exists()) {
                clearLocalCards(foundKeys)
                snapshot.forEach((snap) => {
                    tempKeysArray.push(snap.val().cardKey)
                    tempCardsArray.push(snap.val())
                })
            } else {
                setFoundKeys([])
            }
            setFoundKeys(tempKeysArray)
            tempCardsArray.forEach((card) => {
                localStorage.setItem(card.cardKey, JSON.stringify(card))
            })
        })

        return () => {
            off(ref(db, 'found'))
        }
    }, [])



    return (
        <div className={`window__background ${theme}`} >
            <Header />
            <div className={`home__content__wrapper ${theme}`}>
                <div className={`home__content--padding ${theme}`}>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Home