const jwt = require("jsonwebtoken");
const { User } = require("../../models");

const deserializeUser = async (req) => {
  const token = req.cookies.jwt_token;

  if (!token) {
    throw new Error("No token provided");
  }

  const { id } = jwt.decode(token);

  const user = await User.findByPk(id);
  delete user.hash;

  return user;
};
module.exports = {
  deserializeUser,
};
