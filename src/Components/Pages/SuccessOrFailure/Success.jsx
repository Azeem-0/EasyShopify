import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import success from '../../../Images/complete.png';
import transactionSuccess from '../../../Images/Payment.avif';
import './SucessOrFailure.css';
import axios from 'axios';
const Success = () => {
    const navigate = useNavigate();
    const queryUrl = window.location.search;
    const urlParams = new URLSearchParams(queryUrl);
    const sessionId = urlParams.get('session_id');
    const email = urlParams.get('email');
    const addWallet = urlParams.get('addWallet');
    const [access, setAccess] = useState(true);

    const addToWallet = async () => {
        try {
            console.log(sessionId, email, addWallet);
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/updateWallet`, { addWallet, email, sessionId });
            const data = response.data;
            console.log(data);
            if (data.status !== true) {
                setAccess(false);
            }
            console.log("Success");
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        addToWallet();
    }, [])
    return (
        <div className='result-head'>
            <div className='result'>
                <div className='result-child'>
                    {/* <img src={success} alt='success'></img> */}
                    {access ?
                        <>
                            <h2>Transaction Successful!</h2>
                            <p>Amount is added to your wallet.</p>
                        </> :
                        <>
                            <h2>Unauthorized Access!</h2>
                            <p>Check your payment details.</p>
                        </>
                    }
                    <button onClick={() => {
                        navigate('/profile');
                    }}>Go Back</button>
                </div>
                <img src={transactionSuccess} alt="transaction" />
            </div>
        </div>
    )
}

export default Success