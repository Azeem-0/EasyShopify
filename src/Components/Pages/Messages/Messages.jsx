import React from 'react';
import { constantData } from '../../../Constants/DummyData';

import './Messages.css';

const Notifications = () => {
    return (
        <div id='messages-block'>

            <div id='messages-block-child'>
                {constantData.map((ele, key) => {
                    return <div className='single-message' key={key}>
                        <img src="https://imgs.search.brave.com/79T_zjtja5BdmncEXx9mg2tnr6_Jm3sD5PG79dwWTMw/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/dGhlbmV3cy5jb20u/cGsvYXNzZXRzL3Vw/bG9hZHMvdXBkYXRl/cy8yMDI0LTAyLTIz/LzExNjA3MDZfMzcz/NDI4NF92aXJhdC1r/b2hsaS1hbnVzaGth/LXNoYXJtYV91cGRh/dGVzLmpwZw" alt="" />
                        <p>{ele.senderEmail}</p>
                        <p>{ele.receiverEmail}</p>
                        <p>{ele.response}</p>
                    </div>
                })}
            </div>

        </div>
    )
}

export default Notifications