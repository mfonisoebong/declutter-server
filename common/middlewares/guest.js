const {deserializeUser} = require("../helpers/deserializeUser");
const {failedResponse} = require("../helpers/httpResponse");
const guest = async (req, res, next) => {
    try {

        if (!req.cookies.jwt_token) {
            return next();
        }

        const user = await deserializeUser(req);
        if (user) {
            return failedResponse({
                res,
                status: 403,
            });
        }
        return next();
    } catch (err) {
        return failedResponse({
            res,
            err,
            status: 500,
        });
    }
};

module.exports = {
    guest,
};
