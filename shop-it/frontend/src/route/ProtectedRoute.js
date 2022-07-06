import React, { Fragment } from 'react'
import {Navigate} from 'react-router-dom';
import {useSelector} from "react-redux";

const ProtectedRoute = ({children}) => {
    const { user, isAuthenticated, ...state } = useSelector(state => state.auth);

    if (!isAuthenticated) {
        return <Navigate to="/login" exact />;
    }
    return children;
};

export default ProtectedRoute;