const express = require('express');
const { route } = require('express/lib/router');
const { authenticateUser, authorizePermissions } = require('../middleware/authentication');


const router = express.Router()

const {
    getAllUser,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword
} = require('../controllers/userController');

router.route('/').get(authenticateUser, authorizePermissions('admin', 'owner'), getAllUser);

router.route('/showMe').get(authenticateUser, showCurrentUser);
router.route('/updateUser').patch(authenticateUser, updateUser);
router.route('/updateUserPassword').patch(authenticateUser, updateUserPassword);


router.route('/:id').get(authenticateUser, getSingleUser);


module.exports = router