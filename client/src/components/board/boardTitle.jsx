import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, IconButton, Tooltip } from '@material-ui/core';

import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import api from '../../config/axiosConfig';

import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';

// 1) Board Title + 2) Edit Board Title
const BoardTitle = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { boardId } = useParams();
    // const token = localStorage.trelloToken;

    const [boardTitle, setBoardTitle] = useState('');
    const [editTitle, setEditTitle] = useState(false);

    const fetchBoardTitle = async () => {
        try {
            const res = await api.get(`/api/boards/${boardId}`,
                {
                    headers: {
                        'auth-token': localStorage.trelloToken
                    }
                }
            );
            setBoardTitle(res.data.boardTitle);
            // console.log(res.data.boardTitle);
        } catch (error) {
            enqueueSnackbar('Something went wrong', { variant: 'error', autoHideDuration: 3000 });
        }
    };

    const editBoardTitle = async () => {
        try {
            const res = await api.patch(`/api/boards/updateTitle/${boardId}`,
                {
                    boardTitle,
                    headers: {
                        'auth-token': localStorage.trelloToken
                    }
                }
            );
            setBoardTitle(res.data.boardTitle);
            enqueueSnackbar('Title Updated Successfully', { variant: 'success', autoHideDuration: 3000 });
            setEditTitle(!editTitle);
        } catch (error) {
            enqueueSnackbar('Something went wrong', { variant: 'error', autoHideDuration: 3000 });
        }
    };

    useEffect(() => {
        fetchBoardTitle();
    }, []);
    return (
        <>
            <Box my={2} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {
                    editTitle
                        ? (
                            <Box>
                                <TextField
                                    required
                                    label="Board Title"
                                    name='boardTitle'
                                    variant='outlined'
                                    value={boardTitle}
                                    onChange={(e) => setBoardTitle(e.target.value)}
                                    style={{ minWidth: '160px' }}
                                    inputProps={{ style: { fontSize: 18 } }}
                                />
                                <Tooltip title='Save Board Title'>
                                    <IconButton onClick={() => editBoardTitle()}>
                                        <SaveIcon style={{ fontSize: '30px' }} />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        )
                        : (
                            <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {/* <Paper elevation={0} style={{ padding: '10px 10px' }}> */}
                                <Box>
                                    <Typography style={{ minWidth: '120px', fontWeight: 600, fontSize: '25px' }}>{boardTitle} </Typography>
                                </Box>
                                {/* </Paper> */}
                                <Tooltip title='Edit Board Title'>
                                    <IconButton onClick={(e) => setEditTitle(!editTitle)}>
                                        <EditIcon style={{ fontSize: '28px' }} />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        )
                }
            </Box>
        </>
    );
};

export default BoardTitle;
