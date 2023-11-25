const jwt = require("jsonwebtoken");

const serializeUser = (user) => {

    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {
        expiresIn: "1 day",
    });

    return token;
};

module.exports = {
    serializeUser,
};
