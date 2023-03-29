import React, { Suspense, useContext, useReducer } from "react";
import { Await, useLoaderData, useNavigate, useOutletContext, useParams } from "react-router";
import ThemeContext from "../context/ThemeContext";
import ImageUpload from "./ImageUpload";
import ImageViewer from "./ImageViewer";
import fieldPopulator from "../../objectsArrays/fieldObjectArray";
import { cardReducer, defaultCardState } from "../../reducers/cardReducer";
import Field from "./Field";
import { loadCard, startNewLink, startSaveCard, startUploadFile, updateType } from "../../actions/cardActions";
// import { getLocalCard } from "../../api/local";
import readyToUpdate from "../../functions/readyToUpdate";
import MadeFoundSwitch from "./MadeFoundSwitch";
import { useEffect } from "react";
import { useState } from "react";

// const loader = async ({ params }) => {
//     return ({
//         cardData: defaultCardState,
//         type: params.type
//     })
// }

const AddEdit = () => {
    const navigate = useNavigate();
    const theme = useContext(ThemeContext)
    const { type, id } = useParams()
    const { madeCardArray, foundCardArray } = useOutletContext()
    // const { type, cardData } = useLoaderData()
    const [currentArray, setCurrentArray] = useState([])
    const [cardState, dispatchCardState] = useReducer(cardReducer, defaultCardState)
    const fieldArray = fieldPopulator({ cardState, dispatchCardState, theme })

    useEffect(() => {
        dispatchCardState(updateType(type.toString()))
        type === 'found'
            ?
            setCurrentArray(foundCardArray)
            :
            setCurrentArray(madeCardArray)
    }, [type])

    useEffect(() => {
        const selectedCard = currentArray.find(card => card.cardKey === id)
        if (selectedCard) { dispatchCardState(loadCard(selectedCard)) }
    }, [currentArray])

    const goBack = () => {
        navigate(`/${cardState.type}`)
    }

    const evalAddEdit = () => {
        if (readyToUpdate(cardState)) {
            if (cardState.cardKey) {
                startUploadFile(cardState.imageFile, cardState.type, cardState.cardKey)
                startSaveCard(cardState, cardState.cardKey)
                    .then(() => {
                        goBack()
                    })
                    .catch((error) => {
                        alert(error)
                    })

            } else {
                startNewLink(cardState)
            }
            return true
        }
    }

    return (
        <div className={`addLink__container ${theme}`}>

            {cardState.cardKey
                ?
                <p>{`I ${cardState.type} this:`}</p>
                :
                <MadeFoundSwitch
                    type={type}
                    dispatchCardState={dispatchCardState}
                />
            }

            {
                <span>
                    {fieldArray.map((field) => {
                        return (
                            <Field
                                key={field.id}
                                {...field}
                                id={field.id + cardState.cardKey}
                            />
                        )
                    })}

                    <span className="addLink__images" >
                        <ImageUpload
                            key={cardState.cardKey}
                            dispatchCardState={dispatchCardState}
                        />

                        <span className="addLink__imageViewer--border">
                            <ImageViewer
                                key={cardState.cardKey}
                                imageFile={cardState.imageFile}
                                imageURL={cardState.imageURL}
                                altText={cardState.altText}
                            />
                        </span>
                    </span>

                    <button
                        className={`addLink__save--button ${theme}`}
                        onClick={() => {
                            if (evalAddEdit()) { goBack() }
                        }}
                    >{cardState.cardKey ? 'Update' : 'Save'}</button>
                    <button
                        className={`addLink__save--button ${theme}`}
                        onClick={() => { goBack() }}
                    >Cancel</button>

                </span>
            }
        </div>
    )
}

export {
    // loader, 
    AddEdit as default
}