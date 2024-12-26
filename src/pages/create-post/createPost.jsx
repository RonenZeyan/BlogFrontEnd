import { useState, useEffect } from "react"
import "./create-post.css"
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../redux/apiCalls/postApiCall";
import { getCategories } from "../../redux/apiCalls/categoryApiCall";
export default function CreatePost() {

    //redux
    const dispatch = useDispatch();
    const { loading, isPostCreated } = useSelector(state => state.post);
    const { categories } = useSelector(state => state.category);

    useEffect(() => {
        dispatch(getCategories());
    }, [])

    // useState Hooks
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [file, setFile] = useState(null);

    //submit Handler
    function formSubmitHandler(e) {
        e.preventDefault();
        if (title.trim() === "") return toast.error("Post title is required")
        if (description.trim() === "") return toast.error("Post description is required")
        if (category.trim() === "") return toast.error("Post category is required")
        if (!file) return toast.error("Post Image is required")

        const formData = new FormData();
        formData.append("image", file);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("category", category);

        dispatch(createPost(formData)); //send post to api by redux 


        console.log({ title, description, category, file })
    }

    const navigate = useNavigate();
    useEffect(() => {
        if (isPostCreated) navigate("/")
    }, [isPostCreated, navigate])

    return (
        <section className="create-post">
            <h1 className="create-post-title">Create New Post</h1>
            <form onSubmit={formSubmitHandler} className="create-post-form" >
                <input
                    type="text"
                    placeholder="Post Title"
                    className="create-post-input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <select
                    className="create-post-input"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option disabled value="">Select A Category</option>
                    {categories?.map(category => <option key={category._id} value={category.title}>{category.title}</option>)}
                </select>
                <textarea
                    className="create-post-textarea"
                    rows="5"
                    placeholder="Post Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                >
                </textarea>
                <input
                    type="file"
                    name="file"
                    id="file"
                    className="create-post-upload"
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <button className="create-post-btn" type="submit">
                    {
                        loading ? "Loading..." : "Create New Post"
                    }
                </button>
            </form>
        </section>
    )
}