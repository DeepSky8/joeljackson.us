import React, { useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import { themeArray } from "../../objectsArrays/themeArray";



const ThemePicker = ({ size }) => {
    const [theme, setTheme] = useLocalStorageState('jjColorTheme', { defaultValue: 'green' })
    const [menuState, setMenuState] = useState('')

    return (
        <div className={`themePicker__container ${size}`}>
            <div className={`themePicker__slider__container`}>
                <div className={`themePicker__button__container ` + menuState}>
                    {themeArray.map(value => {
                        return (
                            <button
                                className={`themePicker__button ${size} ${value}` + (theme === value ? ' picked' : '')}
                                key={value}
                                onClick={() => {
                                    setTheme(value);
                                    setMenuState('hidden');
                                }}
                            ></button>
                        )
                    })}
                </div>
            </div>


            <button
                className={`themePicker__button--palette ${theme} ${size}`}
                onClick={() => { setMenuState(menuState === 'visible' ? 'hidden' : 'visible') }}
            >
                <span className={`material-icons palette ${theme} ${size}`}>
                    palette
                </span>
            </button>

        </div>
    )

}

export default ThemePicker

