import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './userModel';

export interface IReview extends Document {
  reviewer: IUser['_id'];
  comment: string;
  rating: number;
  createdAt: Date;
}

export interface IService extends Document {
  _id: string;
  serviceTitle: string;
  serviceProvider: IUser['_id'];
  location: string;
  description: string;
  serviceImages: string[];
  type: string;
  hourlyPrice?: number;
  ratings?: number;
  reviews?: IReview[];
  tags?: string[];
}

const serviceSchema: Schema<IService> = new mongoose.Schema(
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
      type: [String], // Array of strings, examples of services provided
      default: [], // Default to an empty array
    },
    type: {
      type: String,
      required: true, // The type/category of the service
    },
    hourlyPrice: {
      type: Number, // Optional field for price per hour
    },
    ratings: {
      type: Number, // Average rating, can be a float
      default: 0, // Default rating of 0 if no ratings yet
    },
    reviews: [
      {
        reviewer: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User', // Reference to the User model for the reviewer
        },
        comment: {
          type: String,
        },
        rating: {
          type: Number, // Rating value
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now, // Default to the current date
        },
      },
    ],
    tags: {
      type: [String], // Array of tags for filtering services
      default: [], // Default to an empty array
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt timestamps
  }
);

const Service = mongoose.model<IService>('Service', serviceSchema);
export default Service;
