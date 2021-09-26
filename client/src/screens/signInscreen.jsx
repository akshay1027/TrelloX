import { Box, Button, Container, TextField, Typography } from '@material-ui/core';

import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../config/axiosConfig';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';

import Auth from '../assests/auth.svg';

import io from 'socket.io-client';

const clientSocket = io('http://localhost:5001/');

const SignInScreen = () => {
    clientSocket.on('connect', () => {
        console.log('Client connected.');
    });

    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();

    // const [check, setCheck] = useState(false);
    // const [checkError, setCheckError] = useState('');
    useEffect(() => {
        if (localStorage.getItem('trelloToken')) {
            history.push('/board');
        }
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validateOnChange: true,
        onSubmit: async (values) => {
            try {
                const res = await api.post(
                    '/api/auth/signin',
                    values
                );
                localStorage.setItem('trelloToken', res.data.token);
                localStorage.setItem('name', res.data.name);
                localStorage.setItem('userId', res.data.id);
                localStorage.setItem('email', values.email);
                enqueueSnackbar('Sign In Successful', { variant: 'success', autoHideDuration: 2000 });
                history.push('/board');
            } catch (error) {
                enqueueSnackbar(error.response.data.error, { variant: 'error', autoHideDuration: 4000 });
                formik.setStatus(error.response.data.error);
            }
        },
        validate: (values) => {
            formik.setStatus('');
            const errors = {};

            if (values.password?.length <= 5) { errors.password = 'Password length must be greater than of equal to 6'; }

            // const atposition = values.emailId.trim().indexOf('@');
            // const dotposition = values.emailId.trim().lastIndexOf('.');
            // if (atposition < 1 || dotposition < atposition + 2 || dotposition + 2 >= values.emailId.trim().length) {
            //     errors.emailId = 'Please enter a valid email Id';
            // }

            return errors;
        }
    });

    return (
        <Container maxWidth="sm" disableGutters>
            <Box mb={3} display="flex" flexDirection="column" p={{ xs: 0, sm: 2, md: 3 }} >
                <Box display='flex' flexDirection="column" alignItems='center'>
                    <img src={Auth} alt="" style={{ maxWidth: '85%' }} />
                </Box>
                <Typography variant='h5' style={{ marginTop: '16px', alignSelf: 'center', fontWeight: 560 }}> Sign In </Typography>
                <Box mt={2} px={4}>
                    {
                        <form id='businessUserRegistrationForm' onSubmit={formik.handleSubmit}>
                            <Box display="flex" flexDirection="column">
                                <TextField
                                    required
                                    name="email"
                                    label="Email Id"
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                    error={!!formik.errors.email}
                                    helperText={formik.errors.email}
                                    variant="outlined"
                                    style={{ marginBottom: '24px', boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)' }}
                                />
                                <TextField
                                    required
                                    name="password"
                                    label="Password"
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                    error={!!formik.errors.password}
                                    helperText={formik.errors.password}
                                    variant="outlined"
                                    style={{ marginBottom: '24px', boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)' }}
                                />
                                <Button type='submit' size="large" variant="contained" color="primary"
                                    style={{ width: '100%', padding: '12px', boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)' }} >
                                    Sign In
                                </Button>
                            </Box>
                        </form>
                    }
                </Box>
                <span style={{ marginTop: '16px', alignSelf: 'center', fontSize: '16px' }}>
                    Dont have an account ? <Link to="/register" style={{ color: '#9e61ff', fontSize: '18px', fontWeight: 600 }}> SignUp </Link>
                </span>
            </Box>
        </Container>
    );
};

export default SignInScreen;
