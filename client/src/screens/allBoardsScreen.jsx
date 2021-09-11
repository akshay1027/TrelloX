import React, { lazy } from 'react';
import { Box, Typography, Container, createStyles, makeStyles, Grid, Button, List, ListItem, ListItemIcon, IconButton } from '@material-ui/core';
import prod1 from '../assests/prod1.svg';
// import HomePageForm from '../components/homePageForm';
import InstagramIcon from '@material-ui/icons/Instagram';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { NavLink, useHistory } from 'react-router-dom';

const Navbar = lazy(() => import('../components/navbar'));
const NewBoard = lazy(() => import('../components/newBoard'));

const useStyles = makeStyles((theme) => {
    return createStyles({
        titleBackground: {
            backgroundColor: `${theme.palette.secondary.main}40`
        },
        button1: {
            backgroundColor: `${theme.palette.primary.main}`,
            marginTop: '20px',
            padding: '10px 21px',
            fontWeight: 600,
            fontSize: '17px',
            '&:hover': {
                color: `${theme.palette.primary.main}`,
                backgroundColor: `${theme.palette.fourth.main}10`
            }
        },
        button2: {
            backgroundColor: `${theme.palette.primary.main}20`,
            marginTop: '20px',
            padding: '10px 21px',
            fontWeight: 600,
            fontSize: '17px',
            border: 'solid 2px #9750de',
            marginLeft: '20px',
            color: `${theme.palette.primary.main}`,
            '&:hover': {
                color: `${theme.palette.fourth.main}`,
                backgroundColor: `${theme.palette.fourth.main}10`
            }
        },
        icons: {
            color: `${theme.palette.third.main}`,
            '&:hover': {
                color: `${theme.palette.primary.main}`
            },
            fontSize: '40px',
            margin: '0px 10px'
        },
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
        }
    });
}
);

const allBoardsScreen = () => {
    const classes = useStyles();
    return (
        <>
            <Navbar />
            <Box style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
                {/* <Box className={classes.boards}>
                    <Typography variant='body1' style={{ fontWeight: 600, letterSpacing: '-0.5px' }}>Add New Board</Typography>
                </Box> */}
                <NewBoard />
                <Box className={classes.boards}>
                    <Typography style={{ fontWeight: 600, letterSpacing: '-0.5px' }}>Add New Board brrroo wtf broooooooooooo</Typography>
                </Box>
            </Box>
        </>
    );
};

export default allBoardsScreen;
