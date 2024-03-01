import React, { useContext, useEffect, useRef, useState } from 'react';
import { emoji } from '../../../Constants/Emoji';
import { messageContextProvider } from '../../ContextApi/MessagesContext';
import axios from 'axios';
import { pContext } from '../../ContextApi/ProfileContext';
import notificationImage from '../../../Images/notification.png';
import pendingImage from '../../../Images/pending.png';
import completeImage from '../../../Images/complete.png';
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
            <div>
                <h1>All Messages</h1>
                <div id='messages-block-child'>
                    {messages?.length === 0 && <p>No messages.</p>}
                    {messages?.map((ele, key) => (
                        <div className='single-message-head' key={key}>
                            {
                                (openMessage.open && openMessage.messageId === ele?._id) ? <div className='single-message'>
                                    <img src={ele?.product?.imageUrl} alt="" />
                                    <div className='message-details'>
                                        {ele?.senderEmail === email ? <p>{ele.receiverEmail}</p> : <p>{ele.senderEmail}</p>}
                                    </div>
                                    <div className='message-response'>
                                        {ele?.senderEmail === email ? ele?.reaction === '' ? <img className='pending' src={pendingImage} alt="Pending" /> : <div>{ele?.reaction}</div> : null}
                                        {(ele?.senderEmail !== email && ele?.reaction === '') ? (openEmoji.open && openEmoji.messageId === ele?._id) ? <Emoji reactEmojiToMessage={reactEmojiToMessage} messageId={ele._id} toggleEmoji={toggleEmoji} /> : <p className='open-emoji' onClick={() => {
                                            setOpenEmoji((prev) => {
                                                return { ...prev, open: true, messageId: ele?._id }
                                            });
                                        }}>+</p> : null}
                                        {(ele?.senderEmail !== email && ele?.reaction !== '' && <div>{ele?.reaction}</div>)}
                                        <ImCross id="close-slid-up" onClick={() => {
                                            setOpenMessage((prev) => {
                                                return { ...prev, open: false, messageId: null }
                                            })
                                        }} />
                                    </div>
                                </div> : <div className='open-message-details'>
                                    {ele?.reaction === '' ? <img className='notification-success' src={notificationImage} alt='notification'></img> : <img className='complete' src={completeImage} alt="Complete" />}
                                    {ele?.senderEmail === email ? <p>You sent a message to {ele.receiverEmail}.</p> : <p>You got a message from {ele.senderEmail}.</p>}
                                    <button onClick={() => {
                                        setOpenMessage((prev) => {
                                            return { ...prev, open: true, messageId: ele._id }
                                        });
                                    }}>Open</button>
                                </div>
                            }
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Notifications