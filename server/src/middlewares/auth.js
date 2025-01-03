import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import dotenv from 'dotenv';

dotenv.config();

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res
        .status(401)
        .send({ message: 'Access token is missing. You are not authorized.' });
    }

    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      console.error('Token verification error:', error);
      return res.status(403).send('Invalid or expired token.');
    }

    const { id } = payload;
    if (!id) {
      return res.status(403).send('Invalid token: missing user ID.');
    }

    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).send('User not found in the database.');
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Server error in authenticateToken:', error);
    res.status(500).send('Internal Server Error');
  }
};

export default authenticateToken;
