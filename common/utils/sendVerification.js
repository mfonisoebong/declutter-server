const {transporter} = require("../helpers/mailTransporter");
const {Verification} = require("../../schemas/verification");
const sendVerification = async (user) => {
    const verification = new Verification({user: user._id});
    await verification.save();
    const verifyLink = `${process.env.BASE_URL}/api/v1/auth/verify/${verification._id}`;
    await transporter.sendMail({
        from: process.env.MAIL_USER,
        to: user.email,
        subject: "Verify your email",
        html: `
            <h2>Click the link below to verify your email</h2>
            <p><b>Do not share this link with any body</b></p>
                
            <a href="${verifyLink}">Verify</a>
            <p>This link expires after 30 minutes</p>
            `
    })
}

module.exports = {
    sendVerification
}