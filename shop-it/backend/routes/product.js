const express = require('express');
const app = require('../app');
const router = express.Router();

const { 
    getProducts, 
    newProduct, 
    getSingleProduct, 
    updateProduct, 
    deleteProduct, 
    createProductReview,
    getProductReviews,
    deleteProductReview 
    } = require('../controllers/productController');

const { addHeaders } = require('../utils/addHeaders');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

//router.route('/products').get(isAuthenticatedUser, authorizeRoles('admin'), getProducts);

router.route('/products').get(getProducts);

router.route('/product/:id').get(getSingleProduct);

router.route('/admin/product/new').post(isAuthenticatedUser, authorizeRoles('admin'), newProduct);

router.route('/admin/product/:id')
                                .put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct)
                                .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);

router.route('/review').put(isAuthenticatedUser, createProductReview);
router.route('/reviews').get(isAuthenticatedUser, getProductReviews)
                        .delete(isAuthenticatedUser, deleteProductReview);


module.exports = router;