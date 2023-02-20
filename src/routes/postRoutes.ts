import { Router } from 'express';

import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from '~/controllers/postController';

const router = Router();

router.route('/').get(getPosts).post(createPost);
router.route('/:id').get(getPost).put(updatePost).delete(deletePost);

export default router;
