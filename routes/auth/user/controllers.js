const { successResponse } = require("../../../common/helpers/httpResponse");
const getUser = (req, res) => {
  return successResponse({
    res,
    data: req.user,
  });
};

module.exports = {
  getUser,
};
