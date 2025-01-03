// In index.ts
import express from 'express';
import cors from 'cors';
import shopRoutes from './routes/shopRoutes'; // Use import instead of require
import userRoutes from './routes/userRoutes';
import productRoutes from './routes/productRoutes';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import cartRoutes from './routes/cartRoutes';
import serviceRoutes from './routes/serviceRoutes';
import corsConfig from './config/corsConfig';
import("node-fetch");

dotenv.config();

const app = express();
app.use(cors(corsConfig)); // Enable CORS for all routes
app.use(bodyParser.json());
app.use(cookieParser());

const fetchData = async () => {
  try {
    const response = await fetch(`${process.env.SERVER_URL}/ping`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
};

// ping the server every five mintues to keep it awake
setInterval(() => fetchData(), 1000 * 60 * 5);

app.get('/', async (req: Request, res: Response) => {
  res.send('helloworld');
});

app.get('/ping', (req: Request, res: Response) => {
  res.send('pong');
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
app.use('/api/product', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/service', serviceRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
