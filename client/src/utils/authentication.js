import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
// import { useAppSelector, useAppDispatch } from 'redux/store';

import { useSnackbar } from 'notistack';
import setAuthHeader from './authHeader';
// import api from 'config/axiosConfig';
// import { storeUser } from 'redux/userSlice';

const Authentication = () => {
    const location = useLocation();
    const history = useHistory();
    // const user = useAppSelector(state => state.user);
    const { enqueueSnackbar } = useSnackbar();
    // const dispatch = useAppDispatch();

    // const fetchUserDetails = async () => {
    //     try {
    //         const res = await api.get('/api/businessUser');
    //         dispatch(storeUser(res.data));
    //     } catch (error) {
    //         if (error?.response?.status === 400) {
    //             enqueueSnackbar(error.response.data.message, { variant: 'error', autoHideDuration: 3500 });
    //         } else {
    //             enqueueSnackbar('Something went wrong', { variant: 'error', autoHideDuration: 2000 });
    //         }
    //     }
    // };

    useEffect(() => {
        // Check if user is logged in by checking if a token exists in local storage
        const token = localStorage.getItem('trelloToken');
        if (location.pathname.startsWith('/login') || location.pathname.startsWith('/register') || location.pathname.startsWith('/logout')) {
            return;
        }

        if (token) {
            setAuthHeader(localStorage.trelloToken);
        }
        // Check if user object exists in redux, if not make an api call
        // if (token && user.businessUserId === -1) {
        //     fetchUserDetails();
        // }

        if (!token && location.pathname.startsWith('/boards') === true) {
            // Redirect to login if user is not authenticated
            history.push('/');
        }
        // else if (token && location.pathname.startsWith('/app') === false) {
        //     // Redirect to profile if user is authenticated, but is on the register or login page
        //     history.push('/app/profile');
        // }
    }, [location]);

    return null;
};

export default Authentication;
