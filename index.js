const express = require("express");
const dotenv = require("dotenv");
const {
  addDefaultMiddlewares,
} = require("./common/utils/addDefaultMiddlewares.js");
const { apiRoutePrefixer } = require("./common/utils/apiRoutePrefixer.js");
dotenv.config();
require("./passport-config/index.js");

const { signUpRouter } = require("./routes/auth/signup/index.js");
const { signInRouter } = require("./routes/auth/signin/index.js");
const {
  googleCallbackRouter,
} = require("./routes/auth/google-callback/index.js");
const { userRouter } = require("./routes/auth/user/index.js");
const { signoutRouter } = require("./routes/auth/signout/index.js");
const { devControlsRouter } = require("./routes/devcontrols/index.js");
const { connectDB } = require("./db/index.js");
const { contactUsRouter } = require("./routes/contact-us/index.js");
const { deliveryAddressRouter } = require("./routes/delivery-address/index.js");

const app = express();

const PORT = process.env.PORT || 5000;

addDefaultMiddlewares(app);

(async () => {
  await connectDB();
})();

// Auth routes
app.use(apiRoutePrefixer("/auth/signup"), signUpRouter);
app.use(apiRoutePrefixer("/auth/signin"), signInRouter);
app.use(apiRoutePrefixer("/auth/google/callback"), googleCallbackRouter);
app.use(apiRoutePrefixer("/auth/user"), userRouter);

app.use(apiRoutePrefixer("/delivery-address"), deliveryAddressRouter);

app.use(apiRoutePrefixer("/auth/signout"), signoutRouter);

app.use(apiRoutePrefixer("/contact-us"), contactUsRouter);

// Dev routes
app.use(apiRoutePrefixer("/dev"), devControlsRouter);

app.listen(PORT, () => {
  console.log("Server running");
});

module.exports = app;