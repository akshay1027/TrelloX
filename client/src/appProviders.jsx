import { createTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';

import App from './App';
import { AppTheme } from './config/materialThemeConfig';

const AppProviders = () => {
    const appliedTheme = createTheme(AppTheme);
    return (
        <ThemeProvider theme={appliedTheme}>
            <CssBaseline />
            <SnackbarProvider maxSnack={4}>
                <App />
            </SnackbarProvider>
        </ThemeProvider>
    );
};

export default AppProviders;
