const {sendVerification} = require("../../../common/utils/sendVerification");
const {successResponse, failedResponse} = require("../../../common/helpers/httpResponse");
const {Verification} = require("../../../schemas/verification");
const {User} = require("../../../schemas/user");
const resendVerificationCode = async (req, res) => {
    try {
        await sendVerification(req.user)

        return successResponse({
            res,
            message: 'Resend verification'
        })

    } catch (err) {
        return failedResponse({
            res,
            err
        })
    }
}

const verifyUser = async (req, res) => {

    try {
        const verification = await Verification.findById(req.params.id)


        if (!verification) {
            return res.status(403).send(`<h1>Verification link has expired</h1>`)
        }
        const user = await User.findById(verification.user)

        if (user.verifiedAt) {
            return failedResponse({
                res,
                err: 'User already verified',
                status: 403
            })
        }

        user.verifiedAt = Date.now()
        await user.save()
        return res.send(`<h1>Your account has been verified</h1>`)

    } catch (err) {
        return failedResponse({
            res,
            err
        })
    }
}

module.exports = {
    resendVerificationCode,
    verifyUser
}