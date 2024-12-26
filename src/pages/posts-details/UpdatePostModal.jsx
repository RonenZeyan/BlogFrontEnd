
import { useEffect, useState } from "react"
import "./update-post.css"
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../redux/apiCalls/postApiCall";
import { getCategories } from "../../redux/apiCalls/categoryApiCall";


export default function UpdatePostModal({ post, setUpdatePost }) {

    //redux
    const dispatch = useDispatch();
    const { categories } = useSelector(state => state.category);


    //hooks 


    //useEffects
    useEffect(() => {
        dispatch(getCategories());
    }, [])


    //useStates
    const [title, setTitle] = useState(post.title);
    const [description, setDescription] = useState(post.description);
    const [category, setCategory] = useState(post.category);

    function formSubmitHandler(e) {
        e.preventDefault();
        if (title.trim() === "") return toast.error("Post title is required")
        if (description.trim() === "") return toast.error("Post description is required")
        if (category.trim() === "") return toast.error("Post category is required")
        if (!file) return toast.error("Post Image is required")

        dispatch(updatePost({ title, description, category }, post?._id));
        setUpdatePost(false)

    }

    return (
        <div className="update-post">
            {/* <ToastContainer theme="colored" /> */}
            <form onSubmit={formSubmitHandler} className="update-post-form">
                <abbr title="close">
                    <i
                        onClick={() => setUpdatePost(false)}
                        className="bi bi-x-circle-fill update-post-form-close"
                    ></i>
                </abbr>
                <h1 className="update-post-title">Update Post</h1>
                <input
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    type="text"
                    className="update-post-input"
                />
                <select
                    className="update-post-input"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option disabled value="">
                        Select A Category
                    </option>
                    {categories?.map(category => <option key={category._id} value={category.title}>{category.title}</option>)}
                </select>
                <textarea
                    className="update-post-textarea"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="5"
                ></textarea>
                <button type="submit" className="update-post-btn">
                    Update Post
                </button>
            </form>
        </div>
    )
}