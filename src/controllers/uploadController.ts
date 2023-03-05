import { Request, Response } from 'express';

import asyncHandler from '~/utils/asynHandler';

/**
 * @description Upload file
 * @route POST /api/v1/upload
 * @access private
 */

export const uploadFile = asyncHandler(async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({
      status: 'fail',
      message: 'Upload correct file',
    });
  }

  res.json({
    status: 'success',
    message: 'File uploaded successfully',
    data: {
      url: req.file.path,
    },
  });
});
