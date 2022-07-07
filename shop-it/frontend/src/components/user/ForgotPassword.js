import React, {Fragment, useEffect, useState} from 'react';

import MetaData from "../layout/MetaData";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {loadUser, clearErrors, updatePassword, forgotPassword} from "../../actions/userActions";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {

    const [email, setEmail] = useState('');

    const alert = useAlert();
    const dispatch = useDispatch();

    const { error, message, loading } = useSelector(state => state.forgotPassword);

    useEffect(() => {

        if(error) {
            alert.error(error);
        }

        if(message) {
            alert.success(message);
        }

    }, [dispatch, alert, error, message]);

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set("email", email);

        dispatch(forgotPassword(formData));
    }

    return (
        <Fragment>
            <MetaData title={"Forgot Password"} />

            <div className="row justify-content-around wrapper">
                <div className="col-10 col-lg-5">
                    <form onSubmit={submitHandler}>
                        <h1 className="display-1">Forgot Password</h1>
                        <div className="form-group mt-5">
                            <label htmlFor="email_field" className="fs-3">Enter Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control mt-3 fs-3"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="btn-group text-center mt-3">
                            <button
                                id="forgot_password_button"
                                type="submit"
                                className="btn btn-outline-warning btn-block fs-3"
                                disabled={loading ? true : false}
                            >
                                Send Email
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default ForgotPassword;
