import { request } from "../../utils/Axios";
import { toast } from "react-toastify";
import { commentActions } from "../slices/commentSlice";
import { postActions } from "../slices/postSlice";


//Add New Comment
export function addComment(comment){
    return async (dispatch,getState)=>{
        try {
            const res = await request.post("/api/comments",comment,{
                headers:{
                    Authorization: "Bearer "+ getState().auth.user.token,
                }
            });
            dispatch(postActions.addComment(res.data));
            
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
    }
}

//update Comment
export function updateComment(commentId,comment){
    return async (dispatch,getState)=>{
        try {
            const res = await request.put(`/api/comments/${commentId}`,comment,{
                headers:{
                    Authorization: "Bearer "+ getState().auth.user.token,
                }
            });
            dispatch(postActions.updateComment(res.data));
            
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
    }
}

//delete Comment
export function deleteComment(commentId){
    return async (dispatch,getState)=>{
        try {
            const res = await request.delete(`/api/comments/${commentId}`,{
                headers:{
                    Authorization: "Bearer "+ getState().auth.user.token,
                }
            });
            dispatch(postActions.deleteComment(commentId));
            dispatch(commentActions.deleteComment(commentId));
            toast.success(res.data.message)
            
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
    }
}

//get All comments
export function getAllComments(){
    return async (dispatch,getState)=>{
        try {
            const res = await request.get(`/api/comments`,{
                headers:{
                    Authorization: "Bearer "+ getState().auth.user.token,
                }
            });
            dispatch(commentActions.getAllComments(res.data));
            
        } catch (error) {
            toast.error(error.response?.data?.message);
            console.log(error);
        }
    }
}

// //Get All Comments
// export function getComments(postId){
//     return async (dispatch)=>{
//         try {
//             const res = await request.get("/api/categories")
//             dispatch(categoryActions.setCategories(res.data));
            
//         } catch (error) {
//             toast.error(error.response.data.message);
//             console.log(error);
//         }
//     }
// }


