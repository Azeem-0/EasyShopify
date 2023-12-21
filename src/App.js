import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Navigation from "./Components/Navigation/Navigation";
import SearchBarContext from "./Components/ContextApi/SearchBarContext";
import NotificationContext from "./Components/ContextApi/NotificationContext";
import ProductsContext from "./Components/ContextApi/ProductsContext";
import PreLoader from "./Components/utilities/PreLoader";
import AnimatePages from "./Components/utilities/AnimatePages";
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
function App() {
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 1500);
  }, []);
  return <div className="App">
    <NotificationContext>
      {loader ? <PreLoader /> :
        <ProductsContext>
          <BrowserRouter>
            <SearchBarContext>
              <Navigation />
              <AnimatePages />
            </SearchBarContext>
          </BrowserRouter>
        </ProductsContext>}
    </NotificationContext>
  </div >
}
export default App;