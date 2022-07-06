import React from 'react';
import {Link} from "react-router-dom";

export function Product({product, col}) {
    return (
        <div className={`col-sm-12 col-md-6 col-lg-${col} offset-lg-3 p-3 m-3 bg-light`}>
            <div className="card p-3 m-3 rounded h-100">
                <img src={product.images[0].url} alt="" className="img-fluid" />
                <div className="card-body d-flex flex-column">
                    <div className="mt-auto align-bottom fs-3">
                        <Link to={`/product/${product._id}`} id="product_name">{product.name}</Link>
                    </div>
                    <div className="ratings">
                        <div className="rating-outer">
                            <div className="rating-inner" style={
                                {
                                    width: `${(product.ratings/5) * 100}%`,
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