import React, { useState, useEffect, Suspense, lazy } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom';
import {
    Box, LinearProgress,
    createStyles, makeStyles,
    Theme
} from '@material-ui/core';

import setAuthHeader from './utils/authHeader';

const HomeScreen = lazy(() => import('./screens/homeScreen'));
const SignUpScreen = lazy(() => import('./screens/signUpScreen'));
const SignInScreen = lazy(() => import('./screens/signInscreen'));
const AllBoardsScreen = lazy(() => import('./screens/allBoardsScreen'));

// if (localStorage.trelloToken) {
//     setAuthHeader(localStorage.trelloToken);
// }

const App = () => {
    // const location = useLocation();

    useEffect(() => {
        if (localStorage.getItem('trelloToken')) {
            // console.log(localStorage.getItem('trelloToken'));
            setAuthHeader(localStorage.getItem('trelloToken'));
        }
    });
    return (
        <Router>
            <Switch>
                <Suspense fallback={<LinearProgress />}>
                    <Route exact path='/' component={HomeScreen} />
                    <Route path='/register' component={SignUpScreen} />
                    <Route path='/login' component={SignInScreen} />
                    <Route path='/boards' component={AllBoardsScreen} />
                    {/* <Route exact path='/boards/:id' component={HomeScreen} /> */}
                </Suspense>
            </Switch>
        </Router>
    );
};

export default App;
