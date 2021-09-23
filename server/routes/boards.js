const express = require('express');

const {
    addNewBoard,
    allBoards,
    getBoardById,
    getBoardActivity,
    updateBoardTitle
} = require('../controllers/boardsController');

// Middleware to check if user is Authenticated
const { authenticatedUser } = require('../middlewares/authorization/authenticatedUser');

const {
    addNewBoardValidation,
    boardIdValidation,
    updateBoardTitleValidation
} = require('../middlewares/validators/boardValidation');

const router = express.Router();

// update board Title
router.patch('/updateTitle/:id', authenticatedUser, updateBoardTitleValidation, updateBoardTitle);

// create and upload list
router.put('/upload/list/:id', authenticatedUser, addNewBoardValidation, addNewBoard);

// create and upload card
router.put('/upload/card/:id', authenticatedUser, allBoards);

// get the activity
router.get('/activity/:id', authenticatedUser, boardIdValidation, getBoardActivity);

module.exports = router;