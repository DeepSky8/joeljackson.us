import React, { Suspense, useContext, useEffect, useReducer } from "react";
import { Await, useLoaderData } from "react-router";
import { updateType } from "../../actions/cardActions";
import fieldPopulator from "../../objectsArrays/fieldObjectArray";
import { cardReducer, defaultCardState } from "../../reducers/cardReducer";
import { getItems } from "../../temp/tempAPI";
import ThemeContext from "../context/ThemeContext";
import Field from "./Field";
import ImageUpload from "./ImageUpload";
import ImageViewer from "./ImageViewer";
import MadeFoundSwitch from "./MadeFoundSwitch";

const loader = async ({ params }) => {
    return ({ type: params.type })
}

const AddLink = () => {
    const theme = useContext(ThemeContext)
    const { type } = useLoaderData()
    const [cardState, dispatchCardState] = useReducer(cardReducer, defaultCardState)
    const fieldArray = fieldPopulator({ cardState, dispatchCardState, theme })

    useEffect(() => {
        if (['made', 'found'].includes(type.toString())) {
            dispatchCardState(updateType(type.toString()))
        }
    }, [type])


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
                    onClick={() => { alert('Item Saved') }}
                >Save</button>
            </div>

        </div>
    )
}

export { loader, AddLink as default }