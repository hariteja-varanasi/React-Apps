import React, { Fragment } from 'react';
import '../../App.css';

const header = () => {
  return (
    <Fragment>
        <nav className="navbar row">
            <div className="col-12 col-md-3">
                <div className="navbar-brand">
                    <img src="/images/shopit_logo.png" alt="" />
                </div>
            </div>

            <div className="col-12 col-md-6 mt-2mt-md-0">
                <div className="input-group">
                    <input 
                        type="text" 
                        id="search_field" 
                        className="form-control fs-4"
                        placeholder="Enter Product Name ..." />
                    <div className="input-group-append">
                        <button id="search_btn" className="btn">
                            <i className="fa fa-search" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
            </div>

            <div className="col-12 col-md-3 mt-4mt-md-0 text-center">
                <button className="btn fs-3 mx-3" id="login_btn">Login</button>
                
                <span id="cart" className="px-3 fs-3 my-3">Cart</span>
                <span className="fs-3 p-3" id="cart_count">2</span>
            </div>
        </nav>
    </Fragment>
  );
}

export default header;