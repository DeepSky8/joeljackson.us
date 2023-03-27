import React, { useContext, useEffect, useState } from "react";
import ThemeContext from "../context/ThemeContext";

const ImageViewer = ({ imageFile, imageURL = null, altText }) => {
    const theme = useContext(ThemeContext)
    const [fileURL, setFileURL] = useState(null)

    useEffect(() => {
        let reader, isCancel = false;
        if (imageFile) {
            reader = new FileReader();
            reader.onload = (e) => {
                const { result } = e.target
                if (result
                    && !isCancel
                ) {
                    setFileURL(result)
                }
            }
            reader.readAsDataURL(imageFile)
        } else {
            setFileURL(null)
        }
        return () => {
            isCancel = true;
            if (reader && reader.readyState === 1) {
                reader.abort();
            }
        }
    }, [imageFile])

    return (
        <div className={`imageViewer__container ${theme}`}>
            {
                imageURL
                    ?
                    <img src={imageURL} alt={altText} />
                    :
                    fileURL
                        ?
                        <img src={fileURL} alt={altText} />
                        :
                        altText
            }
        </div>
    )
}

export default ImageViewer
