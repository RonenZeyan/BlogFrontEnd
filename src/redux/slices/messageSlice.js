import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name: "message",
    initialState: {
        messages: [], 
        loading: false,
        isMessageCreated: false,
        message: null,
    },
    reducers: {
        setMessages(state, action) {
            state.messages = action.payload
        },
        setLoading(state) {
            state.loading = true
        },
        clearLoading(state) {
            state.loading = false
        },
        setIsMessageCreated(state) {
            state.isMessageCreated = true
            state.loading = false
        },
        clearIsMessageCreated(state) {
            state.isMessageCreated = false
        },
        setMessage(state, action) {
            state.message = action.payload;
        },

    }
});

const messageReducer = messageSlice.reducer;
const messageActions = messageSlice.actions;

export { messageActions, messageReducer }