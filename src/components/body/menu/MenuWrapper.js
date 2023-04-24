import React from "react";
import BodyNav from "../BodyNav";
import MenuItems from "./MenuItems";

const MenuWrapper = () => (
    <div className="menuWrapper__container">
        <BodyNav />

        <div className="menuWrapper__container--menuItems">
            <MenuItems />
        </div>

    </div>
)


export { MenuWrapper as default }
