import React, { createContext } from "react";
import { Outlet } from "react-router";
import useLocalStorageState from "use-local-storage-state";
import ThemeContext from "../context/ThemeContext";


const ThemeWrapper = () => {
    const [theme, setTheme] = useLocalStorageState('jjColorTheme', {defaultValue: 'green'})



    return (
        <ThemeContext.Provider value={theme}>
            <Outlet />
        </ThemeContext.Provider>
    )
}

export default ThemeWrapper