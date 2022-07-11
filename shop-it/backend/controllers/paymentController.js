const catchAsynError = require('../middlewares/catchAsyncErrors');
const dotenv = require('dotenv');
dotenv.config({ path: 'backend/config/config.env' });
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

//Process stripe payments => /api/v1/payment/process
exports.processPayment = catchAsynError( async (req, res, next) => {

    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "inr",

        metadata: { integration_check: "accept_a_payment" }
    });

    res.status(200).json({
        success:true,
        client_secret: paymentIntent.client_secret
    });
})

// Send Stripe API Key  =>  /api/v1/stripeapi
exports.sendStripeAPI = catchAsynError( async (req, res, next) => {

    res.status(200).json({
        stripeAPIKey: process.env.STRIPE_API_KEY
    });
})