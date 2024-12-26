
import PostList from "../../components/posts/PostList";
import SideBar from "../../components/sideBar/SideBar";
import "./posts-page.css";
import Pagination from "../../components/pagination/Pagination";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, getPostsCount } from "../../redux/apiCalls/postApiCall";

const POST_PER_PAGE = 3;

export default function PostsPage() {

    //posts dispatch 
    const dispatch = useDispatch();

    //posts selector
    const { postsCount, posts } = useSelector(state => state.post);
    const pages = Math.ceil(postsCount / POST_PER_PAGE);

    //useState hook
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(fetchPosts(currentPage))
        window.scrollTo(0, 0);
    }, [currentPage]);

    //the reason that i not add  dispatch(getPostsCount()); to the first useEffect because i dont want to call getPostsCount every time currentPage changed 
    //that mean in this way i didn't make getPostsCount called each time currentPage changed  
    useEffect(() => {
        dispatch(getPostsCount());
    }, []);



    return (
        <>
            <section className="posts-page">
                <PostList posts={posts} />
                <SideBar />
            </section>
            <Pagination
                pages={pages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </>
    )
}