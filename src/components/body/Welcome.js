import React, { useContext, useState } from "react";
import BodyNav from "./BodyNav";
import ThemeContext from "../context/ThemeContext";
import { Link } from "react-router-dom";


const Welcome = () => {
    const theme = useContext(ThemeContext)
    const [displayAbout, setDisplayAbout] = useState(false)
    const checkOut = 'Check out the cards on the '
    const made = 'MADE'
    const and = ' and '
    const found = 'FOUND'
    const pages = ' pages, and click on any card to go directly to that website'

    return (
        <div className={`welcome__container ${theme}`}>
            <BodyNav />
            <span
                className={`welcome__container--header ${theme}`}
            >
                <p>
                    Welcome to JoelJackson.us
                </p>
            </span>
            <p>
                As I've built web applications, and discovered websites that I WISH I had built,
                I realized I wanted a single, central location to share them with people.
            </p>
            <p>
                <span>
                    <p>
                        {checkOut}
                        <Link
                            className={`welcome__link ${theme}`}
                            to={'/made'}>
                            {made}
                        </Link>
                        <span>
                            {and}
                        </span>
                        <Link
                            className={`welcome__link ${theme}`}
                            to={'/found'}>
                            {found}
                        </Link>
                        <span>
                            {pages}
                        </span>
                    </p>
                </span>
            </p>
            <hr />
            <span className="welcome__container--buttonContainer" >
                <button
                    className={`welcome__button--about ${theme}`}
                    onClick={() => {
                        setDisplayAbout(!displayAbout)
                    }}
                >
                    About this site
                </button>
            </span>
            {
                displayAbout
                &&
                <span>
                    <p>
                        After signing in with Google's authentication tools, users can create sharable 'cards',
                        as well as upload an optional image to accompany the description.
                    </p>
                    <p>
                        Built using React and SCSS, with a Google Firebase backend,
                        this webapp includes admin tools to lock/unlock user creation.
                    </p>
                    <p>
                        Admin tools also allow all submissions by a user to be shown/hidden,
                        or deleted along with the user account if necessary.
                    </p>
                    <p>
                        Multiple color schemes are available in the header.
                        One item per page can be 'starred' to move it to the top of the list.
                        Unstarred items are sorted by how recently they were updated.
                    </p>
                </span>}
        </div>
    )
}

export default Welcome