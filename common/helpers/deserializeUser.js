const jwt = require("jsonwebtoken");
const { User } = require("../../schemas/user");

const deserializeUser = async (req) => {
  const token = req.cookies.jwt_token ?? "";

  const body = jwt.decode(token);

  const user = await User.findById(body?._id);

  if (!user) return null;

  user.hash = undefined;

  return user;
};
module.exports = {
  deserializeUser,
};
