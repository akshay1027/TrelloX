import { createSlice } from '@reduxjs/toolkit';

// let createNewBoardLocalStorage;
// const localStroageDarkmode = localStorage.getItem('darkmode');

// // Set newBoard from localStorage, defaults to false (light theme)
// localStroageDarkmode === 'true'
//     ? createNewBoardLocalStorage = true
//     : createNewBoardLocalStorage = false;

export const boardSlice = createSlice({
    name: 'board',
    initialState: {
        // mobileMainDrawerOpen: false,
        // addOrderDialogOpen: false,
        newBoard: false
    },
    reducers: {
        setNewBoard: (state, action) => {
            state.newBoard = action.payload.newBoard;
        }
    }
});

// Action creators are generated for each case reducer function
export const { setNewBoard } = boardSlice.actions;

export default boardSlice.reducer;
