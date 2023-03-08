import React, { useContext } from "react";
import Body from "./body/Body";
import ThemeContext from "./context/ThemeContext";
import Header from "./header/Header";



const Home = () => {
    const theme = useContext(ThemeContext)


    return (
        <div className={`window__background ${theme}`} >
            <Header />
            <div className={`home__content__wrapper ${theme}`}>
                <div className={`home__body--spacer ${theme}`}>
                    <Body />
                </div>
            </div>
        </div>
    )
}

export default Home