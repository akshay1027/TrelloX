import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Box, Typography, LinearProgress, Button, makeStyles, createStyles, Modal, TextField, IconButton, Tooltip, Paper } from '@material-ui/core';

import Navbar from '../components/navbar';

import { NavLink, useHistory, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import '../App.css';

import api from '../config/axiosConfig';

import BoardTitle from '../components/boardComponents/boardTitle';

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

    return (
        <div className={classes.screen}>
            <Navbar isBoard={true} />
            <BoardTitle />
        </div >
    );
};

export default IndividualBoard;
