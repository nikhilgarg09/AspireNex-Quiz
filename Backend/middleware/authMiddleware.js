import jwt from 'jsonwebtoken'
import User from '../models/User.js';
const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) {
    return res.status(401).send({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    const user = await User.findOne({_id : req.user.userId});
    req.user = user;
    console.log(user);
    next();
  } catch (err) {
    res.status(400).send({ error: 'Invalid token.' });
  }
};

export default authMiddleware;
