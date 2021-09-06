// Board DB modal & User Modal
const ListModal = require('../models/listModal');
// const UserModal = require('../models/userModal');
const BoardModal = require('../models/boardModal');
const CardModal = require('../models/cardModal');

// Create card
exports.addNewCard = async(req, res) => {
    
    try {
        const { cardTitle, listId } = req.body;
        const boardId = req.header('boardId');
        
        // new card created
        const newCard = new CardModal({cardTitle});
        await newCard.save();

        const board = await BoardModal.findById(boardId);
        const list = await ListModal.findById(listId)
        list.cards.push(card.id);
        await list.save();

        // activity updated in board
        board.activity.unshift({text: `Added '${cardTitle}' to '${list.title}'`});
        await board.save();

        res.status(200).json({cardId: newCard.id, listId});
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error');
    }
}

// All cards of a board
exports.allCards = async(req, res) => {
    try {
        const list = await ListModal.findById(req.params.listId);
        if (!list) {
          return res.status(404).json({ msg: 'List not found' });
        }

        const cards = [];
        for (const cardId of list.cards) {
          cards.push(await CardModal.findById(cardId));
        }
    
        res.json(cards);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error');
    }
}

// Get a card by id
exports.cardById = async(req, res) => {
    try {
        const cardId = req.param.cardId;

        const card = await ListModal.findById(cardId);
        if(!card) {
            res.status(404).json({msg: 'list not found'});
        }

        res.status(200).json(card);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error');
    }
}

// Update card
exports.updateCard = async(req, res) => {
    try {
        const { cardTitle: title, description, label } = req.body;

        if (title === '') {
        return res.status(400).json({ msg: 'Title is required' });
        }

        const card = await CardModal.findById(req.params.id);
        if (!card) {
            return res.status(404).json({ msg: 'Card not found' });
        }

        card.title = title ? title : card.title;
        if (description || description === '') {
            card.description = description;
        }
        if (label || label === 'none') {
            card.label = label;
        }
        await card.save();

        res.status(200).json(card);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error');
    }
}

// Move card 
exports.moveCard = async(req, res) => {
    try {  
        const { fromId, toId, toIndex } = req.body;
        const boardId = req.header('boardId');

        const cardId = req.params.cardId;
        const from = await ListModal.findById(fromId);
        let to = await ListModal.findById(toId);
        if (!cardId || !from || !to) {
            return res.status(404).json({ msg: 'List/card not found' });
        } else if (fromId === toId) {
            to = from;
        }

        const fromIndex = from.cards.indexOf(cardId);
        if (fromIndex !== -1) {
            from.cards.splice(fromIndex, 1);
            await from.save();
        }

        if (!to.cards.includes(cardId)) {
            if (toIndex === 0 || toIndex) {
                to.cards.splice(toIndex, 0, cardId);
            } else {
                to.cards.push(cardId);
            }
            await to.save();
        }

        // Log activity
        if (fromId !== toId) {
            // const user = await UserModal.findById(req.user.id);
            const board = await BoardModal.findById(boardId);
            const card = await CardModal.findById(cardId);
            board.activity.unshift({
                text: `Moved '${card.cardTitle}' from '${from.ListTitle}' to '${to.ListTitle}'`,
            });
            await board.save();
        }

        res.status(200).send(board.lists);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error');
    }
}

// Delete card
exports.deleteCard = async(req, res) => {
    try {
        const card = await CardModal.findById(req.params.id);
        const list = await ListModal.findById(req.params.listId);
        if (!card || !list) {
          return res.status(404).json({ msg: 'List/card not found' });
        }
    
        list.cards.splice(list.cards.indexOf(req.params.id), 1);
        await list.save();
        await card.remove();
    
        // Log activity
        const board = await BoardModal.findById(req.header('boardId'));
        board.activity.unshift({text: `Deleted '${card.cardTitle}' from '${list.listTitle}'`});
        await board.save();
    
        res.status(200).json(req.params.id);
    } catch (error) {
        
    }
}