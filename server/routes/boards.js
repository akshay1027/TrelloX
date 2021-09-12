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

router.post('/newBoard', authenticatedUser, addNewBoardValidation, addNewBoard);

router.get('/allBoards', authenticatedUser, allBoards);

router.get('/:boardId', authenticatedUser, boardIdValidation, getBoardById);

router.patch('/updateTitle/:boardId', authenticatedUser, updateBoardTitleValidation, updateBoardTitle);

router.get('/activity/:boardId', authenticatedUser, boardIdValidation, getBoardActivity);

module.exports = router;