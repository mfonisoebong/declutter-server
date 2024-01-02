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
const { testRouter } = require("./routes/test");
const { verifyRoute } = require("./routes/auth/verify");
const { productVendorRouter } = require("./routes/products/vendor");
const { productUserRouter } = require("./routes/products/user");
const { reviewUserRouter } = require("./routes/product-reviews/user");
const { cartRouter } = require("./routes/cart");
const { categoriesRouter } = require("./routes/categories");
const { webhooksRouter } = require("./routes/webhooks");
const { homeRouter } = require("./routes/home");
const { subAccountsRouter } = require("./routes/subaccounts");

const app = express();

const PORT = process.env.PORT || 5000;

addDefaultMiddlewares(app);

(async () => {
  await connectDB();
})();

app.use(apiRoutePrefixer("/home"), homeRouter);

// Auth routes
app.use(apiRoutePrefixer("/auth/signup"), signUpRouter);
app.use(apiRoutePrefixer("/auth/signin"), signInRouter);
app.use(apiRoutePrefixer("/auth/google/callback"), googleCallbackRouter);
app.use(apiRoutePrefixer("/auth/user"), userRouter);
app.use(apiRoutePrefixer("/auth/verify"), verifyRoute);

app.use(apiRoutePrefixer("/delivery-address"), deliveryAddressRouter);

app.use(apiRoutePrefixer("/auth/signout"), signoutRouter);

app.use(apiRoutePrefixer("/contact-us"), contactUsRouter);

// Product routes
app.use(apiRoutePrefixer("/products/vendor"), productVendorRouter);
app.use(apiRoutePrefixer("/products/user"), productUserRouter);

// Product review routes
app.use(apiRoutePrefixer("/product-reviews/user"), reviewUserRouter);

// Cart routes
app.use(apiRoutePrefixer("/cart"), cartRouter);

app.use(apiRoutePrefixer("/categories"), categoriesRouter);

// Dev routes
app.use(apiRoutePrefixer("/dev"), devControlsRouter);

// Test routes
app.use(apiRoutePrefixer("/test"), testRouter);

app.use(apiRoutePrefixer("/subaccounts"), subAccountsRouter);

app.use(apiRoutePrefixer("/webhooks"), webhooksRouter);

app.listen(PORT, () => {
  console.log("Server running");
});

module.exports = app;
