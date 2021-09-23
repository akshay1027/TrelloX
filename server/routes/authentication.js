const express = require('express');

const {
    signInUser,
    getUserDetails,
    signUpUser
} = require('../controllers/authController.js');

const {
    signInValidation,
    signUpValidation
} = require('../middlewares/validators/authValidation');

// Middleware to check if user is Authenticated
const { authenticatedUser } = require('../middlewares/authorization/authenticatedUser');

const router = express.Router();

router.post('/signin', signInValidation, signInUser);

router.get('/userDetails', authenticatedUser, getUserDetails);

router.post('/signUp', signUpValidation, signUpUser);

module.exports = router;
