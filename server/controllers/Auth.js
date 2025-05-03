const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const sendMail = require('../utils/mailSender'); // Utility to send emails
const Profile = require("../models/Profile"); 




//sendOTp

exports.sendotp = async (req, res) => {
  try {
    //fetch email from request ki body
    const { email } = req.body;

    //check if user already exist'
    const checkUserPresent = await User.findOne({ email });

    //if user already exist, then return a response
    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: "User already registered",
      });
    }

    //generate OTP
    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    console.log("OTP generated: ", otp);

    //check unique otp or not
    let result = await OTP.findOne({ otp: otp });

    while (result) {
      otp = otpGenerator(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await OTP.findOne({ otp: otp });
    }

    const otpPayload = { email, otp };

    //create an entry in db for OTP
    const otpBody = await OTP.create(otpPayload);
    console.log(otpBody);

    //return response successful
    res.status(200).json({
      success: true,
      message: "OTP Sent Successfully",
      otp,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



exports.signUp = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber,
      otp,
    } = req.body;

    // Validation for required fields
    if (!firstName || !lastName || !email || !password || !confirmPassword || !accountType) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Password match validation
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    // Additional validation, OTP check, etc.

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create Profile and User
    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: contactNumber || null,
    });

    // Use `image` field to meet the model's requirement
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      accountType,
      additionalDetails: profileDetails._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });

    return res.status(200).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "User registration failed",
    });
  }
};


//login
exports.login = async (req, res) => {

    try{
        //get data from req body
        const {email, password } = req.body;


        //validation
        if(!email || !password ){
            return res.status(403).json({
                success:false,
                message:'All fields are required, Please try again',
            });
        }


        //User check exist or not
        const user = await User.findOne({email}).populate("additionalDetails");
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User is not registered, please signup first",
            });

        }

        //generate the JWT, after matching password
        if(await bcrypt.compare(password, user.password)){
            const payload = {
                email: user.email,
                id: user._id,
                accountType:user.accountType,
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn:"2h",
            })
            user.token = token;
            user.password = undefined;

             //create cookies and send response

             const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly:true,
             }

             res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message:'Logged In Successfully',
             })


        }else{
            return res.status(401).json({
                success:false,
                message:'password is incorrect',
            })
        }


    }catch(error){

      console.log(error);
      return res.status(500).json({
        success:false,
        message:'Login Failure, Please try again',

      });

    }

};

//changePassword


exports.changePassword = async (req, res) => {
  try {
      // Get data from req body
      const { oldPassword, newPassword, confirmNewPassword } = req.body;

      // Get the user ID from the token
      const userId = req.user.id;

      // Validate the input fields
      if (!oldPassword || !newPassword || !confirmNewPassword) {
          return res.status(400).json({
              success: false,
              message: "All fields are required",
          });
      }

      // Check if new password and confirm password match
      if (newPassword !== confirmNewPassword) {
          return res.status(400).json({
              success: false,
              message: "New password and confirm password do not match",
          });
      }

      // Fetch user from DB
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({
              success: false,
              message: "User not found",
          });
      }

      // Check if the old password is correct
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
          return res.status(401).json({
              success: false,
              message: "Old password is incorrect",
          });
      }

      // Check if new password is the same as the old password
      if (oldPassword === newPassword) {
          return res.status(400).json({
              success: false,
              message: "New password cannot be the same as the old password",
          });
      }

      // Hash the new password
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);

      // Update password in DB
      user.password = hashedNewPassword;
      await user.save();

      // Send an email notification about password change
      await sendMail({
          to: user.email,
          subject: "Password Updated Successfully",
          text: "Your password has been updated successfully.",
      });

      // Return success response
      return res.status(200).json({
          success: true,
          message: "Password changed successfully",
      });
  } catch (error) {
      console.error(error);
      return res.status(500).json({
          success: false,
          message: "Internal server error. Please try again.",
      });
  }
};