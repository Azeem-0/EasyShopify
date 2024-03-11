import React from 'react';
import { useNavigate } from 'react-router-dom';
import success from '../../../Images/complete.png';
import transactionSuccess from '../../../Images/Payment.avif';
import './SucessOrFailure.css';
const Success = () => {
    const navigate = useNavigate();
    return (
        <div className='result-head'>
            <div className='result'>
                <div className='result-child'>
                    {/* <img src={success} alt='success'></img> */}
                    <h2>Transaction Successful!</h2>
                    <p>Amount is added to your wallet.</p>
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