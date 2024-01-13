const mongoose = require("mongoose");
const { Product } = require("./product");

const InvoiceSchema = new mongoose.Schema(
  {
    cartItems: {
      type: Array,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "paid", "cancelled", "refunded"],
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

InvoiceSchema.post("save", async function (doc) {
  try {
    if (doc.status !== "pending") {
      await updateCartItems(doc.cartItems, doc.status);
    }
  } catch (err) {
    console.log(err);
  }
});

async function updateCartItems(cartItems, status) {
  return Promise.all(
    cartItems.map(async (item) => {
      const product = await Product.findById(item.product._id);

      if (!product) return;

      const productVariants = product.variants.map((v) => {
        if (v.unlimited) return v;

        return {
          ...v,
          quantity:
            v._id.toString() === item.variant
              ? actionForItem(status, v.quantity, item.quantity)
              : v.quantity,
        };
      });

      product.variants = productVariants;

      await product.save();
    }),
  );
}

function actionForItem(status, total, bought) {
  if (status === "paid") {
    return total - bought;
  }
  if (status === "cancelled") {
    return total + bought;
  }
  return total;
}

const Invoice = mongoose.model("Invoice", InvoiceSchema);

module.exports = { Invoice };
