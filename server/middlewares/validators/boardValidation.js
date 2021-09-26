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

// For GET board by id and GET all activities of a board
exports.boardIdValidation = [
    param('id', 'Invalid Id').isMongoId().trim(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
            return res.status(400).json({ error: 'Invalid fields' });
        }
        next();
    }
]

exports.updateBoardTitleValidation = [
    param('boardId', 'Invalid Id').isMongoId().trim(),
    body('boardTitle', 'Board Title is required').trim().notEmpty(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
]