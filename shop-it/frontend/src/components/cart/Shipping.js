import React, { Fragment, useState } from "react";

import MetaData from "../layout/MetaData";

import { countries } from "countries-list";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../actions/cartActions";
import {useNavigate} from "react-router-dom";
import CheckoutSteps from "./CheckoutSteps";

const Shipping = () => {

    const { shippingInfo } = useSelector(state => state.cart);

    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city);
    const [postalCode, setPostalCode] = useState(shippingInfo.postalCode);
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
    const [country, setCountry] = useState(shippingInfo.country);

    //const countries = ["India", "USA", "China", "Russia", "Germany", "Japan", "Australia", "Canada", "Nepal"];
    const countryList = Object.values(countries);

    const dispatch = useDispatch();

    const history = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();

        const data = {address, city, phoneNo, postalCode, country};

        dispatch(saveShippingInfo(data));
        history("/order/confirm");

    }

    return (
        <Fragment>
            <MetaData title={"Shipping Info"} />

            <CheckoutSteps shipping />

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form onSubmit={submitHandler}>
                        <h1 className="display-1 mb-4">Shipping Info</h1>
                        <div className="form-group my-3">
                            <label htmlFor="address_field" className="fs-3">Address</label>
                            <input
                                type="text"
                                id="address_field"
                                className="form-control fs-3"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group my-3">
                            <label htmlFor="city_field" className="fs-3">City</label>
                            <input
                                type="text"
                                id="city_field"
                                className="form-control fs-3"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group my-3">
                            <label htmlFor="phone_field" className="fs-3">Phone No</label>
                            <input
                                type="tel"
                                id="phone_field"
                                className="form-control fs-3"
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                                pattern="^((\\+91|0)?[6-9][0-9]{9})"
                                required
                            />
                        </div>
                        <div className="form-group my-3">
                            <label htmlFor="postal_code_field" className="fs-3">Postal Code</label>
                            <input
                                type="text"
                                id="postal_code_field"
                                className="form-control fs-3"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                pattern={"[1-9][0-9]{5}"}
                                required
                            />
                        </div>
                        <div className="form-group my-3">
                            <label htmlFor="country_field" className="fs-3">Country</label>
                            <select
                                id="country_field"
                                className="form-control form-select fs-3"
                                value={country}
                                required
                                onChange={(e) => setCountry(e.target.value)}
                            >
                                {countryList.map((item, index) => {
                                    return (<option className="form-control fs-3" key={index} value={item.name}>
                                        {item.name}
                                    </option>)
                                })}
                            </select>
                        </div>

                        <div className="btn-group my-3">
                            <button
                                id="shipping_btn"
                                type="submit"
                                className="btn btn-outline-warning btn-block fs-3"
                            >
                                CONTINUE
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default Shipping;
