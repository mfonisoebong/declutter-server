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
const { orderRouter } = require("./routes/orders/user");
const { vendorOrderRouter } = require("./routes/orders/vendor");
const { vendorDashboardRouter } = require("./routes/dashboard/vendor");
const { adminDashboardRouter } = require("./routes/dashboard/admin");
const { adminOrderRouter } = require("./routes/orders/admin");
const { productAdminRouter } = require("./routes/products/admin");
const { usersAdminRouter } = require("./routes/users");

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
app.use(apiRoutePrefixer("/admin/products"), productAdminRouter);
app.use(apiRoutePrefixer("/vendor/products"), productVendorRouter);
app.use(apiRoutePrefixer("/products"), productUserRouter);

// Product review routes
app.use(apiRoutePrefixer("/product-reviews/user"), reviewUserRouter);

// Cart routes
app.use(apiRoutePrefixer("/cart"), cartRouter);

app.use(apiRoutePrefixer("/categories"), categoriesRouter);

app.use(apiRoutePrefixer("/vendor/orders"), vendorOrderRouter);
app.use(apiRoutePrefixer("/admin/orders"), adminOrderRouter);
app.use(apiRoutePrefixer("/orders"), orderRouter);

// Dev routes
app.use(apiRoutePrefixer("/dev"), devControlsRouter);

// Test routes
app.use(apiRoutePrefixer("/test"), testRouter);

app.use(apiRoutePrefixer("/subaccounts"), subAccountsRouter);

app.use(apiRoutePrefixer("/webhooks"), webhooksRouter);

app.use(apiRoutePrefixer("/dashboard/vendor"), vendorDashboardRouter);
app.use(apiRoutePrefixer("/dashboard/admin"), adminDashboardRouter);

// User routes
app.use(apiRoutePrefixer("/admin/users"), usersAdminRouter);

app.listen(PORT, () => {
  console.log("Server running");
});

module.exports = app;
