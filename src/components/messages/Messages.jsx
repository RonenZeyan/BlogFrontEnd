import { useEffect, useState } from "react";
import "./messages.css";
import { Link } from "react-router-dom";
import socket from "../webSocketComps/socket";
import { useDispatch, useSelector } from "react-redux";
import { messageActions } from "../../redux/slices/messageSlice";
import { fetchUnreadedMessages, setMessageReaded } from "../../redux/apiCalls/messageApiCall";




export default function Messages() {
    //useStates Hooks
    const [dropDownNoti, setDropdownNoti] = useState(false);

    //redux 
    const dispatch = useDispatch();
    const { unreadedMessages } = useSelector(state => state.message);


    useEffect(() => {
        //listen to event of type new Notification
        socket.on("newMessage", (data) => {
            console.log(data)
            dispatch(messageActions.setNewMessage(data))
        });

        //stop the listener if the component closed
        return () => {
            socket.off("newMessage");
        };
    }, []);

    useEffect(() => {
        dispatch(fetchUnreadedMessages());
    }, [dispatch])


    function handleSelectMessage(msg_id) {
        setDropdownNoti(false);
        dispatch(setMessageReaded(msg_id));
        dispatch(messageActions.setReadedMessage(msg_id));
        dispatch(messageActions.setMessage(msg_id));
    }

    return (
        <>
            <div onClick={() => setDropdownNoti((prev) => !prev)} className="notifcation">
                <i style={{ fontSize: "25px", color: "black" }} className="bi bi-envelope"></i>

                {unreadedMessages.length === 0 ?
                    null
                    : (
                        <>
                            <span className="notifcation-badge">{unreadedMessages.length}</span>
                        </>
                    )}
            </div>
            {dropDownNoti && (
                <div style={{ width: "300px", position: "absolute", background: "#fff", zIndex: 1000 }} className="header-right-dropdown">
                    {unreadedMessages.length !== 0 && unreadedMessages.map((msg, index) =>
                    (
                        <Link
                            key={index}
                            to={`/messages`}
                            className="header-dropdown-item"
                            onClick={() => handleSelectMessage(msg._id)}
                            style={{
                                display: "block",
                                padding: "10px",
                                borderBottom: "1px solid #ccc",
                                textDecoration: "none",
                                color: "#000",
                            }}
                        >

                            <p><i style={{ color: "black" }} className="bi bi-envelope"></i>{` New Message From ${msg.senderId.username}`}</p>
                        </Link>
                    ))
                    }
                        <Link
                            onClick={() => setDropdownNoti(false)}
                            to="/messages"
                        >
                            Show All Messages
                        </Link>
        </div >
            )
}
        </>
    );
}
