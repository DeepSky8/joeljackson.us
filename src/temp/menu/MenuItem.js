import React from "react";
import { useNavigate } from "react-router";

const MenuItem = ({ cardData, removeCard }) => {
    const navigate = useNavigate()

    return (
        <div className="menuItem__container">
            {cardData.title}
            {cardData.body}
            {
                cardData.imageURL
                    ?
                    <img src={cardData.imageURL} alt={cardData.altText} />
                    :
                    cardData.altText
            }
            <button
                onClick={() => { removeCard() }}
            >Remove</button>
            <button
                onClick={() => {
                    navigate(`/${cardData.type}/edit/${cardData.cardKey}`)
                }}
            >Edit</button>
        </div>
    )
}

export default MenuItem