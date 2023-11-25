const {Router} = require("express");
const {
    googleSignin,
    passportAuthenticate,
    localSignin,
} = require("./controllers");
const {zodValidator} = require("../../../common/middlewares/zodValidator");
const {SignInSchema} = require("./schema");
const {
    validateApiKey,
} = require("../../../common/middlewares/validateApiKey");
const {guest} = require("../../../common/middlewares/guest");

const signInRouter = Router();

signInRouter.get("/google", guest, googleSignin, passportAuthenticate);
signInRouter.post(
    "/local",
    validateApiKey,
    guest,
    zodValidator(SignInSchema),
    localSignin,
);

module.exports = {
    signInRouter,
};
