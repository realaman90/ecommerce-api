const express = require('express');
const { route } = require('express/lib/application');
const {
    authenticateUser,
    authorizePermissions
} = require('../middleware/authentication')


const router = express.Router();

const {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    uploadImage
} = require('../controllers/productController');

router
    .route('/')
    .post([authenticateUser, authorizePermissions('admin', 'owner')], createProduct)
    .get(getAllProducts);

router
    .route('/upload')
    .post(uploadImage);

router
    .route('/:id')
    .patch([authenticateUser, authorizePermissions('admin', 'owner')], updateProduct)
    .delete([authenticateUser, authorizePermissions('admin', 'owner')], deleteProduct)
    .get(getSingleProduct);

module.exports = router