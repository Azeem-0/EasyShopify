import React, { useContext } from "react";
import { AiFillEdit } from "react-icons/ai";
import { MdOutlineDone } from "react-icons/md";
import PhoneInput from 'react-phone-number-input';
import Lottie from "lottie-react";
import LoadingSpinnner from "../../../assests/imageSpinner.json";
import { pContest } from "../../ContextApi/ProfileContext";

function Updates(props) {
    const { change, update, spinner } = useContext(pContest);
    return <form id={props.route} className="updates" onSubmit={update}>
        <div>
            {props.tar === 'newPassword' ? <input name="oldPassword" type="text" placeholder="Old password" onChange={change} autoFocus required></input> : null}
            {props.tar === 'phNumber' ? <PhoneInput className="PhoneInput" name={props.tar} defaultCountry="IN" placeholder="Enter Mobile Number" onChange={change} /> : <input className={props.route} name={props.tar} type="text" placeholder={props.name} onChange={change} required></input>}
        </div>
        <button type="submit">{spinner ? <Lottie className="image-spinner" animationData={LoadingSpinnner} loop={true} /> : <MdOutlineDone className="icons" />}</button>
    </form>
}
function Details(props) {
    const { changeState } = useContext(pContest);
    return <div className="details">
        <p style={{ color: 'coral' }} className="details-title">{props.title ? props.title : 'Loading...'}</p>
        <p>{props.title === 'Wallet' && '₹'} {props.name ? props.name : 'Loading...'}</p>
        {props.title === 'Email' ? null : <button name={props.title} onClick={changeState}><AiFillEdit className="icons" /></button>}
    </div>
}
const UserDetails = () => {
    const { userDetails, state, changeState, } = useContext(pContest);
    return (
        <div id="profile-details-edit">
            <Details title="Email" name={userDetails.email} changeState={changeState} />
            {state.Name === true ? <Details title="Name" name={userDetails.name} /> : <Updates tar="name" name="Update Name" route="updateName" />}

            {state.PhoneNumber === true ? <Details title="PhoneNumber" name={userDetails.phNumber} /> : <Updates tar="phNumber" name="Update Phone Number" route="updatePhNumber" />}

            {state.Wallet === true ? <Details title="Wallet" name={userDetails.wallet} /> : <Updates tar="addWallet" name="Add Money to Wallet" route="updateWallet" />}

            {state.Password === true ? <Details title="Password" name='Change Password' /> : <Updates tar="newPassword" name="Enter New Password" prev="Old Password" route="updatePassword" />}
        </div>
    )
};
export default UserDetails;