const passport = require("passport");
const { Strategy: GoogleStrategy } = require("passport-google-oauth2");
const { Strategy: LocalStrategy } = require("passport-local");
const { Op } = require("sequelize");
const argon = require("argon2");
const { User } = require("../models/index.js");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
    },
    async function (req, accessToken, refreshToken, profile, done) {
      const authPage = req.session.authPage;
      if (authPage === "signup") {
        const role = req.session.role;
        const user = await User.create({
          firstName: profile.given_name,
          lastName: profile.family_name,
          role,
          authStrategy: "google",
          email: profile.email,
        });
        return done(null, user);
      }

      const user = await User.findOne({
        where: {
          email: profile.email,
          authStrategy: "google",
        },
      });

      if (!user) {
        return done(new Error("User not found"), null);
      }

      return done(null, user);
    }
  )
);

passport.use(
  new LocalStrategy(async function (username, password, done) {
    const user = await User.findOne({
      where: {
        email: username,
        authStrategy: "local",
      },
    });

    if (!user) {
      return done(new Error("User not found"), null);
    }

    const paswordVerified = await argon.verify(user.hash, password);

    if (!paswordVerified) {
      return done(new Error("Invalid credentials"), null);
    }

    return done(null, user);
  })
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});
