import React, { lazy } from 'react';
import { Box, Typography, Container, createStyles, makeStyles, Grid, Button, List, ListItem, ListItemIcon, IconButton } from '@material-ui/core';
import prod1 from '../assests/prod1.svg';
// import HomePageForm from '../components/homePageForm';
import InstagramIcon from '@material-ui/icons/Instagram';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { NavLink, useHistory } from 'react-router-dom';

const Navbar = lazy(() => import('../components/navbar'));

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
        }
    });
}
);

const allBoardsScreen = () => {
    return (
        <>
            <Navbar />
            <Typography variant='h2'>All Boards</Typography>
        </>
    );
};

export default allBoardsScreen;
