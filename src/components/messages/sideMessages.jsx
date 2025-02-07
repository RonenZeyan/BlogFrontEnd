
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages } from "../../redux/apiCalls/messageApiCall";
import { Link } from "react-router-dom";
import { messageActions } from "../../redux/slices/messageSlice";

export default function SideMessages() {


    const { messages, message } = useSelector(state => state.message);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchMessages())
    }, [dispatch])

    return (
        <div className="all-messages">
            <div>
                <h3 style={{ padding: "10px", textAlign: "center" }}>All Messages</h3>
                <hr />
            </div>
            {
                messages?.map((msg, index) => (
                    <Link
                        key={index}
                        className={`msg-link`}
                        onClick={() => dispatch(messageActions.setMessage(msg._id))}
                    >
                        <div className={`single-message ${msg._id === message?._id ? 'active' : ''}`}>
                            <div className="img-date">
                                <div className="user-details">
                                    <img src="../../images/bmw.jpg" alt="" className="user-img" />
                                    <span><b>{localStorage.getItem("userInfo")._id === msg.senderId._id ? msg.receiverId.username : msg.senderId.username}</b><p className="message-title">{msg.title}</p></span>
                                </div>
                                <p className="msg-date">{new Date(msg?.createdAt).toDateString()}</p>
                            </div>
                        </div>
                    </Link>
                ))
            }


        </div >
    )

}