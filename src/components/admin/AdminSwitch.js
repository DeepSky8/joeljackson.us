import React, { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

const AdminSwitch = ({ uid, text, discrete, field, action, dispatchUserState }) => {
    const theme = useContext(ThemeContext)

    return (
        <div className="adminSwitch__container">
            <span
                className="adminSwitch__title"
            >
                {text}
            </span>
            <span className="adminSwitch__switch">
                <input
                    type="radio"
                    className="adminSwitch__input"
                    name={`adminSwitch${uid}${discrete}`}
                    value="false"
                    id={`adminFalse${uid}${discrete}`}
                    defaultChecked={field === false}
                    onClick={() => {
                        dispatchUserState(action(false))
                    }}
                />
                <label
                    htmlFor={`adminFalse${uid}${discrete}`}
                    className={`adminSwitch__label adminSwitch__label--false ${theme}`}
                >
                    False
                </label>
                <input
                    type="radio"
                    className="adminSwitch__input"
                    name={`adminSwitch${uid}${discrete}`}
                    value="true"
                    id={`adminTrue${uid}${discrete}`}
                    defaultChecked={field === true}
                    onClick={() => {
                        dispatchUserState(action(true))
                    }}
                />
                <label
                    htmlFor={`adminTrue${uid}${discrete}`}
                    className={`adminSwitch__label adminSwitch__label--true ${theme}`}
                >
                    True
                </label>
                <span className={`adminSwitch__selection ${theme}`}></span>
            </span>
        </div>
    )
}


export default AdminSwitch