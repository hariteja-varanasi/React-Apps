import React, { Fragment, useEffect, useState } from 'react';

import MetaData from "../layout/MetaData";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {loadUser, clearErrors, updatePassword} from "../../actions/userActions";
import { useNavigate } from "react-router-dom";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";

const UpdatePassword = () => {

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const alert = useAlert();
    const dispatch = useDispatch();
    const history = useNavigate();

    const { user } = useSelector(state => state.auth);
    const { error, isUpdated, loading } = useSelector(state => state.user);

    let passwordMatchFlag = false;

    useEffect(() => {

        if(error) {
            alert.error(error);
        }

        if(isUpdated) {
            dispatch(clearErrors());
            alert.success('Password updated successfully');
            history("/me");
            dispatch({
                type: UPDATE_PASSWORD_RESET
            })
        }

    }, [dispatch, alert, error, history, isUpdated]);

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set("oldPassword", oldPassword);
        formData.set("password", newPassword);

        if(newPassword === confirmPassword){
            dispatch(updatePassword(formData));
        }
        else{
            console.log("user is : ", user);
            passwordMatchFlag = true;
            alert.error("Passwords do not match");
        }
    }

    return (
        <Fragment>
            <MetaData title={"Change Password"} />

            <div className="row justify-content-around mt-5">
                <div className="col-10 col-lg-5">
                    <form onSubmit={submitHandler}>
                        <h1 className="display-1">Update Password</h1>
                        <div className="form-group mt-3">
                            <label htmlFor="old_password_field" className="fs-2">Old Password</label>
                            <input
                                type="password"
                                id="old_password_field"
                                className="form-control fs-3"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="new_password_field" className="fs-3">New Password</label>
                            <input
                                type="password"
                                id="new_password_field"
                                className="form-control fs-3"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="confirm_password_field" className="fs-3">Confirm Password</label>
                            <input
                                type="password"
                                id="confirm_password_field"
                                className="form-control fs-3"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <div className="btn-group text-center">
                            <button type="submit"
                                    className="btn btn-outline-warning btn-block mt-4 mb-3 fs-3"
                                    disabled={loading ? true : false}
                            >
                                Update Password
                            </button>
                            {
                                (passwordMatchFlag &&
                                    <div className="alert alert-danger fs-3">
                                        Passwords do not match
                                    </div>
                                )
                            }
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default UpdatePassword;
