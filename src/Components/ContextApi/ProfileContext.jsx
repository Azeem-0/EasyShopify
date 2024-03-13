import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { nContext } from './NotificationContext';
import TokenValidity from '../Authentication/TokenValidity';
import { loadStripe } from '@stripe/stripe-js';

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
        if (name === 'updateWallet') {
            addMoneyToWallet();
        }
        else {
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
    }

    async function addMoneyToWallet() {
        try {

            const regularExpression = /^[0-9]+$/;

            if (userDetails.addWallet <= 0) {
                notify("Please enter a positive number.");
            }
            else if (regularExpression.test(userDetails.addWallet) == false) {
                notify("Please enter a valid number.");
            }
            else {
                const stripe = await loadStripe(`${process.env.REACT_APP_PUBLISHED_KEY}`);
                const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/checkoutPage`,
                    {
                        addWallet: userDetails.addWallet,
                        email: userDetails.email
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                const data = response.data;

                const res = stripe.redirectToCheckout({
                    sessionId: data.id
                });

                setUserDetails((prev) => {
                    return { ...prev, wallet: data.userWallet }
                });
            }
            setSpinner(false);

        } catch (error) {
            console.log(error.message);
        }
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