import express from 'express';
import multer from 'multer';
import path from 'path';
import * as fs from 'fs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import dotenv from 'dotenv';
import cloudinary from '../config/cloudinaryConfig.js';
import { unlinkSync } from 'fs';
dotenv.config();

const router = express.Router();

const uploadsDir = './uploads/users';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
  destination: uploadsDir,
  filename: (req, file, cb) => {
    cb(
      null,
      req.body.userName + '-' + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // Limit file size to 1MB
  fileFilter: (
    req,
    file,
    cb
  ) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Error: Only images (jpeg, jpg, png, gif) are allowed!'));
    }
  },
});

// Async error wrapper
export const asyncHandler =
  (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

router.post(
  '/signup',
  upload.single('userImageURL'),
  asyncHandler(async (req, res) => {
    const { email, password, userName, number, address } = req.body;

    //cloudinary ma upload garekoo
    if (req.file) {
      try {
        const cloudinaryResult=
          await cloudinary.uploader.upload(req.file.path, {
            folder: 'users',
            use_filename: true,
            resource_type: 'image',
          });

        unlinkSync(req.file.path);

        const imageUrl = cloudinaryResult.secure_url;

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
          return res.status(400).send({
            error: 'User already exists',
          });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await userModel.create({
          email,
          password: hashedPassword,
          userName,
          number,
          address,
          userImageURL: imageUrl,
        });

        // Respond with success
        res.status(201).json({
          message: 'User created successfully',
          user: newUser,
        });
      } catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
        return res.status(500).json({ error: 'Failed to upload image' });
      }
    } else {
      return res.status(400).json({ error: 'No image file uploaded' });
    }
  })
);

router.post(
  '/login',
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Find user by email
    const user = await userModel.findOne({ email });

    if (!user) {
      console.log('user not found');
      return res.status(400).send({
        error: 'User not found',
      });
    }

    // Compare the passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ error: 'Invalid credentials' });
    }

    // Create a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    res.status(200).send({
      message: 'Login Successful! Conexus is now open to you!',
      user: user,
      token: token,
    });
  })
);

router.get(
  '/profile/:id',

  async (req, res) => {
    const { id } = req.params;
    const user = await userModel.findOne({ _id: id }).populate({
      path: 'cart',
    });
    console.log('req on profile');
    res.status(200).send({
      user,
    });
  }
);

router.put('/profile/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { userName, number, address } = req.body;

    await userModel.updateOne(
      {
        _id: id,
      },
      {
        $set: { userName, address, number },
      }
    );

    const updatedUser = await userModel.findOne({
      _id: id,
    });

    res.status(200).send({
      user: updatedUser,
    });
  } catch (error) {
    res.status(400).send({
      message: 'Error',
    });
  }
});
export default router;
