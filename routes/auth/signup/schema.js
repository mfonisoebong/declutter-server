const { z } = require("zod");

const SignUpSchema = z
  .object({
    email: z.string().email("Invalid email"),
    firstName: z.string().min("1", "First name is required"),
    lastName: z.string().min("1", "Last name is required"),
    phone: z.object({
      dialCode: z.string().min("1", "Phone number is required"),
      number: z.string().min("1", "Phone dial code is required"),
    }),
    address: z.string().min("1", "Address is required"),
    password: z
      .string()
      .min(6, "Password must be upto 6 characters long")
      .max(20, "Password must not be more than 20 chanracters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
  });

const VendorSignUpSchema = z.object({
  email: z.string().email("Invalid email"),
  phoneNumber: z.string().min("1", "Phone number is required"),
  phoneDialCode: z.string().min("1", "Phone dial code is required"),
  password: z
    .string()
    .min(6, "Password must be upto 6 characters long")
    .max(20, "Password must not be more than 20 chanracters long"),
  confirmPassword: z.string(),
  address: z.string().min("1", "Address is required"),

  buisnessName: z.string().min("1", "Buisness name is required"),
  buisnessType: z.enum(["individual", "company"]),
});

module.exports = { SignUpSchema, VendorSignUpSchema };
