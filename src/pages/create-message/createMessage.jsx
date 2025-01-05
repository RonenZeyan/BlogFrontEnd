import { useState, useEffect } from "react"
import "./create-message.css"
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createPost } from "../../redux/apiCalls/postApiCall";
import { getCategories } from "../../redux/apiCalls/categoryApiCall";
import { createMessage } from "../../redux/apiCalls/messageApiCall";
import { getUserProfile } from "../../redux/apiCalls/profileApiCall";
export default function CreateMessage() {

    // //redux
    const dispatch = useDispatch();
    const { loading, isMessageCreated } = useSelector(state => state.message);


    // useState Hooks
    const [title, setTitle] = useState("");
    const [content, setcontent] = useState("");

    //use Params hooks

    const { reciverId } = useParams();

    //submit Handler
    function formSubmitHandler(e) {
        e.preventDefault();
        if (title.trim() === "") return toast.error("Post title is required")
        if (content.trim() === "") return toast.error("Post content is required")

        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        dispatch(createMessage({ title, content, receiverId:reciverId, senderId: userInfo?._id }))


    }

    const navigate = useNavigate();
    useEffect(() => {
        if (isMessageCreated) navigate("/")
    }, [isMessageCreated, navigate])

    return (
        <section className="create-post">
            <h1 className="create-post-title">New Message to Username</h1>
            <form onSubmit={formSubmitHandler} className="create-post-form" >
                <input
                    type="text"
                    placeholder="Message Title"
                    className="create-post-input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    className="create-post-textarea"
                    rows="5"
                    placeholder="Message content"
                    value={content}
                    onChange={(e) => setcontent(e.target.value)}
                >
                </textarea>
                <button className="create-post-btn" type="submit">
                    {
                        loading ? "Loading..." : "Send New Message"
                    }
                    Send New Message
                </button>
            </form>
        </section>
    )
}