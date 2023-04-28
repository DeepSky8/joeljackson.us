import React from "react";
import { Outlet, useOutletContext } from "react-router";
import { auth } from "../../api/firebase";
import { Navigate } from "react-router-dom";

const AuthWrapper = () => {
    const { ...rest } = useOutletContext()

    if (auth.currentUser) {
        return (
            <Outlet context={{ ...rest }} />
        )
    } else {
        return (
            <Navigate to='/' />
        )
    }
}

export default AuthWrapper;