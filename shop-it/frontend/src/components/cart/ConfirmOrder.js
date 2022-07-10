import React, {Fragment, useState} from "react";

import MetaData from "../layout/MetaData";
import {useAlert} from "react-alert";
import {useDispatch, useSelector} from "react-redux";
import {removeItemFromCart, saveShippingInfo} from "../../actions/cartActions";
import {useNavigate, Link} from "react-router-dom";
import CheckoutSteps from "./CheckoutSteps";

const ConfirmOrder = () => {

    const {cartItems, shippingInfo} = useSelector(state => state.cart);
    const {user} = useSelector(state => state.auth);

    //calculate Order Prices
    const itemsPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shippingPrice = itemsPrice > 200 ? 0 : 25;
    const taxPrice = Number((0.05 * itemsPrice).toFixed(2));
    const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);

    const dispatch = useDispatch();

    const history = useNavigate();

    const removeCartItemHandler = (id) => {
        dispatch(removeItemFromCart(id));
    }

    const proceedToPayment = () => {
        const data = {
            itemsPrice: itemsPrice.toFixed(2),
            shippingPrice: shippingPrice,
            taxPrice: taxPrice,
            totalPrice: totalPrice
        }

        sessionStorage.setItem('orderInfo', JSON.stringify(data));
        history("/");
    }

    return (
        <Fragment>
            <MetaData title={"Confirm Order"}/>

            <CheckoutSteps shipping confirmOrder/>

            <div className="row d-flex justify-content-between">
                <div className="col-12 col-lg-8 mt-5 order-confirm">
                    <h4 className="display-4 mb-3">Shipping Info</h4>
                    <p className="fs-3"><b className="fs-3">Name: </b>{user && user.name}</p>
                    <p className="fs-3"><b className="fs-3">Phone: </b>{shippingInfo.phoneNo}</p>
                    <p className="fs-3"><b className="fs-3">Address: </b>{`${shippingInfo.address}, 
                    ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`}</p>
                </div>
            </div>

            <div className="row d-flex justify-content-between">

                <div className="col-8 col-lg-8 col-md-8 col-sm-8">
                    <hr className="w-100"/>
                    <h4 className="display-4 mb-3">Your Cart Items: </h4>

                    {cartItems.map((item, index) => (
                        <Fragment key={index}>
                            <hr/>
                            <div className="cart-item my-1">
                                <div className="row">
                                    <div className="col-12 col-lg-12">
                                        <hr/>
                                        <div className="cart-item">
                                            <div className="row">
                                                <div className="col-2 col-lg-2">
                                                    <img src={item.image} alt={item.name} height="90" width="115"/>
                                                </div>

                                                <div className="col-5 col-lg-5">
                                                    <Link
                                                        className="fs-3"
                                                        to={`/products/${item.product}`}
                                                        style={
                                                            {
                                                                textOverflow: "ellipsis"
                                                            }
                                                        }
                                                    >
                                                        {item.name}
                                                    </Link>
                                                </div>

                                                <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                                                    <p id="card_item_price" className="fs-3">${item.quantity} x ${item.price} = <b>${item.quantity * item.price}</b></p>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr/>
                        </Fragment>
                    ))}
                </div>

                <div className="col-4 col-lg-4 my-4">
                    <div id="order_summary">
                        <h3 className="display-3">Order Summary</h3>
                        <hr/>
                        <p className="fs-3">Subtotal: <span className="order-summary-values fs-3">${itemsPrice}</span></p>
                        <p className="fs-3">Shipping: <span className="order-summary-values fs-3">${shippingPrice}</span></p>
                        <p className="fs-3">Tax: <span className="order-summary-values fs-3">${taxPrice}</span></p>
                        <hr />

                        <p className="fs-3">Total: <span className="order-summary-values fs-3">${totalPrice}</span></p>

                        <hr/>
                        <div className="btn-group">
                            <button id="checkout_btn" className="btn btn-primary btn-block fs-3"
                                    onClick={proceedToPayment}>Proceed to Payment
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default ConfirmOrder;
