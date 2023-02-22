import React, { Children } from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Home";
import NotFoundPage from "../components/NotFoundPage";
import ThemeWrapper from "../components/theme/ThemeWrapper";


const AppRouter = createBrowserRouter([
    {
        element: <ThemeWrapper />,
        errorElement: <NotFoundPage />,
        children: [
            {
                path: "/",
                element: <Home />,
                errorElement: <NotFoundPage />

            }
        ]

    },

])

export default AppRouter