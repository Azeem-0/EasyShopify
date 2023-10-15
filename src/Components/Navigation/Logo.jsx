import logo from "../../Images/logo.png";
import {useNavigate} from "react-router-dom";
const Logo = ()=>{
    const navigate = useNavigate();
    return <div onClick={()=>{
        navigate("/");
    }} id="logo">
        <img src={logo} alt="Logo"></img>
    </div>
}
export default Logo;