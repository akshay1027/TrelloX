/* eslint-disable indent */
import React, { useState, useContext } from 'react';
import { Paper, InputBase, Button, IconButton } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { makeStyles } from '@material-ui/core/styles';
import StoredAPI from '../utils/storedApi';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles(theme => ({
    card: {
        margin: theme.spacing(0, 1, 1, 1),
        paddingBottom: theme.spacing(4)
    },
    input: {
        margin: theme.spacing(1)
    },
    btnConfirm: {
        backgroundColor: `${theme.palette.primary.main}`,
        color: '#fff',
        '&:hover': {
            backgroundColor: `${theme.palette.fourth.main}`
        },
        cursor: 'pointer'
    },
    confirm: {
        margin: theme.spacing(0, 1, 1, 1)
    }
}));

const InputCard = ({ setOpen, listID, index, type }) => {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const [title, setTitle] = useState();
    const { addCard, addList } = useContext(StoredAPI);

    const handleAddCard = () => {
        // title length has to be within 3 to 20 characters
        if (title?.length <= 20 && title?.length >= 3) {
            addCard(title, index);
            setOpen(false);
            setTitle('');
        } else {
            enqueueSnackbar('title has to be within 3 to 20 characters', { variant: 'error', autoHideDuration: 4000 });
            // alert('Please enter title within 3 to 20 characters.');
        }
    };

    const handleAddList = () => {
        // title length has to be within 3 to 20 characters, optional chaining to avoid error
        if (title?.length <= 20 && title?.length >= 3) {
            addList(title);
            setOpen(false);
            setTitle('');
        } else {
            enqueueSnackbar('title has to be within 3 to 20 characters', { variant: 'error', autoHideDuration: 4000 });
            // alert('Please enter title within 3 to 20 characters.');
        }
    };

    return (
        <div>
            <div>
                <Paper className={classes.card}>
                    <InputBase multiline fullWidth inputProps={{
                        className: classes.input
                    }}
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        onBlur={() => setOpen(false)}
                        placeholder={(type === 'card')
                            ? 'Enter new card title'
                            : 'Enter new list title'} />
                </Paper>
            </div>

            <div className={classes.confirm}>

                {type === 'card'
                    ? (
                        <Button className={classes.btnConfirm}
                            onClick={handleAddCard}>
                            Add Card
                        </Button>
                    )
                    : (
                        <Button className={classes.btnConfirm}
                            onClick={handleAddList}>
                            Add List
                        </Button>
                    )}

                <IconButton>
                    <ClearIcon onClick={() => setOpen(false)} />
                </IconButton>
            </div>

        </div>
    );
};

export default InputCard;
