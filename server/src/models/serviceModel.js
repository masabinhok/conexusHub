import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    serviceTitle: {
      type: String,
      required: true,
    },
    serviceProvider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    serviceImages: {
      type: [String],
      default: [],
    },
    type: {
      type: String,
      required: true,
    },
    hourlyPrice: {
      type: Number,
    },
    ratings: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        reviewer: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        comment: {
          type: String,
        },
        rating: {
          type: Number,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Service = mongoose.model('Service', serviceSchema);

export default Service;
