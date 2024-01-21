const {
  failedResponse,
  successResponse,
} = require("../../common/helpers/httpResponse");
const { User } = require("../../schemas/user");
const { getPagination } = require("../../common/utils/getPagination");
const getUsers = async (req, res) => {
  const page = parseInt(req.query?.page) || 1;
  const limit = parseInt(req.query?.limit) || 20;

  try {
    const total = await User.countDocuments({});
    const users = await User.find({})
      .select("firstName lastName status role email createdAt updatedAt")
      .skip((page - 1) * limit)
      .limit(limit);
    const pagination = getPagination(page, limit, total);
    const usersData = {
      ...pagination,
      data: users,
    };
    return successResponse({
      res,
      data: usersData,
    });
  } catch (err) {
    return failedResponse({
      res,
      err,
    });
  }
};

const getUsersOverview = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({});
    const totalUsersActive = await User.countDocuments({ status: "active" });
    const totalVendors = await User.countDocuments({ role: "vendor" });
    const activeVendors = await User.countDocuments({
      role: "vendor",
      status: "active",
    });

    return successResponse({
      res,
      data: {
        totalUsers,
        totalUsersActive,
        totalVendors,
        activeVendors,
      },
    });
  } catch (err) {
    return failedResponse({
      res,
      err,
    });
  }
};

const deleteUsers = async (req, res) => {
  try {
    await User.deleteMany({
      _id: {
        $in: req.body.ids,
      },
    });
    return successResponse({
      res,
      message: "Users deleted successfully",
    });
  } catch (err) {
    return failedResponse({
      res,
      err,
    });
  }
};

module.exports = {
  getUsers,
  getUsersOverview,
  deleteUsers,
};
