
import "./profile.css"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import swal from "sweetalert";
import UpdateProfileModal from "./UpdateProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { deleteProfile, getUserProfile, uploadProfilePhoto } from "../../redux/apiCalls/profileApiCall";
import { useParams, useNavigate, Link } from "react-router-dom";
import PostItem from "../../components/posts/PostItem";
import { logoutUser } from "../../redux/apiCalls/authApiCall";



export default function Profile() {
    //redux
    const dispatch = useDispatch();
    const { profile, loading, isProfileDeleted } = useSelector(state => state.profile);
    const { user } = useSelector(state => state.auth);

    //reactDom States
    const params = useParams();
    const navigate = useNavigate();

    //useStates Hooks
    const [file, setFile] = useState(null);
    const [updateProfile, setUpdateProfile] = useState(false);


    //useEffects hooks

    useEffect(() => {
        dispatch(getUserProfile(params.id))
        window.scrollTo(0, 0)
    }, [params.id])


    useEffect(() => {
        if (isProfileDeleted) {
            navigate("/")
        }
    }, [navigate, isProfileDeleted])


    //handlers 

    function formSubmitHandler(e) {
        e.preventDefault();
        if (!file) return toast.warning("No Image Uploaded");

        const formData = new FormData();
        formData.append("image", file);

        dispatch(uploadProfilePhoto(formData));
    }

    function DeleteAccountHandler() {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this profile!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                dispatch(deleteProfile(user._id))
                dispatch(logoutUser());

            }
        });
    };



    return (
        <section className="profile">
            <div className="profile-header">
                <div className="profile-link">
                    <i style={{fontSize:"25px"}} class="bi bi-envelope-plus"></i>
                    <Link to={`/messages/create-message/${params.id}`} style={{ color: "white",paddingLeft:"10px" }}>Send Message to {profile?.username}</Link >
                </div>
                <div className="profile-image-wrapper">
                    <img
                        src={file ? URL.createObjectURL(file) : profile?.profilePhoto?.url}
                        alt=""
                        className="profile-image" />
                    {user?._id === params.id && (
                        <form onSubmit={formSubmitHandler}>
                            <abbr title="Choose Profile Photo">
                                <label htmlFor="file" className="bi bi-camera-fill upload-profile-photo-icon"></label>
                            </abbr>
                            <input
                                style={{ display: "none" }}
                                type="file"
                                name="file"
                                id="file"
                                onChange={(e) => { setFile(e.target.files[0]) }}

                            />
                            <button type="submit" className="upload-profile-photo-btn">Upload</button>
                        </form>
                    )}
                </div>
                <h1 className="profile-username">
                    {profile?.username}
                </h1>
                <p className="profile-bio">
                    {profile?.bio}
                </p>
                <div className="user-date-joined">
                    <strong>Date Joined:</strong>
                    <span>{new Date(profile?.createdAt).toDateString()}</span>
                </div>
                {user?._id === params.id && (
                    <button onClick={() => setUpdateProfile(true)} className="profile-update-btn">
                        <i className="bi bi-file-preson-fill"></i>
                        Update Profile
                    </button>
                )}
            </div>
            <div className="profile-posts-list">
                <h2 className="profile-posts-list-title">{profile?.username}</h2>
                {profile?.posts?.map(post =>
                    <PostItem key={post?._id}
                        post={post}
                        username={profile?.username}
                        userId={profile?._id}
                    />
                )}
            </div>
            {user?._id === params.id && (
                <button onClick={DeleteAccountHandler} className="delete-account-btn">
                    Delete Your Account
                </button>
            )}

            {updateProfile && <UpdateProfileModal profile={profile} setUpdateProfile={setUpdateProfile} />}

        </section>
    )
}