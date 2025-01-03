import { CorsOptions } from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const corsConfig: CorsOptions = {
  origin: process.env.CORS_ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}

export default corsConfig;