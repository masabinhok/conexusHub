import mongoose from 'mongoose';

// Create the User Schema with the required fields
const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    userImageURL: {
      type: String,
      default: '/default.png', // Default image URL
    },
    number: {
      type: Number,
    },
    address: {
      type: String,
      required: true,
    },
    role: {
      type: String,
    },
    shops: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shop',
        default: null, // Reference to the Shop model
      },
    ],
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cart', // Reference to the Cart model
    },
    services: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        default: null,
      },
    ],
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// Create the User model
const User = mongoose.model('User', UserSchema);

export default User; // Export the User model
