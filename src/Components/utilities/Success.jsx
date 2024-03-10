import React from 'react';
import { useNavigate } from 'react-router-dom'
import success from '../../Images/complete.png';

const Success = () => {
    const navigate = useNavigate();
    return (
        <div style={{ width: '100dvw', height: '100dvh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '1.5em' }}>
            <div style={{ width: 'fit-content', height: 'fit-content', padding: '10px 15px', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '1em' }}>
                <h1>Transaction Success</h1>
                <img src={success} style={{ width: '3em', height: '3em', objectFit: 'contain' }}></img>
                <button style={{ backgroundColor: 'black', opacity: '.8', padding: '5px 10px' }} onClick={() => {
                    navigate('/profile');
                }}>Go Back</button>
            </div>
        </div >
    )
}

export default Success