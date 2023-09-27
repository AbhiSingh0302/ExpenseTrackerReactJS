import { createContext, useState } from "react";

const tokenContext = createContext({
    token: "",
    isLoggedIn: false,
    updateLogIn: () => {}
})

const TokenContextProvider = props => {
    const [token,setToken] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const updateLogIn = (tok) => {
        setToken(tok);
        setIsLoggedIn(true);
    }

    const contextValue = {
        token, isLoggedIn, updateLogIn
    }

    return <tokenContext.Provider value={contextValue}>
        {props.children}
    </tokenContext.Provider>
}

export {tokenContext, TokenContextProvider}