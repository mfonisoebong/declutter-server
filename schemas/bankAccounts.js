const mongoose = require("mongoose");

const BankAccountSchema = mongoose.Schema(
  {
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    accountCode: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const BankAccount = mongoose.model("BankAccount", BankAccountSchema);

module.exports = {
  BankAccount,
};
