const { contactUsEmail } = require("../mail/templates/contactFormRes")
const mailSender = require("../utils/mailSender")


exports.contactUsController = async (req, res) => {
  const { email, firstname, lastname, message, phoneNo, countrycode } = req.body
  console.log("Contact Form Submission:", req.body);
  try {
    const emailRes = await mailSender(
      email,
      "We appreciate your reaching out to us.",
      contactUsEmail(email, firstname, lastname, message, phoneNo, countrycode)
    );
    console.log("Email Sent successfully ", emailRes);
    return res.json({
      success: true,
      message: "Email send successfully",
    })
  } catch (error) {
    console.log("Error", error)
    console.log("Error sending message :", error.message);
    return res.json({
      success: false,
      message: "Something went wrong while sending email...",
    })
  }
}


