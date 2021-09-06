const { body, validationResult, param } = require('express-validator');

exports.addNewCardValidation = [
    body('cardTitle', 'List Title is required').trim().notEmpty(),
    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }
];
 
exports.cardIdValidation = [
    param('cardId', 'Invalid Id').isMongoId().trim(),

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

exports.updateCardValidation = [
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