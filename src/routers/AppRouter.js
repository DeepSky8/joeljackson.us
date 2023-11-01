import React from "react";
import { createBrowserRouter } from "react-router-dom";
import AddEdit from "../components/addEdit/AddEdit";
import MenuWrapper from "../components/body/menu/MenuWrapper";
import Welcome from "../components/body/Welcome";
import Home from "../components/Home";
import NotFoundPage from "../components/NotFoundPage";
import ThemeWrapper from "../components/theme/ThemeWrapper";
import AuthPage from "../components/authentication/AuthPage";
import ResetPage from "../components/authentication/ResetPage";
import RegisterPage from "../components/authentication/RegisterPage";
import AdminPage from "../components/admin/AdminPage";
import AuthWrapper from "../components/authentication/AuthWrapper";

const AppRouter = createBrowserRouter([
    {
        element: <ThemeWrapper />,
        errorElement: <NotFoundPage />,
        children: [
            {
                path: "/",
                element: <Home />,
                errorElement: <NotFoundPage />,
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
                        path: '/authenticate/:back?',
                        element: <AuthPage />
                    },
                    {
                        path: '/register/:back?',
                        element: <RegisterPage />
                    },
                    {
                        path: '/reset/:email?',
                        element: <ResetPage />
                    },
                    {
                        element: <AuthWrapper />,
                        errorElement: <NotFoundPage />,
                        children: [
                            {
                                path: '/add/:type?',
                                element: <AddEdit />,
                            },
                            {
                                path: '/:type/edit/:id',
                                element: <AddEdit />,
                            },
                            {
                                path: '/admin',
                                element: <AdminPage />
                            }
                        ]
                    },

                ]

            }
        ]
    },

])

export default AppRouter