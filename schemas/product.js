const mongoose = require("mongoose");

const VariantSchema = new mongoose.Schema({
  color: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  unlimited: {
    type: Boolean,
    required: true,
  },
});

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    sizes: {
      type: [String],
      required: true,
    },
    image: {
      required: true,
      type: String,
    },
    variants: {
      type: [VariantSchema],
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    suspended: {
      type: Boolean,
      default: false,
    },
  },
  {
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  },
);

ProductSchema.virtual("reviews", {
  ref: "ProductReview",
  localField: "_id",
  foreignField: "product",
});

ProductSchema.post("validate", function (doc, next) {
  doc.variants.forEach((variant) => {
    if (variant.unlimited && variant.quantity !== 0) {
      throw new Error("Unlimited variant must have quantity 0");
    }
    next();
  });
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = {
  Product,
};
