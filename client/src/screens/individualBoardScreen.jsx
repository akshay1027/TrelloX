import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Box, Typography, LinearProgress, Button, makeStyles, createStyles, Modal, TextField, IconButton, Tooltip, Paper } from '@material-ui/core';

import Navbar from '../components/navbar';

import { NavLink, useHistory, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import '../App.css';

import api from '../config/axiosConfig';

import io from 'socket.io-client';

import BoardTitle from '../components/board/boardTitle';
// import { updateCards, updateLists } from '../utils/Functions/allFunctions'

const socket = io('"http://localhost:5001/');

const useStyles = makeStyles((theme) => {
    return createStyles({
        screen: {
            // display: 'flex',
            maxWidth: '100vw',
            overflowX: 'scroll',
            height: '100vh'
        },
        listbg: {
            width: '300px',
            backgroundColor: '#ebecf0',
            marginLeft: theme.spacing(1),
            marginTop: theme.spacing(1)
        }
    });
}
);

// All Lists and cards in a board
const IndividualBoard = (props) => {
    const boardId = props.match.params.boardId;
    const { enqueueSnackbar } = useSnackbar();
    const classes = useStyles();

    const [lists, setLists] = useState([]);

    const addMoreCard = (title, index) => {
        const date = new Date();

        const newCard = {
            date: `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}, ${date.getFullYear()}`,
            content: 'Add your content here..',
            title: title
        };

        // requested list
        const reqList = lists[index];
        reqList.cards = [...reqList.cards, newCard];

        // modified list
        const modList = {
            ...reqList,
            cards: reqList.cards
        };

        const allLists = [...lists];
        allLists[index] = modList;
        axios.put(`/upload/card/${user._id}`, { lists: allLists });
        socket.once('list-updated', newData => {
            setLists(newData);
        });
    };

    const updateCardContent = (content, listIndex, cardIndex) => {
        lists[listIndex].cards[cardIndex].content = content;
        const allLists = [...lists];

        axios.put(`/upload/card/${user._id}`, { lists: allLists });
        socket.once('list-updated', newData => {
            setLists(newData);
        });
    };

    const removeCard = (listIndex, cardIndex) => {
        const allCards = lists[listIndex].cards;
        allCards.splice(cardIndex, 1);
        lists[listIndex].cards = allCards;
        const allLists = [...lists];
        axios.put(`/upload/list/${user._id}`, { lists: allLists });
        socket.once('list-updated', newData => {
            setLists(newData);
        });
    };

    const updateListTitle = (title, index) => {
        const list = lists[index];
        list.title = title;
        const allLists = [...lists];
        axios.put(`/upload/list/${user._id}`, { lists: allLists });
        socket.once('list-updated', newData => {
            setLists(newData);
        });
    };

    const removeList = (index) => {
        const allLists = [...lists];
        allLists.splice(index, 1);
        axios.put(`/upload/list/${user._id}`, { lists: allLists });
        socket.once('list-updated', newData => {
            setLists(newData);
        });
    };

    const addMoreList = (title) => {
        const newList = {
            title: title,
            cards: []
        };

        const allLists = [...lists, newList];
        axios.put(`/upload/list/${user._id}`, { lists: allLists });
        socket.once('list-updated', newData => {
            setLists(newData);
        });
    };

    const onDragEnd = (result) => {
        const { destination, source, draggableId, type } = result;

        if (!destination) {
            return;
        }

        // for list
        if (type === 'list') {
            const tempList = lists[source.index];
            lists[source.index] = lists[destination.index];
            lists[destination.index] = tempList;
            const allLists = [...lists];
            axios.put(`/upload/card/${user._id}`, { lists: allLists });
            socket.once('list-updated', newData => {
                setLists(newData);
            });
            return;
        }

        // for card
        const destinationList = lists.find(obj => obj._id == destination.droppableId);
        const sourceList = lists.find(obj => obj._id == source.droppableId);
        const draggingCard = sourceList.cards.find(obj => obj._id == draggableId);

        // if the card is dropped in  same list
        if (source.droppableId === destination.droppableId) {
            sourceList.cards.splice(source.index, 1);
            destinationList.cards.splice(destination.index, 0, draggingCard);

            const allLists = [...lists];
            axios.put(`/upload/card/${user._id}`, { lists: allLists });
            socket.once('list-updated', newData => {
                setLists(newData);
            });
        }

        // if the card is dropped in different list
        else {
            sourceList.cards.splice(source.index, 1);
            destinationList.cards.splice(destinationList.index, 0, draggingCard);

            const allLists = [...lists];
            axios.put(`/upload/card/${user._id}`, { lists: allLists });
            socket.once('list-updated', newData => {
                setLists(newData);
            });
        }
    };

    return (
        <div className={classes.screen}>
            <Navbar isBoard={true} />
            <BoardTitle />
            <DragDropContext onDragEnd={onDragEnd}>

                <Droppable droppableId='list' type='list' direction='horizontal'>

                    {(provided) => (

                        <div className={classes.root}
                            ref={provided.innerRef} {...provided.droppableProps}
                        >

                            {lists && lists.map((list, index) => {
                                return <List list={list} key={list._id} index={index} />;
                            })}

                            {/* <InputConainer type={'list'} />
                            {provided.placeholder} */}
                        </div>
                    )}

                </Droppable>

            </DragDropContext>
        </div >
    );
};

export default IndividualBoard;
