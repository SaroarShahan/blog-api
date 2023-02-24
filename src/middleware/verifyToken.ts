import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';

const verifyToken = async (req: any, res: Response, next: NextFunction) => {
  const authHeader = req.headers.Authorization || req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ status: 'error', message: 'Unauthorized request' });
  }

  if (!authHeader?.startsWith('Bearer')) {
    return res.status(400).json({ status: 'error', message: 'Invalid token.' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ status: 'error', message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET!);
    req.user = decoded;

    next();
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err });
  }
};

export default verifyToken;
