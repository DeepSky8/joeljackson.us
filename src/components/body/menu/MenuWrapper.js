import React, { useContext, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router";
import { Link } from "react-router-dom";
import { startRemoveCard } from "../../../actions/cardActions";
import ThemeContext from "../../context/ThemeContext";
import BodyNav from "../BodyNav";
import MenuItem from "./MenuItem";
import { useEffect } from "react";
import { auth, logout } from "../../../api/firebase";

const MenuWrapper = () => {
    const theme = useContext(ThemeContext)
    const navigate = useNavigate()
    const { madeCardArray, foundCardArray } = useOutletContext()
    const { type } = useParams()
    const [authStatus, setAuthStatus] = useState('lock')

    useEffect(() => {
        auth.currentUser ? setAuthStatus('lock_open') : setAuthStatus('lock')
    }, [auth.currentUser])

    const removeCard = (cardKey) => {
        startRemoveCard(type, cardKey)
    }

    const authFlipper = () => {
        if (auth.currentUser) {
            logout()
            setAuthStatus('lock')
        } else {
            navigate(`/authentication/${type}`)
        }
    }


    //                 <Link className={`material-icons ${authStatus} ${theme}`} to={`/authentication/${type}`} ></Link>
    return (
        <div className="menuWrapper__container">
            <BodyNav />
            <span className="menuWrapper__container--addAuth">
                <Link className={`material-icons add ${theme}`} to={'add'}>add</Link>
                <button className={`material-icons ${authStatus} ${theme} menuWrapper__lock--button`} onClick={authFlipper} >{`${authStatus}`}</button>
            </span>

            <div className="menuWrapper__container--menuItems">
                {type === 'made' && madeCardArray.map((cardData) => {

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
                })}

                {type === 'found' && foundCardArray.map((cardData) => {

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
                })}
            </div>

        </div>
    )
}

export { MenuWrapper as default }