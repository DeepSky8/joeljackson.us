import React from "react";
import useLocalStorageState from "use-local-storage-state";


const AuthWrapper = ({ children }) => {

    const [theme, setTheme] = useLocalStorageState('jjColorTheme', 'green')
    const [localAuth, setLocalAuth] = useLocalStorageState('jjLocalAuth', null)

    return (
        <div>

            {children}

        </div>
    )
}

export default AuthWrapper