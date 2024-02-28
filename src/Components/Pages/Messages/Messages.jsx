import React, { useContext, useEffect, useRef, useState } from 'react';
import { emoji } from '../../../Constants/Emoji';
import { messageContextProvider } from '../../ContextApi/MessagesContext';
import axios from 'axios';
import { pContext } from '../../ContextApi/ProfileContext';
import './Messages.css';
import { useInView } from 'framer-motion';


function Emoji(props) {
    const { messageId, toggleEmoji, reactEmojiToMessage } = props;
    const emojiRef = useRef(null);
    const isInView = useInView(emojiRef, {
        once: true
    });
    const sendEmoji = (e) => {
        const emoji = e.target.innerHTML;
        if (emoji !== '+') {
            reactEmojiToMessage(emoji, messageId);
            toggleEmoji();
        }
    }
    return <div
        style={{
            opacity: isInView ? '1' : '0.3',
            transform: isInView ? 'translateY(0px)' : 'translateY(-15px)',
            scale: isInView ? '1' : '0.7'
        }}
        key={messageId}
        ref={emojiRef}
        id='emoji-block'
    >
        {emoji && emoji.map((ele) => {
            return <div onClick={sendEmoji} className='emoji'>{ele}</div>
        })}
    </div>
}

const Notifications = () => {
    const { userDetails: { email } } = useContext(pContext);
    const { messages, newMessages } = useContext(messageContextProvider);
    const [emoji, setEmoji] = useState(false);
    const makeAllMessagesSeen = async () => {
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/makeAllMessagesSeen`, { email });
            console.log(data);
        } catch (error) {
            console.log(error.message);
        }
    }
    const toggleEmoji = () => {
        setEmoji(!emoji);
    }
    const reactEmojiToMessage = async (emoji, mId) => {
        try {
            console.log(emoji, mId);
            const { data } = await axios.post(process.env.REACT_APP_BACKEND_URL + "/user/reactToMessage", { mId, emoji });
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
                        {ele?.reaction === '' ? emoji === false ? <p onClick={() => {
                            setEmoji(!emoji);
                        }}>+</p> : <Emoji reactEmojiToMessage={reactEmojiToMessage} messageId={ele._id} toggleEmoji={toggleEmoji} /> : <div>{ele?.reaction}</div>}
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Notifications