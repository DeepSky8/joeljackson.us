import React, { Suspense } from "react";
import { Await, defer, useLoaderData, useNavigate } from "react-router";
import { getLocalCards } from "../../../api/local";
import EditLink from "./EditLink";

const loader = async ({ params }) => {
    return defer({
        localCards: getLocalCards(params.type),
        type: params.type
    })
}

const EditWrapper = () => {
    const navigate = useNavigate()
    const { type, localCards } = useLoaderData()

    return (
        <div>
            <Suspense fallback={<h2>Loading ...</h2>}>
                <Await resolve={localCards} >
                    {(localCards) => {
                        return (
                            localCards.map((localCard) => {
                                return (
                                    <EditLink
                                        key={localCard.cardKey}
                                        cardData={localCard}
                                    />
                                )
                            })
                        )
                    }}
                </Await>
            </Suspense>
            <button
                onClick={() => { navigate(`/${type}`) }}
            >Done Editing</button>
        </div>
    )
}

export { loader, EditWrapper as default }