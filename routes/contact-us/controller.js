const {ContactUs} = require("../../schemas/contactUs");
const {successResponse, failedResponse} = require("../../common/helpers/httpResponse");
const createContactUs = async (req, res) => {
    try {
        await ContactUs.create(req.body);
        return successResponse({
            res,
            message: "Contact Us created successfully"
        })
    } catch (err) {
        return failedResponse({
            res,
            err
        })
    }
}


module.exports = {
    createContactUs
}