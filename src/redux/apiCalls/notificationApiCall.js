import { request } from "../../utils/Axios";
import { toast } from "react-toastify";
import { notificationActions } from "../slices/notificationSlice";

export function getAllNotifications() {
    return async (dispatch, getState) => {
        try {
            dispatch(notificationActions.setLoading());
            const res = await request.get("/api/notifications", {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                },
            });
            // console.log(res);
            dispatch(notificationActions.fetchUnreaderNotifications(res.data));
            dispatch(notificationActions.clearLoading());
        } catch (error) {
            toast.error(error.response.data.message);
            dispatch(notificationActions.clearLoading());
            console.log(error);
        }
    };
}

export function setNotificationReaded(notificationId) {
    return async (dispatch, getState) => {
        try {
            await request.post(
                `/api/notifications/${notificationId}`,
                {},
                {
                    headers: {
                        Authorization: "Bearer " + getState().auth.user.token,
                    },
                }
            );
            dispatch(notificationActions.setNotificationReaded(notificationId));
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
    };
}



//Register User
export function registerUser(user) {
    return async (dispatch) => {
        try {
            const res = await request.post("/api/auth/register", user)
            dispatch(authActions.register(res.data.message));
            // localStorage.setItem("userInfo",JSON.stringify(res.data))

        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}