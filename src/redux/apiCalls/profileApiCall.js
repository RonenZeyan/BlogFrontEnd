import { request } from "../../utils/Axios";
import { toast } from "react-toastify";
import { profileActions } from "../slices/profileSlice";
import { authActions } from "../slices/authSlice";



//get User profile
export function getUserProfile(userId) {
    return async (dispatch) => {
        try {
            const res = await request.get(`/api/users/profile/${userId}`);
            dispatch(profileActions.setProfile(res.data));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}

//Upload New Image
export function uploadProfilePhoto(newPhoto) {
    return async (dispatch, getState) => {
        try {
            const res = await request.post(`/api/users/profile/profile-photo-upload`, newPhoto, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token, //we can right also localStorage.getItem("userInfo").token
                    "Content-Type": "multipart/form-data",
                }
            });
            dispatch(profileActions.setProfilePhoto(res.data.profilePhoto));
            dispatch(authActions.setUserPhoto(res.data.profilePhoto));

            //modify the localStorage with new photo uploaded
            const user = JSON.parse(localStorage.getItem("userInfo"))
            user.profilePhoto = res.data?.profilePhoto;
            localStorage.setItem("userInfo", JSON.stringify(user));
            toast.success(res.data.message)
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}

//Update Profile
export function UpdateProfile(userId, profile) {
    return async (dispatch, getState) => {
        try {
            const res = await request.put(`/api/users/profile/${userId}`, profile, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token, //we can right also localStorage.getItem("userInfo").token
                }
            });
            dispatch(profileActions.setUpdateProfile(res.data));
            dispatch(authActions.setUsername(res.data.username));

            //modify the localStorage with new username
            const user = JSON.parse(localStorage.getItem("userInfo"))
            user.username = res.data?.username;
            localStorage.setItem("userInfo", JSON.stringify(user));
            toast.success("Profile Updated Successfully!");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}

//delete Profile
export function deleteProfile(userId) {
    return async (dispatch, getState) => {
        try {
            dispatch(profileActions.setLoading())
            const res = await request.delete(`/api/users/profile/${userId}`, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token, //we can right also localStorage.getItem("userInfo").token
                }
            });
            dispatch(profileActions.setIsProfileDeleted());
            toast.success(res.data?.message);
            setTimeout(() => dispatch(profileActions.clearIsProfileDeleted()), 2000)

        } catch (error) {
            toast.error(error.response.data.message);
            dispatch(profileActions.clearIsProfileDeleted());
        }
    }
}
//get number of users 
export function getUsersCount() {
    return async (dispatch, getState) => {
        try {
            const res = await request.get(`/api/users/count`, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token, //we can right also localStorage.getItem("userInfo").token
                }
            });
            dispatch(profileActions.setUserCount(res.data));

        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}
//delete Profile
export function getUsersProfiles() {
    return async (dispatch, getState) => {
        try {
            const res = await request.get(`/api/users/profile`, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token, //we can right also localStorage.getItem("userInfo").token
                }
            });
            dispatch(profileActions.setProfiles(res.data));

        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}