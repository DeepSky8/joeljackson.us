import React from "react";
import { auth } from "../../../api/firebase";
import MenuItem from "./MenuItem";
import { useOutletContext } from "react-router";
import { startRemoveCard } from "../../../actions/cardActions";

const MenuItems = ({ cardArray }) => {
    const { visibleUIDs, currentUser } = useOutletContext()

    return cardArray.map((cardData) => {
        const alwaysVisible = visibleUIDs.includes(cardData.userUID)

        if (
            currentUser.admin
            ||
            alwaysVisible
            ||
            (auth.currentUser && auth.currentUser.uid === cardData.userUID)
        ) {
            return (
                <MenuItem
                    key={cardData.cardKey}
                    cardData={cardData}
                    alwaysVisible={alwaysVisible}
                    removeCard={() => {
                        startRemoveCard(cardData.type, cardData.cardKey)
                    }}
                />
            )
        }
    })
}


export default MenuItems