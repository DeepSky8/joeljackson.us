import React, { useContext } from "react";
import { Outlet } from "react-router";
import ThemeContext from "../context/ThemeContext";
import BodyNav from "./BodyNav";

const Body = () => {
    const theme = useContext(ThemeContext)

    return (
        <div className={`bodyWrapper ${theme}`}>
            <BodyNav />
            <Outlet />
        </div>
    )
}

export default Body