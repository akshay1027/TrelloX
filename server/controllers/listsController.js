// Board DB modal & User Modal
const ListModal = require('../models/listModal');
const UserModal = require('../models/userModal');
const BoardModal = require('../models/boardModal');

// Create New list
exports.addNewList = async (req, res) => {
    
    try {
        const { listTitle } = req.body;
        const boardId = req.header('boardId');
        
        // new list created
        const newList = new ListModal({listTitle});
        await newList.save();

        // list updated in board
        const board = await BoardModal.findById(boardId);
        board.lists.push(newList.id);
        
        // activity updated in board
        board.activity.unshift({text: `Created a list named ${listTitle}`});
        await board.save();

        res.status(200).json(newList);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error');
    }
}

// All lists
exports.allLists = async(req, res) => {

    try {
        const boardId = req.header('boardId');

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error');
    }
}