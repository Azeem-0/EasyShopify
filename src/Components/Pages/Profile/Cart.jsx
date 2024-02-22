import React, { useContext, useEffect, useState } from 'react';
import { ImCross } from 'react-icons/im';
import { motion } from 'framer-motion';
import { pContext } from '../../ContextApi/ProfileContext';
import ImageComponent from '../../utilities/ImageComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

const CartSlidUp = (props) => {
    const { userDetails: { address } } = useContext(pContext);
    const { name, description, price, quantity, id, imageUrl } = props;
    const { ToggleSlid, orderProduct } = props;
    const [order, setOrder] = useState({
        quantity: "",
        address: address
    });
    const [active, setActive] = useState(false);
    const change = (e) => {
        const { name, value } = e.target;
        setOrder((prevValue) => {
            return { ...prevValue, [name]: value }
        })
    }
    return <div id="slid-up">
        <motion.div
            id='slid-up-child'
            initial={{ opacity: .4, scale: .7 }}
            animate={{ opacity: 1, scale: 1, transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s" }}
        >
            <ImCross id="close-slid-up" onClick={ToggleSlid} />
            <ImageComponent src={`${imageUrl}`} blur="LXCjton$IVbH.TaeR*j[t-WWj[oL" />
            <div className="line"></div>
            <div id='slid-up-details'>
                <h1>{name}</h1>
                <p>{description}</p>
                <p>Price : ₹{price}</p>
                <p>Avaliable Stock : {quantity}</p>
                <form name={id} data-price={price} data-address={order.address} data-pattern="cart" data-request={order.quantity} data-quantity={quantity} onSubmit={(e) => {
                    ToggleSlid();
                    orderProduct(e);
                }}>
                    <input name="quantity" type="number" onChange={change} placeholder="Enter the quantity" autoFocus></input>
                    {active && <input name="address" type="text" onChange={change} placeholder="Enter Address"></input>}
                    <button type="submit">Order Now</button>
                </form>
                <p className='extra-details' onClick={() => { setActive(!active) }}>Change Address?</p>
            </div>
        </motion.div>
    </div>
}


function Cart(props) {
    const { userDetails: { cart } } = useContext(pContext);
    const { orderProduct, removeProduct } = props;
    const [slidUp, setSlidUp] = useState(false);
    const [usersWindow, setUsersWindow] = useState(false);
    const [userSearch, setUserSearch] = useState('');
    const [users, setUsers] = useState([]);
    const [sm, setSm] = useState(false);
    const [slidUpDetails, setSlidUpDetails] = useState({
        heading: "",
        id: "",
        quantity: "",
        price: "",
        oDate: "",
        imageUrl: "",
    });

    const ToggleSlid = (e) => {
        if (e) {
            const { name } = e.target;
            const { heading, quantity, price, odate, imageurl } = e.target.dataset;
            setSlidUpDetails({ id: name, quantity: quantity, price: price, oDate: odate, heading: heading, imageUrl: imageurl });
            setSlidUp(!slidUp);
        }
    }

    const ToggleSlipException = () => {
        setSlidUp(!slidUp);
    }

    const openUsersList = (e) => {
        const { name } = e.target;
        setUsersWindow(!usersWindow);
    }

    const changeUserSearch = (e) => {
        const { value } = e.target;
    }

    useEffect(() => {
        const screenWidth = window.innerWidth;
        if (screenWidth < 1000) {
            setSm(true);
        }
    }, []);

    return <React.Fragment>
        {slidUp && <CartSlidUp id={slidUpDetails.id} name={slidUpDetails.heading} description="Good Product" price={slidUpDetails.price} quantity={slidUpDetails.quantity} imageUrl={slidUpDetails.imageUrl}
            orderProduct={orderProduct} ToggleSlid={ToggleSlipException} />}
        <div id='profile-product-section'>
            <div id='profile-product-heading'>
                <h2>My Cart</h2>
            </div>
            <div id="order-cart-products-section">
                {!cart ? <p style={{ textAlign: 'center' }}>Loading...</p> : cart.length === 0 ? <p style={{ textAlign: 'center' }}>No Items in the Cart...</p> :
                    cart.map((ele, ind) => {
                        return (
                            <div key={ind} className="profile-orders-cart">
                                <div className='profile-orders-cart-innerchild'>
                                    <FontAwesomeIcon icon={faCartShopping} style={{ "--fa-primary-color": "#d76570!important", "--fa-secondary-color": "#ff0019!important", }} />
                                    {ele?.product?.name && <h3>{ele?.product?.name}</h3>}
                                    {!sm && ele?.product?.quantity && <h6>Avaliable Quantity : {ele?.product?.quantity}</h6>}
                                    {!sm && ele?.product?.price && <h6>Price : {ele?.product?.price}</h6>}
                                    <button name={ele?.product?._id} data-heading={ele?.product?.name} data-quantity={ele?.product?.quantity} data-price={ele?.product?.price} data-odate={ele?.oDate} data-imageurl={ele?.product?.imageUrl} onClick={ToggleSlid}>Order</button>
                                    <button name={ele?.product?._id} data-pattern="cart" onClick={removeProduct}>Delete</button>
                                    <button name={ele?.product?._id} className='send-to-friends' onClick={openUsersList}>Send</button>
                                </div>
                            </div>
                        )
                    })}
            </div>
        </div>
        {usersWindow && <div className='users-listing-section'>
            <div className='users-listing-section-child'>
                <form onSubmit={null}>
                    <input className='users-search-input' name='users-search' type="text" placeholder="Enter Your Friend's Email" onChange={changeUserSearch} />
                    <button type='submit'>Search</button>
                </form>
                <div className='users-search-results'>
                    {users.length === 0 ? <p>Search Your Friend.</p> : null}
                </div>
            </div>
        </div>}
    </React.Fragment>
}

export default Cart