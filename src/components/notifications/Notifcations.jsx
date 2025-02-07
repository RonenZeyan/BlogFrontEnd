import { useEffect, useState } from "react";
import "./notifications.css";
import { Link } from "react-router-dom";
import socket from "../webSocketComps/socket";
import { useDispatch, useSelector } from "react-redux";
import { getAllNotifications, setNotificationReaded } from "../../redux/apiCalls/notificationApiCall";
import { notificationActions } from "../../redux/slices/notificationSlice";


export default function Notifications() {
    //useStates Hooks
    const [dropDownNoti, setDropdownNoti] = useState(false);

    //redux
    const dispatch = useDispatch();
    const { UnreadNotifications } = useSelector(state => state.notification);

    useEffect(() => {
        dispatch(getAllNotifications());
    }, [dispatch])

    useEffect(() => {
        //listen to event of type new Notification
        socket.on("newNotification", (data) => {
            dispatch(notificationActions.setNewNotification(data));
        });

        //stop the listener if the component closed
        return () => {
            socket.off("newNotification");
        };
    }, []);

    function handleSelectNotification(notificationId) {
        setDropdownNoti(false);
        dispatch(setNotificationReaded(notificationId));

    }

    return (
        <>
            <div onClick={() => setDropdownNoti((prev) => !prev)} className="notifcation">
                <i style={{ fontSize: "25px", color: "black" }} className="bi bi-bell"></i>

                {UnreadNotifications.length === 0 ?
                    null
                    : (
                        <>
                            <span className="notifcation-badge">{UnreadNotifications.length}</span>
                        </>
                    )}
            </div>
            {dropDownNoti && (
                <div style={{ width: "300px", position: "absolute", background: "#fff", zIndex: 1000 }} className="header-right-dropdown">
                    {UnreadNotifications.length !== 0 ? UnreadNotifications.map((noti, index) =>
                    (
                        <Link
                            key={index}
                            to={`/posts/details/${noti.postId}`}
                            className="header-dropdown-item"
                            onClick={() => handleSelectNotification(noti._id)}
                            style={{
                                display: "block",
                                padding: "10px",
                                borderBottom: "1px solid #ccc",
                                textDecoration: "none",
                                color: "#000",
                            }}
                        >
                            {noti.type === "Comment" ? (
                                <p><i className="bi bi-chat-text"></i>{` ${noti.senderId.username} commented in your post`}</p>
                            ) : (
                                <p>
                                    <i className="bi bi-hand-thumbs-up-fill"></i>
                                    {noti?.senderId?.username ? ` ${noti?.senderId?.username} likes your post`:"loading..."}
                                </p>
                            )}
                        </Link>
                    )) : <p>no notifications</p>}
                </div>
            )}
        </>
    );
}
