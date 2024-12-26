import { Link, useNavigate, useParams } from "react-router-dom"
import "./post-details.css"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AddComment from "../../components/comments/AddComment";
import CommentList from "../../components/comments/CommentList";
import swal from "sweetalert";
import UpdatePostModal from "./UpdatePostModal";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, getPostById, setLikePost, updatePostImage } from "../../redux/apiCalls/postApiCall";


export default function PostDetails() {

    //redux
    const dispatch = useDispatch();
    const { post } = useSelector(state => state.post);
    const { user } = useSelector(state => state.auth);

    //useNavigate hook
    const navigate = useNavigate();

    //useState hooks
    const [file, setFile] = useState(null)
    const [updatePost, setUpdatePost] = useState(null)

    //useParam hooks
    const { id } = useParams();

    useEffect(() => {
        dispatch(getPostById(id));
        window.scrollTo(0, 0) //scroll window to the start of the page 
    }, [id])

    function updateImageSubmitHandler(e) {
        e.preventDefault();
        if (!file) return toast.warning("no file attached!!!");
        const formData = new FormData();
        formData.append("image", file);
        dispatch(updatePostImage(formData, id))
    }

    function deletePostHandler(e) {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this post!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                dispatch(deletePost(id));
                navigate("/posts")
            }
        });


    }

    return (
        <div className="post-details">
            <div className="post-details-image-wrapper">
                <img src={file ? URL.createObjectURL(file) : post?.image.url} alt="" className="post-details-image" />
                {post?.user?._id === user?._id && (<form onSubmit={updateImageSubmitHandler} className="update-post-image-form">
                    <label className="update-post-image" htmlFor="file">
                        <i className="bi bi-image-fill"></i> select new image
                    </label>
                    <input
                        style={{ display: "none" }}
                        type="file"
                        name="file"
                        id="file"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <button type="submit">upload</button>
                </form>)}
            </div>
            <h1 className="post-details-title">{post?.title}</h1>
            <div className="post-details-user-info">
                <img src={post?.user.profilePhoto.url} alt="" className="post-details-user-image" />
                <div className="post-details-user">
                    <strong>
                        <Link to={`/profile/${post?.user._id}`}>{post?.user.username}</Link>
                    </strong>
                    <span>{new Date(post?.createdAt).toDateString()}</span>
                </div>
            </div>
            <p className="post-details-description">
                {post?.description} ... Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Incidunt quis a omnis aut sit earum atque eveniet
                ratione sint animi illo id accusamus obcaecati dolore voluptatibus
                aperiam qui, provident fuga? Lorem ipsum dolor sit amet consectetur,
                adipisicing elit. Quibusdam neque odit soluta? Fugiat, dolores!
                Laboriosam rem quod, explicabo similique aliquam unde sed vel
                distinctio, fugiat ab aperiam odio nesciunt quas?
            </p>
            <div className="post-details-icon-wrapper">
                <div>
                    {user && (
                        <i
                            className={post?.likes.includes(user?._id) ? "bi bi-hand-thumbs-up-fill" : "bi bi-hand-thumbs-up"}
                            onClick={() => dispatch(setLikePost(id))}
                        ></i>
                    )}
                    <small>{post?.likes.length} likes</small>
                </div>
                {post?.user?._id === user?._id && (<div>
                    <i
                        onClick={() => setUpdatePost(true)}
                        className="bi bi-pencil-square"
                    ></i>
                    <i onClick={deletePostHandler} className="bi bi-trash-fill"></i>
                </div>)}
            </div>
            {user ? <AddComment postId={id} /> : <p className="post-details-info-write">For Add Comment, You Should LoggedIn First.</p>}
            <CommentList comments={post?.comments} />
            {updatePost && (
                <UpdatePostModal post={post} setUpdatePost={setUpdatePost} />
            )}
        </div>
    )
}