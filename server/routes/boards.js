const express = require('express');

const {
    // addNewBoard,
    // allBoards,
    // getBoardById,
    getBoardActivity,
    addList,
    addCard,
    getAllLists,
    updateBoardTitle
} = require('../controllers/boardsController');

// Middleware to check if user is Authenticated
const { authenticatedUser } = require('../middlewares/authorization/authenticatedUser');

const {
    // addNewBoardValidation,
    boardIdValidation
    // updateBoardTitleValidation
} = require('../middlewares/validators/boardValidation');

const router = express.Router();

// update board Title
// router.patch('/updateTitle/:id', authenticatedUser, boardIdValidation, updateBoardTitle);

// get all lists
router.get('/allLists/:email', getAllLists);

// create and upload list
router.put('/upload/list/:id', boardIdValidation, addList);

// create and upload card
router.put('/upload/card/:id', boardIdValidation, addCard);

// get the activity
// router.get('/activity/:id', authenticatedUser, boardIdValidation, getBoardActivity);

module.exports = router;