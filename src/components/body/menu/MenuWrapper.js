import React, { useContext } from "react";
import { useOutletContext, useParams } from "react-router";
import { Link } from "react-router-dom";
import { startRemoveCard } from "../../../actions/cardActions";
import ThemeContext from "../../context/ThemeContext";
import BodyNav from "../BodyNav";
import MenuItem from "./MenuItem";

const MenuWrapper = () => {
    const theme = useContext(ThemeContext)
    const { madeCardArray, foundCardArray } = useOutletContext()
    const { type } = useParams()

    const removeCard = (cardKey) => {
        startRemoveCard(type, cardKey)
    }

    return (
        <div className="menuWrapper__container">
            <BodyNav />
            <Link className={`menuWrapper__add-link ${theme}`} to={'add'}>+</Link>
            <div className="menuWrapper__menuItems"            >
                {type === 'made' && madeCardArray.map((cardData) => {

                    return (
                        <MenuItem
                            key={cardData.cardKey}
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