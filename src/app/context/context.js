//context
import React, { createContext, useState } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {

    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);

    return (
        <Context.Provider value={{ 
            token, 
            setToken, 
            user, 
            setUser }}>
            {children}
        </Context.Provider>
    );
}

export default ContextProvider;