import React, { lazy, useEffect, useState } from 'react';
import { Box, Typography, createStyles, makeStyles, Grid, Button, IconButton, CircularProgress, Modal, TextField } from '@material-ui/core';

import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';

import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';

import api from '../config/axiosConfig';
import { useAppSelector } from '../redux/store';

const Navbar = lazy(() => import('../components/navbar'));
const NewBoard = lazy(() => import('../components/newBoard'));

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
            borderBottom: `10px solid ${theme.palette.primary.main}99`,
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
            width: '400',
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
        }
    });
}
);

const allBoardsScreen = () => {
    const classes = useStyles();
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();

    const [allBoards, setAllBoards] = useState([]);
    const [open, setOpen] = useState(false);

    if (!localStorage.getItem('trelloToken')) {
        history.push('/');
    }

    const fetchAllBords = async () => {
        try {
            const res = await api.get(
                '/api/boards/allBoards'
            );
            setAllBoards(res.data);
            console.log(res.data);
            // enqueueSnackbar('Sign Up Successful', { variant: 'success', autoHideDuration: 2000 });
            // history.push('/boards');
        } catch (error) {
            enqueueSnackbar('Some error occured, Try again?', { variant: 'error', autoHideDuration: 3000 });
            // formik.setStatus(error.response.data.errors.msg);
        }
    };

    const formik = useFormik({
        initialValues: {
            boardTitle: ''
        },
        validateOnChange: true,
        onSubmit: async (values) => {
            try {
                const res = await api.post(
                    '/api/boards/newBoard',
                    values
                );
                setOpen(!open);
                enqueueSnackbar('Board Created Successfully', { variant: 'success', autoHideDuration: 2000 });
            } catch (error) {
                enqueueSnackbar(error.response.data.errors.msg, { variant: 'error', autoHideDuration: 4000 });
                formik.setStatus(error.response.data.errors.msg);
            }
        },
        validate: (values) => {
            formik.setStatus('');
            const errors = {};

            // if (values.password?.length <= 6) { errors.password = 'Password length must be greater than 6'; }
            return errors;
        }
    });

    useEffect(() => {
        fetchAllBords();
    }, [open]);

    const newBoard = () => {
        return (
            <>
                <Box className={classes.newBoard} onClick={() => setOpen(true)}>
                    <AddIcon style={{ fontSize: '40px', paddingBottom: '10px' }} />
                    <Box>
                        Create New Board
                    </Box>
                </Box><Modal open={open} onClose={() => setOpen(false)}>
                    <Box className={classes.paper}>
                        <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h1>Create New Board</h1>
                            <Button onClick={() => setOpen(false)}>
                                <CloseIcon />
                            </Button>
                        </Box>
                        <form onSubmit={formik.handleSubmit}>
                            <TextField
                                variant='outlined'
                                margin='normal'
                                required
                                fullWidth
                                label='Add Board Title'
                                name="boardTitle"
                                autoFocus
                                onChange={formik.handleChange}
                                value={formik.values.boardTitle}
                                error={!!formik.errors.boardTitle}
                                helperText={formik.errors.boardTitle} />
                            <Button type='submit' fullWidth variant='contained' color='primary'>
                                Create Board
                            </Button>
                        </form>
                    </Box>
                </Modal>
            </>
        );
    };

    return (
        <>
            <Navbar />
            <Box style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
                {newBoard}
            </Box>

            <Box style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
                {
                    allBoards === undefined
                        ? <CircularProgress />
                        : allBoards.map((board, i) => {
                            return (
                                <>
                                    <Box className={classes.boards} key={i}>
                                        <Typography style={{ letterSpacing: '-0.5px' }}>{board.boardTitle}</Typography>
                                    </Box>
                                </>
                            );
                        })
                }
            </Box>
        </>
    );
};

export default allBoardsScreen;
