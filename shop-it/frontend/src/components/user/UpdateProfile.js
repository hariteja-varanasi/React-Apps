import React, {Fragment, useEffect, useState} from 'react';

import MetaData from "../layout/MetaData";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {updateProfile, loadUser, clearErrors, register} from "../../actions/userActions";
import {useNavigate} from "react-router-dom";
import {UPDATE_PROFILE_RESET} from "../../constants/userConstants";

const UpdateProfile = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const [avatar, setAvatar] =useState('');
    const [avatarPreview, setAvatarPreview] = useState(`/images/default_avatar.jpg`);

    const alert = useAlert();
    const dispatch = useDispatch();

    const { user } = useSelector(state => state.auth);
    const { error, isUpdated, loading } = useSelector(state => state.user);

    const history = useNavigate();

    useEffect(() => {

        if(user) {
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url);
        }

        if(isUpdated) {
            alert.success("User updated successfully.");
            dispatch(loadUser());
            history("/me");
            dispatch({
                type: UPDATE_PROFILE_RESET
            })
        }

        if(error) {
            alert.error(error);
        }

    }, [dispatch, alert, error, history, isUpdated])

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.set('name', name);
        formData.set('email', email);
        formData.set('avatar', avatar);
        dispatch(updateProfile(formData));
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
    }

    return (
        <Fragment>
            <MetaData title={"Update Profile"} />

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form encType="multipart/form-data" onSubmit={submitHandler}>
                        <h1 className="display-1">Update Profile</h1>
                        <div className="form-group m-3 p-3">
                            <label htmlFor="name_field" className="fs-3 my-3">Name</label>
                            <input
                                type="text"
                                id="name_field"
                                className="form-control fs-3"
                                name="name_field"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="form-group m-3 p-3">
                            <label htmlFor="email_field" className="fs-3 my-3">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control fs-3"
                                name="email_field"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="form-group m-3 p-3">
                            <label htmlFor="avatar_upload" className="fs-3 my-3">Avatar</label>
                            <div className="d-flex align-items-center">
                                <div>
                                    <figure className="avatar m-3 item-rtl">
                                        <img
                                            src={avatarPreview}
                                            className="rounded-circle fs-3"
                                            alt="Avatar Preview" />
                                    </figure>
                                </div>
                                <div className="custom-file">
                                    <input
                                        type="file"
                                        name="avatar"
                                        className="custom-file-input fs-3"
                                        id="customFile"
                                        accept="images/*"
                                        onChange={onChange}
                                    />
                                    <label className="custom-file-label fs-3" htmlFor="customFile">
                                        Choose Avatar
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="btn-group m-3 p-3">
                            <button
                                type="submit"
                                className="btn btn-outline-warning btn-block mt-4 mb-3 fs-2"
                                disabled={loading ? true : false}
                            >
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default UpdateProfile;
