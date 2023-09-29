import { createContext, useState } from "react";

const tokenContext = createContext({
    token: "",
    isLoggedIn: false,
    updateLogIn: () => {},
    logout: () => {}
})

const TokenContextProvider = props => {
    const [token,setToken] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const updateLogIn = (tok) => {
        setToken(tok);
        setIsLoggedIn(true);
    }

    const logout = () => {
        setToken("");
        setIsLoggedIn(false);
        if(localStorage.getItem("auth-token")){
            localStorage.removeItem("auth-token");
        }
    }

    const contextValue = {
        token, isLoggedIn, updateLogIn, logout
    }

    return <tokenContext.Provider value={contextValue}>
        {props.children}
    </tokenContext.Provider>
}

export {tokenContext, TokenContextProvider}