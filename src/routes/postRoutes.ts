import { Router } from 'express';

import { getPosts } from '~/controllers/postController';

const router = Router();

router.route('/').get(getPosts);

export default router;
