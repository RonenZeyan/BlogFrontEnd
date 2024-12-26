import { Link } from "react-router-dom";

export default function HeaderLeft({toggle,setToggle}) {
    return (
        <div className="header-left">
            <div className="header-logo">
                <Link to="/"><strong>Ronen BLOG</strong></Link>
                <i className="bi bi-pencil"></i>
            </div>
            <div onClick={() => setToggle(prev => !prev)} className="header-menu">
                {toggle ? <i className="bi bi-x-lg"></i> : <i className="bi bi-menu-app"></i>}
            </div>
        </div>
    )
}