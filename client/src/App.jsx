import React, { useState, useEffect, Suspense, lazy } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {
    Box, LinearProgress,
    createStyles, makeStyles,
    Theme
} from '@material-ui/core';

import setAuthHeader from './utils/authHeader';

const HomeScreen = lazy(() => import('./screens/homeScreen'));
const RegisterScreen = lazy(() => import('./screens/registerScreen'));
const LogInScreen = lazy(() => import('./screens/logInscreen'));

if (localStorage.token) {
    setAuthHeader(localStorage.token);
}

const App = () => {
    return (
        <Router>
            <Suspense fallback={<LinearProgress />}>
                <Switch>
                    <Route path='/' component={HomeScreen} />
                    <Route path='/register' component={RegisterScreen} />
                    <Route path='/signin' component={LogInScreen} />
                    <Route path='/boards' component={HomeScreen} />
                    <Route path='/boards/:id' component={HomeScreen} />
                </Switch>
            </Suspense>
        </Router>
    );
};

export default App;
