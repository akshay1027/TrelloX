import express from 'express';
import {check, validationResult} from 'express-validator';
import {
    signInUser,
    getUserDetails,
    signUpUser
} from '../controllers/authController';

// Middleware to check if user is Authenticated
import { authenticatedUser } from '../middlewares/authenticatedUser';

const router = express.Router();

router.post('/signin', [
        check('email', 'Email is required').isEmail(),
        check('password', 'Password is required').exists(),
    ], signInUser 
);

router.get('/', authenticatedUser, getUserDetails);

router.post('/signUp', [
    check('name', 'Name is Required').notEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
    ], signUpUser
)