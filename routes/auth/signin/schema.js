const { z } = require("zod");

const SignInSchema = z.object({
  username: z.string().email("Invalid email address"),
  password: z.string().min(6).max(20),
});

module.exports = {
  SignInSchema,
};
