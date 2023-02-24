import { Router } from 'express';

import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from '~/controllers/postController';
import verifyToken from '~/middleware/verifyToken';

const router = Router();

router.route('/').get(getPosts).post(verifyToken, createPost);
router.route('/:id').get(getPost).put(verifyToken, updatePost).delete(verifyToken, deletePost);

export default router;
