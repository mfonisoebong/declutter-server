const passport = require("passport");
const { User } = require("../../../schemas/user");
const { failedResponse } = require("../../../common/helpers/httpResponse");
const { serializeUser } = require("../../../common/helpers/serializeUser");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const googleSignup = (req, res, next) => {
  req.session.authPage = "signup";
  req.session.role = req.query.role;
  next();
};

cloudinary.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
});

const passportAuthenticate = passport.authenticate("google", {
  scope: ["email", "profile"],
});

const userLocalSignup = async (req, res, next) => {
  try {
    const { password, confirmPassword, ...restData } = req.body;
    const avatar = req.file;

    const user = new User({
      ...restData,
      hash: password,
    });

    if (avatar) {
      const fileKey = await uploadAvatar(avatar);
      user.avatar = fileKey;
    }

    await user.save();

    const token = serializeUser(user);
    user.hash = undefined;
    return res
      .cookie("jwt_token", token, {
        maxAge: 60000 * 60 * 24,
      })
      .json(user);
  } catch (err) {
    return failedResponse({
      res,
      err,
    });
  }
};

const vendorLocalSignup = async (req, res) => {
  try {
    const { password, confirmPassword, ...restData } = req.body;
    const avatar = req.file;

    const user = new User({
      ...restData,
      hash: password,

      role: "vendor",
    });

    if (avatar) {
      const fileKey = await uploadAvatar(avatar);
      user.avatar = fileKey;
    }

    await user.save();

    const token = serializeUser(user);
    user.hash = undefined;
    return res
      .cookie("jwt_token", token, {
        maxAge: 60000 * 60 * 24,
      })
      .json(user);
  } catch (err) {
    console.log(err);
    return failedResponse({
      res,
      err,
    });
  }
};

const uploadAvatar = async (avatar) => {
  if (!avatar) return null;

  const formData = new FormData();
  formData.append("file", avatar);
  const { public_id } = await cloudinary.uploader.upload(avatar.path, {
    folder: "avatars",
    unique_filename: true,
  });

  fs.unlink(avatar.path, (err) => {
    if (err) throw err;
  });
  return public_id;
};

module.exports = {
  googleSignup,
  passportAuthenticate,
  userLocalSignup,
  vendorLocalSignup,
};
