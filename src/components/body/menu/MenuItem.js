import React from "react";
import { useNavigate } from "react-router";
// import useLocalStorageState from "use-local-storage-state";


const MenuItem = ({ cardData, removeCard }) => {
    const navigate = useNavigate()
    // const [cardState,] = useLocalStorageState(cardKey, {
    //     defaultValue: {
    //         cardKey: '',
    //         title: 'Loading ...',
    //         body: 'Loading ...',
    //         link: '',
    //         imageFile: null,
    //         imageURL: null,
    //         altText: '',
    //     }
    // })



    return (
        <div className="menuItem__container">
            {cardData.title}
            {cardData.body}
            {
                cardData.imageURL ?
                    <img src={cardData.imageURL} alt={cardData.altText} />
                    :
                    cardData.altText
            }
            <button
                onClick={() => { removeCard() }}
            >Remove</button>
            <button
                onClick={() => {
                    navigate(`/${cardData.type}/edit/${cardData.cardKey}`)
                }}
            >Edit</button>
        </div>
    )
}

export default MenuItem

// {cardData.imageFile ?
//     <ImageViewer
//         imageFile={cardData.imageFile}
//         altText={cardData.altText}
//     />
//     :
//     cardData.imageURL ?
//         <img src={cardData.imageURL} alt={cardData.altText} />
//         :
//         ''
// }