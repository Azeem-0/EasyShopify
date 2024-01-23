import Lottie from "lottie-react";
import logLottie from "../../assests/Authentication.json";
import PhoneInput from 'react-phone-number-input';
import LoadingSpinner from "../../assests/imageSpinner.json";
import 'react-phone-number-input/style.css';
import profileImage from '../../Images/profile.png';
import React, { useEffect, useRef, useState } from "react";
import Oauth from "./Oauth";
const Login = (props) => {
    const { functionality, type, change, loader } = props;
    return <form name={type} onSubmit={functionality}>
        <input name="email" type="email" placeholder="Enter Your Email" onChange={change} required></input>
        <input name='password' type="password" placeholder="Enter Your Password" onChange={change} required></input>
        <button type="submit" name="auth">{loader ? <Lottie className="image-spinner" animationData={LoadingSpinner} loop={true} /> : type}</button>
    </form>
}
const Register = (props) => {
    const fileRef = useRef(null);
    const [fileChoosed, setFileChoosed] = useState('Choose Profile Photo')
    const fileActivate = () => {
        fileRef.current.click();
    }
    useEffect(() => {
        if (fileRef.current.value !== '') {
            if (fileRef.current.value.length > 15) {
                setFileChoosed(fileRef.current.value.substring(12, 35) + '...');
            }
            else {
                setFileChoosed(fileRef.current.value.substring(12));
            }

        }
    }, [fileRef && fileRef.current && fileRef.current.value]);
    const { functionality, type, change, spinner } = props;
    return <form id="register-form" name={type} onSubmit={functionality}>
        <div className="register-child">
            <input name="name" type="text" placeholder="Enter Name" onChange={change} required></input>
            <input name="email" type="email" placeholder="Enter Email" onChange={change} required></input>
            <input name='password' type="password" placeholder="Enter Password" onChange={change} required></input>
            <input name="confirm" type="password" placeholder="Confirm Password" onChange={change} required></input>
        </div>
        <div className="register-child">
            <PhoneInput className="PhoneInput" defaultCountry="IN" placeholder="Enter Number" onChange={change} />
            <input name="address" type="text" placeholder="Enter Address" onChange={change} required></input>
            <span><button type="button" onClick={fileActivate}><img src={profileImage} alt="profile" /></button><p>{fileChoosed}</p></span>
            <input ref={fileRef} style={{ display: 'none' }} name="image" placeholder="Choose profile" type="file" onChange={change}></input>
            <button name="auth" type="submit">{spinner ? <Lottie className="image-spinner" animationData={LoadingSpinner} loop={true} /> : type}</button>
        </div>
    </form>
}
function AuthUtility(props) {
    const { title, type, change, changeAuth, to, functionality, spinner } = props;
    const [animation, setAnimation] = useState(false);
    useState(() => {
        const screenWidth = window.innerWidth;
        if (screenWidth < 1000) {
            setAnimation(false);
        }
        else {
            setAnimation(true);
        }
    })
    return <div className="authentication-utility">
        {animation && <Lottie className="auth-lottie" animationData={logLottie} loop={true} />}
        <div className="authentication-form">
            <h1>{title}</h1>
            {type === 'REGISTER' ? <Register functionality={functionality} type={type} spinner={spinner} change={change} /> : <Login functionality={functionality} type={type} change={change} />}
            <div className="change-authentication">{type === "LOGIN" ? "New Here ? " : "Already Registered ?  "} <button onClick={changeAuth}>{to}</button>
            </div>
            {/* {type !== "LOGIN" && <React.Fragment><div id="or-section">
                <div className="underline"></div>
                <div>Or</div>
                <div className="underline"></div>
            </div>
                <Oauth />
            </React.Fragment>} */}
        </div>
    </div>
}

export default AuthUtility;