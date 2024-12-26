import { Link } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import "./admin-table.css"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deletePost, getAllPosts } from "../../redux/apiCalls/postApiCall";

export default function PostsTable() {

    //redux 
    const dispatch = useDispatch();
    const { posts } = useSelector(state => state.post);

    useEffect(() => {
        dispatch(getAllPosts());
    }, [])

    function deletePostHandler(postId) {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this post!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                dispatch(deletePost(postId));
            }
        });
    }

    return (
        <div className="table-container">
            <AdminSidebar />
            <div className="table-wrapper">
                <h1 className="table-title">Posts</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Count</th>
                            <th>User</th>
                            <th>Title</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((item, idx) => (
                            <tr key={item}>
                                <td>{idx + 1}</td>
                                <td>
                                    <div className="table-image">
                                        <img
                                            src={item.user.ProfilePhoto?.url}
                                            alt=""
                                            className="table-user-image"
                                        />
                                        <span className="table-username">{item.user.username}</span>
                                    </div>
                                </td>
                                <td>
                                    <b className="user-email">{item.title}</b>
                                </td>
                                <td>
                                    <div className="table-button-group">
                                        <button>
                                            <Link to={`/posts/details/${item._id}`}>View Post</Link>
                                        </button>
                                        <button onClick={() => deletePostHandler(item._id)}>Delete Post</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}