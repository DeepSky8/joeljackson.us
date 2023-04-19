import React, { useContext, useReducer } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router";
import ThemeContext from "../context/ThemeContext";
import ImageUpload from "./ImageUpload";
import ImageViewer from "./ImageViewer";
import fieldPopulator from "../../objectsArrays/fieldObjectArray";
import { cardReducer, defaultCardState } from "../../reducers/cardReducer";
import Field from "./Field";
import {
    loadCard,
    startNewLink,
    startSaveCard,
    startUploadFile,
    updateLink,
    updateType,
    updateUID
} from "../../actions/cardActions";
import readyToUpdate from "../../functions/readyToUpdate";
import MadeFoundSwitch from "./MadeFoundSwitch";
import { useEffect } from "react";
import { useState } from "react";
import checkURL from "../../functions/checkURL";
import { auth } from "../../api/firebase";

const AddEdit = () => {
    const navigate = useNavigate();
    const theme = useContext(ThemeContext)
    const { type = 'found', id = '' } = useParams()
    const { madeCardArray, foundCardArray } = useOutletContext([])
    const [currentArray, setCurrentArray] = useState(foundCardArray)
    const [cardState, dispatchCardState] = useReducer(cardReducer, defaultCardState)
    const fieldArray = fieldPopulator({ cardState, dispatchCardState, theme })

    useEffect(() => {
        if (auth.currentUser.uid) {
            dispatchCardState(updateUID(auth.currentUser.uid))

        }
    }, [auth.currentUser])

    useEffect(() => {
        if (type === 'made') {
            dispatchCardState(updateType(type.toString()))
            setCurrentArray(madeCardArray)
        }
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
            // Add HTTP if it's not part of the URL as entered by the user
            dispatchCardState(updateLink(checkURL(cardState.link)))

            if (cardState.cardKey) {
                if (cardState.imageFile) { startUploadFile(cardState.imageFile, cardState.type, cardState.cardKey) }

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

                    <ImageUpload
                        dispatchCardState={dispatchCardState}
                    />
                    <ImageViewer
                        imageFile={cardState.imageFile}
                        imageURL={cardState.imageURL}
                        altText={cardState.altText}
                    />

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
