import { request } from "../../utils/Axios";
import { toast } from "react-toastify";
import { messageActions } from "../slices/messageSlice";




//fetch messages
export function fetchMessages() {
    return async (dispatch,getState) => {
        try {
            const {data} = await request.get(`/api/messages`, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            });
            console.log(data);
            dispatch(messageActions.setMessages(data));
            
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}

//create message
export function createMessage(messageData) {
    return async (dispatch, getState) => {
        try {
            dispatch(messageActions.setLoading());
            await request.post(`/api/messages`, messageData, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            });

            dispatch(messageActions.setIsMessageCreated());
            setTimeout(() => dispatch(messageActions.clearIsMessageCreated()), 2000); //wait 2 seconds for save post in db
        } catch (error) {
            toast.error(error.response.data.message);
            dispatch(messageActions.clearLoading());
        }
    }
}
