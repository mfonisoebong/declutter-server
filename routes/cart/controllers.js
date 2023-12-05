const { CartItem } = require("../../schemas/cartItem");
const {
  failedResponse,
  successResponse,
} = require("../../common/helpers/httpResponse");

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
      }
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
      }
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

module.exports = {
  addToCart,
  increment,
  decrement,
};
