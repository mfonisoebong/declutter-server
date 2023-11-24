const { exec } = require("child_process");
const { promisify } = require("util");
const {
  successResponse,
  failedResponse,
} = require("../../common/helpers/httpResponse");
const execAsync = promisify(exec);

const migrate = async (req, res) => {
  try {
    const { stdout, stderr } = await execAsync("sequelize-cli db:migrate");
    return successResponse({
      res,
      message: "Migrated successfully",
    });
  } catch (err) {
    return failedResponse({
      res,
      err,
    });
  }
};

const seed = async (req, res) => {
  try {
    const { stdout, stderr } = await execAsync("sequelize-cli db:seed:all");
    return successResponse({
      res,
      message: "Migrated successfully",
    });
  } catch (err) {
    return failedResponse({
      res,
      err,
    });
  }
};

const drop = async (req, res) => {
  try {
    const { stdout, stderr } = await execAsync(
      "sequelize-cli db:migrate:undo:all",
    );
    return successResponse({
      res,
      message: "Migrated successfully",
    });
  } catch (err) {
    return failedResponse({
      res,
      err,
    });
  }
};

module.exports = {
  migrate,
  seed,
  drop,
};
