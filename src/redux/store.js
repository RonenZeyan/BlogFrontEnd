import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { profileReducer } from "./slices/profileSlice";
import { postReducer } from "./slices/postSlice";
import { categoryReducer } from "./slices/categorySlice";
import { commentReducer } from "./slices/commentSlice";
import { notificationReducer } from "./slices/notificationSlice";
import { messageReducer } from "./slices/messageSlice";


const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        post: postReducer,
        category: categoryReducer,
        comment: commentReducer,
        notification: notificationReducer,
        message: messageReducer,
    }
});

export default store;