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

const Home = () => {

    let [currentPage, setCurrentPage] = useState(1);

    const alert = useAlert();
    const dispatch = useDispatch();

    const {loading, products, error, productsCount, resultsPerPage} = useSelector(state => state.products);

    const {keyword} = useParams();

    useEffect(() => {

        if (error) {
            return alert.error(error);
        }

        dispatch(getProducts(keyword, currentPage));

    }, [dispatch, alert, error, keyword, currentPage]);

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
                                {products && products.length > 0 && products.map(product => {
                                    return (<Product key={product._id} product={product}/>)
                                })}
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