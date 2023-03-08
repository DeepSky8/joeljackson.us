import React, { Suspense } from "react";
import { Await, defer, useLoaderData } from "react-router";
import { getItems } from "../../temp/tempAPI";
import { made } from "../../temp/tempData";
import MenuItem from "./MenuItem";

const loader = async ({ params }) => {
    return defer({ items: getItems(params.type) })
}

const MenuWrapper = () => {
    const { items } = useLoaderData()
    return (
        <Suspense fallback={<h2>Loading ...</h2>}>
            <Await resolve={items}>
                {(itemArray) => {
                    return (
                        itemArray.map((item) => {
                            return (
                                <MenuItem
                                    key={item.id}
                                    item={item} />
                            )
                        })
                    )
                }}
            </Await>
        </Suspense>

    )
}

export { loader, MenuWrapper as default }



// {(itemArray) => {
//     return (
//         itemArray.map((item) => {
//             return (
//                 <MenuItem
//                     key={item.id}
//                     item={item} />
//             )
//         })
//     )
// }}