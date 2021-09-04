const express = require('express');

const { 
    addNewList,
    allLists,
    getListById,
    getBoardActivity,
    updateList
} = require('../controllers/boardsController');

// Middleware to check if user is Authenticated
const { authenticatedUser } = require('../middlewares/authorization/authenticatedUser');

const { 
    addNewBoardValidation,
    boardIdValidation,
    updateBoardTitleValidation 
} = require('../middlewares/validators/boardValidation');

const router = express.Router();

router.post('/newList', authenticatedUser, addNewBoardValidation, addNewList );

router.get('/allLists', authenticatedUser, allLists );

router.get('/:listId', authenticatedUser, boardIdValidation, getListById);

router.patch('updateList/:listId', authenticatedUser, updateBoardTitleValidation, updateList);

router.get('/activity/:listId', authenticatedUser, boardIdValidation, getBoardActivity);

module.exports = router;