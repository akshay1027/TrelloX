const express = require('express');

const {
    addNewList,
    allLists,
    listById,
    moveList,
    updateListTitle
} = require('../controllers/listsController');

// Middleware to check if user is Authenticated
const { authenticatedUser } = require('../middlewares/authorization/authenticatedUser');

const {
    addNewListValidation,
    listIdValidation,
    boardIdValidation,
    updateListTitleValidation
} = require('../middlewares/validators/listValidation');

const router = express.Router();

router.post('/newList', authenticatedUser, addNewListValidation, addNewList);

router.get('/allLists/:boardId', authenticatedUser, boardIdValidation, allLists);

router.get('/:listId', authenticatedUser, listIdValidation, listById);

router.patch('updateListTitle/:listId', authenticatedUser, updateListTitleValidation, updateListTitle);

router.patch('/moveList/:listId', authenticatedUser, listIdValidation, moveList);

module.exports = router;
