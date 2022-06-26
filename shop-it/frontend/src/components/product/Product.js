import React from 'react';
import {Link} from "react-router-dom";

export function Product({product}) {
    return (
        <div className="col-sm-12 col-md-6 col-lg-2 offset-lg-3 p-3 m-3 bg-light">
            <div className="card p-3 rounded">
                <img src={product.images[0].url} alt="" className="card-img-top mx-auto" />
                <div className="card-body d-flex flex-column">
                    <h5>
                        <Link to={`/product/${product._id}`}>{product.name}</Link>
                    </h5>
                    <div className="ratings mt-auto">
                        <div className="rating-outer">
                            <div className="rating-inner" style={
                                {
                                    width: `${(product.ratings/5) * 100}%`
                                }}>
                            </div>
                        </div>
                        <span id="no_of_reviews" className="fs-6">({product.numOfReviews})</span>
                    </div>
                    <p className="card-text fs-4">${product.price}</p>
                    <Link to={`/product/${product._id}`} id="view_btn" className="btn btn-block fs-4">View Details</Link>
                </div>
            </div>
        </div>
    )
}

export default Product;