const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 1,
      trim: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
      minlength: 1,
    },
    slug: {
      type: String,
      required: true,
      minlength: 1,
      trim: true,
      unique: true,
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

CategorySchema.virtual("products", {
  ref: "Product",
  localField: "_id",
  foreignField: "category",
});
const Category = mongoose.model("Category", CategorySchema);

module.exports = { Category };
