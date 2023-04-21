import React from "react";
// import { useOutletContext, useParams } from "react-router";
import BodyNav from "../BodyNav";
import MenuItems from "./MenuItems";
// import { auth } from "../../../api/firebase";

const MenuWrapper = () => (
    <div className="menuWrapper__container">
        <BodyNav />

        <div className="menuWrapper__container--menuItems">
            <MenuItems />
        </div>

    </div>
)


export { MenuWrapper as default }

    // const { madeCardArray, foundCardArray, currentUser, visibleUIDs } = useOutletContext()
    // const { type = 'found' } = useParams()
    // const currentDisplay = []
    // const selectedType = (type === 'found' ? foundCardArray : madeCardArray)
    // selectedType.forEach(card => {
    //     const alwaysVisible = visibleUIDs.includes(card.userUID)

    //     if (
    //         currentUser.admin
    //         ||
    //         alwaysVisible
    //         ||
    //         (auth.currentUser && auth.currentUser.uid === card.userUID)
    //     ) {
    //         currentDisplay.push(card)
    //     }
    // })


    // const filteredDisplay = currentDisplay.filter(card => visibleUIDs.includes(card.userUID))