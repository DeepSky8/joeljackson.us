import React, { Suspense, useContext } from "react";
import { Await, defer, useLoaderData } from "react-router";
import { Link } from "react-router-dom";
import { getItems } from "../../temp/tempAPI";
import ThemeContext from "../context/ThemeContext";
import BodyNav from "./BodyNav";
import MenuItem from "./MenuItem";

const loader = async ({ params }) => {
    return defer({ items: getItems(params.type) })
}

const MenuWrapper = () => {
    const theme = useContext(ThemeContext)
    const { items } = useLoaderData()
    return (
        <div>
        <BodyNav />
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
            <Link className={`menuWrapper__add-link ${theme}`} to={'add'}>+</Link>
        </div>
    )
}

export { loader, MenuWrapper as default }