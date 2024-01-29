import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import TokenValidity from "../../utilities/TokenValidity";
import ImageComponent from "../../utilities/ImageComponent";
import ProfileCover from "../../../Images/profileCover.jpg";
import preLoader from '../../../assests/preLoader2.json'
import { ToastContainer } from 'react-toastify';
import UserDetails from "./UserDetails";
import { motion } from 'framer-motion';
import 'react-phone-number-input/style.css';
import axios from "axios";
import "./Profile.css";
import Orders from "./Orders";
import Cart from "./Cart";
import { pContest } from "../../ContextApi/ProfileContext";
import { nContext } from "../../ContextApi/NotificationContext";
import Lottie from "lottie-react";
import { productContext } from "../../ContextApi/ProductsContext";

function Profile() {
  const { notify } = useContext(nContext)
  const { userDetails, setUserDetails, getUserDetails, } = useContext(pContest);
  const { products, setProducts } = useContext(productContext);
  const navigate = useNavigate();
  const [profileState, setProfileState] = useState("1");
  const [spinner, setSpinner] = useState(false);

  console.log(products);
  async function removeProduct(event) {
    event.preventDefault();
    const { name } = event.target;
    const { pattern } = event.target.dataset;
    var data;
    if (pattern) {
      setSpinner(true);
      if (pattern === "orders") {
        const { price, quantity, orderid } = event.target.dataset;
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_DATABASE_URL}/dashboard/product/removeUserProduct`,
            {
              pId: name,
              orderId: orderid,
              quantity: quantity,
              price: price,
              email: userDetails.email,
              from: pattern,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          data = await response.data;
          setProducts((prevValue) => {
            return prevValue.map((product) => {
              if (product._id === name) {
                product.quantity = data.quantity;
              }
              return product;
            })
          });
          setUserDetails((prevValue) => {
            return {
              ...prevValue,
              cart: data.cart,
              orders: data.orders,
              wallet: data.wallet,
              ordersPrice: data.ordersPrice
            };
          });
        } catch (error) {
          console.log(error);
          notify(error.message);
        }
      } else {
        const response = await axios.post(
          `${process.env.REACT_APP_DATABASE_URL}/dashboard/product/removeUserProduct`,
          {
            pId: name,
            email: userDetails.email,
            from: pattern,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        data = await response.data;
        if (data.status === true) {
          setUserDetails((prevValue) => {
            return { ...prevValue, cart: data.cart };
          });
        }
        else {
          notify(data.message);
        }
      }
      setSpinner(false);
      notify(data.message);
    }
  }

  async function orderProduct(event) {
    event.preventDefault();
    var { quantity, request, address } = event.target.dataset;
    const parsedQuantity = parseInt(quantity, 10);
    const parsedRequest = parseInt(request, 10);
    if (parsedRequest <= parsedQuantity) {
      const { name } = event.target;
      setSpinner(true);
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_DATABASE_URL}/dashboard/product/addUserProducts`,
          {
            pId: name,
            from: "orders",
            quantity: parsedRequest,
            userDetails: userDetails,
            address: address,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "x-access-token": localStorage.getItem("token"),
            },
          }
        );
        const data = response.data;
        if (data.status === true) {
          setProducts((prevValue) => {
            return prevValue.map((product) => {
              if (product._id === name) {
                product.quantity = data.quantity;
              }
              return product;
            })
          });
          setUserDetails((prevValue) => {
            return {
              ...prevValue,
              wallet: data.user.wallet,
              orders: data.user.orders,
              cart: data.user.cart,
              ordersPrice: data.user.ordersPrice
            };
          });
        }
        notify(data.message);
      } catch (error) {
        console.log(error);
      }
      setSpinner(false);
    }
    else {
      notify("Product Out Of Stock...");
    }
  }

  const rateProduct = async (e) => {
    const { name, value } = e.target;
    setSpinner(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_DATABASE_URL}/dashboard/product/rateProduct`, { name, value }, {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
      });
      const data = await response.data;
      notify(data.message);
    }
    catch (err) {
      console.log(err.message);
      notify(err.message);
    }
    setSpinner(false);
  }

  const changeProfileState = (e) => {
    const { name } = e.target;
    setProfileState(name);
  };

  useEffect(() => {
    TokenValidity().then((res) => {
      if (!res) {
        const msg = "Oops..! Login Session Expired";
        navigate("/auth", { state: { m2: msg } });
      } else {
        getUserDetails();
      }
    });
  }, []);
  return (
    <motion.div
      id="profile-dashboard"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {spinner && <div className="overlay"></div>}
      {spinner && <Lottie className="profile-loader-lottie" animationData={preLoader} loop={true} />}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} theme="dark" />
      <div id="profile-side-bar">
        <div>
          <button className={profileState === "1" ? "active" : "disabled"} name="1" onClick={changeProfileState} >Profile</button>
          <button
            className={profileState === "2" ? "active" : "disabled"}
            name="2"
            onClick={changeProfileState}
          >
            Cart
          </button>
          <button
            className={profileState === "3" ? "active" : "disabled"}
            name="3"
            onClick={changeProfileState}
          >
            Orders
          </button>
        </div>
      </div>
      <div id="profile-section">
        <div id="user-section">
          <div id="cover-picture">
            <ImageComponent
              src={ProfileCover}
              blur="LXCjton$IVbH.TaeR*j[t-WWj[oL"
            />
          </div>
          <div id="profile-info-head">
            <div id="profile-dp">
              <ImageComponent
                src={`${userDetails.profileImg}`}
                blur="LXCjton$IVbH.TaeR*j[t-WWj[oL"
              />
            </div>
          </div>
          {profileState === "1" ? (
            <UserDetails />
          ) : profileState === "2" ? (
            <Cart removeProduct={removeProduct} orderProduct={orderProduct} />
          ) : (
            <Orders orderProduct={orderProduct} removeProduct={removeProduct} rateProduct={rateProduct} />
          )}
        </div>
      </div>
    </motion.div>
  );
}
export default Profile;
