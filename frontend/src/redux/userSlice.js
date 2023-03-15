import { createSlice } from '@reduxjs/toolkit';

const user = JSON.parse(localStorage.getItem('userInfo'))

export const userSlice = createSlice({
    name: "user",
    initialState: {
        userInfo: user ? user : "",
        pending: false,
        error: false
    }, 
    reducers: {
        loginStart: (state) => {
            state.pending= true;
        },
        loginSuccess: (state, action) => {
            state.pending = false;
            state.userInfo.username = action.payload.username;
            state.userInfo.email = action.payload.email;
            state.userInfo.profile = action.payload.profile;
        },
        loginError: (state) => {
            state.error = true
            state.pending = false
        },
        logoutUser: (state) => (state.userInfo = {})

    }
})

export const { loginStart, loginSuccess, loginError, logoutUser } = userSlice.actions;

export default userSlice.reducer;