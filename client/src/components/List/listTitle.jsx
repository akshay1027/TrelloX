import React, { useState, useContext } from 'react';
import { Box, Typography, TextField, IconButton, Tooltip } from '@material-ui/core';

import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

// import api from '../../config/axiosConfig';
import StoredAPI from '../../utils/storedApi';

import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';

// Prev List Title and Index of List sent as props
const ListTitle = ({ title, index }) => {
    const { enqueueSnackbar } = useSnackbar();
    const { boardId } = useParams();

    const { updateListTitle, deleteList } = useContext(StoredAPI);

    const [listTitle, setListTitle] = useState(title);
    const [editTitle, setEditTitle] = useState(false);

    const editBoardTitle = () => {
        if (listTitle.length >= 3 && listTitle.length <= 20) {
            updateListTitle(listTitle, index);
            setEditTitle(!editTitle);
        } else {
            enqueueSnackbar('Please enter within 3 to 20 characters.', { variant: 'error', autoHideDuration: 5000 });
        }
    };

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
                                    name='listTitle'
                                    variant='outlined'
                                    value={listTitle}
                                    onChange={(e) => setListTitle(e.target.value)}
                                    style={{ minWidth: '160px' }}
                                    inputProps={{ style: { fontSize: 18 } }}
                                />
                                <Tooltip title='Save List Title'>
                                    <IconButton onClick={() => editBoardTitle()}>
                                        <SaveIcon style={{ fontSize: '30px' }} />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        )
                        : (
                            <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Box>
                                    <Typography style={{ minWidth: '120px', fontWeight: 600, fontSize: '25px' }}>{listTitle} </Typography>
                                </Box>
                                <Tooltip title='Edit List Title'>
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

export default ListTitle;
