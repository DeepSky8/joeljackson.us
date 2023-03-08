import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import ThemeContext from "../context/ThemeContext";
import ThemePicker from "./ThemePicker";

const Header = () => {
    const theme = useContext(ThemeContext);
    const [size, setSize] = useState('expanded')

    window.onscroll = function () {
        if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
            setSize('contracted')
        } else {
            setSize('expanded')
        }
    }

    return (
        <div className={`header__wrapper ${theme}`}>
            <span className={`header__content ${theme}`}>
                <Link
                    className={`headerLink ${theme}`}
                    to={'/'}
                >
                    <h1 className={`${size}`}>Joel Jackson</h1>
                </Link>
                <ThemePicker
                    size={size}
                />
            </span>
        </div>
    )
}

export default Header

