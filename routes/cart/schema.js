const { z } = require("zod");

const AddToCartSchema = z.object({
  product: z.string().min(1, "Product is required"),
  quantity: z
    .number()
    .int("Number must be an integer")
    .min(1, "Quantity must be greater than 0"),
  variant: z.string().min(1, "Variant is required"),
});

module.exports = {
  AddToCartSchema,
};
