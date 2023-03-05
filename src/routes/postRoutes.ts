import { Request, Router } from 'express';
import multer, { FileFilterCallback } from 'multer';

import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from '~/controllers/postController';
import { uploadFile } from '~/controllers/uploadController';
import verifyToken from '~/middleware/verifyToken';

const router = Router();

const multerStorage = multer.diskStorage({
  destination: (_: Request, __: Express.Multer.File, cb) => {
    cb(null, 'public/images/posts');
  },
  filename: (req: any, file: Express.Multer.File, cb) => {
    const ext = file.mimetype.split('/')[1];
    console.log('req', req.user.id);
    cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (_: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  console.log('faaf');
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
    return;
  }

  cb(null, false);
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

router.route('/').get(getPosts).post(verifyToken, createPost);
router.route('/:id').get(getPost).put(verifyToken, updatePost).delete(verifyToken, deletePost);

router.route('/upload').post(verifyToken, upload.single('coverPhoto'), uploadFile);

export default router;
