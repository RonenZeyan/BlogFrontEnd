
import { useState } from "react"
import "./update-comment.css"
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateComment } from "../../redux/apiCalls/commentApiCall";

export default function UpdateCommentModal({ commentForUpdate,setUpdateComment }) {

    //useStates Hooks
    const [text, setText] = useState(commentForUpdate?.text);

    //Redux 
    const dispatch = useDispatch();


    function formSubmitHandler(e) {
        e.preventDefault();
        if (text.trim() === "") return toast.error("please fill the comment!!!")
        dispatch(updateComment(commentForUpdate?._id,{text}))
        setUpdateComment(false);
    }

    return (
        <div className="update-comment">
            {/* <ToastContainer theme="colored" /> */}
            <form onSubmit={formSubmitHandler} className="update-comment-form">
                <abbr title="close">
                    <i
                        onClick={() => setUpdateComment(false)}
                        className="bi bi-x-circle-fill update-comment-form-close"
                    ></i>
                </abbr>
                <h1 className="update-comment-title">Edit Comment</h1>
                <input
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                    type="text"
                    className="update-comment-input"
                />
                <button type="submit" className="update-comment-btn">
                    Edit Comment
                </button>
            </form>
        </div>
    )
}