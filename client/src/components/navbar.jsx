import React, { useState } from 'react';
import {
    AppBar, IconButton, Toolbar, Typography,
    createStyles, makeStyles,
    Box, Drawer, Tooltip
} from '@material-ui/core';

import BoardActivity from './board/boardActivity';

import MenuIcon from '@material-ui/icons/Menu';
// import Brightness5Icon from '@material-ui/icons/Brightness5';
// import Brightness4Icon from '@material-ui/icons/Brightness4';

export const mainDrawerWidth = 300;

const useStyles = makeStyles((theme) =>
    createStyles({
        // menuButton: {
        //     marginRight: theme.spacing(2),
        //     [theme.breakpoints.up('lg')]: {
        //         display: 'none'
        //     }
        // }
        appBar: {
            color: `${theme.palette.primary.main}`,
            backgroundColor: `${theme.palette.fourth.main}`,
            zIndex: theme.zIndex.drawer + 1
        },
        drawer: {
            [theme.breakpoints.up('lg')]: {
                width: mainDrawerWidth,
                flexShrink: 0
            }
        },
        drawerPaper: {
            width: mainDrawerWidth,
            backgroundColor: '#f0f0f0'
            // color: `${theme.palette.third.main}`
        }
    })
);

const Navbar = ({ isBoard }) => {
    const classes = useStyles();
    const [isOpen, setIsOpen] = useState(false);

    const userName = localStorage.getItem('name') ? localStorage.getItem('name') : 'user';

    return (
        <>
            <AppBar position="sticky" className={classes.appBar}>
                <Toolbar>
                    <Box display="flex" alignItems='center' justifyContent='space-between' style={{ width: '100%', height: '100%' }}>
                        {/* {isBoard &&
                            <Tooltip title='Billion Dollar Company 😜'>
                                <Typography style={{ fontWeight: 700, fontSize: '20px', marginRight: '0px' }} >
                                    <em>TrelloX</em>
                                </Typography>
                            </Tooltip>
                        } */}
                        <Typography style={{ fontWeight: 700, fontSize: '22px', marginRight: '5px' }} >
                            Hello {userName} 👋
                        </Typography>
                        {isBoard &&
                            <Tooltip title='Menu'>
                                <IconButton edge="start" color="inherit" aria-label="menu" onClick={(e) => setIsOpen(!isOpen)}>
                                    <MenuIcon style={{ fontSize: '27px' }} />
                                </IconButton>
                            </Tooltip>
                        }
                        {/* <IconButton edge="start" color="inherit" aria-label="dark theme" onClick={(e) => setIsDarkmode(!isDarkmode)}>
                        {isDarkmode ? <Brightness5Icon /> : <Brightness4Icon />}
                    </IconButton> */}
                    </Box>
                </Toolbar>
            </AppBar>
            {
                isOpen &&
                <nav className={classes.drawer}>
                    <Drawer classes={{ paper: classes.drawerPaper }} variant='permanent' anchor='right'>
                        <BoardActivity isOpen={isOpen} setIsOpen={setIsOpen} />
                    </Drawer>
                </nav>
            }
        </>
    );
};

export default Navbar;
