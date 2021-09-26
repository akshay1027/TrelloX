const { body, validationResult } = require('express-validator');

exports.signInValidation = [
    body('email', 'Email is required').trim().isEmail(),
    body('password', 'Password is required').trim().exists(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
            return res.status(400).json({ error: 'Invalid fields' });
        }
        next();
    }
];

exports.signUpValidation = [
    body('name', 'Name is required').not().isEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
            return res.status(400).json({ error: 'Invalid fields' });
        }
        next();
    }
];