import React from "react";
import { auth } from "../../../api/firebase";
import MenuItem from "./MenuItem";
import { useOutletContext } from "react-router";
import { startRemoveCard } from "../../../actions/cardActions";

const MenuItems = ({ cardArray }) => {
    const { authStatus, visibleUIDs, currentUser } = useOutletContext()

    return cardArray.map((cardData) => {
        if (
            (currentUser.admin)
            ||
            visibleUIDs.includes(cardData.userUID)
            ||
            (auth.currentUser && auth.currentUser.uid === cardData.userUID)
        ) {
            return (
                <MenuItem
                    key={cardData.cardKey}
                    authStatus={authStatus}
                    cardData={cardData}
                    removeCard={() => {
                        startRemoveCard(cardData.type, cardData.cardKey)
                    }}
                />
            )
        }
    })
}


export default MenuItems