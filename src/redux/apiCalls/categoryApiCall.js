import { request } from "../../utils/Axios";
import { toast } from "react-toastify";
import { categoryActions } from "../slices/categorySlice";


//Get All categories
export function getCategories() {
    return async (dispatch) => {
        try {
            const res = await request.get("/api/categories")
            dispatch(categoryActions.setCategories(res.data));

        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
    }
}

//create category
export function createCategory(newCategory) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.post("/api/categories", newCategory, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            })
            dispatch(categoryActions.addCategory(data));
            toast.success("Category created successfully");
        } catch (error) {
            toast.error(error.response.data.message);

        }
    }
}

//delete category
export function deleteCategory(categoryId) {
    return async (dispatch, getState) => {
        try {
            const res = await request.delete(`/api/categories/${categoryId}`, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            })
            dispatch(categoryActions.deleteCategory(res?.data?.categoryId));
            toast.success(res?.data?.message);
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
    }
}




