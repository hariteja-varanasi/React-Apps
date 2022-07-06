import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";

import MetaData from '../layout/MetaData';
import Loader from "../layout/Loader";

const Profile = () => {

    const { user, loading } = useSelector(state => state.auth);

    return (
        <Fragment>
            {loading ?
                <Loader /> : (
                    <Fragment>
                        <MetaData title={"Your Profile"} />

                        <h2 className="display-2 mt-5 mx-5">Your Profile</h2>

                        <div className="row justify-content-around mt-5 user-info">
                            <div className="col-12 col-md-3">
                                <figure className="avatar avatar-profile">
                                    <img className="rounded-circle img-fluid" src={user.avatar.url} alt="" />
                                </figure>
                                <Link to="/me/update" id="edit_profile" className="btn btn-primary btn-block my-5 fs-2">
                                    Edit Profile
                                </Link>
                            </div>

                            <div className="col-12 col-md-5">
                                <h4 className="display-4">Full Name</h4>
                                <p className="fs-2">{user.name}</p>

                                <h4 className="display-4">Email Address</h4>
                                <p className="fs-2">{user.email}</p>

                                <h4 className="display-4">Joined On</h4>
                                <p className="fs-2">{String(user.createdAt).substring(0, 10)}</p>

                                <div className="btn-group">
                                    {user.role !== 'admin'
                                        &&
                                        (
                                            <Link to="/orders/me" className="btn btn-outline-danger btn-block mt-3 mx-3 fs-2">
                                                My Orders
                                            </Link>
                                        )
                                    }

                                    <Link to="/password/update" className="btn btn-outline-primary btn-block mt-3 fs-2">
                                        Change Password
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Fragment>
                )}
        </Fragment>
    );
};

export default Profile;
