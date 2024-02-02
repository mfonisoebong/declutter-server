const { z } = require("zod");

const VariantSchema = z.object({
  color: z.string().min(1).max(100),
  image: z.string().min(1).max(100),
  quantity: z.number().min(0),
});

const ShipmentSchema = z.object({
  method: z.enum(["local", "express"]),
  processingTime: z.string().min(1),
  region: z.string().min(1),
});

const CreateProductSchema = z.object({
  name: z.string().min(1).max(255),
  image: z.string().min(1).max(100),
  description: z.string().min(1),
  price: z.number().min(0),
  category: z.string().min(1),
  sizes: z.array(z.string().min(1).max(100)),
  variants: z.array(VariantSchema),
  shipment: ShipmentSchema,
});

module.exports = {
  CreateProductSchema,
  VariantSchema,
};
