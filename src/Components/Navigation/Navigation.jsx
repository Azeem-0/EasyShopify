import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoNotifications } from "react-icons/io5"
import miniNavBar from "../../assests/mini-navigation.json";
import { FaShoppingCart } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import Lottie from "lottie-react";
import { motion, useInView } from "framer-motion";
import TokenValidity from "../Authentication/TokenValidity";
import { sContext } from "../ContextApi/SearchBarContext";
import Logo from "./Logo";
import './Navigation.css';
import { messageContextProvider } from "../ContextApi/MessagesContext";
import { pContext } from "../ContextApi/ProfileContext";

const SearchBar = (props) => {
    const { showMiniNavBar } = props;
    const { search, setSearch } = useContext(sContext);
    const navigate = useNavigate();
    const submitForm = (e) => {
        e.preventDefault();
        showMiniNavBar(false);
        navigate("/products");
    }
    const changeInput = (e) => {
        const { value } = e.target;
        setSearch(value);
    }
    return <form id="search-bar" onSubmit={submitForm}>
        <input type="text" name="name" onChange={changeInput} placeholder="Enter Product's Name" value={search}></input>
        <button type="submit">Search</button>
    </form>
}
const MiniNavigation = (props) => {
    const navigate = useNavigate();
    const { showMiniNavBar, miniBar, loggedIn, changeComponent, newMessages } = props;
    const changePage = (e) => {
        const { name } = e.target;
        navigate(name);
    }
    return <motion.div className="two-navigation">
        {miniBar ? <RxCross1 className="cross" onClick={showMiniNavBar} /> : <Lottie className="lottie" animationData={miniNavBar} loop={false} onClick={showMiniNavBar} />}
        {miniBar && <motion.div
            initial={{ transform: "translateY(-28em)" }}
            animate={{ transform: "translateY(0em)" }}
            exit={{ transform: "translate(-28em)" }}
            transition={{ duration: 0.5 }}
            id="mini-navigation">
            <div>
                <button name="/" onClick={changePage}>Home</button>
                {loggedIn && <button name="/profile" onClick={changePage}>Profile</button>}
                <button name="/products" onClick={changePage}>Products</button>
                {loggedIn && <button name='/addproducts' onClick={changePage}>Become Seller</button>}
                {loggedIn && <button name="/notifications" onClick={changePage}><p onClick={() => {
                    console.log('hell');
                    window.location.href = '/notifications';
                }} id={newMessages === true ? 'show-new-messages' : 'mini-no-messages'}>Notifications</p></button>}
                <button name="/faqs" onClick={changePage}>Faqs</button>
                <button name="log" className="log-button" onClick={changeComponent}>{loggedIn ? "Log Out" : "Log In"}</button>
                <SearchBar showMiniNavBar={showMiniNavBar} />
            </div>
        </motion.div>
        }
    </motion.div >
}


const MaxiNavigation = (props) => {
    const ref = useRef(null);
    const isInView = useInView(ref, {
        once: true
    })
    const navigate = useNavigate();
    const [cartNumber, setCartNumber] = useState(0);
    const userDetailsContext = useContext(pContext);
    const { loggedIn, changeComponent, showMiniNavBar, newMessages } = props;
    const { pathname } = useLocation();
    const changePage = (e) => {
        const { name } = e.target;
        navigate(name);
    }

    useEffect(() => {
        if (loggedIn) {
            setCartNumber(userDetailsContext?.userDetails?.cart?.length);
        }
    }, [loggedIn, userDetailsContext.userDetails]);

    return <motion.div
        ref={ref}
        className="one-navigation"
        style={{
            transform: isInView ? "translateY(0)" : "translateY(-50px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.7s cubic-bezier(0.17, 0.55, 0.55, 1) 0.3s"
        }}
    >
        <div>
            <button className={pathname === '/' ? 'current' : null} name="/" onClick={changePage}>Home</button>
            {loggedIn && <button className={pathname === '/profile' ? 'current' : null} name="/profile" onClick={changePage}>Profile</button>}
            <button className={pathname === '/products' ? 'current' : null} name="/products" onClick={changePage}>Products</button>
            {loggedIn && <button className={pathname === '/addproducts' ? 'current' : null} name='/addproducts' onClick={changePage}>Become Seller</button>}
            {loggedIn && <div id={newMessages === true ? 'show-new-messages' : 'no-messages'}><IoNotifications className="notification" name="/notifications" onClick={() => {
                navigate('/notifications');
            }} /></div>}
            <button className={pathname === '/faqs' ? 'current' : null} name="/faqs" onClick={changePage}>Faqs</button>
        </div>
        <div>
            <SearchBar showMiniNavBar={showMiniNavBar} />
            <button name="log" className="log-button" onClick={changeComponent}>{loggedIn ? "Log Out" : "Log In"}</button>
            {loggedIn && <div className="cart-on-navi">
                <p className="count-of-cart">{cartNumber}</p>
                <FaShoppingCart className="cart-icon" onClick={() => {
                    userDetailsContext.setProfileState("2");
                    navigate('/profile');
                }} />
            </div>}

        </div>
    </motion.div>
}


function Navigation() {

    const { newMessages } = useContext(messageContextProvider);

    const navigate = useNavigate();

    const [whichNavigation, setNavigation] = useState(false);

    const [miniBar, setMiniBar] = useState(false);

    const [loggedIn, setLoggedIn] = useState(false);

    const location = useLocation();
    function changeComponent() {
        localStorage.removeItem("token");
        navigate("/auth");
    }

    async function showMiniNavBar() {
        setMiniBar(!miniBar);
    }
    useEffect(() => {
        setMiniBar(false);
        const screenWidth = window.innerWidth;
        if (screenWidth < 1000) {
            setNavigation(false);
        }
        else {
            setNavigation(true);
        }
        TokenValidity().then((res) => {
            if (res) {
                setLoggedIn(true);
            }
            else {
                setLoggedIn(false);
            }
        });
    }, [location.pathname, newMessages]);

    return <div id="navigation">
        <Logo />
        {location.pathname !== '/auth' ? whichNavigation === true ?

            <MaxiNavigation newMessages={newMessages} changeComponent={changeComponent} showMiniNavBar={showMiniNavBar} loggedIn={loggedIn} />
            :
            <MiniNavigation newMessages={newMessages} miniBar={miniBar} showMiniNavBar={showMiniNavBar} loggedIn={loggedIn} changeComponent={changeComponent} />
            : null}
    </div>
}

export default Navigation;