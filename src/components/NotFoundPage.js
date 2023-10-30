import React from "react";
import { Link } from "react-router-dom";
import { useRouteError } from "react-router-dom";

export const NotFoundPage = () => {
    const error = useRouteError()
    return (
        <div id={`notFoundPage`}>
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
            <Link to="/">Return to Home Page</Link>
        </div>
    )
}

export default NotFoundPage