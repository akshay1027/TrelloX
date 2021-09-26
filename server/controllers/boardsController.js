const express = require('express');

// Board DB modal & User Modal
const BoardModel = require('../models/boardModal');
const UserModel = require('../models/userModal');

// Create New Board
exports.addNewBoard = async (req, res) => {
    const { boardTitle } = req.body;

    // // console.log(req);
    // console.log(req.user.id);
    console.log(req.body);

    try {
        // Create and Save board to database
        const newBoard = new BoardModel({ boardTitle });
        const newBoardCreated = await newBoard.save();

        // console.log(' new board created, title = ', newBoardCreated);

        // Add This Board to User Modal, refer UserModal for more clarification
        const user = await UserModal.findById(req.user.id);
        user.boards.unshift(newBoardCreated.id); // add new board to user, unshift is an array method
        await user.save();
        // console.log(' User modal = ', user);

        // Add new activity in board, refer BoardModel for more clarification
        newBoardCreated.activity.unshift({ text: `${user.name} created a board named '${boardTitle}'` });
        await newBoardCreated.save();
        // console.log(' Board modal = ', newBoardCreated);

        res.status(200).json(newBoardCreated);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error');
    }
}

// Get All Boards
exports.allBoards = async (req, res) => {

    const userId = req.user.id;
    console.log(userId)

    try {
        // Get all details of user
        const user = await UserModal.findById(userId);

        const allBoards = [];
        /* UserModal.boards returns board Ids.
           so we use this Id to get all details about the board from BoardModel
        */
        for (const boardId of user.boards) {
            const boardData = await BoardModel.findById(boardId);
            allBoards.push(boardData);
        }

        res.status(200).json(allBoards);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error');
    }
}

// Get All Boards API:  
/* 
    1) Get user id from middleware (authorisation).
    2) Get full details of user using this id.
    3) From that loop over all the boardIds present in details of user.
    4) For each boardId, use this id to get full details of that board.
    5) Store it in an array.
    6) Send response.

*/

// Get a board by id
exports.getBoardById = async (req, res) => {

    const boardId = req.params.boardId;

    try {
        const boardData = await BoardModel.findById(boardId);

        if (!boardData) {
            return res.status(404).json({ msg: 'Requested board not found' });
        }

        res.status(200).json(boardData);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error');
    }
}

// Change boardTitle
exports.updateBoardTitle = async (req, res) => {

    const boardId = req.params.boardId;
    const newBoardTitle = req.body.boardTitle;

    try {
        const boardData = await BoardModel.findById(boardId);

        if (!boardData) {
            return res.status(404).json({ msg: 'Requested board not found' });
        }

        if (newBoardTitle !== boardData.boardTitle) {
            // update old board title with new one.
            oldBoardTitle = boardData.boardTitle;
            boardData.boardTitle = newBoardTitle;
            boardData.activity.unshift({ text: `Renamed board (from ${oldBoardTitle})` });
            await boardData.save();
        }

        res.status(200).json(boardData);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error');
    }
}

// Get a board's activity
exports.getBoardActivity = async (req, res) => {

    try {
        const id = req.params.boardId;
        const userData = await UserModel.findById(id);
        if (!userData) {
            return res.status(404).json({ msg: 'Board not found' });
        }
        // console.log(userData.activity);
        res.status(200).json(userData.activity);
    } catch (err) {
        console.error(error.message);
        res.status(500).send('Internal server error');
    }
};

exports.addList = async (req, res) => {
    try {
        console.log('Hi')
        const data = {
            lists: req.body.lists
        }
        const id = req.params.id;

        await UserModel.findByIdAndUpdate(id, data, (err, updatedData) => {
            if (!err) res.send(`Updated lists.`)
        })
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error');
    }
};

exports.addCard = async (req, res) => {
    try {
        console.log('Hi')
        const data = {
            lists: req.body.lists
        }
        const id = req.params.id;

        await UserModel.findByIdAndUpdate(id, data, (err, updatedData) => {
            if (!err) res.send(`Updated cards.`)
        })
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error');
    }
};

exports.getAllLists = async (req, res) => {
    try {
        const email = req.params.email;

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        // console.log(user);
        res.status(200).json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send(error);
    }
}
// exports.addBoardActivity = async (req, res) => {
//     try {
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send('Internal server error');
//     }
// }