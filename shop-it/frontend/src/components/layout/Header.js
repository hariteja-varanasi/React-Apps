import React, {Fragment, useState} from 'react';
import '../../App.css';
import {Route, Routes, BrowserRouter, useHistory, Link} from 'react-router-dom';
import Search from "./Search";
import Home from "../Home";

const header = () => {

    return (
        <Fragment>
            <nav className="navbar row">
                <div className="col-12 col-md-3">
                    <div className="navbar-brand">
                        <Link to="/">
                            <img className="img-fluid" src="/images/shopit_logo.png" alt=""/>
                        </Link>
                    </div>
                </div>

                <div className="col-12 col-md-6 mt-2mt-md-0">
                    <Search />
                </div>

                <div className="col-12 col-md-3 mt-4mt-md-0 text-center">
                    <Link to="/login" className="btn fs-3 mx-3" id="login_btn">Login</Link>

                    <span id="cart" className="px-3 fs-3 my-3">Cart</span>
                    <span className="btn fs-3 mx-3" id="cart_count">2</span>
                </div>
            </nav>
        </Fragment>
    );
}

export default header;