import React from 'react';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
// import facebook from '../../Images/facebook.png';
// import google from '../../Images/google.png';
// import twitter from '../../Images/twitter.png';
import { useNavigate } from 'react-router-dom';
const Oauth = () => {
    const navigate = useNavigate();
    const handleOauth = async (credentialResponse) => {
        try {
            const response = await axios.post(process.env.REACT_APP_BACKEND_URL + '/auth/oauth/login', { credentialResponse });
            const data = response.data;
            if (data.user) {
                localStorage.setItem("token", data.user);
                navigate('/');
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    return (
        <div id='oauth-block'>
            <div className='oauth-child'>
                <GoogleLogin
                    onSuccess={credentialResponse => {
                        handleOauth(credentialResponse);
                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                />
                {/* <img id='google' src={google} alt="" onClick={handleOauth} /> */}
            </div>
            {/* <div className='oauth-child'>
                <img src={twitter} alt="" />
            </div>
            <div className='oauth-child'>
                <img src={facebook} alt="" />
            </div> */}
        </div>
    )
}

export default Oauth