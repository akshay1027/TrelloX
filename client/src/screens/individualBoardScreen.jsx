/* eslint-disable brace-style */
/* eslint-disable eqeqeq */
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

import StoredApi from '../utils/storedApi';
import BoardTitle from '../components/board/boardTitle';
import List from '../components/List/list';
import InputContainer from '../components/inputContainer';

const socket = io('http://localhost:5001/');

const useStyles = makeStyles((theme) => {
    return createStyles({
        screen: {
            display: 'flex',
            maxWidth: '100vw',
            overflowX: 'scroll',
            height: '91vh'
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
    const history = useHistory();

    const [lists, setLists] = useState([]);

    const userId = localStorage.getItem('userId');
    const email = localStorage.getItem('email');

    // useEffect(() => {
    //     if (!localStorage.trelloToken) {
    //         history.push('/');
    //         // setAuthHeader(localStorage.trelloToken);
    //     }
    // });

    const fetchAllLists = async () => {
        try {
            const res = await api.get(`api/board/allLists/${email}`);
            console.log(res.data.lists);
            setLists(res.data.lists);
        } catch (error) {
            console.error('error');
        }
    };

    useEffect(() => {
        if (!localStorage.trelloToken) {
            history.push('/');
        }
        fetchAllLists();
    }, []);

    const addCard = (title, index) => {
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
        api.put(`/api/board/upload/card/${userId}`, { lists: allLists });
        socket.once('list-updated', newData => {
            setLists(newData);
        });
    };

    const updateCardDescription = (content, listIndex, cardIndex) => {
        lists[listIndex].cards[cardIndex].content = content;
        const allLists = [...lists];

        api.put(`/api/board/upload/card/${userId}`, { lists: allLists });
        socket.once('list-updated', newData => {
            setLists(newData);
        });
    };

    const deleteCard = (listIndex, cardIndex) => {
        const allCards = lists[listIndex].cards;
        allCards.splice(cardIndex, 1);
        lists[listIndex].cards = allCards;
        const allLists = [...lists];
        api.put(`/api/board/upload/list/${userId}`, { lists: allLists });
        socket.once('list-updated', newData => {
            setLists(newData);
        });
    };

    const updateListTitle = (title, index) => {
        const list = lists[index];
        list.title = title;
        const allLists = [...lists];
        api.put(`/api/board/upload/list/${userId}`, { lists: allLists });
        socket.once('list-updated', newData => {
            setLists(newData);
        });
    };

    const deleteList = (index) => {
        const allLists = [...lists];
        allLists.splice(index, 1);
        api.put(`/api/board/upload/list/${userId}`, { lists: allLists });
        socket.once('list-updated', newData => {
            setLists(newData);
        });
    };

    const addList = (title) => {
        const newList = {
            title: title,
            cards: []
        };

        const allLists = [...lists, newList];
        api.put(`/api/board/upload/list/${userId}`, { lists: allLists });
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
            api.put(`api/upload/card/${userId}`, { lists: allLists });
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
            api.put(`/api/board/upload/card/${userId}`, { lists: allLists });
            socket.once('list-updated', newData => {
                setLists(newData);
            });
        }

        // if the card is dropped in different list
        else {
            sourceList.cards.splice(source.index, 1);
            destinationList.cards.splice(destinationList.index, 0, draggingCard);

            const allLists = [...lists];
            api.put(`/api/board/upload/card/${userId}`, { lists: allLists });
            socket.once('list-updated', newData => {
                setLists(newData);
            });
        }
    };

    return (
        <StoredApi.Provider value={{
            addCard,
            addList,
            updateListTitle,
            deleteList,
            updateCardDescription,
            deleteCard
        }}>
            <div>
                <Navbar isBoard={true} />
                {/* <BoardTitle /> */}
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId='list' type='list' direction='horizontal'>
                        {(provided) => (
                            <div className={classes.screen}
                                ref={provided.innerRef} {...provided.droppableProps}
                            >
                                {lists && lists.map((list, index) => {
                                    return <List list={list} key={list._id} index={index} />;
                                })}
                                <InputContainer type={'list'} />
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div >
        </StoredApi.Provider>
    );
};

export default IndividualBoard;
