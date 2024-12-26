


import { useState } from "react";
import { toast } from "react-toastify";
import "./add-comment.css";
import { useDispatch } from "react-redux";
import { addComment } from "../../redux/apiCalls/commentApiCall";


export default function AddComment({ postId }) {

  //redux
  const dispatch = useDispatch();

  //useStates
  const [text, setText] = useState("");

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (text.trim() === "") return toast.error("Please write something")

    console.log({ text });
    setText("");
    dispatch(addComment({ text, postId }))
  }

  return (
    <form onSubmit={formSubmitHandler} className="add-comment">
      <input
        type="text"
        placeholder="Add a comment"
        className="add-comment-input"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button type="submit" className="add-comment-btn">
        Comment
      </button>
    </form>
  );
};

