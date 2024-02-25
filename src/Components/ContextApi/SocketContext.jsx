import React, { createContext, useMemo } from 'react';
import io from 'socket.io-client';

export const socketContextProvider = createContext(null);

const SocketContext = ({ children }) => {
    const socket = io.connect(process.env.REACT_APP_BACKEND_URL);
    return (
        <socketContextProvider.Provider value={{ socket }}>
            {children}
        </socketContextProvider.Provider>
    )
}

export default SocketContext;