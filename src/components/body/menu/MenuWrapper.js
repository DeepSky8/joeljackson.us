import React from "react";
import { useOutletContext, useParams } from "react-router";
import BodyNav from "../BodyNav";
import MenuItems from "./MenuItems";

const MenuWrapper = () => {
    const { madeCardArray, foundCardArray } = useOutletContext()
    const { type = 'found' } = useParams()

    return (
        <div className="menuWrapper__container">
            <BodyNav />

            <div className="menuWrapper__container--menuItems">
                <MenuItems
                    cardArray={type === 'found' ? foundCardArray : madeCardArray}
                />
            </div>

        </div>
    )
}

export { MenuWrapper as default }