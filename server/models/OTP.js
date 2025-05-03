 

const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
//const otpTemplate = require("../utils/otpTemplate"); // Import the OTP template
const otpTemplate = require("../mail/templates/emailVerificationTemplate");

const OTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 5 * 60,  // The OTP will expire after 5 minutes
    }
});

// Function to send verification email using the OTP template
async function senderVerificationEmail(email, otp) {
    try {
        // Use the otpTemplate to generate the HTML body for the email
        const htmlBody = otpTemplate(otp); 

        // Send the email using the formatted OTP template
        const mailResponse = await mailSender(email, "Verification Email from StudyNotion", htmlBody);

        console.log("Email sent Successfully: ", mailResponse);

    } catch (error) {
        console.log("Error occurred while sending email: ", error);
        throw error;
    }
}

// Hook to send email before saving OTP
OTPSchema.pre("save", async function (next) {
    await senderVerificationEmail(this.email, this.otp);
    next();
});

module.exports = mongoose.model("OTP", OTPSchema);
