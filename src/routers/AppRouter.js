import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MenuWrapper, { loader as menuLoader } from "../components/body/MenuWrapper";
import Welcome from "../components/body/Welcome";
import AddLink, { loader as addLoader } from "../components/createEdit/AddLink";
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
                // errorElement: <NotFoundPage />,
                children: [
                    {
                        index: true,
                        element: <Welcome />,
                        // errorElement: <NotFoundPage />
                    },
                    {
                        path: "/:type",
                        element: <MenuWrapper />,
                        loader: menuLoader,
                        // errorElement: <NotFoundPage />
                    },
                    {
                        path: '/:type/add',
                        element: <AddLink />,
                        loader: addLoader
                    }
                ]

            }
        ]

    },

])

export default AppRouter