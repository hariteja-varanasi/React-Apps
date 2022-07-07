import { useEffect } from 'react';
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

function App() {

    useEffect(() => {
        store.dispatch(loadUser());
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
               </Routes>
               <Footer />
           </div>
       </div>
     </BrowserRouter>
  );
}

export default App;
