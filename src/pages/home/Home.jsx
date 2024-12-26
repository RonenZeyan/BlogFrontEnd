
import PostList from "../../components/posts/PostList"
import "./home.css"
import SideBar from "../../components/sideBar/SideBar"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchPosts } from "../../redux/apiCalls/postApiCall"



export default function Home() {

    const dispatch = useDispatch();
    const { posts } = useSelector(state => state.post)

    useEffect(() => {
        dispatch(fetchPosts(1)) //we want first 3 posts 
    }, [])

    return (
        <section className="home">
            <div className="home-hero-header">
                <div className="home-hero-header-layout">
                    <h1 className="home-title">Welcome To Ronen Blog</h1>
                </div>
            </div>
            <div className="home-latest-post">Latest Posts</div>
            <div className="home-container">
                <PostList posts={posts} />
                <SideBar />
            </div>
            <div className="home-see-posts-link">
                <Link to={"/posts"} className="home-link">See All Posts</Link>
            </div>
        </section>
    )
}