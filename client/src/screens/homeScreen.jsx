import React from 'react';
import { Box, Typography, createStyles, makeStyles, Grid, Button, IconButton } from '@material-ui/core';
import prod1 from '../assests/prod1.svg';
// import HomePageForm from '../components/homePageForm';
import InstagramIcon from '@material-ui/icons/Instagram';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { useHistory } from 'react-router-dom';
import '../App.css';

const useStyles = makeStyles((theme) => {
    return createStyles({
        titleBackground: {
            backgroundColor: `${theme.palette.secondary.main}40`
        },
        footerBackground: {
            backgroundColor: `${theme.palette.fourth.main}`
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
        svg: {
            height: '300px',
            width: 'auto',
            [theme.breakpoints.down('md')]: {
                marginTop: '50px'
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

const HomeScreen = () => {
    const classes = useStyles();
    const history = useHistory();

    // To open link in new tab on click
    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
        if (newWindow) newWindow.opener = null;
    };

    if (localStorage.getItem('trelloToken')) {
        history.push('/board');
    }

    return (
        <Box width='100%'>
            <Box py={{ xs: 10, md: 14 }}>
                <Grid container maxWidth='lg' style={{ justifyContent: 'center' }}>
                    <Grid item sm={12} md={5} className={classes.titleBackground} style={{ margin: '0px 10px' }}>
                        <Box py={10} px={2} display="flex" flexDirection='column' alignItems='center' justifyContent='center'>
                            <Typography className='textGradient'>TrelloX</Typography>
                            <Typography style={{ fontWeight: 800, fontSize: '40px', textAlign: 'center', color: '#2F2E41' }}>
                                Maximizing Productivity
                            </Typography>
                            <Box display="flex">
                                <Button className={classes.button1} size='large' variant='contained'
                                    onClick={e => history.push('/register')}>
                                    SignUp
                                </Button>
                                <Button className={classes.button2} size='large' variant='contained'
                                    onClick={e => history.push('/login')}>
                                    login
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item sm={12} md={6} style={{ display: 'flex', justifyContent: 'center' }}>
                        <Box display='flex' alignItems='center' justifyContent='center'>
                            <img src={prod1} className={classes.svg} />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            {/* <Box>
                <HomePageForm />
            </Box> */}
            <Box pt={10}>
                <Grid container maxWidth='lg' style={{ display: 'inline', justifyContent: 'center' }}>
                    <Grid item sm={12} md={12} className={classes.footerBackground}>
                        <Box pt={8} px={2} display="flex" flexDirection='column' alignItems='center' justifyContent='center'>
                            <Typography style={{ fontSize: '45px', textAlign: 'center', marginRight: '5px' }}>
                                🤘🏻
                            </Typography>
                        </Box>
                        <Box pt={3} px={0} display="flex" alignItems='center' justifyContent='center'>
                            <IconButton onClick={() => openInNewTab('https://github.com/akshay1027')}>
                                <GitHubIcon className={classes.icons} style={{ fontSize: '34px' }} />
                            </IconButton>
                            <IconButton onClick={() => openInNewTab('https://www.linkedin.com/in/akshayrr1027/')}>
                                <LinkedInIcon className={classes.icons} />
                            </IconButton>
                            <IconButton onClick={() => openInNewTab('https://www.instagram.com/akshay_rr10/')}>
                                <InstagramIcon className={classes.icons} />
                            </IconButton>
                        </Box>
                        <Box pt={3} px={0} display="flex" alignItems='center' justifyContent='center'>
                            <Typography style={{ fontWeight: 600, fontSize: '20px', color: '7014115' }}>Made With Love By Akshay R R ❤</Typography>
                        </Box>
                        <Box pt={3} px={0} pb={10} display="flex" alignItems='center' justifyContent='center'>
                            <Typography style={{ fontWeight: 600, fontSize: '20px', color: '7014115' }}>Copyright @ AstroLearn 2021</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default HomeScreen;
