const { CartItem } = require("../../schemas/cartItem");
const {
  failedResponse,
  successResponse,
} = require("../../common/helpers/httpResponse");
const { Invoice } = require("../../schemas/invoice");
const {Stripe} = require('../../common/helpers/stripe')

const getTotalPrice = (cartItems) => {
  const prices = cartItems.map((item) => item.product.price * item.quantity);
  const totalPrice = prices.reduce((a, b) => a + b, 0);

  return totalPrice;
};

const getUserCart = async (req, res) => {
  try {
    const cartItems = await CartItem.find({ user: req.user._id }).populate(
      "product",
      "name price variants",
    );

    return successResponse({
      res,
      data: {
        cartItems,
        total: getTotalPrice(cartItems),
      },
    });
  } catch (err) {
    return failedResponse({
      res,
      err,
    });
  }
};

const addToCart = async (req, res) => {
  try {
    const cartItem = new CartItem({
      user: req.user._id,
      ...req.body,
    });
    await cartItem.save();
    const cartItemData = await CartItem.findById(cartItem._id)
      .populate("product", "name variants price")
      .exec();

    return successResponse({
      res,
      data: cartItemData,
    });
  } catch (err) {
    return failedResponse({
      res,
      err,
    });
  }
};

const increment = async (req, res) => {
  try {
    const cartItem = await CartItem.findOneAndUpdate(
      {
        user: req.user._id,
        _id: req.params.id,
      },
      {
        $inc: { quantity: 1 },
      },
      {
        new: true,
      },
    ).populate("product", "name variants price");
    await cartItem.save();

    return successResponse({
      res,
      data: cartItem,
    });
  } catch (err) {
    return failedResponse({
      res,
      err,
    });
  }
};

const decrement = async (req, res) => {
  try {
    const cartItem = await CartItem.findOneAndUpdate(
      {
        user: req.user._id,
        _id: req.params.id,
      },
      {
        $inc: { quantity: -1 },
      },
      {
        new: true,
      },
    ).populate("product", "name variants price");

    if (cartItem.quantity === 0) {
      await CartItem.deleteOne({
        _id: cartItem._id,
      });

      return successResponse({
        res,
        data: null,
      });
    }
    await cartItem.save();

    return successResponse({
      res,
      data: cartItem,
    });
  } catch (err) {
    return failedResponse({
      res,
      err,
    });
  }
};

const checkout = async (req, res) => {
  try {
    const cartItems = await CartItem.find({ user: req.user._id }).populate(
      "product",
      "name variants price",
    )

    if (cartItems.length === 0) {
      return failedResponse({
        res,
        err: "Cart is empty",
      });
    }

    const invoice = new Invoice({
      cartItems,
      user: req.user._id,
    });
    await invoice.save();
    const paymentUrl = await generatePaymentUrl(cartItems, invoice);
    return successResponse({
      res,
      data: {
        paymentUrl,
      }
    })

  } catch (err) {
    return failedResponse({
      res,
      err,
    });
  }
};

const generatePaymentUrl= async(cartItems, invoice)=>{
  const totalPrice = getTotalPrice(cartItems);
  const session = await Stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: cartItems.map(item=>({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.product.name,
        },
        unit_amount: item.product.price * 100,
      },
      quantity: item.quantity,
    })),
    metadata: {
      invoice: invoice._id.toString(),
    },
    mode: 'payment',
    success_url: 'http://localhost:3000/success',
    cancel_url: 'http://localhost:3000/cancel',
  });
  return session.url;
}

module.exports = {
  addToCart,
  increment,
  decrement,
  checkout,
  getUserCart,
};
