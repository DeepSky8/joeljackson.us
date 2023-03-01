import React, { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

const Body = () => {
    const theme = useContext(ThemeContext)
    
    return (
        <div className={`bodyWrapper ${theme}`}>
            Body
        </div>
    )
}

export default Body