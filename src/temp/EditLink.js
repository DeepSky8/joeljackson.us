import React, { useContext, useEffect, useReducer } from "react";
import { Await, useLoaderData, useNavigate } from "react-router";
// import { updateType } from "../../actions/cardActions";
import ThemeContext from "../components/context/ThemeContext";
import ImageUpload from "../components/createEdit/ImageUpload";
import ImageViewer from "../components/createEdit/ImageViewer";
// import saveLink from "../../functions/saveLink";
import fieldPopulator from "../objectsArrays/fieldObjectArray";
import { cardReducer, defaultCardState } from "../reducers/cardReducer";
import Field from "../components/createEdit/Field";
import { loadCard } from "../actions/cardActions";
import { getLocalCard } from "../api/local";

// import MadeFoundSwitch from "./MadeFoundSwitch";

const loader = async ({ params }) => {
    return ({
        type: params.type,
        id: params.id,
        cardData: getLocalCard(params.id)
    })
}

const EditLink = () => {
    // const navigate = useNavigate();
    const theme = useContext(ThemeContext)
    const { type, id, cardData } = useLoaderData()
    const [cardState, dispatchCardState] = useReducer(cardReducer, cardData)
    const fieldArray = fieldPopulator({ cardState, dispatchCardState, theme })

    // useEffect(() => {
    //     dispatchCardState(loadCard(cardData))
    // }, [cardData.cardKey])

    // useEffect(() => {
    //     if (['made', 'found'].includes(type.toString())) {
    //         dispatchCardState(updateType(type.toString()))
    //     }
    // }, [type])

    return (
        <div className={`addLink__container ${theme}`}>

            <Suspense fallback={<h2>Loading ...</h2>}>
                <Await resolve={cardData}>
                    {(cardData) => {
                        return (

                            fieldArray.map((field) => {
                                return (
                                    <Field
                                        key={field.id}
                                        {...field}
                                        id={field.id + cardData.cardKey}
                                    />
                                )
                            })



                        )
                    }}
                </Await>
            </Suspense>
        </div>
    )
}

export { loader, EditLink as default }


// <Suspense fallback={<h2>Loading ...</h2>}>
// <Await resolve={type}>
//     {(linkType) => {
//         return (
//             <MadeFoundSwitch
//                 type={linkType}
//                 dispatchCardState={dispatchCardState}
//             />
//         )
//     }}
// </Await>
// </Suspense>




// <div>
// <button
//     className={`addLink__save--button ${theme}`}
//     onClick={() => {
//         if (saveLink(cardState)) { navigate(`/${cardState.type}/`) }
//     }}
// >Save</button>
// </div>


// {
//     fieldArray.map((field) => {
//         return (
//             <Field
//                 key={field.id}
//                 {...field}
//                 id={field.id + cardData.cardKey}
//             />
//         )
//     })
// }

// <span className = "addLink__images" >
// <ImageUpload
// key={cardState.cardKey}
// dispatchCardState={dispatchCardState}
// />

// <span className="addLink__imageViewer--border">
// <ImageViewer
// key={cardState.cardKey}
// imageFile={cardState.imageFile}
// imageURL={cardState.imageURL}
// altText={cardState.altText}
// />
// </span>
// </span>