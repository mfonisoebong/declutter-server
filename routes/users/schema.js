const { z } = require("zod");
const DeleteUsersSchema = z.object({
  ids: z.array(z.string()),
});

const ChangeUserStatusSchema = z.object({
  status: z.enum(["active", "suspended"]),
  ids: z.array(z.string()),
});

module.exports = {
  DeleteUsersSchema,
  ChangeUserStatusSchema,
};
