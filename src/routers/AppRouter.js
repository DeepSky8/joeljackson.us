import React from "react";
import { createBrowserRouter } from "react-router-dom";
import AddEdit from "../components/addEdit/AddEdit";
import MenuWrapper from "../components/body/menu/MenuWrapper";
import Welcome from "../components/body/Welcome";
import Home from "../components/Home";
import NotFoundPage from "../components/NotFoundPage";
import ThemeWrapper from "../components/theme/ThemeWrapper";
import AuthPage from "../components/authentication/AuthPage";

const AppRouter = createBrowserRouter([
    {
        element: <ThemeWrapper />,
        errorElement: <NotFoundPage />,
        children: [
            {
                path: "/",
                element: <Home />,
                children: [
                    {
                        index: true,
                        element: <Welcome />,
                    },
                    {
                        path: "/:type",
                        element: <MenuWrapper />,
                    },
                    {
                        path: '/:type/add',
                        element: <AddEdit />,
                        // loader: addEditLoader
                    },
                    {
                        path: '/:type/edit/:id',
                        element: <AddEdit />,
                        // loader: addEditLoader,
                    },
                    {
                        path: '/authentication/:back?',
                        element: <AuthPage />
                    }
                ]

            }
        ]

    },

])

export default AppRouter