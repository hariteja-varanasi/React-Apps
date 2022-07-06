import React, { Fragment, useState, useEffect } from 'react';

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {login, clearErrors, register} from "../../actions/userActions";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";

const Register = () => {

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
    });

    const { name, email, password } = user;

    const [avatar, setAvatar] =useState('');
    const [avatarPreview, setAvatarPreview] = useState(`/images/default_avatar.jpg`);

    const alert = useAlert();
    const dispatch = useDispatch();

    const history = useNavigate();

    const { isAuthenticated, error, loading } = useSelector(state => state.auth);

    useEffect(() => {

        if(isAuthenticated) {
            if(error){
                dispatch(clearErrors());
            }
            history('/');
        }

        if(error) {
            alert.error(error);
        }

    }, [dispatch, alert, isAuthenticated, error, history])

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.set('name', name);
        formData.set('email', email);
        formData.set('password', password);
        formData.set('avatar', avatar);

        dispatch(register(formData));
    }

    const onChange = e => {
        if(e.target.name === 'avatar') {

            const reader = new FileReader();

            reader.onload = () => {
                if(reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            }

            reader.readAsDataURL(e.target.files[0]);
        }

        else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    }

    return (
        <Fragment>
            <MetaData title={"Register User"} />
            <div className="row">
                <div className="col-lg-6 offset-3 p-1">
                    <h3 className="m-3 display-3">Register</h3>
                    <div className="lead p-3 m-3">
                        <form onSubmit={submitHandler} encType="multipart/form-data">
                            <div className="form-group fs-3">
                                <label htmlFor="name">Enter Name</label>
                                <input type="text"
                                       className="form-control fs-3 w-50"
                                       placeholder="Enter Name"
                                       name="name"
                                       id="name"
                                       value={name}
                                       onChange={onChange}/>
                            </div>
                            <div className="form-group my-3 fs-3">
                                <label htmlFor="email">Enter Email</label>
                                <input type="email"
                                       className="form-control fs-3 w-50"
                                       placeholder="Enter Email"
                                       name="email"
                                       id="email"
                                       value={email}
                                       onChange={onChange}
                                />
                            </div>
                            <div className="form-group my-3 fs-3" >
                                <label htmlFor="password">Enter Password</label>
                                <input type="password"
                                       className="form-control fs-3 w-50"
                                       name="password"
                                       id="password"
                                       value={password}
                                       onChange={onChange}
                                />
                            </div>
                            <div className="form-group my-3 fs-3">
                                <label htmlFor="avatar_upload" className="fs-3">Avatar</label>
                                <div className="d-flex align-items-center">
                                    <div>
                                        <figure className="avatar item-rtl">
                                            <img
                                                src={avatarPreview}
                                                className="rounded-circle"
                                                alt="Avatar Preview"
                                            />
                                        </figure>
                                    </div>
                                    <div className="d-flex mx-3">
                                        <input
                                            type="file"
                                            name="avatar"
                                            className="btn btn-outline-warning fs-3 w-50"
                                            id="customFile"
                                            accept="images/*"
                                            onChange={onChange}
                                            placeholder="Choose Avatar"
                                        />
                                        <label className="custom-file-label fs-2 mx-5" htmlFor="customFile">
                                            Choose Avatar
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <center>
                                <div className="btn-group my-3 p-3 w-25">
                                    <button
                                        id="register_button"
                                        type="submit"
                                        className="btn btn-warning py-3 fs-2 align-content-between"
                                        disabled={ loading ? true : false }
                                    >
                                        Register
                                    </button>
                                </div>
                            </center>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Register;
