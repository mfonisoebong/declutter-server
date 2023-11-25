const jwt = require("jsonwebtoken");
const {User} = require("../../schemas/user");

const deserializeUser = async (req) => {
    const token = req.cookies.jwt_token;

    if (!token) {
        throw new Error("No token provided");
    }

    const {_id} = jwt.decode(token);

    const user = await User.findById(_id)

    if (!user) return null

    user.hash = undefined;

    return user;
};
module.exports = {
    deserializeUser,
};
