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

// All lists of a board
exports.allLists = async(req, res) => {
    try {
        const boardId = req.params.boardId;
        const board = await BoardModal.findById(boardId);
        if (!board) {
            return res.status(404).json({ msg: 'Board not found' });
        }

        // All lists of a board
        const finalLists = []; 
        for (const listId of board.lists) {
            finalLists.push(await ListModal.findById(listId));
        }
    
        res.status(400).json(finalLists);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error');
    }
}

// Get a list by id
exports.listById = async(req, res) => {
    try {
        const listId = req.param.listId;

        const list = await ListModal.findById(listId);
        if(!list) {
            res.status(404).json({msg: 'list not found'});
        }

        res.status(400).json(list);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error');
    }
}

// Update list Title
exports.updateListTitle = async(req, res) => {
    try {
        const listId = req.param.listId;
        const newTitle = req.body.listTitle;

        const list = await ListModal.findById(listId);
        if(!list) {
            res.status(404).json({msg: 'list not found'});
        }

        if(list.title !== newTitle) {
            list.title = newTitle;
            await list.save();
        }

        res.status(400).json(list);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error');
    }
}

/*
    To move a list in a board, what we have to change?
    Basically we just have to change the index of list in the array to solve this problem.
    Eg:  
        List1 is moved to List2 === Index of list1 changed from 1 -> 2 && list2 is moved from 2 -> 1
*/

// Move List 
exports.moveList = async(req, res) => {
    try {  
        const listId = req.param.listId;
        const toIndex = req.body.toIndex ? req.body.toIndex : 0;
        const boardId = req.header('boardId');
        const board = await Board.findById(boardId);
    } catch (error) {
        
    }
}