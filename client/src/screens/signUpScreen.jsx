import { Box, Button, Container, TextField, Typography, Checkbox } from '@material-ui/core';

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import api from '../config/axiosConfig';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';

import Auth from '../assests/auth.svg';

const RegisterScreen = ({ match }) => {
    const { enqueueSnackbar } = useSnackbar();

    const [check, setCheck] = useState(false);
    const [checkError, setCheckError] = useState('');

    const formik = useFormik({
        initialValues: {
            email: '',
            name: '',
            password: ''
        },
        validateOnChange: true,
        onSubmit: async (values) => {
            try {
                const res = await api.post(
                    '/api/auth/signup',
                    values
                );
                localStorage.setItem('trelloToken', res.data.token);
                enqueueSnackbar('Sign Up Successful', { variant: 'success', autoHideDuration: 2000 });
                history.push('/boards');
            } catch (error) {
                enqueueSnackbar(error.response.data.errors.msg, { variant: 'error', autoHideDuration: 4000 });
                formik.setStatus(error.response.data.errors.msg);
            }
        },
        validate: (values) => {
            formik.setStatus('');
            const errors = {};

            // if (values.password?.length <= 6) { errors.password = 'Password length must be greater than 6'; }

            return errors;
        }
    });

    return (
        <Container maxWidth="sm" disableGutters>
            <Box mb={3} display="flex" flexDirection="column" p={{ xs: 0, sm: 2, md: 3 }} >
                <Box display='flex' flexDirection="column" alignItems='center'>
                    <img src={Auth} alt="" style={{ maxWidth: '85%' }} />
                </Box>
                <Typography variant='h5' style={{ marginTop: '16px', alignSelf: 'center', fontWeight: 560 }}> Sign Up </Typography>
                <Box mt={2} px={4}>
                    {
                        <form id='businessUserRegistrationForm' onSubmit={formik.handleSubmit}>
                            <Box display="flex" flexDirection="column">
                                <TextField
                                    required
                                    name="name"
                                    label="User Name"
                                    onChange={formik.handleChange}
                                    value={formik.values.name}
                                    error={!!formik.errors.name}
                                    helperText={formik.errors.name}
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
                                <Button type='submit' size="large" variant="contained" color="primary"
                                    style={{ width: '100%', padding: '12px', boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)' }} >
                                    Sign UP
                                </Button>
                            </Box>
                        </form>
                    }
                </Box>
                <span style={{ marginTop: '16px', alignSelf: 'center', fontSize: '16px' }}>
                    Already have an account ? <Link to="/signin" style={{ color: '#9e61ff', fontSize: '18px', fontWeight: 600 }}> SignIn </Link>
                </span>
            </Box>
        </Container>
    );
};

export default RegisterScreen;
