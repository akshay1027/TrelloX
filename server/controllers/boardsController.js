const express = require('express');

// Board DB modal & User Modal
const BoardModal = require('../models/boardModal');
const UserModal = require('../models/userModal');

// Create New Board
exports.addNewBoard = async (req, res) => {
    const { boardTitle } = req.body;

    // // console.log(req);
    // console.log(req.user.id);
    
    try {
        // Create and Save board to database
        const newBoard = new BoardModal({boardTitle});
        const newBoardCreated = await newBoard.save();

        // console.log(' new board created, title = ', newBoardCreated);

        // Add This Board to User Modal, refer UserModal for more clarification
        const user = await UserModal.findById(req.user.id);
        user.boards.unshift(newBoardCreated.id); // add new board to user, unshift is an array method
        await user.save();
        // console.log(' User modal = ', user);
        
        // Add new activity in board, refer BoardModal for more clarification
        newBoardCreated.activity.unshift({text: `${user.name} created a board named ${boardTitle}`});
        await newBoardCreated.save();
        // console.log(' Board modal = ', newBoardCreated);
        
        res.status(200).json(newBoardCreated);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error');
    }
}

// Get All Boards
exports.allBoards = async(req, res) => {

    const userId = req.user.id;
    console.log(userId)

    try {
        // Get all details of user
        const user = await UserModal.findById(userId);

        const allBoards = [];
        /* UserModal.boards returns board Ids.
           so we use this Id to get all details about the board from BoardModal
        */ 
        for(const boardId of user.boards) {
            boardDetails = await BoardModal.findById(boardId);
            allBoards.push(boardDetails);
        }

        res.status(400).json(allBoards);
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

exports.boardById = async(req, res) => {

    const boardId = req.params.boardId;

    try {
        const requestedBoard = await BoardModal.findById(req.params.id);

        if(!requestedBoard) {
            return res.status(404).json({msg: 'Requested board not found'});
        }

        res.status(200).json(requestedBoard);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error');
    }
}


// Get boards activity


// Change boardTitle