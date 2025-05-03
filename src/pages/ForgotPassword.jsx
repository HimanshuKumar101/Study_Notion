import { useState } from "react"
import { BiArrowBack } from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { getPasswordResetToken } from "../services/operations/authAPI"

function ForgotPassword() {
  const [email, setEmail] = useState("") //initializes the email state with an empty string (""). This could represent the initial value of an email input field in a form, which starts as empty.
  const [emailSent, setEmailSent] = useState(false) //initializes the emailSent state with false. This could represent a status flag indicating whether an email (like a password reset or verification email) has been sent.
  const dispatch = useDispatch() //useDispatch is used to dispatch actions to the Redux store.
  const { loading } = useSelector((state) => state.auth) //Extracts the loading state from the auth slice of the Redux store. This loading state likely represents whether the password reset request is in progress.

  const handleOnSubmit = (e) => {
    e.preventDefault()    //Prevents the default form submission behavior (e.g., page reload).
    dispatch(getPasswordResetToken(email, setEmailSent)) //Dispatches the getPasswordResetToken action, passing the email and setEmailSent as arguments.
  }

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      {loading ? (
        <div className="spinner"></div>   //If loading is true (i.e., while the password reset request is being processed), a spinner is displayed:
      ) : (
        <div className="max-w-[500px] p-4 lg:p-8">
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
            {!emailSent ? "Reset your password" : "Check email"}
          </h1>
          <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
            {!emailSent
              ? "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
              : `We have sent the reset email to ${email}`}
          </p>
          <form onSubmit={handleOnSubmit}>
            {!emailSent && (
              <label className="w-full">
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                  Email Address <sup className="text-pink-200">*</sup>
                </p>
                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="form-style w-full"
                />
              </label>
            )}
            <button    //The button label dynamically changes based on the emailSent state: "Submit" if emailSent is false. "Resend Email" if emailSent is true.
              type="submit"
              className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
            >
              {!emailSent ? "Sumbit" : "Resend Email"}   
            </button>
          </form>
          <div className="mt-6 flex items-center justify-between">
            <Link to="/login">
              <p className="flex items-center gap-x-2 text-richblack-5">
                <BiArrowBack /> Back To Login
              </p>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default ForgotPassword