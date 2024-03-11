import React from 'react';
import { useNavigate } from 'react-router-dom';
import transactionFailure from '../../../Images/Payment.avif';
import './SucessOrFailure.css';
const Success = () => {
    const navigate = useNavigate();
    return (
        <div className='result-head'>
            <div className='result'>
                <div className='result-child'>
                    <h2>Transaction Failed</h2>
                    <p>Please try again to add money to your wallet.</p>
                    <button onClick={() => {
                        navigate('/profile');
                    }}>Go Back</button>
                </div>
                <img src={transactionFailure} alt="transaction" />
            </div>
        </div>
    )
}

export default Success