import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal, TextField, Button, makeStyles, createStyles, Box } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

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
            backgroundColor: `${theme.palette.primary.main}10`,
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
            textAlign: 'center',
            outline: 'none'
        },
        paper: {
            // display: 'flex',
            // flexDirection: 'column',
            width: '400',
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
        }
    });
}
);
const CreateBoard = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
    };

    return (
        <Box>
            <Box className={classes.boards} onClick={() => setOpen(true)}>
                Create new board
            </Box>
            <Modal open={open} onClose={() => setOpen(false)}>
                <Box className={classes.paper}>
                    <Box style={{ display: 'flex' }}>
                        <h1>Create New Board</h1>
                        <Button onClick={() => setOpen(false)}>
                            <CloseIcon />
                        </Button>
                    </Box>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <TextField
                            variant='outlined'
                            margin='normal'
                            required
                            fullWidth
                            label='Add board title'
                            autoFocus
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <Button type='submit' fullWidth variant='contained' color='primary'>
                            Create Board
                        </Button>
                    </form>
                </Box>
            </Modal>
        </Box>
    );
};

export default withRouter(CreateBoard);
