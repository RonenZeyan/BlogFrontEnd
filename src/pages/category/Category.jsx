

import { useParams, Link } from "react-router-dom"
import "./category.css"
import PostList from "../../components/posts/PostList"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchPostsBasedOnCategory } from "../../redux/apiCalls/postApiCall"


export default function Category() {

    //use Params Hook
    const { category } = useParams();

    //redux uses
    const dispatch = useDispatch();
    const { postsCat } = useSelector(state => state.post)

    useEffect(() => {
        dispatch(fetchPostsBasedOnCategory(category))
        window.scrollTo(0, 0);
    }, [category])

    return (<section className="category">
        {postsCat.length === 0 ?
            <>
                <h1 className="category-not-found">Posts with <span>{category}</span> Category Not Found</h1>
                <Link to={"/posts"} className="category-not-found-link">Go To Posts Page</Link>
            </>
            :
            <>
                <h1 className="category-title">Posts based on {category}</h1>
                <PostList posts={postsCat} />
            </>
        }
    </section>)

}