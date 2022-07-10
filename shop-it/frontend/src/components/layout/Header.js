import React, {Fragment} from 'react';
import '../../App.css';
import { Link } from 'react-router-dom';
import  Search from "./Search";

import { logout } from "../../actions/userActions";

import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {Dropdown} from "react-bootstrap";


const Header = () => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { user, loading } = useSelector(state => state.auth);

    const { cartItems } = useSelector(state => state.cart);

    const logoutHandler = () => {
        dispatch(logout());
        alert.success("User Logged Out Successfully.");
    }

    return (
        <Fragment>
            <nav className="navbar row">
                <div className="col-3 col-lg-3 col-md-3 col-sm-3">
                    <div className="navbar-brand">
                        <Link to="/">
                            <img className="img-fluid" src="/images/shopit_logo.png" alt=""/>
                        </Link>
                    </div>
                </div>

                <div className="col-6 col-lg-6 col-md-6 col-sm-6 mt-2mt-md-0">
                    <Search />
                </div>

                <div className="col-3 col-lg-3 col-md-3 col-sm-3 mt-4 mt-md-0 text-center">

                    <Link to="/cart" style={{
                        textDecoration: 'none',
                        marginLeft: '10rem'
                    }}>
                        <span id="cart" className="btn fs-3">Cart</span>
                        <span className="btn fs-3 rounded-pill" id="cart_count">{cartItems.length}</span>
                    </Link>

                    {
                        user ?
                            (
                                <Dropdown id="userIdDropdown" className="d-inline float-end" style={{
                                    textDecoration : 'none'
                                }}>
                                    <Dropdown.Toggle variant="none" id="dropdown-basic">
                                        <figure className="avatar avatar-nav">
                                            <img
                                                src={user.avatar && user.avatar.url}
                                                alt={user && user.name}
                                                className="rounded-circle"
                                            />
                                        </figure>
                                        <span id="user_name" className="fs-4">{user && user.name}</span>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        {
                                            user && user.role !== 'admin' ?
                                                (
                                                    <Dropdown.Item>
                                                        <Link className="dropdown-item fs-3" to="/orders/me">
                                                            Orders
                                                        </Link>
                                                    </Dropdown.Item>
                                                ) :
                                                (
                                                    <Dropdown.Item>
                                                        <Link className="dropdown-item fs-3" to="/dashboard">
                                                            Dashboard
                                                        </Link>
                                                    </Dropdown.Item>

                                                )
                                        }
                                        <Dropdown.Item>
                                            <Link className="dropdown-item fs-3" to="/me">
                                                Profile
                                            </Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                            <Link
                                                className="dropdown-item text-danger fs-3"
                                                to="/" onClick={logoutHandler}
                                            >
                                                Logout
                                            </Link>
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            )
                            :
                            (
                                !loading && <Link to="/login" className="btn fs-3 mx-3" id="login_btn">Login</Link>
                            )
                    }
                </div>
            </nav>
        </Fragment>
    );
}

export default Header;