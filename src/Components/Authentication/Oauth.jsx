import React from 'react';
import facebook from '../../Images/facebook.png';
import google from '../../Images/google.png';
import twitter from '../../Images/twitter.png';
const Oauth = () => {
    return (
        <div id='oauth-block'>
            <div className='oauth-child'>
                <img src={google} alt="" />
            </div>
            <div className='oauth-child'>
                <img src={twitter} alt="" />
            </div>
            <div className='oauth-child'>
                <img src={facebook} alt="" />
            </div>
        </div>
    )
}

export default Oauth