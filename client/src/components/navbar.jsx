import React, { useState } from 'react';
import {
    AppBar, IconButton, Toolbar, Typography,
    createStyles, makeStyles,
    Box, Drawer, Tooltip
} from '@material-ui/core';

import BoardActivity from '../components/boardComponents/boardActivity';

import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
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

    // Function to set darkmode to local storage
    // const handleDarkMode = () => {
    //     const localStroageDarkmode = localStorage.getItem('darkmode');

    //     // Set darkTheme from localStorage, defaults to false (light theme)
    //     localStroageDarkmode === 'true'
    //         ? darkThemeLocalStorage = true
    //         : darkThemeLocalStorage = false;
    //     setIsDarkmode(darkThemeLocalStorage);
    //     darkThemeLocalStorage
    //         ? localStorage.setItem('darkmode', 'true')
    //         : localStorage.setItem('darkmode', 'false');
    // };

    // // If theme is changed, call function
    // useEffect(() => {
    //     handleDarkMode();
    // }, [isDarkmode]);

    return (
        <>
            <AppBar position="sticky" className={classes.appBar}>
                <Toolbar>
                    <Box display="flex" alignItems='center' justifyContent='space-between' style={{ width: '100%', height: '100%' }}>
                        {isBoard &&
                            <Tooltip title='Home'>
                                <IconButton edge="start" color="inherit" aria-label="home">
                                    <HomeIcon style={{ fontSize: '27px' }} />
                                </IconButton>
                            </Tooltip>
                        }
                        <Tooltip title='Billion Dollar Company 😜'>
                            <Typography style={{ fontWeight: 700, fontSize: '25px', marginRight: '5px' }} >
                                TrelloX
                            </Typography>
                        </Tooltip>
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
