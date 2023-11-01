import React, { useEffect, useState } from "react";
import { auth, db } from "../../../api/firebase";
import MenuItem from "./MenuItem";
import { useOutletContext, useParams } from "react-router";
import { startRemoveCard, startStarCard, startUnstarCard } from "../../../actions/cardActions";
import { starSort } from "../../../functions/starSort";
import { equalTo, off, onValue, orderByChild, query, ref } from "firebase/database";
import LoadingSpinner from "../../LoadingSpinner";

const MenuItems = () => {
    const {
        allUsers,
        currentUser,
        visibleUIDs,
    } = useOutletContext()
    const { type } = useParams()
    const [sortedArray, setSortedArray] = useState([])
    const currentDisplay = []


    // Card Listener
    useEffect(() => {
        const cardTypeListenerQuery = query(ref(db, `card`), orderByChild('type'), equalTo(type))
        if (type) {
            onValue(cardTypeListenerQuery, (snapshot) => {
                const tempCardsArray = [];

                if (snapshot.exists()) {
                    snapshot.forEach((snap) => {
                        tempCardsArray.push(snap.val())
                    })
                }
                const sortedCards = tempCardsArray.sort((a, b) => (b.dateUpdated - a.dateUpdated)).sort(starSort)
                setSortedArray(sortedCards)

            })
        }

        return () => {
            if (type) {
                off(cardTypeListenerQuery)
            }
        }
    }, [type])

    sortedArray.forEach(card => {
        const visFlag = (visibleUIDs.includes(card.userUID) ? '' : 'visibility_lock');
        const handleDisplay = allUsers.length > 0
            ?
            allUsers.find(user => user.uid === card.userUID).email
            :
            ""
        if (currentUser.admin && handleDisplay) {
            currentDisplay.push({ ...card, visFlag, handleDisplay, admin: true })
        } else if (
            (visFlag === '')
            ||
            (auth.currentUser && auth.currentUser.uid === card.userUID)
        ) {
            currentDisplay.push({ ...card, visFlag, handleDisplay: "", admin: false })
        }
    })


    const handleStarCard = (cardKey) => {
        if (currentUser.admin) {
            const starredCard = currentDisplay.find(card => card.starStatus === 'selected')

            if (starredCard) {
                startUnstarCard({ cardKey: starredCard.cardKey })
                    .then(() => {
                        startStarCard({ cardKey })
                    })
            } else {
                startStarCard({ cardKey })
            }
        }
    }

    const handleUnstarCard = (cardKey) => {
        if (currentUser.admin) {
            startUnstarCard({ cardKey })
        }
    }

    if (currentDisplay.length > 0) {

        return currentDisplay.map((cardData) => {
            return (
                <MenuItem
                    key={cardData.cardKey}
                    cardData={cardData}
                    removeCard={() => {
                        startRemoveCard({ cardKey: cardData.cardKey })
                    }}
                    handleStarCard={handleStarCard}
                    handleUnstarCard={handleUnstarCard}
                />
            )
        })

    } else {
        return (
            <LoadingSpinner />
        )


    }

}


export default MenuItems