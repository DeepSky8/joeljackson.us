import React, { Suspense, useContext, useEffect, useReducer } from "react";
import { Await, useLoaderData, useNavigate } from "react-router";
import { startNewLink, startSaveCard, startUploadFile, updateType } from "../actions/cardActions";
import readyToUpdate from "../functions/readyToUpdate";
import saveItem from "../functions/saveItem";
import fieldPopulator from "../objectsArrays/fieldObjectArray";
import { cardReducer, defaultCardState } from "../reducers/cardReducer";
import ThemeContext from "../components/context/ThemeContext";
import Field from "../components/addEdit/Field";
import ImageUpload from "../components/addEdit/ImageUpload";
import ImageViewer from "../components/addEdit/ImageViewer";
import MadeFoundSwitch from "../components/addEdit/MadeFoundSwitch";

const loader = async ({ params }) => {
    return ({ type: params.type })
}


const AddItem = () => {
    const navigate = useNavigate();
    const theme = useContext(ThemeContext)
    const { type } = useLoaderData()
    const [cardState, dispatchCardState] = useReducer(cardReducer, defaultCardState)
    const fieldArray = fieldPopulator({ cardState, dispatchCardState, theme })
    dispatchCardState(updateType(type.toString()))

    const goBack = () => {
        navigate(`/${cardState.type}`)
    }

    // useEffect(() => {
    //     if (['made', 'found'].includes(type.toString())) {
    //     }
    // }, [type])


    return (
        <div className={`addLink__container ${theme}`}>

            <Suspense fallback={<h2>Loading ...</h2>}>
                <Await resolve={type}>
                    {(linkType) => {
                        return (
                            <MadeFoundSwitch
                                type={linkType}
                                dispatchCardState={dispatchCardState}
                            />
                        )
                    }}
                </Await>
            </Suspense>


            {fieldArray.map((field) => {
                return (
                    <Field
                        key={field.id}
                        {...field}
                    />
                )
            })}



            <span className="addLink__images">
                <ImageUpload
                    dispatchCardState={dispatchCardState}
                />

                <span className="addLink__imageViewer--border">
                    <ImageViewer
                        imageFile={cardState.imageFile}
                        altText={cardState.altText}
                    />
                </span>
            </span>



            <div>
                <button
                    className={`addLink__save--button ${theme}`}
                    onClick={() => {
                        if (readyToUpdate(cardState)) {
                            startNewLink(cardState)
                                .then(() => {
                                    goBack()
                                })
                                .catch((error) => {
                                    alert(error)
                                })

                        }
                    }}
                >Save</button>

                <button
                    className={`addLink__save--button ${theme}`}
                    onClick={() => {
                        goBack()
                    }}
                >Cancel</button>
            </div>

        </div>
    )
}

export { loader, AddItem as default }