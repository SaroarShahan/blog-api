import { NextFunction, Request, Response } from 'express';

export const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({
      message: 'get posts',
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};
