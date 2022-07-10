import React, {Fragment, useEffect, useState} from 'react';
import MetaData from "../layout/MetaData";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {resetPassword, clearErrors, updatePassword} from "../../actions/userActions";
import {useNavigate, useParams} from "react-router-dom";

const NewPassword = () => {

    let {token} = useParams();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const alert = useAlert();
    const dispatch = useDispatch();
    const history = useNavigate();

    const { error, loading, success } = useSelector(state => state.forgotPassword);

    useEffect(() => {

        if(error) {
            alert.error(error);
        }

        if(success) {
            console.log("inside success");
            alert.success("Password updated successfully.");
            history("/login");
        }

    }, [dispatch, alert, error, success, history]);

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set("password", password);
        formData.set("confirmPassword", confirmPassword);

        if(password === confirmPassword){
            dispatch(resetPassword(token, formData));
        }
        else{
            alert.error("Passwords do not match");
        }
    }

    return (
        <Fragment>
            <MetaData title={"Reset Password"} />
            <div className="row wrapper">
                <div className="col-10 col-lg-6">
                    <form onSubmit={submitHandler}>
                        <h1 className="display-1 mb-3">New Password</h1>
                        <div className="form-group">
                            <label htmlFor="password_field" className="fs-3">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control fs-3"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirm_password_field" className="fs-3">Confirm Password</label>
                            <input
                                type="password"
                                id="confirm_password_field"
                                className="form-control fs-3"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <div className="btn-group">
                            <button type="submit" className="btn btn-outline-primary fs-3 btn-block" disabled={loading ? true : false}>Reset Password</button>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default NewPassword;
