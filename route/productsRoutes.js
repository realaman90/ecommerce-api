const express = require('express');
const { route } = require('express/lib/application');
const {
    authenticateUser,
    authorizeRoles
} = require('../middleware/full-auth');

const router = express.Router();

const {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    uploadImage
} = require('../controllers/productController');
const { getSingleProductReviews } = require('../controllers/reviewController');

router
    .route('/')
    .post([authenticateUser, authorizeRoles('admin', 'owner')], createProduct)
    .get(getAllProducts);

router
    .route('/upload')
    .post(uploadImage);

router
    .route('/:id')
    .patch([authenticateUser, authorizeRoles('admin', 'owner')], updateProduct)
    .delete([authenticateUser, authorizeRoles('admin', 'owner')], deleteProduct)
    .get(getSingleProduct);

router.route('/:id/reviews').get(getSingleProductReviews)


module.exports = router