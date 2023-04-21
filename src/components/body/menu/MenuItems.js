import React from "react";
import { auth } from "../../../api/firebase";
import MenuItem from "./MenuItem";
import { useOutletContext, useParams } from "react-router";
import { startRemoveCard, startStarCard, startUnstarCard } from "../../../actions/cardActions";
import { starSort } from "../../../functions/starSort";

const MenuItems = () => {
    const {
        allCardsArray,
        allUsers,
        currentUser,
        visibleUIDs,
        starredCardsArray,
    } = useOutletContext()
    const { type = 'found' } = useParams()
    const currentDisplay = []
    const selectedType = allCardsArray
        .filter(card => card.type === type)
        .sort(starSort)

    selectedType.forEach(card => {
        const visFlag = (visibleUIDs.includes(card.userUID) ? '' : 'visibility_lock');
        const handleDisplay = allUsers.length > 0
            ?
            allUsers.filter(user => user.uid === card.userUID)[0].email
            :
            ""
        if (currentUser.admin) {
            currentDisplay.push({ ...card, visFlag, handleDisplay, admin: true })
        } else if (
            (visFlag === '')
            ||
            (auth.currentUser && auth.currentUser.uid === card.userUID)
        ) {
            currentDisplay.push({ ...card, visFlag, handleDisplay: "", admin: false })
        }
    })
    const foundStar = starredCardsArray.filter(card => (card.type === 'found' && card.starStatus === 'selected'))[0]
    const madeStar = starredCardsArray.filter(card => (card.type === 'made' && card.starStatus === 'selected'))[0]

    const handleStarCard = (type, cardKey) => {
        if (currentUser.admin) {
            const currentStarred = type === 'found' ? foundStar : madeStar
            if (currentStarred) {
                startUnstarCard({ cardKey: currentStarred.cardKey })
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
}


export default MenuItems

// const { visibleUIDs, currentUser } = useOutletContext()

// return cardArray.map((cardData) => {
//     const alwaysVisible = visibleUIDs.includes(cardData.userUID)

//     if (
//         currentUser.admin
//         ||
//         alwaysVisible
//         ||
//         (auth.currentUser && auth.currentUser.uid === cardData.userUID)
//     ) {
//         return (
//             <MenuItem
//                 key={cardData.cardKey}
//                 cardData={cardData}
//                 alwaysVisible={alwaysVisible}
//                 removeCard={() => {
//                     startRemoveCard(cardData.type, cardData.cardKey)
//                 }}
//             />
//         )
//     }
// })