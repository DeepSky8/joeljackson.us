import React, { useContext } from "react";
import { updateType } from "../../actions/cardActions";
import ThemeContext from "../context/ThemeContext";

const MadeFoundSwitch = ({ type, dispatchCardState }) => {
    const theme = useContext(ThemeContext)

    return (
        <div className="madeFound__container">
            <span>I </span>
            <span className="madeFound__switch">
                <input
                    type="radio"
                    className="switch-input"
                    name="type"
                    value="made"
                    id="made"
                    onClick={() => {
                        dispatchCardState(updateType('made'))
                    }}
                    defaultChecked={type.toString() === 'made'}
                />
                <label
                    htmlFor="made"
                    className={`switch-label switch-label-off ${theme}`}
                >
                    Made
                </label>
                <input
                    type="radio"
                    className="switch-input"
                    name="type"
                    value="found"
                    id="found"
                    onClick={() => {
                        dispatchCardState(updateType('found'))
                    }}
                    defaultChecked={type.toString() === 'found'}

                />
                <label htmlFor="found" className={`switch-label switch-label-on ${theme}`}>Found</label>
                <span className={`switch-selection ${theme}`}></span>
            </span>
            <span> this site</span>

        </div>
    )
}


export default MadeFoundSwitch