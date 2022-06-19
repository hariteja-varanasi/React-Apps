const User = require('../models/user');
const Order = require('../models/order');
const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwttoken');

//Get All Users     =>      /api/v1/admin/users
exports.getAllUsers = catchAsyncErrors(
    async (req, res, next) => {
        const users = await User.find();
        
        res.status(200).json({
            success: true,
            users
        });
    }
);

//Get User Details      =>      /api/v1/admin/user/:id
exports.getUserDetails = catchAsyncErrors(
    async (req, res, next) => {
        const user = await User.findById(req.params.id);

        if(!user) {
            return next(new ErrorHandler(`User Not Found with ${ req.params.id }`, 404));
        }

        res.status(200).json({
            success: true,
            user
        });
    }
);

//Get User By Email     =>      /api/v1/admin/user/email
exports.getUserByEmail = catchAsyncErrors(
    async (req, res, next) => {
        const email = req.body.email;        
        const user = await User.findOne({ email });

        if(!user) {
            return next(new ErrorHandler(`User Not Found with ${ email }`, 404));
        }

        res.status(200).json({
            success: true,
            user
        });
    }
);

//Update User Profile => /api/v1/admin/user/:id
exports.updateUser = catchAsyncErrors(
    async (req, res, next) => {
        const newUserData = {
            name: req.body.name,
            email: req.body.email,
            role: req.body.role
        };
        
        const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });

        res.status(200).json({
            success: true,
            user
        });
    }
);

//Delete User By ID     =>      /api/v1/admin/delete/user/:id
exports.deleteUser = catchAsyncErrors(
    async (req, res, next) => {
        const user = await User.findById(req.params.id);

        if(!user){
            return next(new ErrorHandler(`User not found with id: ${ req.params.id }`, 404));
        }

        await user.remove();

        res.status(200).json({
            success: true,
            message: `User with ${ req.params.id } successfully deleted.`
        });
    }
);

//Get All Orders      =>      /api/v1/admin/orders
exports.getAllOrders = catchAsyncErrors(
    async (req, res, next) => {
        const orders = await Order.find();

        let totalAmount = 0;

        orders.forEach(order => {
            totalAmount += order.totalPrice;
        });

        res.status(200).json({
            success: true,            
            orders,
            "Total Amount" : totalAmount
        });
    }
);

//Update or Process order      =>   api/v1/admin/order/:id
exports.processOrder = catchAsyncErrors(
    async (req, res, next) => {
        const order = await Order.findById(req.params.id);

        if(!order){
            return next(new ErrorHandler(`Order not found with ID: ${ req.params.id }`, 404));
        }

        if(!(order.orderStatus === undefined)){
            if(order.orderStatus.trim() === 'Delivered'){
                return next(new ErrorHandler(`You have already delivered this order`, 400));
            }
            if(order.orderStatus.trim() === 'Archived'){
                return next(new ErrorHandler(`Order not found with ID: ${ req.params.id }`, 404));
            }
        }

        order.orderItems.forEach(async item => {
            await updateStock(item.product, item.quantity);
        });

        order.orderStatus = req.body.status;
        order.deliveredAt = Date.now();

        await order.save();

        res.status(200).json({
            success: true,
            order
        });
    }
);

//Delete Order By ID    =>      /api/v1/admin/order/:id
exports.deleteOrder = catchAsyncErrors(
    async (req, res, next) => {
        const order = await Order.findById(req.params.id);

        if(!order){
            return next(new ExceptionHandler(`Order not found with the id: ${ req.params.id }`));
        }

        if(!(order.orderStatus === undefined)){            
            if(order.orderStatus.trim() === 'Archived'){
                return next(new ErrorHandler(`Order not found with ID: ${ req.params.id }`, 404));
            }
        }

        order.orderStatus = 'Archived';
        order.modifiedAt = Date.now();

        await order.save();

        res.status(200).json({
            success: true,
            order
        });
    }
);

async function updateStock(productId, quantity) {
    const product = await Product.findById(productId);

    product.stock = product.stock - quantity;

    await product.save({ validateBeforeSave: false });
}