import { authActions } from "../slices/authSlice";
import { request } from "../../utils/Axios";
import { toast } from "react-toastify";
import socket from "../../components/webSocketComps/socket";


//Login User
export function loginUser(user) {
    return async (dispatch) => {
        try {
            const res = await request.post("/api/auth/login", user)
            dispatch(authActions.login(res.data));
            localStorage.setItem("userInfo", JSON.stringify(res.data))
            if (!socket.connected) {
                socket.connect()
            }
            socket.emit("setUserId", res.data._id); // connect to socket  
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
    }
}
//logout User
export function logoutUser() {
    return async (dispatch) => {
        socket.disconnect();
        dispatch(authActions.logout());
        localStorage.removeItem("userInfo");
    }
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