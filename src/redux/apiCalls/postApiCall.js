import { request } from "../../utils/Axios";
import { toast } from "react-toastify";
import { postActions } from "../slices/postSlice";




//fetch posts based in page number 
export function fetchPosts(pageNumber) {
    return async (dispatch) => {
        try {
            const { data } = await request.get(`/api/posts?pageNumber=${pageNumber}`);
            dispatch(postActions.setPosts(data));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}

//fetch posts based in category 
export function fetchPostsBasedOnCategory(category) {
    return async (dispatch) => {
        try {
            const { data } = await request.get(`/api/posts?category=${category}`);
            dispatch(postActions.setPostsCat(data));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}

//get Posts Count
export function getPostsCount(pageNumber) {
    return async (dispatch) => {
        try {
            const { data } = await request.get(`/api/posts/count`);
            dispatch(postActions.setPostsCount(data));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}

//create post
export function createPost(postData) {
    return async (dispatch, getState) => {
        try {
            dispatch(postActions.setLoading());
            await request.post(`/api/posts`, postData, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                    "Content-Type": "multipart/form-data"
                }
            });

            dispatch(postActions.setIsPostCreated());
            setTimeout(() => dispatch(postActions.clearIsPostCreated()), 2000); //wait 2 seconds for save post in db
        } catch (error) {
            toast.error(error.response.data.message);
            dispatch(postActions.clearLoading());
        }
    }
}


//fetch post by id
export function getPostById(postId) {
    return async (dispatch) => {
        try {
            const { data } = await request.get(`/api/posts/${postId}`);
            dispatch(postActions.setPost(data));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}


//add like to post
export function setLikePost(postId) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.put(`/api/posts/like/${postId}`, {}, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            });
            dispatch(postActions.setLike(data));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}

//update post image
export function updatePostImage(file, postId) {
    return async (dispatch, getState) => {
        try {
            await request.put(`/api/posts/upload-image/${postId}`, file, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                    "Content-Type": "multipart/form-data",
                }
            });
            toast.success("New Post image uploaded successfully")
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}

//update post 
export function updatePost(postData, postId) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.put(`/api/posts/${postId}`, postData, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            });
            dispatch(postActions.setPost(data));
            toast.success("Post Updated successfully")
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}



//delete post 
export function deletePost(postId) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.delete(`/api/posts/${postId}`, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            });
            dispatch(postActions.deletePost(data.postId));
            toast.success(data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}


//fetch all Posts
export function getAllPosts() {
    return async (dispatch) => {
        try {
            const { data } = await request.get(`/api/posts`);
            dispatch(postActions.setPosts(data));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}


