import React, { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import ThemePicker from "./ThemePicker";

const Header = () => {
    const theme = useContext(ThemeContext);

    return (
        <div className={`header__wrapper ${theme}`}>
            <span className={`header__content ${theme}`}>
                <h1>Joel Jackson</h1>
                <span>
                    <ThemePicker />
                </span>
            </span>
        </div>
    )
}

export default Header

