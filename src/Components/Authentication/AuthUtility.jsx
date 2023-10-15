import Lottie from "lottie-react";
import logLottie from "../../assests/Authentication.json";
import PhoneInput from 'react-phone-number-input';
import LoadingSpinner from "../../assests/imageSpinner.json";
import 'react-phone-number-input/style.css';
import React, { useState } from "react";
const Login = (props) => {
    const { functionality, type, change } = props;
    return <form name={type} onSubmit={functionality}>
        <input name="email" type="email" placeholder="Enter Your Email" onChange={change} required></input>
        <input name='password' type="password" placeholder="Enter Your Password" onChange={change} required></input>
        <button type="submit" name="auth">{type}</button>
    </form>
}
const Register = (props) => {
    const { functionality, type, change, spinner } = props;
    return <form name={type} onSubmit={functionality}>
        <input name="name" type="text" placeholder="Enter Name" onChange={change} required></input>
        <input name="email" type="email" placeholder="Enter Email" onChange={change} required></input>
        <input name='password' type="password" placeholder="Enter Password" onChange={change} required></input>
        <PhoneInput className="PhoneInput" defaultCountry="IN" placeholder="Enter Number" onChange={change} />
        <input name="address" type="text" placeholder="Enter Address" onChange={change} required></input>
        {/* <input name="image" placeholder="Choose profile" type="file" onChange={change}></input> */}
        <button name="auth" type="submit">{spinner ? <Lottie className="image-spinner" animationData={LoadingSpinner} loop={true} /> : type}</button>
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
        </div>
    </div>
}

export default AuthUtility;