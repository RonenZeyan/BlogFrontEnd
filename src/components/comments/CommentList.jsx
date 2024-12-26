import { useState } from "react";
import "./comment-list.css";
// import UpdateCommentModal from "./UpdateCommentModal";
import swal from "sweetalert";
import UpdateCommentModal from "./UpdateCommentModal";
import { useDispatch, useSelector } from "react-redux";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { deleteComment } from "../../redux/apiCalls/commentApiCall";


export default function CommentList({ comments }) {

  dayjs.extend(relativeTime);


  //useState hooks
  const [updateComment, setUpdateComment] = useState(false);
  const [commentForUpdate, setCommentForUpdate] = useState(null);

  //redux 
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();


  //update comment handler
  function updateCommentHandler(comment) {
    setCommentForUpdate(comment);
    setUpdateComment(true);
  }

  // Delete Comment Handler
  const deleteCommentHandler = (commentId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this comment!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteComment(commentId))
        swal("comment has been deleted!", {
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="comment-list">
      <h4 className="comment-list-count">{comments?.length} Comments</h4>
      {comments?.map((comment) => (
        <div key={comment._id} className="comment-item">
          <div className="comment-item-info">
            <div className="comment-item-user-info">
              <img
                src="/images/user-avatar.png"
                alt=""
                className="comment-item-user-photo"
              />
              <span className="comment-item-username">{comment.username}</span>
            </div>
            <div className="comment-item-time">{dayjs(comment?.createdAt).fromNow()}</div>
          </div>
          <p className="comment-item-text">{comment.text}</p>
          {user?._id === comment.user && (<div className="comment-item-icon-wrapper">
            <i
              onClick={() => updateCommentHandler(comment)}
              className="bi bi-pencil-square"
            ></i>
            <i onClick={()=>deleteCommentHandler(comment?._id)} className="bi bi-trash-fill"></i>
          </div>)}
        </div>
      ))}
      {updateComment && (
        <UpdateCommentModal commentForUpdate={commentForUpdate} setUpdateComment={setUpdateComment} />
      )}
    </div>
  );
};
