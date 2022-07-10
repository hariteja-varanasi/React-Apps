import React, { Fragment } from 'react';
import {Link, useNavigate} from 'react-router-dom';

import MetaData from "../layout/MetaData";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, removeItemFromCart } from "../../actions/cartActions";

const Cart = () => {

    const alert = useAlert();

    const dispatch = useDispatch();

    const history = useNavigate();

    const { cartItems } = useSelector(state => state.cart);

    console.log("cart items is : ", cartItems);

    let totalPrice = 0;

    const decreaseQuantity = (id, quantity) => {
        const newQty = quantity - 1;
        if(newQty < 1) {
            return;
        }
        dispatch(addItemToCart(id, newQty));
    }

    const increaseQuantity = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if(newQty >= stock) {
            return;
        }
        dispatch(addItemToCart(id, newQty));
    }

    const removeCartItemHandler = (id) => {
        dispatch(removeItemFromCart(id));
    }

    const calcTotalPrice = () => {
        if(cartItems.length > 0) {
            cartItems.forEach(item => {
                totalPrice = totalPrice + item.price;
            })
            return totalPrice;
        }
        else {
            return 0;
        }
    }

    const checkoutHandler = () => {
        history("/login?redirect=shipping")
    }

    return (
        <Fragment>
            {cartItems.length === 0
                ?
                    <h2 className="display-2 mt-5">Your cart is Empty</h2>
                :
                (
                    <Fragment>
                        <MetaData title={"Cart Summary"} />
                        <h2 className="display-2 my-5">Your cart: <b>{cartItems.length} items</b></h2>
                        <div className="row d-flex justify-content-center">
                            <div className="col-8 col-lg-8">
                                {cartItems.map((item, index) => (
                                    <Fragment key={index}>
                                        <hr />
                                        <div className="cart-item">
                                            <div className="row">
                                                <div className="col-1 col-lg-1">
                                                    <img src={item.image} alt={item.name} height="90" width="115" />
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

                                                <div className="col-1 col-lg-1 mt-4 mt-lg-0">
                                                    <p id="card_item_price" className="fs-3">${item.price}</p>
                                                </div>

                                                <div className="col mt-4 mt-lg-0">
                                                    <div className="stockCounter d-inline">
                                                        <span className="btn btn-danger minus fs-3" onClick={() => decreaseQuantity(item.product, item.quantity)}>-</span>
                                                        <input type="number" className="form-control count d-inline fs-3" value={item.quantity} readOnly />
                                                        <span className="btn btn-primary plus fs-3" onClick={() => increaseQuantity(item.product, item.quantity, item.stock)}>+</span>
                                                    </div>
                                                </div>

                                                <div className="col-1 col-lg-1">
                                                    <i
                                                        id="delete_cart_item"
                                                        className="fa fa-5x fa-trash btn btn-danger float-start"
                                                        style={
                                                            {
                                                                fontSize: "50px"
                                                            }
                                                        }
                                                        onClick={() => removeCartItemHandler(item.product)}
                                                    >
                                                    </i>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                    </Fragment>
                                ))}
                            </div>

                            <div className="col-4 col-lg-3 my-4">
                                <div id="order_summary">
                                    <h3 className="display-3">Order Summary</h3>
                                    <hr />
                                    <p className="fs-3">Subtotal: <span className="order-summary-values fs-3">
                                        {
                                            cartItems.reduce((sum, item) => (sum + Number(item.quantity)), 0)
                                        } (Units)</span></p>
                                    <p className="fs-3">Est. Total: <span className="order-summary-values fs-3">${
                                        cartItems.reduce((sum, item) => (sum + Number(item.quantity * item.price)), 0).toFixed(2)
                                    }</span></p>
                                    <hr />
                                    <div className="btn-group">
                                        <button id="checkout_btn" className="btn btn-primary btn-block fs-3" onClick={checkoutHandler}>Check Out</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Fragment>
                )}
            <div>
            </div>
        </Fragment>
    );
};

export default Cart;
