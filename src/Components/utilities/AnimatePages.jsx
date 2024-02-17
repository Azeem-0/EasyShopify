import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import Dashboard from '../Pages/Home/Dashboard';
import Authentication from '../Authentication/Authentication';
import Faqs from '../Pages/Faqs/Faqs';
import AddProduct from '../Pages/Seller/AddProduct';
import Products from '../Pages/Products/Products';
import Profile from '../Pages/Profile/Profile';
import ProfileContext from '../ContextApi/ProfileContext';


const AnimatePages = () => {
    const location = useLocation();
    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path="/" exact Component={Dashboard} />
                <Route path="/profile" exact element={<ProfileContext><Profile /></ProfileContext>} />
                <Route path="/auth" exact Component={Authentication} />
                <Route path="/faqs" exact Component={Faqs} />
                <Route path="/addproducts" exact Component={AddProduct} />
                <Route path="/products" exact Component={Products} />
            </Routes>
        </AnimatePresence>
    )
}

export default AnimatePages