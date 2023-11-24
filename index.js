const express = require("express");
const dotenv = require("dotenv");
const {
  addDefaultMiddlewares,
} = require("./common/utils/addDefaultMiddlewares.js");
const { apiRoutePrefixer } = require("./common/utils/apiRoutePrefixer.js");
dotenv.config();
require("./passport-config/index.js");

const { signUpRouter } = require("./routes/auth/signup");
const { signInRouter } = require("./routes/auth/signin");
const { googleCallbackRouter } = require("./routes/auth/google-callback");
const { userRouter } = require("./routes/auth/user");
const { signoutRouter } = require("./routes/auth/signout");

const app = express();

const PORT = process.env.PORT || 5000;

addDefaultMiddlewares(app);

// Auth routes
app.use(apiRoutePrefixer("/auth/signup"), signUpRouter);
app.use(apiRoutePrefixer("/auth/signin"), signInRouter);
app.use(apiRoutePrefixer("/auth/google/callback"), googleCallbackRouter);
app.use(apiRoutePrefixer("/auth/user"), userRouter);
app.use(apiRoutePrefixer("/auth/signout"), signoutRouter);

app.listen(PORT, () => {
  console.log("Server running");
});
