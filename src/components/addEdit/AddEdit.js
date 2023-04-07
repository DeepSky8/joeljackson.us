import React, { useContext, useReducer } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router";
import ThemeContext from "../context/ThemeContext";
import ImageUpload from "./ImageUpload";
import ImageViewer from "./ImageViewer";
import fieldPopulator from "../../objectsArrays/fieldObjectArray";
import { cardReducer, defaultCardState } from "../../reducers/cardReducer";
import Field from "./Field";
import { loadCard, startNewLink, startSaveCard, startUploadFile, updateType } from "../../actions/cardActions";
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
    const { madeCardArray, foundCardArray } = useOutletContext([])
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
        <div className={`addEdit__container ${theme}`}>

            {cardState.cardKey
                ?
                <p
                className="addEdit--center"
                >{`I ${cardState.type} this`}</p>
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

                    <span className="addEdit__images" >
                        <ImageUpload
                            key={cardState.cardKey}
                            dispatchCardState={dispatchCardState}
                        />
                        <ImageViewer
                            key={cardState.cardKey}
                            imageFile={cardState.imageFile}
                            imageURL={cardState.imageURL}
                            altText={cardState.altText}
                        />
                    </span>

                    <span className="addEdit__buttons--container">
                        <button
                            className={`addEdit__buttons--saveCancel ${theme}`}
                            onClick={() => {
                                if (evalAddEdit()) { goBack() }
                            }}
                        >{cardState.cardKey ? 'Update' : 'Save'}</button>
                        <button
                            className={`addEdit__buttons--saveCancel ${theme}`}
                            onClick={() => { goBack() }}
                        >Cancel</button>
                    </span>

                </span>
            }
        </div>
    )
}

export default AddEdit

// <span className="addEdit__imageViewer--border">
// </span>