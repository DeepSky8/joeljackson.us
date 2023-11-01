import React from "react";
import loadingGif from "../assets/loading-gif.gif"


const LoadingSpinner = () => {

    return (
        <div className={'loadingSpinner'}>
            <img src={loadingGif} alt="Loading Spinner" />
        </div>
    )
}

export default LoadingSpinner