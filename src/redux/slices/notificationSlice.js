import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: "notification",
    initialState: {
        UnreadNotifications: [],
    },
    reducers: {
        fetchUnreaderNotifications(state, action) {
            state.UnreadNotifications = action.payload;
        },
        setNewNotification(state, action) {
            state.UnreadNotifications.push(action.payload);
        },
        setNotificationReaded(state, action) {
            state.UnreadNotifications = state.UnreadNotifications.filter(
                (n) => n._id !== action.payload
            );
        },
    },
});

const notificationReducer = notificationSlice.reducer;
const notificationActions = notificationSlice.actions;

export { notificationActions, notificationReducer };
