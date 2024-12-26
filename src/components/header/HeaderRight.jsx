import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../redux/apiCalls/authApiCall";

export default function HeaderRight({ toggle, setToggle }) {

    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)
    const [dropdown, setDropdown] = useState(false);
    const [dropDownNoti, setDropdownNoti] = useState(false);

    function logoutHandler() {
        dispatch(logoutUser());
        setDropdown(false);
    }

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
                            <div onClick={()=> setDropdownNoti(prev=>!prev)} style={{ marginLeft: "15px" }} className="notifcation">
                                <i style={{ fontSize: "25px" }} className="bi bi-bell"></i>
                                <span className="notifcation-badge">5</span>
                            </div>
                            {dropDownNoti && (
                                <div style={{width:"300px"}} className="header-right-dropdown">
                                    <Link
                                        to={`/profile/${user._id}`}
                                        className="header-dropdown-item"
                                        onClick={() => setDropdownNoti(false)}
                                    >
                                        <span>No Notification</span>
                                    </Link>

                                </div>)
                            }
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
