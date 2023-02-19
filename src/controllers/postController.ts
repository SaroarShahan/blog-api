import { Request, Response } from 'express';

export const getPosts = async (_: Request, res: Response) => {
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
