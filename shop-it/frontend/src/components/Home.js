import React, {Fragment, useState, useEffect} from 'react';

import '../App.css';

import MetaData from './layout/MetaData';

import {useDispatch, useSelector} from 'react-redux';
import {getProducts} from '../actions/productsActions';
import {Product} from './product/Product';
import {Loader} from './layout/Loader';
import {useAlert} from 'react-alert';
import Pagination from 'react-js-pagination';
import {useParams} from "react-router-dom";
import Slider from "rc-slider";
import 'rc-slider/assets/index.css';


const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);


const Home = () => {

    let [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([1, 1000]);

    const alert = useAlert();
    const dispatch = useDispatch();

    const {loading, products, error, productsCount, resultsPerPage} = useSelector(state => state.products);

    const {keyword} = useParams();

    useEffect(() => {

        if (error) {
            return alert.error(error);
        }

        dispatch(getProducts(keyword, currentPage, price));

    }, [dispatch, alert, error, keyword, currentPage, price]);

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber);
    }

    return (
        <Fragment>
            {loading ? <Loader/> :
                <Fragment>
                    <MetaData title={'Buy Best Products Online'}/>
                    <div className="container-fluid offset-1">
                        <h1 className="display-1">Latest Products</h1>
                        <section id="products" className="container-fluid mt-5">
                            <div className="row">
                                {keyword ? (
                                    <Fragment>
                                        <div className="col-6 col-md-3 mt-5 mb-5">
                                            <div className="px-5">
                                                <Range
                                                    marks={{
                                                        1: `$1`,
                                                        1000: `$1000`
                                                    }}
                                                    min={1}
                                                    max={1000}
                                                    defaultValue={[1, 1000]}
                                                    tipFormatter={value => `$${value}`}
                                                    tipProps={{
                                                        placement: "top",
                                                        visible: true
                                                    }}
                                                    value={price}
                                                    onChange={price => setPrice(price)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-6 col-md-9">
                                            <div className="row">
                                                {
                                                    products.map(product => (
                                                        <Product key={product._id} product={product} col={4}/>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </Fragment>
                                    ) : (
                                    (products.map(product => (
                                        <Product key={product._id} product={product} col={3}/>
                                    )))
                                )}

                            </div>
                        </section>
                    </div>
                    <div className="d-flex justify-content-center mt-5 text-dark fs-3">
                        <Pagination
                            activePage={currentPage}
                            itemsCountPerPage={resultsPerPage}
                            totalItemsCount={productsCount ? productsCount : 0}
                            onChange={setCurrentPageNo}
                            nextPageText={'Next'}
                            prevPageText={'Prev'}
                            firstPageText={'First'}
                            lastPageText={'Last'}
                            itemClass="page-item"
                            linkClass="page-link fs-4 text-dark"
                        />
                    </div>

                </Fragment>
            }
        </Fragment>
    );
}

export default Home