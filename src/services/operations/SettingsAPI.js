import { toast } from "react-hot-toast"

import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiconnector"
import { settingsEndpoints } from "../apis"
import { logout } from "./authAPI"

const {
  UPDATE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  CHANGE_PASSWORD_API,
  DELETE_PROFILE_API,
} = settingsEndpoints

export function updateDisplayPicture(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector(
        "PUT",
        UPDATE_DISPLAY_PICTURE_API,
        formData,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      );
      console.log("UPDATE_DISPLAY_PICTURE_API API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Display Picture Updated Successfully");

      // Dispatch the updated user information
      dispatch(setUser(response.data.data)); // Make sure response.data.data contains the full updated user object

      return response; // Return response for further handling if needed
    } catch (error) {
      console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error);
      toast.error("Could Not Update Display Picture");
      throw error; // Rethrow the error for handling in the calling component
    } finally {
      toast.dismiss(toastId); // Ensure toast dismisses regardless of success or failure
    }
  };
}

export function updateProfile(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData, {
        Authorization: `Bearer ${token}`,
      });
      console.log("UPDATE_PROFILE_API API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      const userImage = response.data.updatedUserDetails.image
        ? response.data.updatedUserDetails.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updatedUserDetails.firstName} ${response.data.updatedUserDetails.lastName}`;

      dispatch(setUser({ ...response.data.updatedUserDetails, image: userImage }));
      toast.success("Profile Updated Successfully");

      return response; // Return response for further handling
    } catch (error) {
      console.log("UPDATE_PROFILE_API API ERROR............", error);
      toast.error("Could Not Update Profile");
      throw error; // Rethrow the error for handling in the calling component
    } finally {
      toast.dismiss(toastId); // Ensure toast dismisses regardless of success or failure
    }
  };
}


export async function changePassword(token, formData) {
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", CHANGE_PASSWORD_API, formData, {
      Authorization: `Bearer ${token}`,
    })
    console.log("CHANGE_PASSWORD_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    toast.success("Password Changed Successfully")
  } catch (error) {
    console.log("CHANGE_PASSWORD_API API ERROR............", error)
    toast.error(error.response.data.message)
  }
  toast.dismiss(toastId)
}

export function deleteProfile(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("DELETE", DELETE_PROFILE_API, null, {
        Authorization: `Bearer ${token}`,
      })
      console.log("DELETE_PROFILE_API API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Profile Deleted Successfully")
      dispatch(logout(navigate))
    } catch (error) {
      console.log("DELETE_PROFILE_API API ERROR............", error)
      toast.error("Could Not Delete Profile")
    }
    toast.dismiss(toastId)
  }
}