import React, {Fragment, useEffect, useState} from 'react';
import{ Carousel } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails, clearErrors } from "../../actions/productsActions";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import Loader from '../layout/Loader';
import MetaData from "../layout/MetaData";
import { addItemToCart } from "../../actions/cartActions";

export function ProductDetails() {

    let {id} = useParams();

    const alert = useAlert();

    const dispatch = useDispatch();

    const [quantity, setQuantity] = useState(1);

    const {loading, error, product} = useSelector(state => state.productDetails);

    useEffect(() => {
        dispatch(getProductDetails(id));

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, alert, error, id]);

    const decreaseQuantity = () => {
        const count = document.querySelector('.count');
        if(count.valueAsNumber <= 1) {
            return;
        }
        const qty = count.valueAsNumber - 1;
        setQuantity(qty);
    }

    const increaseQuantity = () => {
        const count = document.querySelector('.count');
        if(count.valueAsNumber >= product.stock) {
            return;
        }
        const qty = count.valueAsNumber + 1;
        setQuantity(qty);
    }

    const addToCart = () => {
        dispatch(addItemToCart(id, quantity));
        alert.success("Item added to cart");
    }

    return (
        <Fragment>
            <MetaData title={product.name}/>
            {
                loading ? <Loader/> : (
                    <Fragment>
                        <div className="row f-flex justify-content-around">
                            <div className="col-12 col-lg-5 img-fluid" id="product_image">
                                <Carousel pause='hover'>
                                    {product.images && product.images.map(image => {
                                        return(
                                            <Carousel.Item key={image.public_id}>
                                                <img src={image.url}
                                                     className="d-block w-100"/>
                                            </Carousel.Item>
                                        );
                                    })}
                                </Carousel>
                            </div>

                            <div className="col-12 col-lg-5 mt-5">
                                <h3 className="display-5">{product.name}</h3>
                                <p id="product_id" className="fs-3">Product #{product._id}</p>

                                <hr/>
                                <div className="rating-outer">
                                    <div className="rating-inner" style={
                                        {
                                            width: `${(product.ratings/5) * 100}%`
                                        }}>
                                    </div>
                                </div>

                                <span id="no_of_reviews">{product.numOfReviews}</span>

                                <hr/>

                                <p id="product_price" className="fs-3">${product.price}</p>

                                <div className="stockCounter d-inline">
                                    <span className="btn btn-danger minus fs-3 position-static" onClick={decreaseQuantity}>-</span>

                                    <input
                                        type="number"
                                        className="form-control count d-inline fs-3 my-5"
                                        style={{
                                            width: "4.5rem"
                                        }}
                                        value={quantity}
                                        readOnly
                                    />

                                    <span className="btn btn-primary plus fs-3 my-5" onClick={increaseQuantity}>+</span>
                                </div>
                                <button type="button" id="cart_btn" className="btn btn-primary d-inline mx-3 fs-3" onClick={addToCart}>Add to
                                    Cart
                                </button>

                                <hr/>

                                <p className="fs-3">Status: <span id="stock_status" className={product.stock > 0 ? 'fs-3 greenColor' : 'fs-3 redColor'}>{product.stock > 0 ? 'In Stock' : 'Out of Stock'} </span></p>

                                <hr/>

                                <h4 className="display-5 mt-2">Description: </h4>
                                <p className="fs-3">{product.description}</p>

                                <hr/>

                                <p id="product_seller" className="mb-3 fs-3">Sold By: <strong>{product.seller}</strong></p>

                                <button id="review_btn" type="button" className="btn btn-primary mt-4 fs-3"
                                        data-toggle="modal"
                                        data-target="#ratingModal">
                                    Submit Your Review
                                </button>

                                <div className="row mt-2 mb-5">
                                    <div className="rating w-50">
                                        <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog"
                                             aria-labelledby="ratingModalLabel" aria-hidden="true">
                                            <div className="modal-dialog" role="document">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id="ratingModalLabel">Submit
                                                            Review</h5>
                                                        <button type="button" className="close" data-dismiss="modal"
                                                                aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <ul className="stars">
                                                            <li className="star"><i className="fa fa-star"></i></li>
                                                            <li className="star"><i className="fa fa-star"></i></li>
                                                            <li className="star"><i className="fa fa-star"></i></li>
                                                            <li className="star"><i className="fa fa-star"></i></li>
                                                            <li className="star"><i className="fa fa-star"></i></li>
                                                        </ul>
                                                        <textarea
                                                            name="review"
                                                            id="review" className="form-control mt-3">
                                            </textarea>
                                                        <button
                                                            className="btn my-3 float-right review-btn px-4 text-white"
                                                            data-dismiss="modal" aria-label="Close">Submit
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Fragment>)
            }
        </Fragment>
    );
}

export default ProductDetails;