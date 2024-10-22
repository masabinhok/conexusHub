import express, { Request, Response } from 'express';
import multer, { FileFilterCallback } from 'multer';
import fs, { unlink, unlinkSync } from 'fs';
import path from 'path';
import cloudinary from '../config/cloudinaryConfig';
import { asyncHandler } from './userRoutes';
import { UploadApiResponse } from 'cloudinary';
import serviceModel, { IService } from '../models/serviceModel';
import userModel from '../models/userModel';
import authenticateToken from '../middlewares/auth';

const router = express.Router();

const uploadsDir = './uploads/services';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
  destination: uploadsDir,
  filename: (req, file, cb) => {
    cb(
      null,
      req.body.serviceTitle + '-' + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 100 * 100 }, // Limit file size to 100mb
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
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

router.get(
  '/register',
  authenticateToken,
  async (req: Request, res: Response) => {
    res.send({
      message: 'Authenticated to register.',
    });
  }
);

router.get('/', async (req: Request, res: Response) => {
  console.log('hi from services');
  const services = await serviceModel.find({});
  console.log(services);
  res.status(200).send({
    services: services,
  });
});

router.post(
  '/register',
  upload.single('serviceImageURL'),
  asyncHandler(async (req: Request, res: Response) => {
    console.log('hello');
    console.log(req.body, req.file);

    const file = req.file as Express.Multer.File | undefined;
    let serviceImageURL = file?.path;
    console.log(serviceImageURL);

    const {
      serviceTitle,
      location,
      description,
      hourlyPrice,
      type,
      serviceProvider,
    } = req.body;
    if (serviceImageURL) {
      try {
        const cloudinaryResult: UploadApiResponse =
          await cloudinary.uploader.upload(serviceImageURL, {
            folder: 'services',
            use_filename: true,
            resource_type: 'image',
          });
        unlinkSync(serviceImageURL);
        serviceImageURL = cloudinaryResult.secure_url;

        const service = await serviceModel.create({
          serviceTitle,
          description,
          type,
          location,
          serviceProvider,
          hourlyPrice,
          serviceImages: serviceImageURL,
        });

        let updated = false;

        const user = await userModel.findOne({
          _id: serviceProvider,
        });

        if (user) {
          user.services?.push(service._id);
          await user.save();
        }
        updated = true;

        if (updated) {
          res.status(200).send({
            message:
              'Congratulations, you have successfully registered your service.',
          });
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({
          error: 'Registration failed',
          details: error,
        });
      }
    }
  })
);

export default router;
