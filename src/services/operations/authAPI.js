// authAPI.js
import { toast } from "react-hot-toast";
import { setLoading, setToken } from "../../slices/authSlice";
import { resetCart } from "../../slices/cartSlice";
import { setUser } from "../../slices/profileSlice";
import { apiConnector } from "../apiconnector";
import { endpoints } from "../apis"; // Change 'authEndpoints' to 'endpoints'

const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API,
} = endpoints; // Change 'authEndpoints' to 'endpoints'

export function sendOtp(email, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", SENDOTP_API, {
                email,
                checkUserPresent: true,
            });
            console.log("SENDOTP API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("OTP Sent Successfully");
            navigate("/verify-email");
        } catch (error) {
            console.log("SENDOTP API ERROR............", error);
            toast.error("Could Not Send OTP");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    };
}

export function signUp(
    accountType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,
    navigate
) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", SIGNUP_API, {
                accountType,
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                otp,
            });

            console.log("SIGNUP API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.success("Signup Successful");
            navigate("/login");
        } catch (error) {
            console.log("SIGNUP API ERROR............", error);
            toast.error("Signup Failed");
            navigate("/signup");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    };
}

export function login(email, password, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", LOGIN_API, {
                email,
                password,
            });    //This makes a POST request to the LOGIN_API endpoint, sending the email and password in the request body.
            //apiConnector is likely a helper function for making HTTP requests, abstracting away details like setting up headers or base URLs.
//await ensures that the function waits for the API response before proceeding.

            console.log("LOGIN API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Login Successful");
            dispatch(setToken(response.data.token)); // Dispatches an action to store the authentication token received from the API. This could be used for managing session authentication.
            const userImage = response.data?.user?.image
                ? response.data.user.image
                : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;
            dispatch(setUser({ ...response.data.user, image: userImage }));

            localStorage.setItem("token", JSON.stringify(response.data.token)); //Saves the token and user data in the browser's local storage, so that the user remains logged in even if they refresh the page or close the browser.
            localStorage.setItem("user", JSON.stringify(response.data.user));
            navigate("/dashboard/my-profile");  // After a successful login, the user is programmatically redirected to the /dashboard/my-profile page.
        } catch (error) {
            console.log("LOGIN API ERROR............", error);
            toast.error("Login Failed");
        }
        dispatch(setLoading(false));  //After the API call is complete (whether successful or not), the loading state is turned off by dispatching an action.
        toast.dismiss(toastId);  //After the API call is complete (whether successful or not), the loading state is turned off by dispatching an action.
    };
}

export function logout(navigate) {
    return (dispatch) => {
        dispatch(setToken(null));
        dispatch(setUser(null));
        dispatch(resetCart());
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Logged Out");
        navigate("/");
    };
}

export function getPasswordResetToken(email, setEmailSent) {
    return async (dispatch) => {  //The dispatch function is used to send actions to the Redux store.
        dispatch(setLoading(true));   // indicate that a loading state is starting.
        try {
            const response = await apiConnector("POST", RESETPASSTOKEN_API, { email }); //The payload sent in the body of the POST request, containing the email address of the user.

            console.log("RESET PASSWORD TOKEN RESPONSE....", response);

            if (!response.data.success) {  //This property is assumed to be a boolean that indicates whether the API call was successful. 
                throw new Error(response.data.message);
            }

            toast.success("Reset Email Sent");
            setEmailSent(true);
        } catch (error) {
            console.log("RESET PASSWORD TOKEN Error", error);
            toast.error("Failed to send email for resetting password");
        }
        dispatch(setLoading(false));
    };
}

export function resetPassword(password, confirmPassword, token) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", RESETPASSWORD_API, {
                password,
                confirmPassword,
                token,
            });

            console.log("RESET Password RESPONSE ... ", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Password has been reset successfully");
        } catch (error) {
            console.log("RESET PASSWORD TOKEN Error", error);
            toast.error("Unable to reset password");
        }
        dispatch(setLoading(false));
    };
}
