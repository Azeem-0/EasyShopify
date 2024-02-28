import React, { useContext, useEffect } from 'react';

import { messageContextProvider } from '../../ContextApi/MessagesContext';
import axios from 'axios';
import { pContext } from '../../ContextApi/ProfileContext';
import './Messages.css';

const Notifications = () => {
    const { userDetails: { email } } = useContext(pContext);
    const { messages, newMessages } = useContext(messageContextProvider)
    const makeAllMessagesSeen = async () => {
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/makeAllMessagesSeen`, { email });
            console.log(data);
        } catch (error) {
            console.log(error.message);
        }
    }
    useEffect(() => {
        makeAllMessagesSeen();
    }, []);
    return (
        <div id='messages-block'>

            {newMessages && <div id='new-messages'>
                <h1>New Messages</h1>
                <div id='new-messages-block'>
                    {messages?.filter((ele) => ele.newMessage !== false).map((ele, key) => (
                        <div className='single-message' key={key}>
                            <img src={ele?.product?.imageUrl} alt="" />
                            <p>{ele.senderEmail}</p>
                            <p>{ele.receiverEmail}</p>
                            {ele?.response ? <p>{ele.response}</p> : <div>Rate</div>}
                        </div>
                    ))}
                </div>
            </div>}
            <div id='messages-block-child'>
                <h1>All Messages</h1>
                {messages?.filter((ele) => ele.newMessage !== true).map((ele, key) => (
                    <div className='single-message' key={key}>
                        <img src={ele?.product?.imageUrl} alt="" />
                        <p>{ele.senderEmail}</p>
                        <p>{ele.receiverEmail}</p>
                        {ele?.response ? <p>{ele.response}</p> : <div>Rate</div>}
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Notifications