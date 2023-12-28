const mongoose = require("mongoose");
const { EMAIL_REGEX } = require("../common/constants/regex");
const argon = require("argon2");
const { PhoneSchema } = require("./phone");
const { Verification } = require("./verification");
const { transporter } = require("../common/helpers/mailTransporter");
const { sendVerification } = require("../common/utils/sendVerification");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      enum: ["admin", "user", "vendor"],
    },
    authStrategy: {
      type: String,
      enum: ["local", "google", "facebook"],
      default: "local",
    },

    buisnessName: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (email) => EMAIL_REGEX.test(email),
        message: "Invalid email address.",
      },
    },
    hash: {
      type: String,
      default: null,
    },
    phone: {
      type: PhoneSchema,
      default: null,
    },
    verifiedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  },
);

UserSchema.virtual("fullName").get(function () {
  return this.buisnessName ?? `${this.firstName} ${this.lastName}`;
});

UserSchema.virtual("products", {
  ref: "Product",
  localField: "_id",
  foreignField: "vendor",
});

UserSchema.virtual("cartItems", {
  ref: "CartItem",
  localField: "_id",
  foreignField: "user",
});

UserSchema.virtual("invoices", {
  ref: "Invoice",
  localField: "_id",
  foreignField: "user",
});

UserSchema.virtual("orders", {
  ref: "Order",
  localField: "_id",
  foreignField: "user",
});

UserSchema.virtual("ordersPlaced", {
  ref: "Order",
  localField: "_id",
  foreignField: "vendor",
});

UserSchema.virtual("bankAccounts", {
  ref: "BankAccount",
  localField: "_id",
  foreignField: "vendor",
});

UserSchema.method({
  verifyHash: async function (hash, password) {
    try {
      return argon.verify(hash, password);
    } catch (err) {
      throw new Error(err);
    }
  },
});

UserSchema.post("validate", async function (doc, next) {
  if (!doc.hash) {
    next();
    return;
  }

  try {
    const hash = await argon.hash(doc.hash);
    doc.hash = hash;
    next();
  } catch (err) {
    next(err);
  }
});

UserSchema.pre("save", function (next) {
  this.docIsNew = this.isNew;
  next();
});

UserSchema.post("save", async function (doc) {
  if (!this.docIsNew) {
    return;
  }
  try {
    await sendVerification(doc);
  } catch (err) {
    console.log(err);
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = { User };
