import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Navigation from "./Components/Navigation/Navigation";
import SearchBarContext from "./Components/ContextApi/SearchBarContext";
import NotificationContext from "./Components/ContextApi/NotificationContext";
import ProductsContext from "./Components/ContextApi/ProductsContext";
import PreLoader from "./Components/utilities/PreLoader";
import AnimatePages from "./Components/utilities/AnimatePages";
import SocketContext from "./Components/ContextApi/SocketContext";
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import MessagesContext from "./Components/ContextApi/MessagesContext";
import ProfileContext from "./Components/ContextApi/ProfileContext";
function App() {
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 1500);
  }, []);
  return <div className="App">
    <SocketContext>
      <NotificationContext>
        {loader ? <PreLoader /> :
          <ProductsContext>
            <BrowserRouter>
              <SearchBarContext>
                <ProfileContext>
                  <MessagesContext>
                    <Navigation />
                    <AnimatePages />
                  </MessagesContext>
                </ProfileContext>
              </SearchBarContext>
            </BrowserRouter>
          </ProductsContext>
        }
      </NotificationContext>
    </SocketContext>
  </div >
}
export default App;