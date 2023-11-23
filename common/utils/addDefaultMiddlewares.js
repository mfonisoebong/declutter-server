const cors = require("cors");
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const addDefaultMiddlewares = (app) => {
  app.use(
    cors({
      origin: process.env.CLIENT_URL,
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

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
};

module.exports = {
  addDefaultMiddlewares,
};
