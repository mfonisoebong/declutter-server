const mongoose = require("mongoose");

const CartItemSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  variant: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

const CartItem = mongoose.model("CartItem", CartItemSchema);

module.exports = { CartItem };
