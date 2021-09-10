const isAuthenticated = () => {
    if (localStorage.getItem('trelloToken')) {
        console.log(localStorage.getItem('trelloToken'));
        return true; // token present
    }
    return false;
};

export default isAuthenticated;
