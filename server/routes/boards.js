import express from 'express';
import {check} from 'express-validator';
import {
    signInUser,
    getUserDetails,
    signUpUser
} from '../controllers/authController.js';

// Middleware to check if user is Authenticated
import { authenticatedUser } from '../middlewares/authorization/authenticatedUser.js';

const router = express.Router();

router.post('/', [
        authenticatedUser,
        [check('title', 'Board title is required').notEmpty()]
    ]
);