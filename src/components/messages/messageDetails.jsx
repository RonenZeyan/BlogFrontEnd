import { useDispatch, useSelector } from "react-redux"
import { replayForMsg } from "../../redux/apiCalls/messageApiCall";
import { useState } from "react";

export default function MessageDetails() {

    //state
    const [content, setContent] = useState("");



    const { message,loading } = useSelector(state => state.message);
    const dispatch = useDispatch();

    function handleReply(e) {
        e.preventDefault()
        dispatch(replayForMsg(message._id, { id: message._id, content }));
        setContent("");
    }
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {message ?
                (<div className="message-details">
                    <div className="title">
                        <p><span style={{ fontWeight: "bold" }}>Message Title: </span>{message?.title}</p>
                    </div>
                    <hr />
                    <div className="reply-message">
                        <form onSubmit={handleReply}>
                            <div className="msg-form-group">
                                <label htmlFor="content">Reply: </label>
                                <textarea name="reply"
                                    id="content"
                                    rows={10}
                                    cols={50}
                                    value={content}
                                    onChange={e => setContent(e.target.value)}
                                >
                                </textarea>
                            </div>
                            <div className="msg-form-group">
                                <button>Reply</button>
                            </div>
                        </form>
                    </div>
                    <hr />

                    <div className="message">
                        {message?.messages.toReversed().map(
                            (msg, idx) => (

                                <div key={idx}>
                                    <div
                                        className="single-message-details" style={msg.isSendBySender ? { backgroundColor: "green" } : {}}>
                                        {msg.isSendBySender ?
                                            <p><span style={{ fontWeight: "bold" }}>You: </span>{msg.content}</p>
                                            :
                                            <p><span style={{ fontWeight: "bold" }}>Reply: </span>{msg.content}</p>
                                        }
                                        <p>{new Date(msg?.timestamp).toDateString()}</p>
                                    </div>
                                </div>
                            )
                        )}

                    </div>
                </div>)
                :
                (
                    <div style={styles} className="message-details" >
                        Choose Message To Show
                    </div>
                )
            }
        </>
    )
}

const styles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    fontSize: "32px",
    height: "inherit",
}