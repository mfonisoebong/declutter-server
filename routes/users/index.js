const { Router } = require("express");

const usersAdminRouter = Router();

const {
  getUsers,
  getUsersOverview,
  deleteUsers,
  changeUserStatus,
} = require("./controllers");
const { validateApiKey } = require("../../common/middlewares/validateApiKey");
const { authenticated } = require("../../common/middlewares/authenticated");
const { verified } = require("../../common/middlewares/verified");
const { hasRole } = require("../../common/middlewares/hasRole");
const { zodValidator } = require("../../common/middlewares/zodValidator");
const { DeleteUsersSchema, ChangeUserStatusSchema } = require("./schema");

usersAdminRouter.use(validateApiKey, authenticated, verified, hasRole("admin"));

usersAdminRouter.get("/", getUsers);
usersAdminRouter.delete("/", deleteUsers);
usersAdminRouter.patch(
  "/status",
  zodValidator(ChangeUserStatusSchema),
  changeUserStatus,
);
usersAdminRouter.get(
  "/overview",
  zodValidator(DeleteUsersSchema),
  getUsersOverview,
);

module.exports = {
  usersAdminRouter,
};
