import { createSlice } from '@reduxjs/toolkit';

const user = JSON.parse(localStorage.getItem('userInfo'))
console.log('USER', user)

export const userSlice = createSlice({
    name: "user",
    initialState: {
        userInfo: {
            username: user && user.username || "",
            email: user && user.email || "",
            profile: user && user.profile || ""
        },
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