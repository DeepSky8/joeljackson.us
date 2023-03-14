import React, { useEffect, useState } from "react";

const ImageViewer = ({ imageFile, altText }) => {
    const [fileURL, setFileURL] = useState(null)

    useEffect(() => {
        let reader, isCancel = false;

        if (imageFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const { result } = e.target
                if (result && !isCancel) {
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
        <div className="imageViewer__container">
            {
                fileURL
                    ?
                    <img src={fileURL} alt={altText} />
                    :
                    <p>{altText}</p>

            }
        </div>
    )
}

export default ImageViewer