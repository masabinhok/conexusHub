import express, { Request, Response } from 'express';
import CartModel, { ICart } from '../models/cartModel';
import UserModel, { IUser } from '../models/userModel';
import { asyncHandler } from './userRoutes';

const router = express.Router();

router.post(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    console.log('Cart reached');
    const { id } = req.params;
    const { productId, quantity, price } = req.body;

    const cartOwner: IUser | null = await UserModel.findOne({
      _id: id,
    }).populate('cart');
    console.log('Cart owner:', cartOwner);

    if (cartOwner?.cart) {
      const cartId = cartOwner.cart._id;
      const cart = await CartModel.findById(cartId);

      const existingItem = cart?.items.find(
        (item) => item.product?.toString() === productId
      );

      console.log('Existing item: ', existingItem);

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
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    console.log('hi', id);
    const user = await UserModel.findById({
      _id: id,
    }).populate('cart');

    const cartId = user?.cart?._id;
    const cart = await CartModel.findById({
      _id: cartId,
    }).populate('items.product');

    console.log(cart);
    res.status(200).send({
      message: 'Successful fetching cart',
      cart: cart,
    });
  })
);

export default router;
