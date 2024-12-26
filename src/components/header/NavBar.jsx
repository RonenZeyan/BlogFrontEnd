
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

export default function NavBar({ toggle, setToggle }) {

    const { user } = useSelector(state => state.auth)

    return (
        <nav style={{ clipPath: toggle && 'polygon(0 0,100% 0,100% 100%,0 100%)' }} className="navbar">
            <ul className="nav-links">
                <Link to={"/"} onClick={() => setToggle(false)} className="nav-link">
                    <i className="bi bi-house"></i> Home
                </Link>
                <Link to={"/posts"} onClick={() => setToggle(false)} className="nav-link">
                    <i className="bi bi-stickies"></i> Posts
                </Link>
                {user ? (<Link to={"/posts/create-post"} onClick={() => setToggle(false)} className="nav-link">
                    <i className="bi bi-journal-plus"></i> Create Post
                </Link>) : null}
                {user?.isAdmin ? (<Link to={"/admin-dashboard"} onClick={() => setToggle(false)} className="nav-link">
                    <i className="bi bi-person-check"></i> Admin Dashboard
                </Link>) : null}
            </ul>
        </nav>
    )
}