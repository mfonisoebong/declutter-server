const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema(
  {
    cartItems: {
      type: Array,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
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

const Invoice = mongoose.model("Invoice", InvoiceSchema);

module.exports = { Invoice };
