import express from 'express';
import cors from 'cors';
import shopRoutes from './routes/shopRoutes.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cartRoutes from './routes/cartRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import corsConfig from './config/corsConfig.js';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
app.use(cors(corsConfig));
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

setInterval(() => fetchData(), 1000 * 60 * 5);

app.get('/', async (req, res) => {
  res.send('helloworld');
});

app.get('/ping', (req, res) => {
  res.send('pong');
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Database connected!');
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });

app.use('/api/shop', shopRoutes);
app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/service', serviceRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
