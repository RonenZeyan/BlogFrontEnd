

import { useState } from "react"
import "./update-profile-modal.css"
import { useDispatch } from "react-redux";
import { UpdateProfile } from "../../redux/apiCalls/profileApiCall";




export default function UpdateProfileModal({ profile, setUpdateProfile }) {

    //redux dispatch for update profile
    const dispatch = useDispatch()

    //use state hooks
    const [username, setUsername] = useState(profile.username);
    const [bio, setBio] = useState(profile.bio);
    const [password, setPassword] = useState("");

    //handler functions 

    function formSubmitHandler(e) {
        e.preventDefault();

        const updatedUser = { username, bio }
        if (password.trim() !== "") {
            updatedUser.password = password;
        }

        dispatch(UpdateProfile(profile?._id,updatedUser));
        setUpdateProfile(false);
    }

    return (
        <div className="update-profile">
            {/* <ToastContainer theme="colored" /> */}
            <form onSubmit={formSubmitHandler} className="update-profile-form">
                <abbr title="close">
                    <i
                        onClick={() => setUpdateProfile(false)}
                        className="bi bi-x-circle-fill update-profile-form-close"
                    ></i>
                </abbr>
                <h1 className="update-profile-title">Update Your Profile</h1>
                <input
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    type="text"
                    className="update-profile-input"
                    placeholder="username"
                />
                <input
                    onChange={(e) => setBio(e.target.value)}
                    value={bio}
                    type="text"
                    className="update-profile-input"
                    placeholder="bio"
                />
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    className="update-profile-input"
                    placeholder="password"
                />
                <button type="submit" className="update-profile-btn">
                    Update Profile
                </button>
            </form>
        </div>
    )
}