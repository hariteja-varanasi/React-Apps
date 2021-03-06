const Product = require('../models/product');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');

//Create new product    =>  /api/v1/admin/product/new
exports.newProduct = catchAsyncErrors(
    async (req, res, next) => {     
        
        req.body.user = req.user.id;
        
        const product = await Product.create(req.body);
    
        res.status(201).json({
            success: true,
            product
        });
    }
);

//Get all products      =>  /api/v1/products
exports.getProducts = catchAsyncErrors(
    async (req, res, next) => {

        const resultsPerPage = 9;
        const productsCount = await Product.countDocuments();

        const apiFeatures = new APIFeatures(Product.find(), req.query)
                            .search()
                            .filter()
                            .pagination(resultsPerPage);

         const products = await apiFeatures.query;
         const filteredProductsCount = products.length;

         setTimeout(() => {
             res.status(200).json({
                 success: true,
                 count: products.length,
                 message: 'All products in database.',
                 resultsPerPage,
                 productsCount,
                 filteredProductsCount,
                 products
             })
         }, 1000);

    }
);

//Get Product By ID     =>      /api/v1/product/:id
exports.getSingleProduct = catchAsyncErrors(
    async (req, res, next) => {
        const product = await Product.findById(req.params.id);
    
        if(!product){        
            return next(new ErrorHandler('Product Not Found', 404));
        }
    
        res.status(200).json({
            success: true,
            message: 'Product details',
            product
        })
    }
)

//Update Product    =>      /api/v1/admin/product/:id
exports.updateProduct = catchAsyncErrors(
    async (req, res, next) => {
    
        let product = await Product.findById(req.params.id);
    
        if(!product){
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            })
        }
    
        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });
    
        res.status(200).json({
            success: true,
            message: 'Product Updated.',
            product
        })
    }
);

//Delete Product By ID      =>      /api/v1/admin/product/:id
exports.deleteProduct = catchAsyncErrors(
    async (req,res, next) => {

        let product = await Product.findById(req.params.id);
    
        if(!product){
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            })
        }
    
        await Product.remove();
    
        res.status(200).json({
            success: true,
            message: 'Product Deleted.'
        });
    
    }
);

//Create a new review      =>   /api/v1/review
exports.createProductReview = catchAsyncErrors(
    async (req, res, next) => {
        const { rating, comment, productId } = req.body;

        const review = {
            user: req.user._id,
            name: req.user.name,
            rating: Number(rating),
            comment
        };

        const product = await Product.findById(productId);

        const isReviewed = product.reviews.find(
            r => r.user.toString() === req.user._id.toString()
        );

        if(isReviewed) {
            product.reviews.forEach(review => {
                if(review.user.toString() === req.user._id.toString()) {
                    review.comment = comment;
                    review.rating = rating;
                }
            });
        }
        else {
            product.reviews.push(review);
            product.numOfReviews = product.reviews.length;
        }

        product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

        await product.save({ validateBeforeSave: false });

        res.status(200).json({
            success: true,
            product            
        })
    }
);

//Get All Product Reviews   =>     /api/v1/reviews
exports.getProductReviews = catchAsyncErrors(
    async (req, res, next) => {
        const product = await Product.findById(req.query.id);

        if(!product){
            return next(new ErrorHandler(`Product not found with ID: ${ req.query.id }`, 404));
        }

        const reviews = product.reviews;

        res.status(200).json({
            success: true,
            reviews
        });
    }
);

//Delete a Product Review   =>  /api/v1/reviews
exports.deleteProductReview = catchAsyncErrors(
    async (req, res, next) => {
        const product = await Product.findById(req.query.productId);

        if(!product){
            return next(new ErrorHandler(`Product not found with ID: ${ req.query.productId }`, 404));
        }

        const reviews = product.reviews.filter(review => review._id.toString() !== req.query.reviewId.toString());

        const numOfReviews = reviews.length;

        const ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;

        await Product.findByIdAndUpdate(req.query.productId, {
            reviews,
            ratings, 
            numOfReviews
        }, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });

        res.status(200).json({
            success: true
        })
    }
)