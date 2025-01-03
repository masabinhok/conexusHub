import express from 'express';
import { asyncHandler } from './userRoutes.js';

const router = express.Router();

router.post(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { productId, quantity, price } = req.body;

    const cartOwner = await UserModel.findOne({
      _id: id,
    }).populate('cart');

    if (cartOwner?.cart) {
      const cartId = cartOwner.cart._id;
      const cart = await CartModel.findById(cartId);

      const existingItem = cart?.items.find(
        (item) => item.product?.toString() === productId
      );

      if (existingItem) {
        const updatedQuantity = existingItem.quantity + quantity;
        const updatedCart = await CartModel.findByIdAndUpdate(
          cartId,
          {
            $set: {
              'items.$[elem].quantity': updatedQuantity,
              totalAmount: cart?.totalAmount
                ? cart?.totalAmount + Number(quantity * price)
                : Number(quantity * price),
              totalQuantity: updatedQuantity,
            },
          },
          {
            new: true,
            arrayFilters: [{ 'elem.product': productId }],
          }
        );

        return res.status(200).send({
          message: 'Product quantity updated',
          cart: updatedCart,
        });
      } else {
        const newTotalQuantity = cart?.totalQuantity + quantity;
        const updatedCart = await CartModel.findByIdAndUpdate(
          cartId,
          {
            $push: {
              items: { product: productId, quantity },
            },
            $set: {
              totalAmount: cart?.totalAmount
                ? cart?.totalAmount + Number(quantity * price)
                : Number(quantity * price),
              totalQuantity: newTotalQuantity,
            },
          },
          { new: true }
        );

        return res.status(200).send({
          message: 'New product added to cart',
          cart: updatedCart,
        });
      }
    } else {
      console.log('No cart found, creating a new cart');
      const newCart = await CartModel.create({
        owner: id,
        items: [{ product: productId, quantity }],
        totalAmount: Number(quantity * price),
        totalQuantity: Number(quantity),
      });

      await UserModel.findByIdAndUpdate(id, {
        $set: { cart: newCart._id },
        new: true,
      });

      return res.status(201).send({
        message: 'New cart created',
        cart: newCart,
      });
    }
  })
);

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    console.log('hi');
    const user = await UserModel.findById({
      _id: id,
    }).populate('cart');

    const cartId = user?.cart?._id;
    const cart = await CartModel.findById({
      _id: cartId,
    }).populate({
      path: 'items.product',
      populate: {
        path: 'shop',
      },
    });
    console.log(cart);

    res.status(200).send({
      message: 'Successful fetching cart',
      cart: cart,
    });
  })
);

router.post('/:id/remove', async (req, res) => {
  try {
    const { productId, productPrice, productQuantity } = req.body;
    const { id } = req.params;
    console.log(productId, id);

    const checkCart = await CartModel.findOne({
      owner: id,
    });
    const totalAmount = checkCart?.totalAmount;
    const totalQuantity = checkCart?.totalQuantity;
    console.log(totalAmount);
    const subtractedAmount = totalAmount
      ? totalAmount - productPrice * productQuantity
      : 0;
    const subtractedQuantity = totalQuantity
      ? totalQuantity - productQuantity
      : 0;

    const cart = await CartModel.findOneAndUpdate(
      {
        owner: id,
      },
      {
        $pull: {
          items: {
            product: productId,
          },
        },
        $set: {
          totalAmount: subtractedAmount,
          totalQuantity: subtractedQuantity,
        },
      },

      {
        new: true,
      }
    );
    console.log(cart);
    res.status(200).send({
      cart: cart,
      message: 'Removed one item from your cart!',
    });
  } catch (error) {
    console.log(error);
  }
});

export default router;
