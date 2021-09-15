import {
    Box, Divider, List, ListItem, ListItemIcon, ListItemText,
    createStyles, makeStyles, CircularProgress, Typography, Button
} from '@material-ui/core';

import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import PersonIcon from '@material-ui/icons/Person';
import DashboardIcon from '@material-ui/icons/Dashboard';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import FlareIcon from '@material-ui/icons/Flare';
import HomeIcon from '@material-ui/icons/Home';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import api from '../config/axiosConfig';

import Moment from 'react-moment';
import { useSnackbar } from 'notistack';
// import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
// import DescriptionIcon from '@material-ui/icons/Description';
// import PagesIcon from '@material-ui/icons/Pages';

const useStyles = makeStyles((theme) => {
    return createStyles({
        toolbar: theme.mixins.toolbar
    });
}
);

const MainDrawerContent = ({ isOpen, setIsOpen }) => {
    // const boardId = props.match.params.boardId;
    const { boardId } = useParams();

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
    useEffect(() => {
        fetchActivity();
    }, []);
    return (
        <Box>
            <div className={classes.toolbar} />
            <Divider />
            <Box style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
                <Typography style={{ fontSize: '23px', fontWeight: 600 }}>Activity</Typography>
            </Box>
            {activity === undefined
                ? (
                    <>
                        <Box className='board-loading'>
                            <CircularProgress />
                        </Box>
                    </>
                )
                : activity.slice(0, activityLists * 5).map((activity, i) => { // will map over the latest 5 activities
                    return (
                        <List component='div' key={i}>
                            <ListItem>
                                {/* <Typography style={{ fontSize: '13px' }}>{activity.text}</Typography>
                                <Typography style={{ fontSize: '8px' }}><Moment fromNow>{activity.date}</Moment></Typography> */}
                                <ListItemText
                                    primary={activity.text}
                                    secondary={<Moment fromNow>{activity.date}</Moment>}
                                />
                            </ListItem>
                        </List>
                    );
                })}
            <Box style={{ display: 'flex', flexDirection: 'column' }}>
                <Button
                    color='primary'
                    fullWidth
                    variant='contained'
                    className={classes.button}
                    disabled={activityLists * 5 > activity.length}
                    onClick={() => setActivityLists(activityLists + 1)}
                >
                    View More Activity
                </Button>
            </Box>
        </Box>
    );
};

export default MainDrawerContent;
