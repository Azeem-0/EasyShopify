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
        {emoji && emoji.map((ele, key) => {
            return <div key={key} onClick={sendEmoji} className='emoji'>{ele}</div>
        })}
        <div className='close-emoji' onClick={toggleEmoji}>-</div>
    </div>
}

const Notifications = () => {
    const { userDetails: { email } } = useContext(pContext);
    const { messages } = useContext(messageContextProvider);
    const [openEmoji, setOpenEmoji] = useState({
        open: false,
        messageId: null
    });
    const makeAllMessagesSeen = async () => {
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/makeAllMessagesSeen`, { email });
        } catch (error) {
            console.log(error.message);
        }
    }
    const toggleEmoji = () => {
        setOpenEmoji((prev) => {
            return { ...prev, open: !prev.open, messageId: null }
        });
    }
    const reactEmojiToMessage = async (emoji, mId) => {
        try {
            const { data } = await axios.post(process.env.REACT_APP_BACKEND_URL + "/user/reactToMessage", { mId, emoji });
            console.log(data);
        } catch (error) {
            console.log(error.message);
        }
    }
    useEffect(() => {
        makeAllMessagesSeen();
    }, [messages]);
    return (
        <div id='messages-block'>
            <div>
                <h1>All Messages</h1>
                <div id='messages-block-child'>
                    {messages?.map((ele, key) => (
                        <div className='single-message' key={key}>
                            <img src={ele?.product?.imageUrl} alt="" />
                            <p>{ele.senderEmail}</p>
                            <p>{ele.receiverEmail}</p>
                            {ele?.senderEmail === email ? ele?.reaction === '' ? <p>Pending</p> : <div>{ele?.reaction}</div> : null}
                            {(ele?.senderEmail !== email && ele?.reaction === '') ? (openEmoji.open && openEmoji.messageId === ele?._id) ? <Emoji reactEmojiToMessage={reactEmojiToMessage} messageId={ele._id} toggleEmoji={toggleEmoji} /> : <p className='open-emoji' onClick={() => {
                                setOpenEmoji((prev) => {
                                    return { ...prev, open: !prev.open, messageId: ele?._id }
                                });
                            }}>+</p> : null}
                            {(ele?.senderEmail !== email && ele?.reaction !== '' && <div>{ele?.reaction}</div>)}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Notifications