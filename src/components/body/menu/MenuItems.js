import React from "react";
import { auth } from "../../../api/firebase";
import MenuItem from "./MenuItem";
import { useOutletContext, useParams } from "react-router";
import { startRemoveCard } from "../../../actions/cardActions";

const MenuItems = () => {
    const {
        allUsers,
        madeCardArray,
        foundCardArray,
        currentUser,
        visibleUIDs,
        madeCardStarred,
        foundCardStarred,
    } = useOutletContext()
    const { type = 'found' } = useParams()
    const currentDisplay = []
    const selectedType = (type === 'found' ? foundCardArray : madeCardArray)

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
    // const foundStar = (foundCardStarred.length > 0
    //     ?
    //     foundCardStarred[0]
    //     :
    //     null
    // )

    // const madeStar = (madeCardStarred.length > 0
    //     ?
    //     madeCardStarred[0]
    //     :
    //     null
    // )

    // const currentStarred = (type === 'found'
    //     ?
    //     foundStar
    //     :
    //     madeStar
    // )

    // const handleStarCard = (type, cardKey) => {
    //     if (currentUser.admin) {




    //     }
    // }

    return currentDisplay.map((cardData) => {
        return (
            <MenuItem
                key={cardData.cardKey}
                cardData={cardData}
                removeCard={() => {
                    startRemoveCard(cardData.type, cardData.cardKey)
                }}
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