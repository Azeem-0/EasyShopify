import React, { createContext } from 'react'
import { toast } from 'react-toastify';
export const nContext = createContext();
const NotificationContext = ({ children }) => {
    const notify = (message) => toast(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
    return (
        <nContext.Provider value={{ notify }}>
            {children}
        </nContext.Provider>
    )
}

export default NotificationContext