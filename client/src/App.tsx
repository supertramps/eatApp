import React, { useState, useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import { db } from "./firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import Hero from "./components/hero/Hero";
import Login from "./components/login/Login";
import RestaurantMenu from "./components/restaurantMenu/Menu";
import Cart from "./components/cart/Cart";
import CreateUser from "./components/login/CreateUser";
import Checkout from "./components/checkout/Checkout";
import CartProvider from "./context/CartContext";
import MenuProvider from "./context/MenusContext";
import OrderProvider from "./context/OrdersContext";
import { UserAuthContext } from "./context/UsersContext";
import UserPage from "./components/users/UserPage";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";


function App() {
  const { loggedIn, userID } = useContext(UserAuthContext);
  const [restaurantId, setRestarauntId] = useState<string>("J87KKq1W7PW2tK75e1NGDJdd5GK2")

  const theme = createTheme({
    palette: {
      primary: {
        main: "#75A0F5",
        light: "#FFF",
      },
      secondary: {
        main: "#E33E7F",
      },
    },
  });

  useEffect(() => {
    console.log(loggedIn);
    console.log(userID);
  },[]) 

 return (
   <OrderProvider>
      <CartProvider>
        <MenuProvider>
          <Router>
            <Routes>
                <Route path="/" element={<Hero/>}/>
                <Route path="/login" element={<Login/>} />
                <Route path="/create-user" element={<CreateUser/>}/>
                <Route path="/menu/:id" element={<RestaurantMenu/>}/>
                <Route path={`/user/${userID}`} element={<UserPage/>}/>
                <Route path="/checkout" element={<Checkout/>}/>
            </Routes>
          </Router>
        </MenuProvider>
      </CartProvider>
    </OrderProvider>
  );  
}


export default App;

