const {successResponse} = require("../../common/helpers/httpResponse");
const testMessage = (req, res) => {
    return successResponse({
        res,
        message: 'This is a test message'
    })
}

module.exports = {
    testMessage
}