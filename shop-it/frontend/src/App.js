import {useEffect, useState} from 'react';
import {Provider, useSelector} from 'react-redux';
import {BrowserRouter as Router, Routes, Route, BrowserRouter} from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import ProductDetails from "./components/product/ProductDetails";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import ProtectedRoute from "./route/ProtectedRoute";

import { loadUser } from "./actions/userActions";
import store from './store/store';
import Profile from "./components/user/Profile";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import NewPassword from "./components/user/NewPassword";
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import axios from "axios";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import Payment from "./components/cart/Payment";
import OrderSuccess from "./components/cart/OrderSuccess";

function App() {

    const [stripeAPIKey, setStripeAPIKey] = useState('');

    useEffect(() => {
        store.dispatch(loadUser());

        async function getStripeAPIKey() {
            const { data } = await axios.get(`/api/v1/stripeapi`);
            setStripeAPIKey(data.stripeAPIKey);
        }
        getStripeAPIKey();
    }, [])

  return (
     <BrowserRouter>
       <div className="App">
           <div className="container-fluid">
               <Header />
               <Routes>
                   <Route path="/" element={<Home />} exact />
                   <Route path="/search/:keyword" element={<Home />} exact />
                   <Route path="/product/:id" element={<ProductDetails />} exact />
                   <Route path="/login" element={<Login />} exact />
                   <Route path="/register" element={<Register />} exact />
                   {/*<Route*/}
                   {/*    path="/me"*/}
                   {/*    element={*/}
                   {/*        <ProtectedRoute>*/}
                   {/*            <Profile />*/}
                   {/*        </ProtectedRoute>*/}
                   {/*    }*/}
                   {/*    exact*/}
                   {/*/>*/}

                   <Route
                       path="/me"
                       element={
                           <ProtectedRoute>
                               <Profile />
                           </ProtectedRoute>
                       } exact
                   />
                   <Route
                       path="/me/update"
                       element={
                           <ProtectedRoute>
                               <UpdateProfile />
                           </ProtectedRoute>
                       } exact
                   />
                   <Route
                       path="/password/update"
                       element={
                           <ProtectedRoute>
                               <UpdatePassword />
                           </ProtectedRoute>
                       } exact
                   />
                   <Route
                       path="/password/forgot"
                       element={<ForgotPassword />} exact
                   />
                   <Route
                       path="/password/reset/:token"
                       element={<NewPassword />} exact
                   />
                   <Route
                       path="/cart"
                       element={<Cart />} exact
                   />
                   <Route
                       path="/shipping"
                       element={
                           <ProtectedRoute>
                               <Shipping />
                           </ProtectedRoute>
                       } exact
                   />
                   <Route
                       path="/order/confirm"
                       element={
                           <ProtectedRoute>
                               <ConfirmOrder />
                           </ProtectedRoute>
                       } exact
                   />
                   <Route
                       path="/payment"
                       element={stripeAPIKey &&
                    <Elements stripe={loadStripe(stripeAPIKey)}>
                        <ProtectedRoute>
                            <Payment />
                        </ProtectedRoute>
                    </Elements>} exact />
                   <Route
                       path="/success"
                       element={
                           <ProtectedRoute>
                               <OrderSuccess />
                           </ProtectedRoute>
                       } exact
                   />
               </Routes>
               <Footer />
           </div>
       </div>
     </BrowserRouter>
  );
}

export default App;
