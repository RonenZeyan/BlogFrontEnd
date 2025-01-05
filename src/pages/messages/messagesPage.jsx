
import { useEffect } from "react"
import "./messagepage.css"
import { useDispatch, useSelector } from "react-redux"
import { fetchMessages } from "../../redux/apiCalls/messageApiCall"

export default function MessagesPage() {

    const { messages } = useSelector(state => state.message);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchMessages())
    }, [])

    function handleReply() {
        console.log("pass")
    }

    console.log(messages)

    return (
        <div className="messages-container">
            <div className="all-messages">
                <div>
                    <h3 style={{ padding: "10px", textAlign: "center" }}>All Messages</h3>
                    <hr />
                </div>
                {
                    messages?.map((message, index) => (
                        <div className="single-message">
                            <div className="img-date">
                                <div className="user-details">
                                    <img src="../../images/bmw.jpg" alt="" className="user-img" />
                                    <span><b>{message.senderId.username}</b><p><p className="message-title">{message.title}</p></p></span>
                                </div>
                                <p>the date</p>
                            </div>
                        </div>
                    ))
                }


            </div>

            <div className="message-details">
                <div className="title">
                    hello world!
                </div>
                <hr />
                <div className="reply-message">
                    <form onSubmit={handleReply}>
                        <div>
                            <label htmlFor="">Reply:</label>
                            <textarea name="reply"
                                rows={10}
                                cols={50}>
                            </textarea>
                        </div>
                        <div>
                            <button>Reply</button>
                        </div>
                    </form>

                </div>
                <div className="message">
                    <div className="single-message-details">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, neque?
                    </div>
                    <div className="single-message-details">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, neque?
                    </div>
                    <div className="single-message-details">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, neque?
                    </div>
                    <div className="single-message-details">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, neque?
                    </div>
                    <div className="single-message-details">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, neque?
                    </div>
                </div>
            </div>
        </div>
    )
}