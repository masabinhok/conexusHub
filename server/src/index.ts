// In index.ts
import express, { NextFunction } from 'express';
import cors from 'cors';
import shopRoutes from './routes/shopRoutes'; // Use import instead of require
import userRoutes from './routes/userRoutes';
import bodyParser from 'body-parser';
import { body } from 'express-validator';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import authenticateToken from './middlewares/auth';
import { Request, Response } from 'express';

dotenv.config();

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/', async (req: Request, res: Response) => {
  res.send('helloworld');
});

//connect to database
mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => {
    console.log('Database connected!');
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });

// Use the routes
app.use('/api/shop', shopRoutes);
app.use('/api/user', userRoutes);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
