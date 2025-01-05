import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../redux/apiCalls/authApiCall";
import socket from "../webSocketComps/socket";

export default function HeaderRight({ toggle, setToggle }) {

    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)
    const [dropdown, setDropdown] = useState(false);

    function logoutHandler() {
        dispatch(logoutUser());
        setDropdown(false);
    }

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));

        // if (userInfo && !localStorage.getItem("socketConnected")) {
        //     if (!socket.connected) {
        //         socket.connect();
        //     }

        //     socket.emit("setUserId", userInfo._id);
        //     localStorage.setItem("socketConnected", "true");
        // }

        // return () => {
        //     if (socket.connected) {
        //         socket.disconnect();
        //         localStorage.removeItem("socketConnected");
        //     }
        // };
    }, []);

    return (
        <div className="header-right">
            {user ?
                (
                    <>
                        <div className="header-right-user-info">
                            <span
                                onClick={() => setDropdown(prev => !prev)}
                                className="header-right-username">
                                {user.username}
                            </span>
                            <img src={user?.profilePhoto.url}
                                alt="user photo"
                                className="header-right-user-photo"
                            />
                            {dropdown && (<div className="header-right-dropdown">
                                <Link
                                    to={`/profile/${user._id}`}
                                    className="header-dropdown-item"
                                    onClick={() => setDropdown(false)}
                                >
                                    <i className="bi bi-file-person"></i>
                                    <span>Profile</span>
                                </Link>
                                <div onClick={logoutHandler} className="header-dropdown-item">
                                    <i className="bi bi-box-arrow-in-left"></i>
                                    <span>Logout</span>
                                </div>
                            </div>)}
                        </div>

                    </>
                )
                :
                (<>
                    <Link to="/login" className="header-right-link">
                        <i className="bi bi-box-arrow-in-right"></i>
                        <span>Login</span>
                    </Link>
                    <Link to="/register" className="header-right-link">
                        <i className="bi bi-person-plus"></i>
                        <span>Register</span>
                    </Link>
                </>)
            }
        </div>
    )
}
