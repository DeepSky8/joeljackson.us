import React, { Suspense, useContext, useReducer } from "react";
import { Await, useLoaderData, useNavigate } from "react-router";
import ThemeContext from "../../context/ThemeContext";
import ImageUpload from "../../addEdit/ImageUpload";
import ImageViewer from "../../addEdit/ImageViewer";
import fieldPopulator from "../../../objectsArrays/fieldObjectArray";
import { cardReducer } from "../../../reducers/cardReducer";
import Field from "../../addEdit/Field";
import { startNewLink, startSaveCard, startUploadFile, updateType } from "../../../actions/cardActions";
import { getLocalCard } from "../../../api/local";
import readyToUpdate from "../../../functions/readyToUpdate";
import MadeFoundSwitch from "../../addEdit/MadeFoundSwitch";
import { useEffect } from "react";

const loader = async ({ params }) => {
    return ({
        cardData: getLocalCard(params.id),
        type: params.type
    })
}

const AddEdit = () => {
    const navigate = useNavigate();
    const theme = useContext(ThemeContext)
    const { type, cardData } = useLoaderData()
    const [cardState, dispatchCardState] = useReducer(cardReducer, cardData)
    const fieldArray = fieldPopulator({ cardState, dispatchCardState, theme })

    useEffect(() => {
        dispatchCardState(updateType(type.toString()))
    }, [type])

    const goBack = () => {
        navigate(`/${cardState.type}`)
    }

    const evalAddEdit = () => {
        if (readyToUpdate(cardState)) {
            if (cardData.cardKey) {
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

            <Suspense fallback={''}>
                <Await resolve={type}>
                    {(linkType) => {

                        if (cardData.cardKey === '') {
                            return (
                                <MadeFoundSwitch
                                    type={linkType}
                                    dispatchCardState={dispatchCardState}
                                />
                            )
                        } else {
                            return (
                                <p>{`I ${cardData.type} this:`}</p>
                            )
                        }

                    }}
                </Await>
            </Suspense>

            <Suspense fallback={<h2>Loading ...</h2>}>
                <Await resolve={cardData}>
                    {(cardData) => {
                        return (

                            <span>
                                {fieldArray.map((field) => {
                                    return (
                                        <Field
                                            key={field.id}
                                            {...field}
                                            id={field.id + cardData.cardKey}
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
                                >{cardData.cardKey === '' ? 'Save' : 'Update'}</button>
                                <button
                                    className={`addLink__save--button ${theme}`}
                                    onClick={() => { goBack() }}
                                >Cancel</button>

                            </span>
                        )

                    }}
                </Await>
            </Suspense>
        </div>
    )
}

export { loader, AddEdit as default }