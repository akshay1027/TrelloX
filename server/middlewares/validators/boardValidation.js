const { body, validationResult, param } = require('express-validator');

exports.addNewBoardValidation = [
    body('boardTitle', 'Board Title is required').trim().notEmpty(),
    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

exports.getBoardByIdValidation = [
    param('id', 'Invalid Id').isMongoId().trim(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    } 
]