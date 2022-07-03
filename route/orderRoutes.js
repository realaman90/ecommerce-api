const express = require('express');
const { route } = require('express/lib/application');
const { authenticateUser, authorizeRoles } = require('../middleware/full-auth');


const router = express.Router();

const {
    getAllOrders,
    getSingleOrder,
    getCurrentUserOrders,
    createOrder,
    updateOrder
} = require('../controllers/orderConroller');


router
    .route('/')
    .post(authenticateUser, createOrder)
    .get([authenticateUser, authorizeRoles('admin', 'owner')], getAllOrders);

router
    .route('/showAllMyOrders')
    .get(authenticateUser, getCurrentUserOrders);

router
    .route('/:id')
    .patch(authenticateUser, updateOrder)
    .get(authenticateUser, getSingleOrder);




module.exports = router