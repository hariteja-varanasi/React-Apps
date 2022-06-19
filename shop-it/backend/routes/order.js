const express = require('express');
const router = express.Router();

const { newOrder, getOrderById, myOrders } = require('../controllers/orderController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/order/new').post(isAuthenticatedUser, newOrder);
router.route('/order/:id').get(isAuthenticatedUser, getOrderById);
router.route('/orders/me').get(isAuthenticatedUser, myOrders);

module.exports = router;