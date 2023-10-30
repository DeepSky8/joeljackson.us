import React, { useContext } from "react";
import { useNavigate, useOutletContext } from "react-router";
import ThemeContext from "../../context/ThemeContext";
import { auth } from "../../../api/firebase";

const MenuItem = ({ cardData, removeCard, handleStarCard, handleUnstarCard }) => {
    const theme = useContext(ThemeContext)
    const { authStatus } = useOutletContext()
    const navigate = useNavigate()

    const starCheck = () => {
        if (cardData.admin) {
            cardData.starStatus === 'selected'
                ?
                handleUnstarCard(cardData.cardKey)
                :
                handleStarCard(cardData.type, cardData.cardKey)
        }
    }

    return (
        <div className={`menuItem__container ${theme}`}>
            {
                (
                    cardData.admin
                    ||
                    cardData.starStatus === 'selected'
                )
                &&
                <button
                    className={`menuItem__star material-symbols-rounded star-${cardData.starStatus} ${theme}`}
                    onClick={starCheck}
                >
                    star
                </button>
            }

            <a className={`menuItem__link ${theme}`}
                href={`${cardData.link}`}
                target="_blank"
                rel="noreferrer"
            >
                <span className={`menuItem__header`}>
                    <span className="menuItem__title">
                        {cardData.title}
                    </span>
                    {
                        cardData.admin
                        &&
                        (
                            <span className={`menuItem__visibility--container`}>
                                {
                                    cardData.visFlag
                                    &&
                                    <span
                                        className={`menuItem__visibility--symbol material-symbols-outlined ${cardData.visFlag}`}>
                                        {
                                            `${cardData.visFlag}`
                                        }
                                    </span>
                                }
                                <span
                                    className={`menuItem__visibility--handle`}>
                                    {
                                        cardData.handleDisplay
                                    }
                                </span>
                            </span>
                        )
                    }
                </span>
                <span className={`menuItem__content`}>
                    {cardData.imageURL
                        ?
                        <img
                            className="menuItem__image"
                            src={cardData.imageURL} alt={cardData.altText}
                        />
                        :
                        ''
                    }
                    <span className={`menuItem__body ${theme}`}>
                        {cardData.body}
                    </span>

                </span>

            </a>


            {
                (
                    cardData.admin
                    ||
                    (
                        authStatus === 'lock_open'
                        &&
                        (auth.currentUser.uid === cardData.userUID)
                    )
                )
                &&
                <span className="menuItem__buttons--container">

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