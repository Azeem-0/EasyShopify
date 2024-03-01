import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { nContext } from './NotificationContext';
import TokenValidity from '../Authentication/TokenValidity';

export const pContext = createContext();
const ProfileContext = ({ children }) => {
    const { notify } = useContext(nContext);
    const [spinner, setSpinner] = useState(false);
    const [state, setState] = useState({
        Name: true,
        Password: true,
        PhoneNumber: true,
        Wallet: true,
    });
    const [userDetails, setUserDetails] = useState({
        email: '',
        profileImg: "",
        name: "",
        phNumber: null,
        address: "",
        oldPassword: "",
        newPassword: "",
        wallet: 0,
        addWallet: null,
        cart: null,
        orders: null,
        ordersPrice: null
    });
    async function change(event) {
        if (event) {
            if (event.target) {
                const { name, value } = event.target;
                setUserDetails((prevValue) => {
                    return { ...prevValue, [name]: value };
                });
            } else {
                setUserDetails((prevValue) => {
                    return { ...prevValue, phNumber: event };
                });
            }
        }
    }

    function changeState(event) {
        const { name } = event.target;
        setState(() => {
            return {
                Name: true,
                Password: true,
                PhoneNumber: true,
                Wallet: true,
                [name]: false,
            };
        });
    }
    async function getUserDetails() {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/dashboard/product/getUserProducts`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": localStorage.getItem("token"),
                    },
                }
            );
            const data = response.data;
            if (data.status === true) {
                setUserDetails({
                    cart: data.user.cart,
                    orders: data.user.orders,
                    name: data.user.name,
                    email: data.user.email,
                    phNumber: data.user.phNumber,
                    wallet: data.user.wallet,
                    address: data.user.address,
                    profileImg: data.user.profileImage,
                    ordersPrice: data.user.ordersPrice
                });
            }
            else {
                notify(data.message);
            }
        } catch (error) {
            notify("There might be some issue... Please try again.")
        }
    }
    async function update(event) {
        event.preventDefault();
        setSpinner(true);
        const name = event.target.id;
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/${name}`,
                {
                    userDetails,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const data = response.data;
            if (data.status === true) {
                const wallet = userDetails.wallet + Number.parseInt(userDetails.addWallet) || userDetails.wallet;
                setUserDetails((prevValue) => {
                    return { ...prevValue, wallet: wallet };
                });
                setState((prevValue) => {
                    return {
                        ...prevValue,
                        Name: true,
                        PhoneNumber: true,
                        Wallet: true,
                        Email: true,
                    };
                });
            }
            notify(data.message);
            if (name === "updatePassword") {
                setState((prevValue) => {
                    return { ...prevValue, Password: true };
                });
            }
        } catch (error) {
            notify("There is some issue... Please try again.");
        }
        setSpinner(false);
    }
    useEffect(() => {
        TokenValidity().then((res) => {
            if (res) {
                getUserDetails();
            }
        });
    }, []);
    console.log(userDetails);
    return (
        <pContext.Provider value={{ userDetails, setUserDetails, getUserDetails, update, state, spinner, change, changeState }}>
            {children}
        </pContext.Provider>
    )
}

export default ProfileContext;