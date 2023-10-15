// import { FaInstagramSquare } from "react-icons/fa";
// import {BsLinkedin} from "react-icons/bs";
// import {AiFillFacebook,AiFillTwitterSquare} from "react-icons/ai";
// import "./Footer.css";
// const Footer = ()=>{
//     return <div className="footer">
//         <div className="footer-1"><h1>MILLENNIAL MART</h1></div>
//         <div className="footer-2">
//             <p>azeemshaik025@gmail.com</p>
//             <div></div>
//             <p>7995772042</p>
//         </div>
//         <h3>© MillennialMart 2023. All rights reserved.</h3>
//         <div className="footer-3">
//             <ul>
//                 <li><FaInstagramSquare /></li>
//                 <li><BsLinkedin /></li>
//                 <li><AiFillFacebook /></li>
//                 <li><AiFillTwitterSquare /></li>
//             </ul>
//         </div>
//     </div>
// }
// export default Footer;
import React from "react";
import { FaInstagramSquare, FaLinkedin } from "react-icons/fa";
import { AiFillFacebook, AiFillTwitterSquare } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "./Footer.css";
const SocialIcons = () => {
    return <ul>
        <li><a href="https://www.instagram.com/azeem.shaik.16906/" target="/blank"><FaInstagramSquare /></a></li>
        <li><a href="https://www.linkedin.com/in/azeem-shaik-09b325243/" target="/blank"><FaLinkedin /></a></li>
        <li><a href="https://www.facebook.com/azeem.shaik.16906/" target="/blank"><AiFillFacebook /></a></li>
        <li><a href="https://www.instagram.com/azeem.shaik.16906/" target="/blank"><AiFillTwitterSquare /></a></li>
    </ul>
}
function Footer() {
    const navigate = useNavigate();
    return <div id="footer-section">
        <div id="footer-description">
            <h3 onClick={()=>{navigate("/")}}>EasyShopify</h3>
            <div className="footer-1">
                <p>azeemshaik025@gmail.com</p>
                <div></div>
                <p>+917995772042</p>
            </div>
            <h5>© EasyShopify 2023. All rights reserved.</h5>
            <SocialIcons />
        </div>
    </div>
}
export default Footer;