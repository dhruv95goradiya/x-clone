import jwt from 'jsonwebtoken';
import User from '../models/userModel.mjs';

export const authMiddleware = async (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) return res.status(401).json({ status:401, message: 'Unauthorized access', data: null, error: null });

  try {
    const decoded = jwt.verify(token, 'secret_key');
    const user = await User.findById(decoded.userId);

    if (!user) return res.status(404).json({ status:404, message: 'User not found', data:null, error:null });

    req.user = { userId: user._id, username: user.username };
    next();
  } catch (error) {
    res.status(403).json({ status:403, message: 'Forbidden', data:null, error:error });
  }
};