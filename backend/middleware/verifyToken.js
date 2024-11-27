import jwt from 'jsonwebtoken';
import UserModel from '../models/user.js';

const isAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRETE);
    const user = await UserModel.findById(decoded.userId);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized: User is not an admin' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    console.error(error);
  }
};

const isSubAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRETE);
    const user = await UserModel.findById(decoded.userId);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized: User is not an admin' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    console.error(error);
  }
};

const IsUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRETE);
    const user = await UserModel.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    console.error(error);
  }
};

export { isAdmin, IsUser, isSubAdmin };
