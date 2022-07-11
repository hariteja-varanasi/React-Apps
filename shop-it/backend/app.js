const express = require('express');
const app = express();

const bodyparser = require('body-parser');
const fileUpload = require('express-fileupload');

const cors = require('cors');
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middlewares/errors');

//App Usages
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());

//Import all routes
const products = require('./routes/product');
const auth = require('./routes/auth');
const admin = require('./routes/admin');
const orders = require('./routes/order');
const payment = require('./routes/payment');

app.use(cors({origin: 'http://localhost:4200'}));
app.use('/api/v1', products);
app.use('/api/v1', auth);
app.use('/api/v1', admin);
app.use('/api/v1', orders);
app.use('/api/v1', payment);

//Middleware to handle errors
app.use(errorMiddleware);

module.exports = app