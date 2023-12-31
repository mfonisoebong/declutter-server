const { Router } = require("express");
const { validateApiKey } = require("../../common/middlewares/validateApiKey");
const { authenticated } = require("../../common/middlewares/authenticated");
const { verified } = require("../../common/middlewares/verified");
const {
  createIndividualSubAccount,
  deleteSubAccount,
  uploadIndividualDocuments,
} = require("./controllers");
const { zodValidator } = require("../../common/middlewares/zodValidator");
const { CreateIndividualAccountSchema } = require("./schema");
const multer = require("multer");

const subAccountsRouter = Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "application/pdf",
    ];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"));
    }
  },
}).fields([
  {
    name: "front",
    maxCount: 1,
  },
  {
    name: "back",
    maxCount: 1,
  },
]);

subAccountsRouter.use(validateApiKey, authenticated, verified);

subAccountsRouter.post(
  "/individual",
  zodValidator(CreateIndividualAccountSchema),
  createIndividualSubAccount
);

subAccountsRouter.post(
  "/individual/upload-documents",
  upload,
  uploadIndividualDocuments
);

subAccountsRouter.delete("/:id", deleteSubAccount);

module.exports = {
  subAccountsRouter,
};
