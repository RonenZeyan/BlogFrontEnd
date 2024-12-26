import { useState } from "react"
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createCategory } from "../../redux/apiCalls/categoryApiCall";

export default function AddCategoryForm() {

    const dispatch = useDispatch();

    const [title, setTitle] = useState("");

    function formSubmitHandler(e) {
        e.preventDefault();
        if (title.trim() === "") return toast.error("Category title is required!!!");
        dispatch(createCategory({ title }));
        setTitle("");
        console.log({ title })
    }

    return (
        <div className="add-category">
            <h6 className="add-category-title">Add New Category</h6>
            <form onSubmit={formSubmitHandler} className="add-category-form">
                <div className="add-category-form-group">
                    <label htmlFor="title">Category Title</label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        id="title"
                        placeholder="Enter Category Title"
                    />
                </div>
                <button type="submit" className="add-category-btn">
                    Add
                </button>
            </form>
        </div>
    )
}