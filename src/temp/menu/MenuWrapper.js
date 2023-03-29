import React, { Suspense, useContext } from "react";
import { Await, defer, useLoaderData, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { startRemoveCard } from "../../actions/cardActions";
import ThemeContext from "../../components/context/ThemeContext";
import BodyNav from "../../components/body/BodyNav";
import MenuItem from "./MenuItem";
import { getLocalCards } from "../../api/local";

const loader = async ({ params }) => {
    return defer({
        localCards: getLocalCards(params.type),
        type: params.type,
    })
}



const MenuWrapper = () => {
    const navigate = useNavigate()
    const theme = useContext(ThemeContext)
    const { type, localCards } = useLoaderData()
    // const [localCardKeys, setLocalCardKeys] = useLocalStorageState(`${type}Keys`)
    // const [madeKeys, setMadeKeys] = useLocalStorageState('madeKeys', { defaultValue: [] })
    // const [foundKeys, setFoundKeys] = useLocalStorageState('foundKeys', { defaultValue: [] })

    const removeCard = (cardKey) => {
        startRemoveCard(type, cardKey)
            .then(() => {
                navigate(`/${type}`)
            })
    }



    return (
        <div>
            <BodyNav />
            <Suspense fallback={<h2>Loading ...</h2>}>
                <Await resolve={localCards}>
                    {(localCards) => {

                        return (localCards.map((cardData) => {

                            return (
                                <MenuItem
                                    key={cardData.cardKey}
                                    cardData={cardData}
                                    removeCard={() => {
                                        removeCard(cardData.cardKey)
                                    }}
                                />
                            )
                        }))
                    }}

                </Await>
            </Suspense>
            <Link className={`menuWrapper__add-link ${theme}`} to={'add'}>Add</Link>
        </div>
    )
}

export { loader, MenuWrapper as default }



// {(cloudCards) => {
//     console.log('cloudCards', cloudCards)
//     const cloudKeys = cloudCards.map((card) => {
//         return card.cardKey
//     })
//     const filteredLocalKeys = localCardKeys.filter((localKey) => {
//         return !cloudKeys.includes(localKey)
//     })
//     const filteredLocalCards = [];
//     filteredLocalKeys.map((localKey) => {
//         filteredLocalCards.push(getLocalCard(localKey))
//     })
//     // console.log('cardKeys', cardKeys)
//     return (
//         filteredLocalCards.map((cardData) => {
//             return (
//                 <MenuItem
//                     key={cardData.cardKey}
//                     cardData={cardData}
//                 />
//             )
//         }),
//         cloudCards.map((cardData) => {
//             return (
//                 <MenuItem
//                     key={cardData.cardKey}
//                     cardData={cardData}
//                 />
//             )
//         })
//     )
// }}