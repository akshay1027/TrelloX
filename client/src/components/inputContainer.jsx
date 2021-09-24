import React, { useState } from 'react';
import { Paper, Collapse, Typography } from '@material-ui/core';
import { makeStyles, fade } from '@material-ui/core/styles';
import InputBox from './inputBox';

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(1),
        minWidth: '300px',
        cursor: 'pointer'
    },
    addCard: {
        padding: theme.spacing(1, 1, 1, 1),
        margin: theme.spacing(0, 1, 1, 1),
        backgroundColor: '#EBECF0',
        '&:hover': {
            backgroundColor: 'grey'
        }
    }
}));

const InputContainer = ({ listID, index, type }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    return (
        <div className={classes.root}>
            {/* If collapse in is true, component will render in */}
            <Collapse in={open}>
                <InputBox setOpen={setOpen} listID={listID} index={index} type={type} />
            </Collapse>
            <Collapse in={!open}>
                <Paper className={classes.addCard} elevation={1}
                    onClick={() => setOpen(!open)}>
                    <Typography>
                        {type === 'card' ? '+ Add a new card' : '+ Add a new list'}
                    </Typography>
                </Paper>
            </Collapse>
        </div>
    );
};

export default InputContainer;
