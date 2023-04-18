import React, { useContext } from "react";
import { useNavigate, useOutletContext } from "react-router";
import ThemeContext from "../../context/ThemeContext";
import { auth } from "../../../api/firebase";

const MenuItem = ({ cardData, alwaysVisible, removeCard }) => {
    const theme = useContext(ThemeContext)
    const { authStatus, currentUser, userHandles } = useOutletContext()
    const navigate = useNavigate()
    const visFlag = !alwaysVisible ? 'visibility_lock' : '';
    const userIndex = userHandles.map(user => user.uid).indexOf(cardData.userUID)
    const handleDisplay = userHandles.length > 0 ? userHandles[userIndex].handle : ''

    return (
        <div className={`menuItem__container ${theme}`}>
            <a className={`menuItem__link ${theme}`}
                href={`${cardData.link}`}
            >
                <span className={`menuItem__header`}>
                    <span className="menuItem__title">
                        {cardData.title}
                    </span>
                    {
                        currentUser.admin
                        &&
                        (
                            <span className={`menuItem__visibility--container`}>
                                {
                                    visFlag
                                    &&
                                    <span
                                        className={`menuItem__visibility--symbol material-symbols-outlined ${visFlag}`}>
                                        {
                                            `${visFlag}`
                                        }
                                    </span>
                                }
                                <span
                                    className={`menuItem__visibility--handle`}>
                                    {
                                        handleDisplay
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
                    currentUser.admin
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
