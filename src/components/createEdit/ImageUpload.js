import React, { useContext } from "react";
import { clearImage } from "../../actions/cardActions";
import resizeImage from "../../functions/resizeImage";
import ThemeContext from "../context/ThemeContext";

const ImageUpload = ({ dispatchCardState }) => {
    const theme = useContext(ThemeContext)

    return (
        <div className="imageUpload__container">
            <span>
                <label
                    className={`imageUpload__label ${theme}`}
                    htmlFor={'imageUpload'}>
                    {'Upload Image'}
                </label>
                <input
                    id={'imageUpload'}
                    className={'imageUpload__button'}
                    type='file'
                    accept='.jpeg,.jpg,.gif,.png,.bmp'
                    onChange={(e) => {
                        dispatchCardState(resizeImage(e))
                    }}
                    onBlur={() => { }}
                />
            </span>
            <span>
                <button
                    className={`imageUpload__clearImage ${theme}`}
                    onClick={() => {
                        dispatchCardState(clearImage())
                    }}
                >Clear Image</button>
            </span>
        </div>
    )
}

export default ImageUpload