const express = require('express');

const { 
    addNewBoard,
    allBoards,
    boardById
    } = require('../controllers/boardsController');

// Middleware to check if user is Authenticated
const { authenticatedUser } = require('../middlewares/authorization/authenticatedUser');

const { addNewBoardValidation } = require('../middlewares/validators/boardValidation');

const router = express.Router();

router.post('/newBoard', authenticatedUser, addNewBoardValidation, addNewBoard );

router.get('/allBoards', authenticatedUser, allBoards );

router.get('/:boardTitle/:id', authenticatedUser, boardById);

module.exports = router;