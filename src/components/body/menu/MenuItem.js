import React, { useContext } from "react";
import { useNavigate } from "react-router";
import ThemeContext from "../../context/ThemeContext";
import { auth } from "../../../api/firebase";

const MenuItem = ({ cardData, removeCard, authStatus }) => {
    const theme = useContext(ThemeContext)
    const navigate = useNavigate()

    return (
        <div className={`menuItem__container ${theme}`}>
            <a className={`menuItem__link ${theme}`}
                href={`${cardData.link}`}
            >
                <span className="menuItem__title">
                    {cardData.title}
                </span>
                <span className={`menuItem__content`}>
                    {cardData.imageURL
                        ?
                        <img
                            className="menuItem__image"
                            src={cardData.imageURL} alt={cardData.altText}
                        />
                        :
                        <hr />
                    }
                    <span className={`menuItem__body ${theme}`}>
                        {cardData.body}
                    </span>

                </span>

            </a>


            {authStatus === 'lock_open' && <span className="menuItem__buttons--container">

                <button
                    className={`menuItem__buttons--editRemove ${theme}`}
                    onClick={() => {
                        navigate(`/${cardData.type}/edit/${cardData.cardKey}`)
                    }}
                >Edit</button>
                <button
                    className={`menuItem__buttons--editRemove ${theme}`}
                    onClick={() => { removeCard() }}
                >Remove</button>
            </span>
            }

        </div>
    )
}

export default MenuItem
//            <div className="menuItem__spacer">

//                    <div className="menuItem__buttons--positioner">

// className="menuItem__buttons--editRemove"





// <span className="menuItem__image">
// {

// }
// </span>