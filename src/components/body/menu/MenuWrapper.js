import React from "react";
import {    useOutletContext, useParams} from "react-router";
import { startRemoveCard } from "../../../actions/cardActions";
import BodyNav from "../BodyNav";
import MenuItem from "./MenuItem";
import { useEffect } from "react";
import {
    auth,
} from "../../../api/firebase";

const MenuWrapper = () => {
    const { madeCardArray, foundCardArray, authStatus, setAuthStatus } = useOutletContext()
    const { type } = useParams()

    useEffect(() => {
        auth.currentUser ? setAuthStatus('lock_open') : setAuthStatus('lock')
    }, [auth.currentUser])

    const removeCard = (cardKey) => {
        startRemoveCard(type, cardKey)
    }

    return (
        <div className="menuWrapper__container">
            <BodyNav />

            <div className="menuWrapper__container--menuItems">
                {type === 'made' && madeCardArray.map((cardData) => {

                    return (
                        <MenuItem
                            key={cardData.cardKey}
                            authStatus={authStatus}
                            cardData={cardData}
                            removeCard={() => {
                                removeCard(cardData.cardKey)
                            }}
                        />
                    )
                })}

                {type === 'found' && foundCardArray.map((cardData) => {

                    return (

                        <MenuItem
                            key={cardData.cardKey}
                            authStatus={authStatus}
                            cardData={cardData}
                            removeCard={() => {
                                removeCard(cardData.cardKey)
                            }}
                        />
                    )
                })}
            </div>

        </div>
    )
}

export { MenuWrapper as default }
