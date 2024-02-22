import React, { createContext } from 'react';
import io from 'socket.io-client';

export const socketContextProvider = createContext();
const SocketContext = ({ children }) => {
    const socket = io.connect(process.env.REACT_APP_BACKEND_URL);
    return (
        <socketContextProvider value={{ socket }}>
            {children}
        </socketContextProvider>
    )
}

export default SocketContext;