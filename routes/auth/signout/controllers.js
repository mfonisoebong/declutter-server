const signoutUser = (req, res) => {
  return res.cookie("jwt_token", "", { maxAge: 1 }).json({
    message: "User signed out successfully",
  });
};

module.exports = {
  signoutUser,
};
