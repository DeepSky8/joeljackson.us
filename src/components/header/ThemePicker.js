import React, { useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import { themeArray } from "../../objectsArrays/themeObject";
import colorPicker from "../../images/colorPicker.png";
import palette from "../../images/palette_FILL0_wght400_GRAD0_opsz48.png";


const ThemePicker = () => {
    // const themeArray = Object.entries(themeObject)
    const [theme, setTheme] = useLocalStorageState('jjColorTheme', { defaultValue: 'green' })
    const [menuState, setMenuState] = useState('')

    return (
        <div className='themePicker__container'>

            <div className={`themePicker__slider__container`}>
                <div className={`themePicker__button__container ` + menuState}>
                    {themeArray.map(value => {
                        return (
                            <button
                                className={`themePicker__button ${value}` + (theme === value ? ' picked' : '')}
                                key={value}
                                onClick={() => { setTheme(value); setMenuState(!menuState) }}
                            ></button>
                        )
                    })}
                </div>
            </div>


            <button
                className={`themePicker__button--palette ${theme}`}
                onClick={() => { setMenuState(menuState === 'visible' ? 'hidden' : 'visible') }}
            >
                <span className={`material-icons palette ${theme}`}>
                    palette
                </span>
            </button>

        </div >
    )

}

export default ThemePicker

// return (
//     <option
//         key={themeItem.key}
//         value={themeItem.value.text}
//         data-image={themeItem.value.image}
//     ></option>
// )

//                 <img className="material-symbols-outlined" src={palette} />
