import React, { lazy, useEffect, useState } from 'react';
import { Box, Typography, createStyles, makeStyles, Button, CircularProgress, Modal, TextField, Container } from '@material-ui/core';

import { NavLink, useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';

import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';

import api from '../config/axiosConfig';

import setAuthHeader from '../utils/authHeader';

import '../App.css';

const Navbar = lazy(() => import('../components/navbar'));

const useStyles = makeStyles((theme) => {
    return createStyles({
        boards: {
            backgroundColor: '#fff',
            color: '#000',
            padding: '10px',
            height: '130px',
            width: '240px',
            margin: '30px 30px',
            borderRadius: '5px',
            boxShadow: '3px 4px 10px 0px rgb(159 123 206 / 61%)',
            // 3px 5px 10px 0px #aea4c2;
            borderBottom: `10px solid ${theme.palette.primary.main}99`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            '&:hover': {
                backgroundColor: `${theme.palette.primary.main}23`
            }
        },
        newBoard: {
            // backgroundColor: `${theme.palette.primary.main}10`,
            color: '#000',
            padding: '10px',
            height: '130px',
            width: '240px',
            margin: '30px 30px',
            borderRadius: '5px',
            boxShadow: '3px 4px 10px 0px #aea4c2',
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

// 1) Add New Board + 2) All Boards
const AllBoardsScreen = () => {
    const classes = useStyles();
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();

    const [allBoards, setAllBoards] = useState([]);
    const [open, setOpen] = useState(false);
    const [createdBoard, setCreatedBoard] = useState(false);

    // if user not authenticated, return to home screen
    const token = localStorage.trelloToken;
    useEffect(() => {
        if (localStorage.trelloToken) {
            setAuthHeader(localStorage.trelloToken);
        } else {
            history.push('/');
        }
    });

    // Fetch all boards
    const fetchAllBoards = async () => {
        try {
            // axios.defaults.headers.common['auth-token'] = token;
            const res = await api.get('/api/boards/allBoards',
                {
                    headers: {
                        'auth-token': token
                    }
                }
            );
            setAllBoards(res.data);
        } catch (error) {
            enqueueSnackbar('Something went wrong', { variant: 'error', autoHideDuration: 3000 });
        }
    };

    useEffect(() => {
        fetchAllBoards();
    }, [createdBoard]);

    // Add new board component

    return (
        <div className='boardsBgImage'>
            <Navbar isBoard={false} />
            <Box>
                <NewBoard
                    open={open}
                    setOpen={setOpen}
                    setCreatedBoard={setCreatedBoard}
                    createdBoard={createdBoard}
                />
            </Box>

            <Container maxWidth='lg'>
                <Box style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
                    {
                        allBoards === undefined
                            ? <CircularProgress />
                            : allBoards.map((board, i) => {
                                return (
                                    <>
                                        <NavLink to={`/board/${board._id}`} className={classes.navLink}>
                                            <Box className={classes.boards} key={i}>
                                                <Typography variant='subtitle1' style={{ letterSpacing: '-0.5px' }}>{board.boardTitle}</Typography>
                                            </Box>
                                        </NavLink>
                                    </>
                                );
                            })
                    }
                </Box>
            </Container>
        </div>
    );
};

const NewBoard = ({ open, setOpen, setCreatedBoard, createdBoard }) => {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const userName = localStorage.getItem('name') ? localStorage.getItem('name') : 'user';

    // New board api call
    const formik = useFormik({
        initialValues: {
            boardTitle: ''
        },
        validateOnChange: true,
        onSubmit: async (values) => {
            try {
                await api.post('/api/boards/newBoard',
                    values,
                    {
                        headers: {
                            'auth-token': localStorage.trelloToken
                        }
                    }
                );
                setOpen(!open);
                setCreatedBoard(!createdBoard);
                enqueueSnackbar('Board Created Successfully', { variant: 'success', autoHideDuration: 2000 });
            } catch (error) {
                enqueueSnackbar('Something went wrong', { variant: 'error', autoHideDuration: 3000 });
            }
        },
        validate: (values) => {
            formik.setStatus('');
            const errors = {};

            // if (values.password?.length <= 6) { errors.password = 'Password length must be greater than 6'; }
            return errors;
        }
    });

    return (
        <>
            <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
                <Typography variant='h4' style={{ marginTop: '50px', color: '#2F2E41', fontWeight: 600 }}>
                    Hello {userName} 👋
                </Typography>
                <Box className={classes.newBoard} onClick={() => setOpen(true)}>
                    <AddIcon style={{ fontSize: '50px', marginBottom: '10px', background: '#e6e6e6', borderRadius: '27px', color: '#2F2E41' }} />
                    <Typography variant='subtitle1'>
                        Create New Board
                    </Typography >
                </Box>
            </Box>
            <Modal open={open} onClose={() => setOpen(false)}>
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

export default AllBoardsScreen;
