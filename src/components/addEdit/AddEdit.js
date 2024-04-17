import React, { useContext, useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router";
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
    updateUID
} from "../../actions/cardActions";
import readyToUpdate from "../../functions/readyToUpdate";
import MadeFoundSwitch from "./MadeFoundSwitch";
import { auth, db } from "../../api/firebase";
import { off, onValue, ref } from "firebase/database";

const AddEdit = () => {
    const navigate = useNavigate();
    const theme = useContext(ThemeContext)
    const { type = 'found', id = '' } = useParams()
    const [cardState, dispatchCardState] = useReducer(cardReducer, defaultCardState)
    const fieldArray = fieldPopulator({ cardState, dispatchCardState, theme })

    useEffect(() => {
        if (auth.currentUser) {
            dispatchCardState(updateUID(auth.currentUser.uid))

        }
    }, [])

    useEffect(() => {
        const cardRef = ref(db, `card/${id}`)
        if (id) {
            onValue(cardRef,
                snapshot => {
                    if (snapshot.exists()) {
                        dispatchCardState(loadCard(snapshot.val()))
                    } else {
                        dispatchCardState(loadCard(defaultCardState))
                    }
                })
        }

        return (() => {
            if (id) { off(cardRef) }
        })

    }, [id])

    const goBack = () => {
        navigate(`/${cardState.type}`)
    }

    const evalAddEdit = () => {
        if (readyToUpdate(cardState)) {

            if (cardState.cardKey) {
                if (cardState.imageFile) { startUploadFile({ imageFile: cardState.imageFile, cardKey: cardState.cardKey }) }

                startSaveCard(cardState, cardState.cardKey)
                    .then(() => {
                        goBack()
                    })
                    .catch((error) => {
                        alert(error)
                    })

            } else if (cardState.cardKey === '') {
                startNewLink({ cardData: cardState })
            }
            return true
        }
    }

    return (
        <div className={`addEdit__container ${theme}`}>

            {cardState.cardKey
                ?
                <p
                    className={`addEdit--center ${theme} bold`}
                >{`I ${cardState.type} this`}</p>
                :
                <MadeFoundSwitch
                    type={type}
                    dispatchCardState={dispatchCardState}
                />
            }


            {
                <span>
                    <span className="addEdit__container--field">
                        {
                            fieldArray
                                .map((field) => {
                                    return (
                                        <Field
                                            key={field.id}
                                            {...field}
                                            theme={theme}

                                        />
                                    )
                                })}
                    </span>

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
