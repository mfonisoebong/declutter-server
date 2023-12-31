const passport = require("passport");
const { Strategy: GoogleStrategy } = require("passport-google-oauth2");
const { Strategy: LocalStrategy } = require("passport-local");
const { User } = require("../schemas/user");
const bycrpt = require("bcryptjs");

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
        const user = new User({
          firstName: profile.given_name,
          lastName: profile.family_name,
          role,
          authStrategy: "google",
          email: profile.email,
        });
        await user.save();
        return done(null, user);
      }

      const user = await User.findOne({
        email: profile.email,
        authStrategy: "google",
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
      email: username,
      authStrategy: "local",
    });

    if (!user) {
      return done(new Error("User not found"), null);
    }

    const paswordVerified = bycrpt.compareSync(user.hash, password);

    if (!paswordVerified) {
      return done(new Error("Invalid credentials"), null);
    }

    user.hash = undefined;

    return done(null, user);
  })
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});
