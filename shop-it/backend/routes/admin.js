const express = require('express');
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

const { 
    getAllUsers, 
    getUserDetails, 
    getUserByEmail, 
    updateUser, 
    deleteUser, 
    getAllOrders, 
    processOrder,
    deleteOrder
    } = require('../controllers/adminController');

router.route('/admin/users').get(isAuthenticatedUser, authorizeRoles('admin'), getAllUsers);
router.route('/admin/user/:id').get(isAuthenticatedUser, authorizeRoles('admin'), getUserDetails)
                                .put(isAuthenticatedUser, authorizeRoles('admin'), updateUser)
                                .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUser);
router.route('/admin/user/email').post(isAuthenticatedUser, authorizeRoles('admin'), getUserByEmail);
router.route('/admin/orders').get(isAuthenticatedUser, authorizeRoles('admin'), getAllOrders);
router.route('/admin/order/:id').put(isAuthenticatedUser, authorizeRoles('admin'), processOrder)
                                .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteOrder);

module.exports = router;