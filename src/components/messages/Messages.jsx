import { useEffect, useState } from "react";
import "./messages.css";
import { Link } from "react-router-dom";



// const notifications = [
//     {
//         username: "Ronen",
//         type: "Like",
//         text: "Toggle Like for your post",
//     },
//     {
//         username: "Rami",
//         type: "Comment",
//         text: "commented on your post",
//     },
//     {
//         username: "Lior",
//         type: "Like",
//         text: "liked your post",
//     },
// ];


export default function Messages() {
    //useStates Hooks
    const [dropDownNoti, setDropdownNoti] = useState(false);
    const UnreadNotifications = []

    // //redux
    // const dispatch = useDispatch();
    // const { UnreadNotifications } = useSelector(state => state.notification);

    // useEffect(() => {
    //     dispatch(getAllNotifications());
    // }, [dispatch])

    // useEffect(() => {
    //     //listen to event of type new Notification
    //     socket.on("newNotification", (data) => {
    //         // setNotifications(data.data)
    //         console.log(data)
    //         dispatch(notificationActions.setNewNotification(data));
    //         // alert(data.message); // לדוגמה מציגים את ההודעה ב-alert
    //     });

    //     //stop the listener if the component closed
    //     return () => {
    //         socket.off("newNotification");
    //     };
    // }, []);

    // function handleSelectNotification(notificationId) {
    //     setDropdownNoti(false);
    //     dispatch(setNotificationReaded(notificationId));

    // }

    return (
        <>
            <div onClick={() => setDropdownNoti((prev) => !prev)} className="notifcation">
                <i style={{ fontSize: "25px", color: "black" }} class="bi bi-envelope"></i>

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
                    {/* {notifcations.map((item, index) => ( */}
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
                                <p><i className="bi bi-chat-text"></i>{`${noti.senderId.username} commented in your post`}</p>
                            ) : (
                                <p><i className="bi bi-hand-thumbs-up-fill"></i>{`${noti.senderId.username} likes your post`}</p>
                            )}
                            {/* <p>{item.text}</p> */}
                        </Link>
                    )) : <Link
                        onClick={()=>setDropdownNoti(false)}
                        to="/messages">Show All Messages</Link>}
                    {/* ))} */}
                </div>
            )}
        </>
    );
}
