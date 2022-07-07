import React, { Fragment, useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import Loader from '../layout/Loader';
import MetaData from '../layout/MetaData';

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {login, clearErrors, register} from "../../actions/userActions";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const alert = useAlert();
    const dispatch = useDispatch();

    const history = useNavigate();

    const { isAuthenticated, user, error, loading } = useSelector(state => state.auth);

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

        if(user && error) {
            alert.error(error);
        }

    }, [dispatch, alert, isAuthenticated, error, history])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    }

    return (
        <Fragment>
            {
                loading ?
                    <Loader /> :
                    <Fragment>
                        <MetaData title={'Login'} />
                        <div className="row">
                            <div className="col-lg-5 offset-4 border border-dark my-5">
                                <div className="lead border p-3 my-3">
                                    <form onSubmit={submitHandler}>
                                        <center>
                                            <h1 className="display-1">Login</h1>
                                        </center>
                                        <div className="form-group my-3 fs-3">
                                            <label htmlFor="email_field" className="fs-2 my-3">Email</label>
                                            <input
                                                type="email"
                                                id="email_field"
                                                className="form-control fs-2"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group my-3 fs-3">
                                            <label htmlFor="password_field" className="fs-2 my-3">Password</label>
                                            <input
                                                type="password"
                                                id="password_field"
                                                className="form-control fs-2"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <center>
                                                <button
                                                    id="login_button"
                                                    type="submit"
                                                    className="btn btn-outline-warning w-50 p-3 m-3 fs-1"
                                                >Login
                                                </button>
                                            </center>
                                        </div>
                                        <div className="form-group my-3">
                                            <Link to="/password/forgot" className="float-right fs-3 mx-5 text-danger">Forgot Password</Link>
                                            <Link to="/register" className="float-right fs-3 mx-5 text-success">New User?</Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </Fragment>
            }
        </Fragment>
    );
};

export default Login;
