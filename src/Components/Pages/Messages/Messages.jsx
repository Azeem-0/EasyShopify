import React, { useContext, useEffect, useRef, useState } from 'react';
import { emoji } from '../../../Constants/Emoji';
import { messageContextProvider } from '../../ContextApi/MessagesContext';
import axios from 'axios';
import { pContext } from '../../ContextApi/ProfileContext';
import notificationImage from '../../../Images/notification.png';
import pendingImage from '../../../Images/pending.png';
import completeImage from '../../../Images/complete.png';
import { motion } from 'framer-motion';
import './Messages.css';
import { useInView } from 'framer-motion';
import { ImCross } from 'react-icons/im';


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
    return <motion.div
        initial={{ opacity: .4, scale: .7 }}
        animate={{ opacity: 1, scale: 1, transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s" }}
        key={messageId}
        ref={emojiRef}
        id='emoji-block'
    >
        {emoji && emoji.map((ele, key) => {
            return <div key={key} onClick={sendEmoji} className='emoji'>{ele}</div>
        })}
        <div className='close-emoji' onClick={toggleEmoji}>-</div>
    </motion.div>
}

const Notifications = () => {
    const { userDetails: { email } } = useContext(pContext);
    const { messages } = useContext(messageContextProvider);
    const [openEmoji, setOpenEmoji] = useState({
        open: false,
        messageId: null
    });
    const [openMessage, setOpenMessage] = useState({
        open: false,
        messageId: null
    })
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
            <div id='messages-block-2'>
                <h1>All Messages</h1>
                <div id='messages-block-child'>
                    {messages?.length === 0 && <p>No messages.</p>}
                    {messages?.map((ele, key) => (
                        <motion.div
                            className='single-message-head'
                            initial={{ opacity: .4, scale: .7 }}
                            animate={{ opacity: 1, scale: 1, transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s" }}
                            key={key}>
                            {
                                (openMessage.open && openMessage.messageId === ele?._id) ? <motion.div
                                    initial={{ opacity: .4, scale: .7 }}
                                    animate={{ opacity: 1, scale: 1, transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s" }}
                                    className='single-message'
                                >
                                    <ImCross id="close-slid-up" onClick={() => {
                                        setOpenMessage((prev) => {
                                            return { ...prev, open: false, messageId: null }
                                        })
                                    }} />
                                    <img src={ele?.product?.imageUrl} alt="" />
                                    <div className='message-details'>
                                        {ele?.senderEmail === email ? <p>{ele.receiverEmail}</p> : <p>From : {ele.senderEmail}</p>}
                                        <h4>{ele?.product?.name}</h4>
                                        <p>{ele?.product?.description}</p>
                                        <p>Price : ₹{ele?.product?.price}</p>
                                    </div>
                                    <div className='message-response'>
                                        {ele?.senderEmail === email ? ele?.reaction === '' ? <img className='pending' src={pendingImage} alt="Pending" /> : <div>{ele?.reaction}</div> : null}
                                        {(ele?.senderEmail !== email && ele?.reaction === '') ? (openEmoji.open && openEmoji.messageId === ele?._id) ? <Emoji reactEmojiToMessage={reactEmojiToMessage} messageId={ele._id} toggleEmoji={toggleEmoji} /> : <p className='open-emoji' onClick={() => {
                                            setOpenEmoji((prev) => {
                                                return { ...prev, open: true, messageId: ele?._id }
                                            });
                                        }}>+</p> : null}
                                        {(ele?.senderEmail !== email && ele?.reaction !== '' && <div>{ele?.reaction}</div>)}
                                    </div>
                                </motion.div> : <div className='open-message-details'>
                                    {ele?.reaction === '' ? <img className='notification-success' src={notificationImage} alt='notification'></img> : <img className='complete' src={completeImage} alt="Complete" />}
                                    {ele?.senderEmail === email ? <p>You sent a message to {ele.receiverEmail}.</p> : <p>You got a message from {ele.senderEmail}.</p>}
                                    <button onClick={() => {
                                        setOpenMessage((prev) => {
                                            return { ...prev, open: true, messageId: ele._id }
                                        });
                                    }}>Open</button>
                                </div>
                            }
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Notifications