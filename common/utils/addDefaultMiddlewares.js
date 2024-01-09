const cors = require("cors");
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const { validateApiKey } = require("../middlewares/validateApiKey");
const bodyParser = require("body-parser");
const addDefaultMiddlewares = (app) => {
  app.use(
    cors({
      origin: [
        process.env.CLIENT_URL,
        "http://localhost:3000",
        "http://localhost:5173",
        "http://localhost:5174",
      ],
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    })
  );
  app.use("/public", express.static("public"));

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
    })
  );
  app.use(cookieParser(process.env.COOKIE_SECRET));
  app.use(passport.session());
  app.use(
    bodyParser.json({
      verify: function (req, res, buf) {
        req.rawBody = buf;
      },
    })
  );
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
};

module.exports = {
  addDefaultMiddlewares,
};
