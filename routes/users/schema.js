const { z } = require("zod");
const DeleteUsersSchema = z.object({
  ids: z.array(z.string()),
});

module.exports = {
  DeleteUsersSchema,
};
