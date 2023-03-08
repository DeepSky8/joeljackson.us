import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import ThemeContext from "../context/ThemeContext";


const BodyNav = () => {
    const theme = useContext(ThemeContext)

    return (
        <div className="nav__wrapper">
            <NavLink
                to='made'
                className={({ isActive }) =>
                (
                    isActive
                        ?
                        `nav-link--left ${theme} picked`
                        :
                        `nav-link--left ${theme}`
                )
                }
            >Made</NavLink>

            <NavLink
            to='found'
            className={({ isActive }) =>
            (
                isActive
                    ?
                    `nav-link--right ${theme} picked`
                    :
                    `nav-link--right ${theme}`
            )
            }
        >Found</NavLink>


        </div>
    )
}

export default BodyNav

