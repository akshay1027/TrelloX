const { body, validationResult, param } = require('express-validator');

exports.addNewListValidation = [
    body('listTitle', 'List Title is required').trim().notEmpty(),
    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }
];

// For GET board by id and GET all activities of a board
exports.boardIdValidation = [
    param('boardId', 'Invalid Id').isMongoId().trim(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }  
]

exports.listIdValidation = [
    param('listId', 'Invalid Id').isMongoId().trim(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }  
]

exports.updateListTitleValidation = [
    param('listId', 'Invalid Id').isMongoId().trim(),
    body('lsitTitle', 'List Title is required').trim().notEmpty(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }  
]