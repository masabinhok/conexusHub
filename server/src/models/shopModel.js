import mongoose from 'mongoose';

const ShopSchema = new mongoose.Schema(
  {
    shopName: {
      type: String,
      required: true,
    },
    estd: {
      type: Date,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    shopImageURL: {
      type: String,
      required: true,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Shop = mongoose.model('Shop', ShopSchema);

export default Shop;
