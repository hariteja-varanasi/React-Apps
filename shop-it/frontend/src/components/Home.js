import React, { Fragment, useEffect } from 'react';

import '../App.css';

import MetaData from './layout/MetaData';

import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../actions/productsActions';


const Home = () => {
    const dispatch = useDispatch();

    const { loading, products, error, productsCount } = useSelector(state => state.products);

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    let productsTemp = [];

    if(products.length > 0){
        productsTemp = products;
        console.log(productsTemp);
    }
   
    /*console.log('Products : ');
    console.log(products);*/
    
  return (
      <div className="container container-fluid">
          <h1 className="display-1">Latest Products</h1>
            <section id="products" className="container mt-5">
                <div className="row">
                    {products && products.length>0 && products.map(product => {
                        //  <div className="col-sm-12 col-md-6 col-lg-3 p-3 m-3 bg-light">
                        //     <div className="card p-3 rounded">
                        //         <img src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg" alt="" className="card-img-top mx-auto" />
                        //         <div className="card-body d-flex flex-column">
                        //             <h5 className="display-5">
                        //                 <a href="">Test Name</a>
                        //             </h5>
                        //             <div className="ratings my-2">
                        //                 <i className="fa fa-star fs-3"></i>
                        //                 <i className="fa fa-star fs-3"></i>
                        //                 <i className="fa fa-star fs-3"></i>
                        //                 <i className="fa fa-star fs-3"></i>
                        //                 <i className="fa fa-star fs-3"></i>
                        //                 <span id="no_of_reviews" className="fs-6">(5 Reviews)</span>
                        //             </div>
                        //             <p className="card-text fs-4">$125.57</p>
                        //             <a href="" id="view_btn" className="btn btn-block fs-4">View Details</a>
                        //         </div>
                        //     </div>
                        // </div>
                        <p className="fs-3">Test Para</p>
                    })}
                    <p className="fs-3">Test Para</p>
                </div>
            </section>
      </div>
  );
}

export default Home