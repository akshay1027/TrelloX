import {
    Box, Divider, List, ListItem, ListItemText,
    createStyles, makeStyles, CircularProgress, Typography, Button
} from '@material-ui/core';

import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import api from '../../config/axiosConfig';

import Moment from 'react-moment';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles((theme) => {
    return createStyles({
        toolbar: theme.mixins.toolbar,
        button: {
            backgroundColor: '#ed4779',
            color: '#f5f5f5',
            marginTop: '20px',
            marginBottom: '20px',
            '&:hover': {
                cursor: 'pointer',
                backgroundColor: '#f7346f'
            }
        }
    });
}
);

const BoardActivity = ({ isOpen, setIsOpen }) => {
    // const boardId = props.match.params.boardId;
    const { boardId } = useParams();
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();
    const classes = useStyles();
    const [activity, setActivity] = useState([]);
    const [activityLists, setActivityLists] = useState(1);

    const fetchActivity = async () => {
        try {
            const res = await api.get(`/api/boards/activity/${boardId}`,
                {
                    headers: {
                        'auth-token': localStorage.getItem('trelloToken')
                    }
                }
            );
            setActivity(res.data);
        } catch (error) {
            enqueueSnackbar('Something went wrong', { variant: 'error', autoHideDuration: 3000 });
        }
    };

    const logout = async () => {
        localStorage.clear();
        enqueueSnackbar('Logged out, sign in again?', { variant: 'success', autoHideDuration: 3000 });
        history.push('/');
    };

    useEffect(() => {
        fetchActivity();
    }, []);
    return (
        <Box>
            <div className={classes.toolbar} />
            <Button
                color='primary'
                fullWidth
                variant='contained'
                className={classes.button}
                onClick={() => logout()}
            >
                Logout
            </Button>
            <Divider />
            <Box style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
                <Typography style={{ fontSize: '23px', fontWeight: 600 }}>Activity</Typography>
            </Box>
            {activity === undefined
                ? (
                    <Box>
                        <CircularProgress />
                    </Box>
                )
                : activity.slice(0, activityLists * 5).map((activity, i) => { // will map over the latest 5 activities
                    return (
                        <List component='div' key={i}>
                            <ListItem>
                                <ListItemText
                                    primary={activity.text}
                                    secondary={<Moment fromNow>{activity.date}</Moment>}
                                />
                            </ListItem>
                        </List>
                    );
                })}
            <Box>
                <Button
                    color='primary'
                    fullWidth
                    variant='contained'
                    // className={classes.button}
                    disabled={activityLists * 5 > activity.length}
                    onClick={() => setActivityLists(activityLists + 1)}
                >
                    View More Activity
                </Button>
            </Box>
        </Box>
    );
};

export default BoardActivity;
