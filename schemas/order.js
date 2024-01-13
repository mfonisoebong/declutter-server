const mongoose = require("mongoose");
const { User } = require("./user");
const { transporter } = require("../common/helpers/mailTransporter");

const OrderSchema = new mongoose.Schema(
  {
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    invoice: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Invoice",
    },
    status: {
      type: String,
      enum: ["pending", "delivered", "cancelled"],
      default: "pending",
    },
    deliveredAt: {
      type: Date,
      default: null,
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

OrderSchema.post("save", async function (doc, next) {
  try {
    // Send email to user
    const user = await User.findById(doc.user);
    if (doc.status === "delivered") {
      await sendDeliveredMailToUser(user, doc);
    }
    if (doc.status === "cancelled") {
      await sendCancelledMailToUser(user, doc);
    }

    next();
  } catch (err) {
    next(err);
  }
});

async function sendDeliveredMailToUser(user, order) {
  await transporter.sendMail({
    from: process.env.MAIL_SENDER,
    to: user.email,
    subject: "Order Delivered",
    html: `
        <div>
            <h1>Order Delivered</h1>
            <p>Your order with the id ${order._id.toString()} has been delivered</p>
        </div>
        `,
  });
}

async function sendCancelledMailToUser(user, order) {
  await transporter.sendMail({
    from: process.env.MAIL_SENDER,
    to: user.email,
    subject: "Order Cancelled",
    html: `
        <div>
            <h1>Order Cancelled</h1>
            <p>Your order with the id ${order._id.toString()} has been cancelled</p>
        </div>
        `,
  });
}

const Order = mongoose.model("Order", OrderSchema);

module.exports = {
  Order,
};
