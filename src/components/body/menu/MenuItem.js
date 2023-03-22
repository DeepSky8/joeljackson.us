import React from "react";
// import useLocalStorageState from "use-local-storage-state";


const MenuItem = ({ cardData, removeCard }) => {
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
                    ''
            }
            <button
                onClick={() => { removeCard() }}
            >Remove</button>
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