const User = require('../models/user');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwttoken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

//Register a User   =>      api/v1/register
exports.registerUser = catchAsyncError(async (req, res, next) => {

    const { name, email, password } = req.body;

    const user = await User.create({
        name, 
        email, 
        password,
        avatar: {
            public_id: 'deafde03-901a-4315-9739-f31007ea2709',
            url: 'https://randomuser.me/api/portraits/men/36.jpg'
        }

    });

    sendToken(user, 200, res);
}
);

//Login User    =>  /api/v1/login
exports.loginUser = catchAsyncError( async(req, res, next) => {
    const { email, password } = req.body;

    //Checks if email and password is entered by the user
    if(!email || !password) {
        return next(new ErrorHandler('Please enter email & password', 400));
    }

    //Finding user in database
    const user = await User.findOne({ email }).select('+password');

    if(!user) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }

    //Checks if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }

    sendToken(user, 200, res);
});

//Forgot Password   =>  /api/v1/password/forgot
exports.forgotPassword = catchAsyncError(
    async(req, res, next) => {
        const user = await User.findOne({ email: req.body.email });

        if(!user) {
            return next(new ErrorHandler('User not found with this email', 404));
        }

        //Get Reset Token
        const resetToken = user.getResetPasswordToken();

        console.log('User : ');
        console.log(user);

        await user.save({ validateBeforeSave: false });

        //Create Reset Password URL
        const resetURL = `${req.protocol}://${req.get('host')}/api/v1/reset/${resetToken}`;

        console.log('Reset URL : ' + resetURL);

        const message = `Your password reset token is as follows:\n\n${resetURL}\n\nIf you have not 
        requested this email, then ignore it.`

        try {
            await sendEmail({
                email: user.email,
                subject: 'ShopIt Password Recovery',
                message
            });

            res.status(200).json({
                success: true,
                message: `Email sent to: ${user.email}`
            });
        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            await user.save({ validateBeforeSave: false });

            return next(new ErrorHandler(error.message, 500));
        }
        
    }
);

//Reset Password   =>  /api/v1/password/reset/:token
exports.resetPassword = catchAsyncError(
    async (req, res, next) => {

        //Hash URL token
        const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

        const user = await User.findOne({
            resetPasswordToken, 
            resetPasswordExpire: { $gt: Date.now() }
        });

        if(!user) {
            return next(new ErrorHandler('Password reset token is invalid or has been expired', 400));
        }

        if(req.body.password !== req.body.confirmPassword){
            return next(new ErrorHandler('Passwords do not match.', 400));            
        }

        user.password = req.body.password;

        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        sendToken(user, 200, res);
    }
)

//Logout User       =>      /api/v1/logout
exports.logout = catchAsyncError( async(req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });

    res.status(200).json({
        success: true,
        message: 'Logged out'
    });
});