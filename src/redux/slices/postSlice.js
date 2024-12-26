import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name: "post",
    initialState: {
        posts: [], //get all the posts 
        postsCount: null, //store the number of posts in blog
        postsCat: [], //store posts that in specific cate
        loading: false,
        isPostCreated: false,
        post: null,
    },
    reducers: {
        setPosts(state, action) {
            state.posts = action.payload
        },
        setPostsCount(state, action) {
            state.postsCount = action.payload
        },
        setPostsCat(state, action) {
            state.postsCat = action.payload
        },
        setLoading(state) {
            state.loading = true
        },
        clearLoading(state) {
            state.loading = false
        },
        setIsPostCreated(state) {
            state.isPostCreated = true
            state.loading = false
        },
        clearIsPostCreated(state) {
            state.isPostCreated = false
        },
        setPost(state, action) {
            state.post = action.payload;
        },
        setLike(state, action) {
            state.post.likes = action.payload.likes;
        },
        deletePost(state, action) {
            state.posts = state.posts.filter(p => p._id !== action.payload);
        },
        addComment(state, action) {
            state.post.comments.push(action.payload)
        },
        updateComment(state, action) {
            state.post.comments = state.post.comments.map(comment =>
                comment._id === action.payload._id ? action.payload : comment
            )
        },
        deleteComment(state, action) {
            const comment = state.post.comments.find(c => c._id === action.payload);
            const commentIndex = state.post.comments.indexOf(comment); //get index of comment in post comments array 
             state.post.comments.splice(commentIndex,1); //delete the comment in commentIndex index and 1 mean that just delete the commentIndex and not next 
        }
    }
});

const postReducer = postSlice.reducer;
const postActions = postSlice.actions;

export { postActions, postReducer }