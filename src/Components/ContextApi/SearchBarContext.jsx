
import React, { createContext, useState } from 'react'

export const sContext = createContext();
const SearchBarContext = ({ children }) => {
    const [search, setSearch] = useState("");
    return (
        <sContext.Provider value={{ search, setSearch }}>
            {children}
        </sContext.Provider>
    )
}

export default SearchBarContext;