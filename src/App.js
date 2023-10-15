import React, { useEffect, useState } from "react";
import Authentication from "../src/Components/Authentication/Authentication";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "./Components/Navigation/Navigation";
import Lottie from "lottie-react";
import preLoader from "./assests/preLoader2.json";
import Dashboard from "./Components/Pages/Home/Dashboard";
import Profile from "./Components/Pages/Profile/Profile";
import AddProduct from "./Components/Pages/Seller/AddProduct";
import Products from "./Components/Pages/Products/Products";
import Faqs from "./Components/Pages/Faqs/Faqs";
import ProfileContext from "./Components/ContextApi/ProfileContext";
import SearchBarContext from "./Components/ContextApi/SearchBarContext";
import NotificationContext from "./Components/ContextApi/NotificationContext";
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import ProductsContext from "./Components/ContextApi/ProductsContext";
function App() {
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 3000);
    const handleScroll = () => {
      const scrollEffectElement = document.querySelector('.navigation');
      if (scrollEffectElement) {
        const scrollPosition = window.scrollY;
        if (scrollPosition > 0) {
          scrollEffectElement.classList.add('navi-background');
        }

        else {
          scrollEffectElement.classList.remove('navi-background');
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return <div className="App">
    <NotificationContext>
      {loader ? <Lottie className="loader-lottie" animationData={preLoader} loop={true} /> :
        <ProductsContext>
          <BrowserRouter>
            <SearchBarContext>
              <Navigation />
              <Routes>
                <Route path="/" exact Component={Dashboard} />
                <Route path="/auth" exact Component={Authentication} />
                <Route path="/faqs" exact Component={Faqs} />
                <Route path="/profile" exact element={<ProfileContext><Profile /></ProfileContext>} />
                <Route path="/addproducts" exact Component={AddProduct} />
                <Route path="/products" exact Component={Products} />
              </Routes>
            </SearchBarContext>
          </BrowserRouter>
        </ProductsContext>}
    </NotificationContext>
  </div >
}
export default App;