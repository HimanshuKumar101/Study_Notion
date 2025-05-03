const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,  // This should be the SMTP host, e.g., "smtp.gmail.com"
            auth: {
                user: process.env.MAIL_USER,  // Your email address (corrected)
                pass: process.env.MAIL_PASS,  // Your app-specific password or email password
            }
        });

        let info = await transporter.sendMail({
            from: 'StudyNotion || By Himanshu Kumar',
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`,
        });

        console.log(info);
        return info;
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = mailSender;


