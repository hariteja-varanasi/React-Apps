import React, {Fragment, useEffect, useState} from "react";

import MetaData from "../layout/MetaData";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";
import CheckoutSteps from "./CheckoutSteps";
import {createOrder, clearErrors} from "../../actions/orderActions";

import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";
import axios from "axios";

const options = {
    style: {
        base: {
            fontSize: '27px'
        },
        invalid: {
            color: '#9e2146'
        }
    }
}

const Payment = () => {

    const alert = useAlert();
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();
    const history = useNavigate();

    const { user } = useSelector(state => state.auth);
    const{ cartItems, shippingInfo } = useSelector(state => state.cart);
    const { error } = useSelector(state => state.newOrder);

    useEffect(() => {

        if(error){
            alert.error(error)
        }

    }, [dispatch, alert, error])

    const order = {
        orderItems: cartItems,
        shippingInfo
    }

    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));

    if(orderInfo) {
        order.itemsPrice = orderInfo.itemsPrice;
        order.shippingPrice = orderInfo.shippingPrice;
        order.taxPrice = orderInfo.taxPrice;
        order.totalPrice = orderInfo.totalPrice;
    }

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100)
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        document.querySelector(`#pay_btn`).disabled = true;

        let result;
        const apiKey = stripe && stripe._apiKey;

        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                }
            }

            result = await axios.post(`/api/v1/payment/process`, paymentData, config);

            const clientSecret = result.data.client_secret;

            if(!stripe || !elements) {
                return;
            }

            const response = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email
                    }
                }
            });

            if(response.error) {
                alert.error(response.error.message);
                document.querySelector("#pay_btn").disabled = false;
            }
            else{
                //The payment is  processed or not
                if(response.paymentIntent.status === "succeeded") {
                    order.paymentInfo = {
                        id: response.paymentIntent.id,
                        status: response.paymentIntent.status
                    }

                    dispatch(createOrder(order));

                    history("/success");
                }
                else {
                    alert.error("There is some issue while payment processing.");
                }
            }
        }
        catch (error) {
            document.querySelector("#pay_btn").disabled = false;
            alert.error(error.response.data.errMessage);
        }
    }

    return (
        <Fragment>
            <MetaData title={"Payment"} />

            <CheckoutSteps shipping confirmOrder payment />
            <div className="row wrapper">
                <div className="col-6 col-lg-6">
                    <form onSubmit={submitHandler}>
                        <h1 className="display-1 mb-4">Card Info</h1>
                        <div className="form-group my-3">
                            <label htmlFor="card_num_field" className="fs-3">Card Number</label>
                            <CardNumberElement
                                type="text"
                                id="card_num_field"
                                className="form-control fs-3"
                                options={options}
                            />
                        </div>
                        <div className="form-group my-3">
                            <label htmlFor="card_exp_field" className="fs-3">Card Expiry</label>
                            <CardExpiryElement
                                type="text"
                                id="card_exp_field"
                                className="form-control fs-3"
                                options={options}
                            />
                        </div>
                        <div className="form-group my-3">
                            <label htmlFor="card_cvc_field" className="fs-3">CVC</label>
                            <CardCvcElement
                                type="text"
                                id="card_cvc_field"
                                className="form-control fs-3"
                                options={options}
                            />
                        </div>
                        <div className="form-group text-center">
                            <button
                                id="pay_btn"
                                type="submit"
                                className="btn btn-outline-warning btn-block fs-2 w-75 h-auto p-4"
                            >
                                Pay {` - ${orderInfo && orderInfo.totalPrice}`}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default Payment;
