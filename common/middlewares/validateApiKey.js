function validateApiKey(req, res, next) {
  const key = req.get("API_KEY");
  const invalidToken = key !== process.env.API_KEY;
  if (invalidToken) {
    return res.sendStatus(401);
  }
  next();
}

module.exports = {
  validateApiKey,
};
