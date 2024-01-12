import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.mjs';
import {consider_email_as_username} from '../../config/db.mjs';

const generateToken = (userId) => {
  return jwt.sign({ userId }, 'secret_key', { expiresIn: '1h' });
};

const validateInputs = (username, password) => {
  if (!username || !password) {
    return { isValid: false, message: 'Username and password are required' };
  }

  // Check if the provided username is a valid email address if "consider_email_as_username" is true in config
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (consider_email_as_username && !emailRegex.test(username)) {
    return { isValid: false, message: 'Invalid email address for the username' };
  }

  return { isValid: true };
};

export const signup = async (req, res) => {
  const { username, password } = req.body;
  const validation = validateInputs(username, password);

  if (!validation.isValid) {
    return res.status(400).json({ status: 400, message: validation.message, data: null, error: null });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword, followers: [], posts: [] });
    res.status(201).json({ status: 201, message: 'User created successfully', data: { userId: user._id }, error: null });
  } catch (error) {
    console.log(error);
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ status: 400, message: 'Validation failed', errors: validationErrors, data: null });
    } else if (error.code === 11000) {
      return res.status(400).json({ status: 400, message: 'Username already exists', errors: null, data: null });
    } else {
      return res.status(500).json({ status: 500, message: 'Internal Server Error', error: null, data: null });
    }
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  const validation = validateInputs(username, password);

  if (!validation.isValid) {
    return res.status(400).json({ status: 400, message: validation.message, data: null, error: null });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ status: 404, message: 'User not found', error: null, data: null });

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return res.status(401).json({ status: 401, message: 'Invalid password', error: null, data: null });

    const token = generateToken(user._id);
    res.json({ status: 200, message: 'logged in successfully', error: null, data: { token } });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, message: 'Internal Server Error', error: null, data: null });
  }
};

