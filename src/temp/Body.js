import React, { useContext } from "react";
import { Outlet } from "react-router";
import ThemeContext from "../components/context/ThemeContext";

const Body = () => {
    const theme = useContext(ThemeContext)

    return (
        <div className={`bodyWrapper ${theme}`}>
            <Outlet />
        </div>
    )
}

export default Body