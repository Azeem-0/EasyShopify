import React, { useContext, useRef, useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { MdOutlineDone } from "react-icons/md";
import PhoneInput from 'react-phone-number-input';
import Lottie from "lottie-react";
import profileImage from '../../../Images/profile.png';
import LoadingSpinnner from "../../../assests/imageSpinner.json";
import { pContext } from "../../ContextApi/ProfileContext";
import { nContext } from "../../ContextApi/NotificationContext";

function Updates(props) {
    const { notify } = useContext(nContext);
    const [fileChoosed, setFileChoosed] = useState('');
    const fileRef = useRef();
    const fileActivate = () => {
        fileRef.current.click();
    }
    useEffect(() => {
        if (fileRef.current?.value !== '') {
            if (fileRef.current?.value.length > 15) {
                setFileChoosed(fileRef.current?.value.substring(12, 30) + '...');
            }
            else {
                setFileChoosed(fileRef.current?.value.substring(12));
            }

        }
    }, [fileRef && fileRef.current && fileRef.current?.value]);
    function changeInput(event) {
        try {
            const { name, value } = event.target;
            const pic = event.target.files[0];
            const data = new FormData();
            data.append("file", pic);
            data.append("upload_preset", "ecommerce");
            data.append("cloud_name", "dlyhm4e8q");
            fetch("https://api.cloudinary.com/v1_1/dlyhm4e8q/image/upload", {
                method: "post",
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    // setAuthInfo((prevValue) => {
                    //     return { ...prevValue, profileUrl: data.url.toString() };
                    // });
                    setFileChoosed((prev) => {
                        return { ...prev, profileUrl: data.url.toString() };
                    })
                }).catch((err) => {
                    notify(err);
                });
        }
        catch (err) {
            notify(err.message);
        }
    }
    const { change, update, spinner } = useContext(pContext);
    return <form id={props.route} className="updates" onSubmit={update}>
        <div className={props.tar === 'newPassword' ? 'password-class-for-styling' : 'no-styling'}>
            {props.tar === 'updateProfile' && <div>
                <span><button type="button" onClick={fileActivate}><img src={profileImage} alt="profile" /></button><p>{fileChoosed}</p></span>
                <input ref={fileRef} style={{ display: 'none' }} name="image" placeholder="Choose profile" type="file" onChange={changeInput}></input>
            </div>}
            {props.tar !== 'updateProfile' && (props.tar === 'newPassword' ? <input name="oldPassword" type="text" placeholder="Old password" onChange={change} autoFocus required></input> : null)}
            {props.tar !== 'updateProfile' && (props.tar === 'phNumber' ? <PhoneInput className="PhoneInput" name={props.tar} defaultCountry="IN" placeholder="Enter Mobile Number" autoFocus onChange={change} /> : <input className={props.route} name={props.tar} type="text" placeholder={props.name} onChange={change} autoFocus required></input>)}
        </div>
        <button type="submit">{spinner ? <Lottie className="image-spinner" animationData={LoadingSpinnner} loop={true} /> : <MdOutlineDone className="icons" />}</button>
    </form>
}
function Details(props) {
    const { changeState } = useContext(pContext);
    return <div className="details">
        <p style={{ color: 'coral' }} className="details-title">{props.title ? props.title : 'Loading...'}</p>
        <p>{props.title === 'Wallet' && '$'} {props.name ? props.name : 'Loading...'}</p>
        {props.title === 'Email' ? null : <button name={props.title} onClick={changeState}><AiFillEdit className="icons" /></button>}
    </div>
}
const UserDetails = () => {
    const { userDetails, state, changeState, } = useContext(pContext);
    return (
        <div id="profile-details-edit">
            <Details title="Email" name={userDetails.email} changeState={changeState} />
            {state.Name === true ? <Details title="Name" name={userDetails.name} /> : <Updates tar="name" name="Update Name" route="updateName" />}

            {state.PhoneNumber === true ? <Details title="PhoneNumber" name={userDetails.phNumber} /> : <Updates tar="phNumber" name="Update Phone Number" route="updatePhNumber" />}

            {state.Wallet === true ? <Details title="Wallet" name={userDetails.wallet} /> : <Updates tar="addWallet" name="Add Money to Wallet" route="updateWallet" />}

            {state.Password === true ? <Details title="Password" name='Change Password' /> : <Updates tar="newPassword" name="Enter New Password" prev="Old Password" route="updatePassword" />}

            {state.Profile === true ? <Details title="Profile Image" name="Change DP" /> : <Updates tar="profileImage" name="Update Profile Image" route="updateProfile" />}
        </div>
    )
};
export default UserDetails;