import React, { useContext, useEffect, useState } from 'react';
import { ImCross } from 'react-icons/im';
import { motion } from 'framer-motion';
import { pContest } from '../../ContextApi/ProfileContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faCircle } from '@fortawesome/free-solid-svg-icons'

const OrderSlidUp = (props) => {
    const { userDetails: { address } } = useContext(pContest);
    const { heading, id, quantity, price, oDate, imageUrl, description, dDate, delivered, cancelled } = props.slidUpDetails;
    const { ToggleSlid, removeProduct, rateProduct } = props;
    const cancel = cancelled === 'true' ? true : false;
    const deliver = delivered === 'true' ? true : false;
    return <div id="slid-up">
        <motion.div
            id='slid-up-child'
            initial={{ opacity: .4, scale: .7 }}
            animate={{ opacity: 1, scale: 1, transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s" }}>
            <ImCross id="close-slid-up" onClick={ToggleSlid} />
            <img src={imageUrl} alt="userProduct"></img>
            <div className="line"></div>
            <div id='slid-up-details'>
                <h1>{heading}</h1>
                <p>{description}</p>
                <p>Price : ₹{price}</p>
                <p>Ordered Quantity : {quantity}</p>
                <p>Ordered at : {oDate.substring(0, 10)}</p>
                <p>Delivery date : {dDate.substring(0, 10)}</p>
                <p>Address : {address}</p>
                {(deliver && !cancel) && <div className='product-status'>
                    <FontAwesomeIcon icon={faCircle} style={{ color: "#43e821", }} />
                    <p>Delivered On {dDate.substring(0, 10)}</p>
                </div>}
                {cancel === true && <div className='product-status'>
                    <FontAwesomeIcon icon={faCircle} style={{ color: "#ea3434", }} />
                    <p>Product Cancelled</p>
                </div>}
                {(!cancel && !deliver) && <form name={id} data-price={price} data-pattern="orders" data-quantity={quantity} onSubmit={((e) => {
                    ToggleSlid();
                    removeProduct(e);
                })}>
                    <button type="submit">Cancel Order</button>
                </form>}
                {(deliver && !cancel) && <select name={id} onChange={rateProduct}>
                    <option value="head">Rate the Product</option>
                    <option value="1">1.0</option>
                    <option value="2">2.0</option>
                    <option value="3">3.0</option>
                    <option value="4">4.0</option>
                    <option value="5">5.0</option>
                </select>}
            </div>
        </motion.div>
    </div>
}
function Orders(props) {
    const { userDetails: { orders }, userDetails: { ordersPrice } } = useContext(pContest);
    const { removeProduct, rateProduct } = props;
    const [sm, setSm] = useState(false);
    const [slidUp, setSlidUp] = useState(false);
    const [slidUpDetails, setSlidUpDetails] = useState({
        heading: "",
        description: "",
        quantity: "",
        price: "",
        oDate: "",
        dDate: "",
        cancelled: Boolean,
        delivered: Boolean,
        imageUrl: "",
        id: "",
        address: "",
    })
    const ToggleSlid = (e) => {
        if (e) {
            const { name } = e.target;
            const { heading, quantity, price, odate, imageurl, address, description, ddate, cancelled, delivered } = e.target.dataset;
            setSlidUpDetails({ id: name, quantity: quantity, price: price, oDate: odate, heading: heading, imageUrl: imageurl, address: address, description: description, dDate: ddate, cancelled: cancelled, delivered: delivered });
            setSlidUp(!slidUp);
        }
    }
    const ToggleSlidException = () => {
        setSlidUp(!slidUp);
    }
    useEffect(() => {
        const screenWidth = window.innerWidth;
        if (screenWidth < 1000) {
            setSm(true);
        }
    }, [])
    return <React.Fragment>
        {slidUp && <OrderSlidUp slidUpDetails={slidUpDetails} rateProduct={(e) => {
            setSlidUp(false);
            rateProduct(e);
        }} removeProduct={removeProduct} ToggleSlid={ToggleSlidException} />}
        <div id='profile-product-section'>
            <div id='profile-product-heading'>
                <h2>My Orders</h2>
                <p>Total : ₹ {ordersPrice}</p>
            </div>
            <div id="order-cart-products-section">
                {!orders ? <p style={{ textAlign: 'center' }}>Loading...</p> : orders.length === 0 ? <p style={{ textAlign: 'center' }}>No Ordered Items....</p> :
                    orders.map((ele, ind) => {
                        return (
                            <div key={ind} className="profile-orders-cart">
                                <div className='profile-orders-cart-innerchild'>
                                    {ele?.cancelled ? <FontAwesomeIcon icon={faCircle} style={{ color: "#ea3434", }} /> : ele?.delivered ? <FontAwesomeIcon icon={faCircle} style={{ color: "#43e821", }} /> : <FontAwesomeIcon icon={faCartShopping} style={{ "--fa-primary-color": "#d76570!important", "--fa-secondary-color": "#ff0019!important", }} />}
                                    {ele?.product?.name && <h3>{ele?.product?.name}</h3>}
                                    {!sm && ele?.price && <h6>Price : {ele?.price}</h6>}
                                    {!sm && ele?.quantity && <h6>Quantity : {ele?.quantity}</h6>}
                                    <button name={ele?.product?._id} data-address={ele?.address} data-heading={ele?.product?.name} data-ddate={ele?.dDate} data-cancelled={ele?.cancelled} data-delivered={ele?.delivered} data-quantity={ele?.quantity} data-price={ele?.price} data-imageurl={ele?.product?.imageUrl} data-description={ele?.product?.description} data-odate={ele?.oDate} onClick={ToggleSlid}>Get More Details</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </React.Fragment>
}

export default Orders;