import React, { createContext, useContext, useEffect, useState } from 'react'
import { socketContextProvider } from './SocketContext';
import { pContext } from './ProfileContext';
export const messageContextProvider = createContext(null);

const MessagesContext = ({ children }) => {
    const { socket } = useContext(socketContextProvider);
    const { userDetails: { email } } = useContext(pContext);
    const [messages, setMessages] = useState([]);
    const [newMessages, setNewMessages] = useState(false);

    const changeMessages = () => {
        try {
            socket.emit('get-messages', email);

            socket.on('on-get-messages', async (data) => {
                setMessages(data.messages);
                setNewMessages(data.newMessages);
            });
        } catch (error) {
            console.log(error.message);
        }
    }
    useEffect(() => {
        changeMessages();
    }, [socket, email]);
    return (
        <messageContextProvider.Provider value={{ messages, setMessages, newMessages }}>
            {children}
        </messageContextProvider.Provider>
    )
}

export default MessagesContext