const jwt = require("jsonwebtoken");

const serializeUser = (user) => {
  console.log(user);

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1 day",
  });

  return token;
};

module.exports = {
  serializeUser,
};
