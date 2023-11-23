const deserializeUser = async (req) => {
  const token = req.cookies.jwt_token;
  const { id } = jwt.decode(token);

  const user = await User.findByPk(id);
  delete user.hash;

  return user;
};
module.exports = {
  deserializeUser,
};
