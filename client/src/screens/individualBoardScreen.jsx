import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Box, Typography, LinearProgress, Button, makeStyles, createStyles, Modal, TextField, IconButton, Tooltip, Paper } from '@material-ui/core';

import Navbar from '../components/navbar';

import { NavLink, useHistory, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';

import '../App.css';

import api from '../config/axiosConfig';

import BoardTitle from '../components/boardComponents/boardTitle';

const useStyles = makeStyles((theme) => {
    return createStyles({
        boards: {
            backgroundColor: `${theme.palette.primary.main}10.`,
            padding: '10px',
            height: '130px',
            width: '240px',
            margin: '30px 30px',
            borderRadius: '5px',
            boxShadow: '3px 4px 10px 0px rgb(159 123 206 / 61%)',
            borderBottom: `10px solid ${theme.palette.primary.main}99`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center'
        },
        newBoard: {
            backgroundColor: `${theme.palette.primary.main}10`,
            padding: '10px',
            height: '130px',
            width: '240px',
            margin: '30px 30px',
            borderRadius: '5px',
            boxShadow: '3px 4px 10px 0px rgb(159 123 206 / 61%)',
            borderBottom: `10px solid ${theme.palette.fourth.main}99`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            outline: 'none',
            flexDirection: 'column',
            '&:hover': {
                cursor: 'pointer'
            }
        },
        paper: {
            // display: 'flex',
            // flexDirection: 'column',
            width: '400px',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            [theme.breakpoints.up('md')]: {
                top: '5%',
                maxHeight: '90vh'
            },
            [theme.breakpoints.down('sm')]: {
                height: '100%'
            },
            overflowY: 'auto',
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3)
        },
        navLink: {
            display: 'flex',
            color: 'inherit',
            textDecoration: 'none'
        }
    });
}
);

// All Lists and cards in a board
const IndividualBoard = (props) => {
    const boardId = props.match.params.boardId;
    const { enqueueSnackbar } = useSnackbar();

    return (
        <div className='bgImage'>
            <Navbar isBoard={true} />
            <BoardTitle />
        </div >
    );
};

export default IndividualBoard;
