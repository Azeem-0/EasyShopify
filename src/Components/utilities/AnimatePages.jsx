import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import Dashboard from '../Pages/Home/Dashboard';
import Authentication from '../Authentication/Authentication';
import Faqs from '../Pages/Faqs/Faqs';
import AddProduct from '../Pages/Seller/AddProduct';
import Products from '../Pages/Products/Products';
import Profile from '../Pages/Profile/Profile';
import Messages from "../Pages/Messages/Messages";
import Failure from '../Pages/SuccessOrFailure/Failure';
import Success from '../Pages/SuccessOrFailure/Success';


const AnimatePages = () => {
    const location = useLocation();
    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path="/" exact Component={Dashboard} />
                <Route path="/profile" exact Component={Profile} />
                <Route path="/auth" exact Component={Authentication} />
                <Route path="/notifications" exact Component={Messages} />
                <Route path="/faqs" exact Component={Faqs} />
                <Route path="/addproducts" exact Component={AddProduct} />
                <Route path="/products" exact Component={Products} />
                <Route path='/success' exact Component={Success} />
                <Route path='/failure' exact Component={Failure} />
            </Routes>
        </AnimatePresence>
    )
}

export default AnimatePages