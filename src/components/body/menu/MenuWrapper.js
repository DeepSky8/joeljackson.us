import React from "react";
import { useOutletContext, useParams } from "react-router";
import { startRemoveCard } from "../../../actions/cardActions";
import BodyNav from "../BodyNav";
import MenuItem from "./MenuItem";
import { auth } from "../../../api/firebase";

const MenuWrapper = () => {
    const { madeCardArray, foundCardArray, authStatus, visibleUIDs, currentUser } = useOutletContext()
    const { type } = useParams()

    const removeCard = (cardKey) => {
        startRemoveCard(type, cardKey)
    }

    return (
        <div className="menuWrapper__container">
            <BodyNav />

            <div className="menuWrapper__container--menuItems">
                {type === 'made' && madeCardArray.map((cardData) => {
                    if (
                        visibleUIDs.includes(cardData.userUID)
                        ||
                        (auth.currentUser && auth.currentUser.uid === cardData.userUID)
                        ||
                        (currentUser.admin)
                    ) {
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
                    }

                })}

                {type === 'found' && foundCardArray.map((cardData) => {
                    if (
                        visibleUIDs.includes(cardData.userUID)
                        ||
                        (auth.currentUser && auth.currentUser.uid === cardData.userUID)
                        ||
                        (currentUser.admin)
                    ) {
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
                    }
                })}
            </div>

        </div>
    )
}

export { MenuWrapper as default }
