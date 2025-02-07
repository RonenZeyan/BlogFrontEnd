import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name: "message",
    initialState: {
        messages: [],
        loading: false,
        isMessageCreated: false,
        message: null,
        unreadedMessages: [],
    },
    reducers: {
        setMessages(state, action) {            
            state.messages = action.payload;            
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
                const selectedMessage = state.messages.find((message) => message._id === action.payload);
                if (selectedMessage) {
                    state.message = selectedMessage;
                } else {
                    state.message = null;
                }
        },
        updateMessage(state, action) {
            state.message.messages.push(action.payload);
        },
        setUnreadedMessages(state, action) {
            state.unreadedMessages = action.payload;
        },
        setNewMessage(state, action) {
            state.unreadedMessages.push(action.payload);
        },
        setReaded(state, action) {
            state.messages = state.messages.map((message) =>
                message._id === action.payload
                    ? { ...message, isRead: true }
                    : message
            );
        },
        setReadedMessage(state, action) { //to delete the msg from unreaded messages
            state.unreadedMessages = state.unreadedMessages.filter(
                (message) => message._id !== action.payload
            );
        },


    }
});

const messageReducer = messageSlice.reducer;
const messageActions = messageSlice.actions;

export { messageActions, messageReducer }