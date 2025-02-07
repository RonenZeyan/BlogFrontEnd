import { request } from "../../utils/Axios";
import { toast } from "react-toastify";
import { messageActions } from "../slices/messageSlice";




//fetch messages
export function fetchMessages() {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.get(`/api/messages`, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            });
            dispatch(messageActions.setMessages(data));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}
//get unreaded messages
export function fetchUnreadedMessages() {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.get(`/api/messages/unreaded-messages`, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            });
            dispatch(messageActions.setUnreadedMessages(data));

        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}

export function replayForMsg(msgId, msg) {
    return async (dispatch, getState) => {
        try {
            await request.put(`/api/messages/${msgId}`, msg, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            });
            dispatch(messageActions.updateMessage(msg))
        } catch (error) {
            toast.error(error.response.msg.message);
            dispatch(messageActions.clearLoading());
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


//set message as readed
export function setMessageReaded(msg_id) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.put(`/api/messages/readed/${msg_id}`, {}, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            });
            dispatch(messageActions.setReaded(data._id));
        } catch (error) {
            console.log(error);

            toast.error("no message founded");
        }
    }
}