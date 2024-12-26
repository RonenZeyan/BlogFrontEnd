import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user:
            localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,
        registerMSG: null,
    },
    reducers: {
        login(state, action) {
            state.user = action.payload;
            state.registerMSG = null;
        },
        logout(state) {
            state.user = null;
        },
        register(state, action) {
            state.registerMSG = action.payload;
        },
        setUserPhoto(state, action) {
            state.user.profilePhoto = action.payload;
        },
        setUsername(state, action) {
            state.user.username = action.payload;
        },
    }
});

const authReducer = authSlice.reducer;
const authActions = authSlice.actions;

export { authActions, authReducer }