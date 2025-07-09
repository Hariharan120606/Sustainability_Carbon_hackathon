import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        user: 'admin',
        error: null,
        token: null,
        alertmsg: null
    },
    reducers: {
        registerSuccess: (state, action) => {
            state.user = action.payload;
            state.isLoggedIn = true;
            state.error = null;
            state.alertmsg = action.payload.message || 'User Registered Successfully';
        },
        registerFailure: (state, action) => {
            state.error = action.payload;
            state.isLoggedIn = false;
            state.alertmsg = action.payload
        },
        loginSuccess: (state, action) => {
            state.user = action.payload;
            state.token = localStorage.getItem('token');
            state.isLoggedIn = true;
            state.error = null;
        },
        loginFailure: (state, action) => {
            state.error = action.payload;
            state.isLoggedIn = false;
            state.alertmsg = action.payload
        },
        clearAlert: (state) => {
            state.alertmsg = null;
        }
    }
})

export const {
    registerSuccess,
    registerFailure,
    loginSuccess,
    loginFailure,
    clearAlert
} = UserSlice.actions;

export default UserSlice.reducer;
