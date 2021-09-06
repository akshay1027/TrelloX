const express = require('express');

const {
    addNewCard,
    allCards,
    cardById,
    moveCard,
    updateCard,
    deleteCard
} = require('../controllers/cardsController');

// Middleware to check if user is Authenticated
const { authenticatedUser } = require('../middlewares/authorization/authenticatedUser');

const {
    addNewCardValidation,
    cardIdValidation,
    listIdValidation,
    updateCardValidation
} = require('../middlewares/validators/cardValidation');

const router = express.Router();

router.post('/newCard', authenticatedUser, addNewCardValidation, addNewCard);

router.get('/allCards/:listId', authenticatedUser, listIdValidation, allCards);

router.get('/:cardId', authenticatedUser, cardIdValidation, cardById);

router.patch('updateCard/:cardId', authenticatedUser, updateCardValidation, updateCard);

router.get('/moveCard/:cardId', authenticatedUser, cardIdValidation, moveCard);

router.delete('/deleteCard/:listId/:cardId', authenticatedUser, cardIdValidation, deleteCard)

module.exports = router;