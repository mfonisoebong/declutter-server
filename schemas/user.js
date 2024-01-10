const mongoose = require("mongoose");
const { EMAIL_REGEX } = require("../common/constants/regex");
const { sendVerification } = require("../common/utils/sendVerification");
const bycrpt = require("bcryptjs");
const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      default: null,
    },
    lastName: {
      type: String,
      default: null,
    },
    address: {
      type: String,
      default: null,
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
      enum: ["local", "google"],
      default: "local",
    },

    buisnessName: {
      type: String,
      default: null,
    },
    buisnessType: {
      type: String,
      enum: ["individual", "company", null],
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
    stripeAccountId: {
      type: String,
      default: null,
    },
    hash: {
      type: String,
      default: null,
    },
    phone: {
      type: String,
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
  }
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

UserSchema.virtual("bankAccounts", {
  ref: "BankAccount",
  localField: "_id",
  foreignField: "vendor",
});

UserSchema.virtual("vendorOrders", {
  ref: "Order",
  localField: "_id",
  foreignField: "vendor",
});

UserSchema.virtual("orders", {
  ref: "Order",
  localField: "_id",
  foreignField: "user",
});

UserSchema.post("validate", async function (doc, next) {
  if (!doc.hash) {
    next();
    return;
  }

  try {
    const hashValue = bycrpt.hashSync(doc.hash, 10);
    doc.hash = hashValue;
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
